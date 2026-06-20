from pydantic import BaseModel


class PerformanceBase(BaseModel):
    user_id: int
    win_rate: float
    profit_factor: float
    drawdown: float
    total_profit: float


class PerformanceCreate(PerformanceBase):
    pass


class PerformanceRead(PerformanceBase):
    id: int

    class Config:
        orm_mode = True
