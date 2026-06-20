from sqlalchemy import Column, Float, ForeignKey, Integer, String
from sqlalchemy.orm import relationship

from app.models.base import Base


class Goal(Base):
    __tablename__ = "goals"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), nullable=False, index=True)
    goal_name = Column(String(255), nullable=False)
    target_value = Column(Float, nullable=False)
    current_value = Column(Float, nullable=False, default=0.0)
    status = Column(String(50), nullable=False, default="active")

    user = relationship("User", back_populates="goals")
