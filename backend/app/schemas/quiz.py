from typing import List

from pydantic import BaseModel


class QuizQuestion(BaseModel):
    question: str
    options: List[str]
    answer: str | None = None


class QuizResponse(BaseModel):
    lesson_id: int
    questions: List[QuizQuestion]
