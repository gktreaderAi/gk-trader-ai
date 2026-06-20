from datetime import datetime
from pydantic import BaseModel


class TradeJournalBase(BaseModel):
    user_id: int
    symbol: str
    side: str
    entry_price: float
    quantity: int = 1
    exit_price: float | None = None
    stop_loss: float | None = None
    take_profit: float | None = None
    profit_loss: float | None = None
    rr_ratio: float | None = None
    notes: str | None = None
    emotion: str | None = None
    screenshot_url: str | None = None
    trade_date: datetime | None = None


class TradeJournalCreate(TradeJournalBase):
    pass


class TradeJournalUpdate(BaseModel):
    symbol: str | None = None
    exit_price: float | None = None
    profit_loss: float | None = None
    rr_ratio: float | None = None
    notes: str | None = None
    emotion: str | None = None
    screenshot_url: str | None = None


class TradeJournalRead(TradeJournalBase):
    id: int
    created_at: datetime
    updated_at: datetime

    class Config:
        orm_mode = True


class TradeAnalytics(BaseModel):
    total_trades: int
    winning_trades: int
    losing_trades: int
    win_rate: float
    average_rr: float
    best_trade: float
    worst_trade: float
    total_profit: float
