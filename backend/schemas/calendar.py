"""
Calendar schemas - Request/Response models for calendar events
"""
from pydantic import BaseModel
from uuid import UUID
from datetime import datetime
from typing import Optional


class CreateEventRequest(BaseModel):
    """Create calendar event request"""
    title: str
    description: Optional[str] = None
    start_time: datetime
    end_time: datetime
    all_day: bool = False
    category: Optional[str] = None
    color: Optional[str] = None
    location: Optional[str] = None
    reminder_minutes: Optional[int] = None
    
    class Config:
        json_schema_extra = {
            "example": {
                "title": "Team Meeting",
                "description": "Discuss project progress",
                "start_time": "2024-01-15T14:00:00",
                "end_time": "2024-01-15T15:00:00",
                "all_day": False,
                "category": "work",
                "color": "#3b82f6",
                "location": "Conference Room A",
                "reminder_minutes": 15
            }
        }


class UpdateEventRequest(BaseModel):
    """Update calendar event request"""
    title: Optional[str] = None
    description: Optional[str] = None
    start_time: Optional[datetime] = None
    end_time: Optional[datetime] = None
    all_day: Optional[bool] = None
    category: Optional[str] = None
    color: Optional[str] = None
    location: Optional[str] = None
    reminder_minutes: Optional[int] = None


class EventResponse(BaseModel):
    """Calendar event response"""
    id: UUID
    user_id: UUID
    title: str
    description: Optional[str]
    start_time: datetime
    end_time: datetime
    all_day: bool
    category: Optional[str]
    color: Optional[str]
    location: Optional[str]
    reminder_minutes: Optional[int]
    created_at: datetime
    updated_at: datetime
