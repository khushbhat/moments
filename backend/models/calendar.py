"""
Calendar models - Database templates
"""
from pydantic import BaseModel
from uuid import UUID
from datetime import datetime
from typing import Optional


class CalendarEvent(BaseModel):
    """
    Calendar event entity
    TODO: Connect to PostgreSQL calendar_events table
    """
    id: UUID
    user_id: UUID
    title: str
    description: Optional[str] = None
    start_time: datetime
    end_time: datetime
    all_day: bool = False
    category: Optional[str] = None  # work, personal, college, health, etc.
    color: Optional[str] = None  # hex color code
    location: Optional[str] = None
    reminder_minutes: Optional[int] = None  # minutes before event
    created_at: datetime
    updated_at: datetime
    
    class Config:
        json_schema_extra = {
            "example": {
                "id": "123e4567-e89b-12d3-a456-426614174001",
                "user_id": "123e4567-e89b-12d3-a456-426614174000",
                "title": "Team Meeting",
                "description": "Discuss project progress",
                "start_time": "2024-01-15T14:00:00",
                "end_time": "2024-01-15T15:00:00",
                "all_day": False,
                "category": "work",
                "color": "#3b82f6",
                "location": "Conference Room A",
                "reminder_minutes": 15,
                "created_at": "2024-01-10T10:00:00",
                "updated_at": "2024-01-10T10:00:00"
            }
        }
