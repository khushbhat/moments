"""
Journal schemas - Request/Response models for journaling
"""
from pydantic import BaseModel
from uuid import UUID
from datetime import datetime
from typing import Optional


class CreateJournalEntryRequest(BaseModel):
    """Create journal entry request"""
    title: str
    content: str
    date: Optional[datetime] = None  # Defaults to now
    cover_image: Optional[str] = None
    images: list[str] = []
    mood: Optional[str] = None
    tags: list[str] = []
    is_private: bool = True
    
    class Config:
        json_schema_extra = {
            "example": {
                "title": "Journey to the Temple",
                "content": "Today I walked through ancient corridors...",
                "date": "2024-01-15T20:00:00",
                "cover_image": "/uploads/temple.jpg",
                "images": ["/uploads/temple.jpg"],
                "mood": "peaceful",
                "tags": ["travel", "meditation"],
                "is_private": True
            }
        }


class UpdateJournalEntryRequest(BaseModel):
    """Update journal entry request"""
    title: Optional[str] = None
    content: Optional[str] = None
    cover_image: Optional[str] = None
    images: Optional[list[str]] = None
    mood: Optional[str] = None
    tags: Optional[list[str]] = None
    is_private: Optional[bool] = None


class JournalEntryResponse(BaseModel):
    """Journal entry response"""
    id: UUID
    user_id: UUID
    title: str
    content: str
    date: datetime
    cover_image: Optional[str]
    images: list[str]
    mood: Optional[str]
    tags: list[str]
    is_private: bool
    created_at: datetime
    updated_at: datetime
