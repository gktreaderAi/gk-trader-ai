from datetime import datetime
from pydantic import BaseModel


class LessonProgressBase(BaseModel):
    user_id: int
    lesson_id: int
    progress: float
    completed: bool = False


class LessonProgressCreate(LessonProgressBase):
    pass


class LessonProgressRead(LessonProgressBase):
    id: int
    updated_at: datetime

    class Config:
        orm_mode = True
