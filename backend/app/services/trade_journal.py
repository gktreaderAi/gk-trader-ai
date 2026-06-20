from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.models.trade_journal import TradeJournal
from app.schemas.trade_journal import TradeJournalCreate, TradeJournalUpdate, TradeAnalytics


class TradeJournalService:
    async def create_trade(self, db: AsyncSession, trade_in: TradeJournalCreate) -> TradeJournal:
        trade = TradeJournal(**trade_in.model_dump())
        db.add(trade)
        await db.commit()
        await db.refresh(trade)
        return trade

    async def get_trade(self, db: AsyncSession, trade_id: int, user_id: int) -> TradeJournal | None:
        result = await db.execute(
            select(TradeJournal).where(TradeJournal.id == trade_id).where(TradeJournal.user_id == user_id)
        )
        return result.scalar_one_or_none()

    async def list_trades(self, db: AsyncSession, user_id: int, limit: int = 100, offset: int = 0) -> list[TradeJournal]:
        result = await db.execute(
            select(TradeJournal)
            .where(TradeJournal.user_id == user_id)
            .order_by(TradeJournal.trade_date.desc())
            .limit(limit)
            .offset(offset)
        )
        return result.scalars().all()

    async def update_trade(
        self, db: AsyncSession, trade_id: int, user_id: int, updates: TradeJournalUpdate
    ) -> TradeJournal | None:
        trade = await self.get_trade(db, trade_id, user_id)
        if not trade:
            return None
        update_data = updates.model_dump(exclude_unset=True)
        for field, value in update_data.items():
            setattr(trade, field, value)
        await db.commit()
        await db.refresh(trade)
        return trade

    async def delete_trade(self, db: AsyncSession, trade_id: int, user_id: int) -> bool:
        trade = await self.get_trade(db, trade_id, user_id)
        if not trade:
            return False
        await db.delete(trade)
        await db.commit()
        return True

    async def get_analytics(self, db: AsyncSession, user_id: int) -> TradeAnalytics:
        result = await db.execute(select(TradeJournal).where(TradeJournal.user_id == user_id))
        trades = result.scalars().all()

        if not trades:
            return TradeAnalytics(
                total_trades=0,
                winning_trades=0,
                losing_trades=0,
                win_rate=0.0,
                average_rr=0.0,
                best_trade=0.0,
                worst_trade=0.0,
                total_profit=0.0,
            )

        total_trades = len(trades)
        winning_trades = sum(1 for t in trades if t.profit_loss and t.profit_loss > 0)
        losing_trades = sum(1 for t in trades if t.profit_loss and t.profit_loss <= 0)
        win_rate = (winning_trades / total_trades * 100) if total_trades > 0 else 0.0

        rr_ratios = [t.rr_ratio for t in trades if t.rr_ratio and t.rr_ratio > 0]
        average_rr = sum(rr_ratios) / len(rr_ratios) if rr_ratios else 0.0

        profit_losses = [t.profit_loss for t in trades if t.profit_loss is not None]
        best_trade = max(profit_losses) if profit_losses else 0.0
        worst_trade = min(profit_losses) if profit_losses else 0.0
        total_profit = sum(profit_losses) if profit_losses else 0.0

        return TradeAnalytics(
            total_trades=total_trades,
            winning_trades=winning_trades,
            losing_trades=losing_trades,
            win_rate=win_rate,
            average_rr=average_rr,
            best_trade=best_trade,
            worst_trade=worst_trade,
            total_profit=total_profit,
        )
