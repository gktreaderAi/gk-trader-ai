from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy.ext.asyncio import AsyncSession

from app.api.auth import get_current_user
from app.database.session import get_db
from app.schemas.lesson import LessonRead, LessonCreate
from app.schemas.lesson_progress import LessonProgressRead, LessonProgressCreate
from app.schemas.quiz import QuizResponse
from app.services.lesson import LessonService

router = APIRouter()
lesson_service = LessonService()


def _build_quiz_for_category(lesson_id: int, category: str) -> QuizResponse:
    question_map = {
        "candlestick": [
            {
                "question": "Which candlestick pattern often signals a bullish reversal?",
                "options": [
                    "Bearish Engulfing",
                    "Hammer",
                    "Shooting Star",
                    "Doji",
                ],
                "answer": "Hammer",
            },
            {
                "question": "A bullish engulfing candle requires:",
                "options": [
                    "A small green candle followed by a larger red candle",
                    "A large green candle that engulfs the prior red candle",
                    "Two candles with identical bodies",
                    "A gap down after a strong trend",
                ],
                "answer": "A large green candle that engulfs the prior red candle",
            },
        ],
        "support_resistance": [
            {
                "question": "Support is best described as:",
                "options": [
                    "A price level where selling pressure increases",
                    "A price level where buying pressure increases",
                    "A moving average crossover",
                    "A volume spike on the close",
                ],
                "answer": "A price level where buying pressure increases",
            },
            {
                "question": "A resistance level is most likely to break when:",
                "options": [
                    "Volume is decreasing",
                    "Price forms lower highs",
                    "Buyers push price through the level with strong volume",
                    "The market is in a tight range",
                ],
                "answer": "Buyers push price through the level with strong volume",
            },
        ],
        "trend": [
            {
                "question": "Which sequence defines an uptrend?",
                "options": [
                    "Lower highs and lower lows",
                    "Higher highs and higher lows",
                    "Equal highs and lower lows",
                    "Higher highs and lower lows",
                ],
                "answer": "Higher highs and higher lows",
            },
            {
                "question": "A trend reversal is confirmed when:",
                "options": [
                    "Price continues along the same slope",
                    "Price forms a higher high after a pullback",
                    "Price breaks the prior swing low in an uptrend",
                    "Volume dries up during consolidation",
                ],
                "answer": "Price breaks the prior swing low in an uptrend",
            },
        ],
        "liquidity": [
            {
                "question": "Liquidity in a market means:",
                "options": [
                    "Orders can be executed easily without large price movement",
                    "Price gaps occur frequently",
                    "There is no trading volume",
                    "The spread is always wide",
                ],
                "answer": "Orders can be executed easily without large price movement",
            },
            {
                "question": "A sign of strong liquidity is:",
                "options": [
                    "Low volume and wide spreads",
                    "High volume and narrow spreads",
                    "A single large candle",
                    "A long period of consolidation",
                ],
                "answer": "High volume and narrow spreads",
            },
        ],
        "risk_management": [
            {
                "question": "A recommended maximum risk per trade is usually around:",
                "options": [
                    "10-15% of capital",
                    "5-10% of capital",
                    "1-3% of capital",
                    "20-25% of capital",
                ],
                "answer": "1-3% of capital",
            },
            {
                "question": "Reward-to-risk ratio should generally be:",
                "options": [
                    "Less than 1:1",
                    "Equal to 1:1",
                    "Greater than 1:1",
                    "Irrelevant to trade planning",
                ],
                "answer": "Greater than 1:1",
            },
        ],
    }
    questions_data = question_map.get(category, question_map["trend"])
    return QuizResponse(lesson_id=lesson_id, questions=questions_data)


@router.get("/lessons", response_model=list[LessonRead])
async def list_lessons(
    category: str | None = Query(None, description="Filter lessons by category"),
    db: AsyncSession = Depends(get_db),
) -> list[LessonRead]:
    return await lesson_service.list_lessons(db, category)


@router.get("/lessons/{lesson_id}", response_model=LessonRead)
async def get_lesson(lesson_id: int, db: AsyncSession = Depends(get_db)) -> LessonRead:
    lesson = await lesson_service.get_lesson(db, lesson_id)
    if not lesson:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Lesson not found")
    return lesson


@router.get("/daily", response_model=LessonRead)
async def daily_lesson(db: AsyncSession = Depends(get_db)) -> LessonRead:
    lesson = await lesson_service.get_daily_lesson(db)
    if not lesson:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="No lessons available")
    return lesson


@router.get("/quiz", response_model=QuizResponse)
async def quiz_for_lesson(lesson_id: int = Query(...), db: AsyncSession = Depends(get_db)) -> QuizResponse:
    lesson = await lesson_service.get_lesson(db, lesson_id)
    if not lesson:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Lesson not found")
    return _build_quiz_for_category(lesson.id, lesson.category)


@router.get("/progress", response_model=list[LessonProgressRead])
async def lesson_progress(
    current_user=Depends(get_current_user), db: AsyncSession = Depends(get_db)
) -> list[LessonProgressRead]:
    return await lesson_service.get_progress_by_user(db, current_user.id)


@router.post("/progress", response_model=LessonProgressRead)
async def update_lesson_progress(
    progress_in: LessonProgressCreate,
    current_user=Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
) -> LessonProgressRead:
    if progress_in.user_id != current_user.id:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Cannot update progress for another user")
    lesson = await lesson_service.get_lesson(db, progress_in.lesson_id)
    if not lesson:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Lesson not found")
    return await lesson_service.create_or_update_progress(db, progress_in)
