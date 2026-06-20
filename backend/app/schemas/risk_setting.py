from pydantic import BaseModel


class RiskSettingBase(BaseModel):
    user_id: int
    daily_risk: float
    weekly_risk: float
    max_drawdown: float


class RiskSettingCreate(RiskSettingBase):
    pass


class RiskSettingRead(RiskSettingBase):
    id: int

    class Config:
        orm_mode = True
