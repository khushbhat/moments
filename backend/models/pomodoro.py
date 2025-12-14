"""
Pomodoro models - Database templates
"""
from pydantic import BaseModel
from uuid import UUID
from datetime import datetime
from typing import Optional


class PomodoroSession(BaseModel):
    """
    Pomodoro session entity
    TODO: Connect to PostgreSQL pomodoro_sessions table
    """
    id: UUID
    user_id: UUID
    task_id: Optional[UUID] = None  # Linked to calendar event or task
    task_title: Optional[str] = None  # If not linked to existing task
    duration: int  # minutes
    breaks: int  # number of breaks taken
    start_time: datetime
    end_time: datetime
    completed: bool = True
    notes: Optional[str] = None
    created_at: datetime
    updated_at: datetime
    
    class Config:
        json_schema_extra = {
            "example": {
                "id": "123e4567-e89b-12d3-a456-426614174015",
                "user_id": "123e4567-e89b-12d3-a456-426614174000",
                "task_id": None,
                "task_title": "Study Data Structures",
                "duration": 25,
                "breaks": 1,
                "start_time": "2024-01-15T14:00:00",
                "end_time": "2024-01-15T14:25:00",
                "completed": True,
                "notes": "Completed Arrays chapter",
                "created_at": "2024-01-15T14:25:00",
                "updated_at": "2024-01-15T14:25:00"
            }
        }
