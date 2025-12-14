"""
College models - Database templates
"""
from pydantic import BaseModel
from uuid import UUID
from datetime import datetime
from typing import Optional


class CollegeTask(BaseModel):
    """
    College task/assignment entity
    TODO: Connect to PostgreSQL college_tasks table
    """
    id: UUID
    user_id: UUID
    title: str
    description: Optional[str] = None
    type: str  # assignment, project, homework, writing
    status: str  # ongoing, completed, pending, overdue
    due_date: Optional[datetime] = None
    priority: Optional[str] = None  # low, medium, high
    subject: Optional[str] = None
    tags: list[str] = []
    created_at: datetime
    updated_at: datetime
    
    class Config:
        json_schema_extra = {
            "example": {
                "id": "123e4567-e89b-12d3-a456-426614174003",
                "user_id": "123e4567-e89b-12d3-a456-426614174000",
                "title": "Complete Data Structures Assignment 3",
                "description": "Implement Binary Search Tree operations",
                "type": "assignment",
                "status": "ongoing",
                "due_date": "2024-01-20T23:59:00",
                "priority": "high",
                "subject": "Data Structures",
                "tags": ["DSA", "Programming"],
                "created_at": "2024-01-10T10:00:00",
                "updated_at": "2024-01-15T14:30:00"
            }
        }
