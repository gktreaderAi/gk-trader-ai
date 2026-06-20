from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.models.trade import Trade
from app.schemas.trade import TradeCreate


class TradeService:
    async def create_trade(self, db: AsyncSession, trade_in: TradeCreate) -> Trade:
        trade = Trade(**trade_in.model_dump())
        db.add(trade)
        await db.commit()
        await db.refresh(trade)
        return trade

    async def get_trade(self, db: AsyncSession, trade_id: int) -> Trade | None:
        result = await db.execute(select(Trade).where(Trade.id == trade_id))
        return result.scalar_one_or_none()

    async def list_trades(self, db: AsyncSession, user_id: int) -> list[Trade]:
        result = await db.execute(select(Trade).where(Trade.user_id == user_id))
        return result.scalars().all()

    async def delete_trade(self, db: AsyncSession, trade_id: int) -> None:
        trade = await self.get_trade(db, trade_id)
        if trade:
            await db.delete(trade)
            await db.commit()
