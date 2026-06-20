from random import choice
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.models.lesson import Lesson
from app.models.lesson_progress import LessonProgress
from app.schemas.lesson import LessonCreate
from app.schemas.lesson_progress import LessonProgressCreate


DEFAULT_LESSONS = [
    {
        "title": "Candlestick Patterns",
        "category": "candlestick",
        "description": "Learn common candlestick setups and how they signal reversals or continuations.",
        "content": "Candlestick patterns such as bullish engulfing, hammer, and doji can help identify potential reversals when combined with support and resistance levels.",
    },
    {
        "title": "Support and Resistance",
        "category": "support_resistance",
        "description": "Understand how to identify high-probability support and resistance zones.",
        "content": "Support and resistance are areas where buyers or sellers historically step in. Use previous swing highs and lows plus volume clusters to confirm these levels.",
    },
    {
        "title": "Trends and Momentum",
        "category": "trend",
        "description": "Master trend identification and how to trade with the market flow.",
        "content": "A strong trend is defined by higher highs and higher lows in an uptrend, or lower lows and lower highs in a downtrend. Trade with momentum and avoid counter-trend setups.",
    },
    {
        "title": "Liquidity and Order Flow",
        "category": "liquidity",
        "description": "Learn why liquidity matters and how to find liquid entry and exit zones.",
        "content": "Liquidity is the ease of entering and exiting a position without moving the market too much. Focus on areas with volume spikes, price consolidation, and large bid/ask interest.",
    },
    {
        "title": "Risk Management Basics",
        "category": "risk_management",
        "description": "Control risk with position sizing, stop loss placement, and reward-to-risk discipline.",
        "content": "Never risk more than a small percentage of account equity on a single trade. Use stop loss orders, define the trade edge, and adjust size so that one loss does not derail your plan.",
    },
]


class LessonService:
    async def create_lesson(self, db: AsyncSession, lesson_in: LessonCreate) -> Lesson:
        lesson = Lesson(**lesson_in.model_dump())
        db.add(lesson)
        await db.commit()
        await db.refresh(lesson)
        return lesson

    async def get_lesson(self, db: AsyncSession, lesson_id: int) -> Lesson | None:
        result = await db.execute(select(Lesson).where(Lesson.id == lesson_id))
        return result.scalar_one_or_none()

    async def list_lessons(self, db: AsyncSession, category: str | None = None) -> list[Lesson]:
        query = select(Lesson)
        if category:
            query = query.where(Lesson.category == category)
        result = await db.execute(query)
        lessons = result.scalars().all()
        if not lessons:
            lessons = await self._seed_default_lessons(db)
        return lessons

    async def get_daily_lesson(self, db: AsyncSession) -> Lesson | None:
        result = await db.execute(select(Lesson))
        lessons = result.scalars().all()
        if not lessons:
            lessons = await self._seed_default_lessons(db)
        return choice(lessons) if lessons else None

    async def get_progress_by_user(self, db: AsyncSession, user_id: int) -> list[LessonProgress]:
        result = await db.execute(select(LessonProgress).where(LessonProgress.user_id == user_id))
        return result.scalars().all()

    async def create_or_update_progress(
        self, db: AsyncSession, progress_in: LessonProgressCreate
    ) -> LessonProgress:
        result = await db.execute(
            select(LessonProgress)
            .where(LessonProgress.user_id == progress_in.user_id)
            .where(LessonProgress.lesson_id == progress_in.lesson_id)
        )
        progress_entry = result.scalar_one_or_none()
        if progress_entry:
            progress_entry.progress = progress_in.progress
            progress_entry.completed = progress_in.completed
        else:
            progress_entry = LessonProgress(**progress_in.model_dump())
            db.add(progress_entry)
        await db.commit()
        await db.refresh(progress_entry)
        return progress_entry

    async def _seed_default_lessons(self, db: AsyncSession) -> list[Lesson]:
        lessons = [Lesson(**lesson_data) for lesson_data in DEFAULT_LESSONS]
        db.add_all(lessons)
        await db.commit()
        for lesson in lessons:
            await db.refresh(lesson)
        return lessons
