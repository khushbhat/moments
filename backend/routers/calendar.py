"""
Calendar router - Calendar events endpoints
"""
from fastapi import APIRouter, Depends, Query
from datetime import datetime
from typing import Optional
from uuid import UUID
import math

from schemas.calendar import CreateEventRequest, UpdateEventRequest, EventResponse
from services.calendar_service import calendar_service
from core.auth import get_current_user, CurrentUser
from core.responses import Response, PaginatedResponse

router = APIRouter()


@router.post("/events", response_model=Response[EventResponse])
async def create_event(
    request: CreateEventRequest,
    current_user: CurrentUser = Depends(get_current_user)
):
    """Create a new calendar event"""
    event = await calendar_service.create_event(current_user.user_id, request)
    return Response(
        success=True,
        message="Calendar event created successfully",
        data=event
    )


@router.get("/events", response_model=PaginatedResponse[EventResponse])
async def get_events(
    start_date: Optional[str] = Query(None, description="Filter events starting from this date (YYYY-MM-DD)"),
    end_date: Optional[str] = Query(None, description="Filter events until this date (YYYY-MM-DD)"),
    view: Optional[str] = Query(None, description="View type: month, day, hour"),
    page: int = Query(1, ge=1, description="Page number"),
    limit: int = Query(50, ge=1, le=100, description="Items per page"),
    current_user: CurrentUser = Depends(get_current_user)
):
    """Get calendar events with optional date filtering"""
    # Convert string dates to datetime if provided
    start_datetime = datetime.fromisoformat(start_date) if start_date else None
    end_datetime = datetime.fromisoformat(end_date) if end_date else None
    
    events, total = await calendar_service.get_events(
        user_id=current_user.user_id,
        start_date=start_datetime,
        end_date=end_datetime,
        page=page,
        limit=limit
    )
    
    return PaginatedResponse(
        success=True,
        message="Calendar events retrieved successfully",
        data=events,
        page=page,
        limit=limit,
        total=total,
        total_pages=math.ceil(total / limit)
    )


@router.get("/events/{event_id}", response_model=Response[EventResponse])
async def get_event(
    event_id: UUID,
    current_user: CurrentUser = Depends(get_current_user)
):
    """Get calendar event by ID"""
    event = await calendar_service.get_event_by_id(current_user.user_id, event_id)
    return Response(
        success=True,
        message="Calendar event retrieved successfully",
        data=event
    )


@router.put("/events/{event_id}", response_model=Response[EventResponse])
async def update_event(
    event_id: UUID,
    request: UpdateEventRequest,
    current_user: CurrentUser = Depends(get_current_user)
):
    """Update calendar event"""
    event = await calendar_service.update_event(current_user.user_id, event_id, request)
    return Response(
        success=True,
        message="Calendar event updated successfully",
        data=event
    )


@router.delete("/events/{event_id}", response_model=Response[dict])
async def delete_event(
    event_id: UUID,
    current_user: CurrentUser = Depends(get_current_user)
):
    """Delete calendar event"""
    await calendar_service.delete_event(current_user.user_id, event_id)
    return Response(
        success=True,
        message="Calendar event deleted successfully",
        data={}
    )
