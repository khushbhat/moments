"""
Journal router - Journaling endpoints
"""
from fastapi import APIRouter, Depends, Query
from datetime import datetime
from typing import Optional
from uuid import UUID
import math

from schemas.journal import (
    CreateJournalEntryRequest,
    UpdateJournalEntryRequest,
    JournalEntryResponse
)
from services.journal_service import journal_service
from core.auth import get_current_user, CurrentUser
from core.responses import Response, PaginatedResponse

router = APIRouter()


@router.post("/entries", response_model=Response[JournalEntryResponse])
async def create_journal_entry(
    request: CreateJournalEntryRequest,
    current_user: CurrentUser = Depends(get_current_user)
):
    """Create a new journal entry"""
    entry = await journal_service.create_entry(current_user.user_id, request)
    return Response(
        success=True,
        message="Journal entry created successfully",
        data=entry
    )


@router.get("/entries", response_model=PaginatedResponse[JournalEntryResponse])
async def get_journal_entries(
    start_date: Optional[datetime] = Query(None, description="Filter entries from this date"),
    end_date: Optional[datetime] = Query(None, description="Filter entries until this date"),
    page: int = Query(1, ge=1, description="Page number"),
    limit: int = Query(10, ge=1, le=50, description="Items per page"),
    current_user: CurrentUser = Depends(get_current_user)
):
    """Get journal entries with pagination"""
    entries, total = await journal_service.get_entries(
        user_id=current_user.user_id,
        start_date=start_date,
        end_date=end_date,
        page=page,
        limit=limit
    )
    
    return PaginatedResponse(
        success=True,
        message="Journal entries retrieved successfully",
        data=entries,
        page=page,
        limit=limit,
        total=total,
        total_pages=math.ceil(total / limit)
    )


@router.get("/entries/{entry_id}", response_model=Response[JournalEntryResponse])
async def get_journal_entry(
    entry_id: UUID,
    current_user: CurrentUser = Depends(get_current_user)
):
    """Get journal entry by ID"""
    entry = await journal_service.get_entry_by_id(current_user.user_id, entry_id)
    return Response(
        success=True,
        message="Journal entry retrieved successfully",
        data=entry
    )


@router.put("/entries/{entry_id}", response_model=Response[JournalEntryResponse])
async def update_journal_entry(
    entry_id: UUID,
    request: UpdateJournalEntryRequest,
    current_user: CurrentUser = Depends(get_current_user)
):
    """Update journal entry"""
    entry = await journal_service.update_entry(current_user.user_id, entry_id, request)
    return Response(
        success=True,
        message="Journal entry updated successfully",
        data=entry
    )


@router.delete("/entries/{entry_id}", response_model=Response[dict])
async def delete_journal_entry(
    entry_id: UUID,
    current_user: CurrentUser = Depends(get_current_user)
):
    """Delete journal entry"""
    await journal_service.delete_entry(current_user.user_id, entry_id)
    return Response(
        success=True,
        message="Journal entry deleted successfully",
        data={}
    )
