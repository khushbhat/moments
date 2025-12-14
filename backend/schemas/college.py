"""
College schemas - Request/Response models for college tasks
"""
from pydantic import BaseModel
from uuid import UUID
from datetime import datetime
from typing import Optional


class CreateCollegeTaskRequest(BaseModel):
    """Create college task request"""
    title: str
    description: Optional[str] = None
    type: str  # assignment, project, homework, writing
    status: str = "pending"
    due_date: Optional[datetime] = None
    priority: Optional[str] = None
    subject: Optional[str] = None
    tags: list[str] = []
    
    class Config:
        json_schema_extra = {
            "example": {
                "title": "Complete Data Structures Assignment 3",
                "description": "Implement BST operations",
                "type": "assignment",
                "status": "ongoing",
                "due_date": "2024-01-20T23:59:00",
                "priority": "high",
                "subject": "Data Structures",
                "tags": ["DSA", "Programming"]
            }
        }


class UpdateCollegeTaskRequest(BaseModel):
    """Update college task request"""
    title: Optional[str] = None
    description: Optional[str] = None
    type: Optional[str] = None
    status: Optional[str] = None
    due_date: Optional[datetime] = None
    priority: Optional[str] = None
    subject: Optional[str] = None
    tags: Optional[list[str]] = None


class CollegeTaskResponse(BaseModel):
    """College task response"""
    id: UUID
    user_id: UUID
    title: str
    description: Optional[str]
    type: str
    status: str
    due_date: Optional[datetime]
    priority: Optional[str]
    subject: Optional[str]
    tags: list[str]
    created_at: datetime
    updated_at: datetime
