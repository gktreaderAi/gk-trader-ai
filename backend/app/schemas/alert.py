from datetime import datetime
from pydantic import BaseModel


class AlertBase(BaseModel):
    user_id: int
    message: str
    type: str


class AlertCreate(AlertBase):
    pass


class AlertRead(AlertBase):
    id: int
    created_at: datetime

    class Config:
        orm_mode = True
