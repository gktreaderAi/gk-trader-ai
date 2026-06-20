from app.database.session import engine
from app.models import base  # noqa: F401
from app.models import User, Lesson, LessonProgress, TradeJournal  # noqa: F401


def init_db() -> None:
    import asyncio

    async def _init() -> None:
        async with engine.begin() as conn:
            await conn.run_sync(base.Base.metadata.create_all)

    asyncio.run(_init())
