"""
Reminders models - Database templates
"""
from pydantic import BaseModel
from uuid import UUID
from datetime import datetime
from typing import Optional


class Reminder(BaseModel):
    """
    Reminder entity
    TODO: Connect to PostgreSQL reminders table
    """
    id: UUID
    user_id: UUID
    title: str
    description: Optional[str] = None
    due_date: datetime
    completed: bool = False
    completed_at: Optional[datetime] = None
    priority: str = "medium"  # low, medium, high
    category: Optional[str] = None  # personal, work, college, health
    created_at: datetime
    updated_at: datetime
    
    class Config:
        json_schema_extra = {
            "example": {
                "id": "123e4567-e89b-12d3-a456-426614174016",
                "user_id": "123e4567-e89b-12d3-a456-426614174000",
                "title": "Submit assignment",
                "description": "Data Structures Assignment 3",
                "due_date": "2024-01-20T23:59:00",
                "completed": False,
                "completed_at": None,
                "priority": "high",
                "category": "college",
                "created_at": "2024-01-10T10:00:00",
                "updated_at": "2024-01-10T10:00:00"
            }
        }
