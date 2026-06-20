from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy.ext.asyncio import AsyncSession

from app.api.auth import get_current_user
from app.database.session import get_db
from app.schemas.trade_journal import TradeJournalRead, TradeJournalCreate, TradeJournalUpdate, TradeAnalytics
from app.services.trade_journal import TradeJournalService

router = APIRouter()
service = TradeJournalService()


@router.post("/trades", response_model=TradeJournalRead)
async def create_trade(
    trade_in: TradeJournalCreate,
    current_user=Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
) -> TradeJournalRead:
    trade_in.user_id = current_user.id
    return await service.create_trade(db, trade_in)


@router.get("/trades", response_model=list[TradeJournalRead])
async def list_trades(
    limit: int = Query(100, ge=1, le=1000),
    offset: int = Query(0, ge=0),
    current_user=Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
) -> list[TradeJournalRead]:
    return await service.list_trades(db, current_user.id, limit, offset)


@router.get("/trades/{trade_id}", response_model=TradeJournalRead)
async def get_trade(
    trade_id: int,
    current_user=Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
) -> TradeJournalRead:
    trade = await service.get_trade(db, trade_id, current_user.id)
    if not trade:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Trade not found")
    return trade


@router.patch("/trades/{trade_id}", response_model=TradeJournalRead)
async def update_trade(
    trade_id: int,
    updates: TradeJournalUpdate,
    current_user=Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
) -> TradeJournalRead:
    trade = await service.update_trade(db, trade_id, current_user.id, updates)
    if not trade:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Trade not found")
    return trade


@router.delete("/trades/{trade_id}")
async def delete_trade(
    trade_id: int,
    current_user=Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
) -> dict:
    success = await service.delete_trade(db, trade_id, current_user.id)
    if not success:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Trade not found")
    return {"message": "Trade deleted successfully"}


@router.get("/analytics", response_model=TradeAnalytics)
async def get_analytics(
    current_user=Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
) -> TradeAnalytics:
    return await service.get_analytics(db, current_user.id)
