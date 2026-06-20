from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.models.risk_setting import RiskSetting
from app.schemas.risk_setting import RiskSettingCreate


class RiskSettingService:
    async def create_or_update_risk_setting(
        self, db: AsyncSession, setting_in: RiskSettingCreate
    ) -> RiskSetting:
        result = await db.execute(select(RiskSetting).where(RiskSetting.user_id == setting_in.user_id))
        setting = result.scalar_one_or_none()
        if setting:
            setting.daily_risk = setting_in.daily_risk
            setting.weekly_risk = setting_in.weekly_risk
            setting.max_drawdown = setting_in.max_drawdown
        else:
            setting = RiskSetting(**setting_in.model_dump())
            db.add(setting)
        await db.commit()
        await db.refresh(setting)
        return setting

    async def get_risk_setting(self, db: AsyncSession, user_id: int) -> RiskSetting | None:
        result = await db.execute(select(RiskSetting).where(RiskSetting.user_id == user_id))
        return result.scalar_one_or_none()
