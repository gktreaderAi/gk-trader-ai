from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession

from app.api.auth import get_current_user
from app.database import get_db
from app.models.user import User
from app.schemas.goal import GoalCreate, GoalRead
from app.services.goal import GoalService

router = APIRouter()
goal_service = GoalService()


@router.post("/", response_model=GoalRead)
async def create_goal(
    goal: GoalCreate,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    """Create a new trading goal."""
    goal.user_id = current_user.id
    return await goal_service.create_goal(db, goal)


@router.get("/", response_model=list[GoalRead])
async def list_goals(
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    """List all goals for the current user."""
    return await goal_service.list_goals(db, current_user.id)


@router.get("/{goal_id}", response_model=GoalRead)
async def get_goal(
    goal_id: int,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    """Get a specific goal."""
    goal = await goal_service.get_goal(db, goal_id)
    if not goal or goal.user_id != current_user.id:
        raise HTTPException(status_code=404, detail="Goal not found")
    return goal


@router.patch("/{goal_id}", response_model=GoalRead)
async def update_goal(
    goal_id: int,
    goal_update: dict,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    """Update a goal."""
    goal = await goal_service.get_goal(db, goal_id)
    if not goal or goal.user_id != current_user.id:
        raise HTTPException(status_code=404, detail="Goal not found")
    return await goal_service.update_goal(db, goal_id, goal_update)


@router.delete("/{goal_id}")
async def delete_goal(
    goal_id: int,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    """Delete a goal."""
    goal = await goal_service.get_goal(db, goal_id)
    if not goal or goal.user_id != current_user.id:
        raise HTTPException(status_code=404, detail="Goal not found")
    await db.delete(goal)
    await db.commit()
    return {"message": "Goal deleted"}
