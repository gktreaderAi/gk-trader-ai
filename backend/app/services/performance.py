from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.models.performance import Performance
from app.schemas.performance import PerformanceCreate


class PerformanceService:
    async def create_or_update_performance(
        self, db: AsyncSession, performance_in: PerformanceCreate
    ) -> Performance:
        result = await db.execute(select(Performance).where(Performance.user_id == performance_in.user_id))
        performance = result.scalar_one_or_none()
        if performance:
            performance.win_rate = performance_in.win_rate
            performance.profit_factor = performance_in.profit_factor
            performance.drawdown = performance_in.drawdown
            performance.total_profit = performance_in.total_profit
        else:
            performance = Performance(**performance_in.model_dump())
            db.add(performance)
        await db.commit()
        await db.refresh(performance)
        return performance

    async def get_performance(self, db: AsyncSession, user_id: int) -> Performance | None:
        result = await db.execute(select(Performance).where(Performance.user_id == user_id))
        return result.scalar_one_or_none()
