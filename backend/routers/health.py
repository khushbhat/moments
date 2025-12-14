"""
Health router - Health tracking endpoints
"""
from fastapi import APIRouter, Depends, Query
from datetime import date
from typing import Optional
from uuid import UUID

from schemas.health import (
    CreateHealthEntryRequest,
    UpdateHealthEntryRequest,
    HealthEntryResponse,
    HealthStatsResponse
)
from services.health_service import health_service
from core.auth import get_current_user, CurrentUser
from core.responses import Response, PaginatedResponse
import math

router = APIRouter()


@router.post("/entries", response_model=Response[HealthEntryResponse])
async def create_health_entry(
    request: CreateHealthEntryRequest,
    current_user: CurrentUser = Depends(get_current_user)
):
    """Create a new health entry"""
    entry = await health_service.create_entry(current_user.user_id, request)
    return Response(
        success=True,
        message="Health entry created successfully",
        data=entry
    )


@router.get("/entries", response_model=PaginatedResponse[HealthEntryResponse])
async def get_health_entries(
    date: Optional[date] = Query(None, description="Filter by specific date"),
    page: int = Query(1, ge=1, description="Page number"),
    limit: int = Query(10, ge=1, le=100, description="Items per page"),
    current_user: CurrentUser = Depends(get_current_user)
):
    """Get health entries with pagination"""
    entries, total = await health_service.get_entries(
        user_id=current_user.user_id,
        date=date,
        page=page,
        limit=limit
    )
    
    return PaginatedResponse(
        success=True,
        message="Health entries retrieved successfully",
        data=entries,
        page=page,
        limit=limit,
        total=total,
        total_pages=math.ceil(total / limit)
    )


@router.get("/entries/{entry_id}", response_model=Response[HealthEntryResponse])
async def get_health_entry(
    entry_id: UUID,
    current_user: CurrentUser = Depends(get_current_user)
):
    """Get health entry by ID"""
    entry = await health_service.get_entry_by_id(current_user.user_id, entry_id)
    return Response(
        success=True,
        message="Health entry retrieved successfully",
        data=entry
    )


@router.put("/entries/{entry_id}", response_model=Response[HealthEntryResponse])
async def update_health_entry(
    entry_id: UUID,
    request: UpdateHealthEntryRequest,
    current_user: CurrentUser = Depends(get_current_user)
):
    """Update health entry"""
    entry = await health_service.update_entry(current_user.user_id, entry_id, request)
    return Response(
        success=True,
        message="Health entry updated successfully",
        data=entry
    )


@router.delete("/entries/{entry_id}", response_model=Response[dict])
async def delete_health_entry(
    entry_id: UUID,
    current_user: CurrentUser = Depends(get_current_user)
):
    """Delete health entry"""
    await health_service.delete_entry(current_user.user_id, entry_id)
    return Response(
        success=True,
        message="Health entry deleted successfully",
        data={}
    )


@router.get("/stats", response_model=Response[HealthStatsResponse])
async def get_health_stats(
    start_date: date = Query(..., description="Start date for stats"),
    end_date: date = Query(..., description="End date for stats"),
    current_user: CurrentUser = Depends(get_current_user)
):
    """Get health statistics for a date range"""
    stats = await health_service.get_stats(current_user.user_id, start_date, end_date)
    return Response(
        success=True,
        message="Health statistics retrieved successfully",
        data=stats
    )
