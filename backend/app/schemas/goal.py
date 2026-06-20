from pydantic import BaseModel


class GoalBase(BaseModel):
    user_id: int
    goal_name: str
    target_value: float
    current_value: float = 0.0
    status: str = 'active'


class GoalCreate(GoalBase):
    pass


class GoalRead(GoalBase):
    id: int

    class Config:
        orm_mode = True
