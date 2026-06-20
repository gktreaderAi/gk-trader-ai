from datetime import datetime
from pydantic import BaseModel


class LessonBase(BaseModel):
    title: str
    category: str
    description: str
    content: str


class LessonCreate(LessonBase):
    pass


class LessonRead(LessonBase):
    id: int
    created_at: datetime
    updated_at: datetime

    class Config:
        orm_mode = True
