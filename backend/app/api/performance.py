from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession

from app.api.auth import get_current_user
from app.database import get_db
from app.models.user import User
from app.schemas.performance import PerformanceCreate, PerformanceRead
from app.services.performance import PerformanceService

router = APIRouter()
performance_service = PerformanceService()


@router.post("/", response_model=PerformanceRead)
async def create_or_update_performance(
    performance: PerformanceCreate,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    """Create or update performance metrics."""
    performance.user_id = current_user.id
    return await performance_service.create_or_update_performance(db, performance)


@router.get("/", response_model=PerformanceRead)
async def get_performance(
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    """Get performance metrics for the current user."""
    performance = await performance_service.get_performance(db, current_user.id)
    if not performance:
        raise HTTPException(status_code=404, detail="Performance data not found")
    return performance
