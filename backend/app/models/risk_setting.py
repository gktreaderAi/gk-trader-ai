from sqlalchemy import Column, Float, ForeignKey, Integer, func
from sqlalchemy.orm import relationship

from app.models.base import Base


class RiskSetting(Base):
    __tablename__ = "risk_settings"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), nullable=False, unique=True, index=True)
    daily_risk = Column(Float, nullable=False, default=0.0)
    weekly_risk = Column(Float, nullable=False, default=0.0)
    max_drawdown = Column(Float, nullable=False, default=0.0)

    user = relationship("User", back_populates="risk_settings")
