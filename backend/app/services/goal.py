from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.models.goal import Goal
from app.schemas.goal import GoalCreate


class GoalService:
    async def create_goal(self, db: AsyncSession, goal_in: GoalCreate) -> Goal:
        goal = Goal(**goal_in.model_dump())
        db.add(goal)
        await db.commit()
        await db.refresh(goal)
        return goal

    async def get_goal(self, db: AsyncSession, goal_id: int) -> Goal | None:
        result = await db.execute(select(Goal).where(Goal.id == goal_id))
        return result.scalar_one_or_none()

    async def list_goals(self, db: AsyncSession, user_id: int) -> list[Goal]:
        result = await db.execute(select(Goal).where(Goal.user_id == user_id))
        return result.scalars().all()

    async def update_goal(self, db: AsyncSession, goal_id: int, updates: dict) -> Goal | None:
        goal = await self.get_goal(db, goal_id)
        if not goal:
            return None
        for field, value in updates.items():
            setattr(goal, field, value)
        await db.commit()
        await db.refresh(goal)
        return goal
