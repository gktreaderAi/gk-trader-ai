from datetime import datetime
from pydantic import BaseModel


class JournalBase(BaseModel):
    user_id: int
    title: str
    content: str
    emotion: str | None = None


class JournalCreate(JournalBase):
    pass


class JournalRead(JournalBase):
    id: int
    created_at: datetime

    class Config:
        orm_mode = True
