from datetime import datetime
from pydantic import BaseModel, Field


class TradeBase(BaseModel):
    user_id: int
    symbol: str
    side: str
    entry_price: float
    exit_price: float | None = None
    stop_loss: float | None = None
    take_profit: float | None = None
    profit_loss: float | None = None


class TradeCreate(TradeBase):
    pass


class TradeRead(TradeBase):
    id: int
    created_at: datetime

    class Config:
        orm_mode = True
