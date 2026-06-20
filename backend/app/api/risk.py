from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession

from app.api.auth import get_current_user
from app.database import get_db
from app.models.user import User
from app.schemas.risk_setting import RiskSettingCreate, RiskSettingRead
from app.services.risk_setting import RiskSettingService

router = APIRouter()
risk_service = RiskSettingService()


@router.post("/", response_model=RiskSettingRead)
async def create_or_update_risk_setting(
    risk_setting: RiskSettingCreate,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    """Create or update risk settings for the current user."""
    risk_setting.user_id = current_user.id
    return await risk_service.create_or_update_risk_setting(db, risk_setting)


@router.get("/", response_model=RiskSettingRead)
async def get_risk_setting(
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    """Get risk settings for the current user."""
    risk_setting = await risk_service.get_risk_setting(db, current_user.id)
    if not risk_setting:
        raise HTTPException(status_code=404, detail="Risk settings not found")
    return risk_setting
