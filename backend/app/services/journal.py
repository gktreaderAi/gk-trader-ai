from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.models.journal import Journal
from app.schemas.journal import JournalCreate


class JournalService:
    async def create_journal(self, db: AsyncSession, journal_in: JournalCreate) -> Journal:
        journal_entry = Journal(**journal_in.model_dump())
        db.add(journal_entry)
        await db.commit()
        await db.refresh(journal_entry)
        return journal_entry

    async def get_journal(self, db: AsyncSession, journal_id: int) -> Journal | None:
        result = await db.execute(select(Journal).where(Journal.id == journal_id))
        return result.scalar_one_or_none()

    async def list_journal(self, db: AsyncSession, user_id: int) -> list[Journal]:
        result = await db.execute(select(Journal).where(Journal.user_id == user_id))
        return result.scalars().all()

    async def delete_journal(self, db: AsyncSession, journal_id: int) -> None:
        journal_entry = await self.get_journal(db, journal_id)
        if journal_entry:
            await db.delete(journal_entry)
            await db.commit()
