from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.models.alert import Alert
from app.schemas.alert import AlertCreate


class AlertService:
    async def create_alert(self, db: AsyncSession, alert_in: AlertCreate) -> Alert:
        alert = Alert(**alert_in.model_dump())
        db.add(alert)
        await db.commit()
        await db.refresh(alert)
        return alert

    async def list_alerts(self, db: AsyncSession, user_id: int) -> list[Alert]:
        result = await db.execute(select(Alert).where(Alert.user_id == user_id))
        return result.scalars().all()

    async def get_alert(self, db: AsyncSession, alert_id: int) -> Alert | None:
        result = await db.execute(select(Alert).where(Alert.id == alert_id))
        return result.scalar_one_or_none()
