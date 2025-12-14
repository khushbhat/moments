"""
Journal models - Database templates
"""
from pydantic import BaseModel
from uuid import UUID
from datetime import datetime
from typing import Optional


class JournalEntry(BaseModel):
    """
    Journal entry entity
    TODO: Connect to MongoDB journal_entries collection (for rich text + media)
    """
    id: UUID
    user_id: UUID
    title: str
    content: str  # Rich text content (HTML or Markdown)
    date: datetime
    cover_image: Optional[str] = None  # URL to cover image
    images: list[str] = []  # Additional images
    mood: Optional[str] = None  # happy, sad, neutral, etc.
    tags: list[str] = []
    is_private: bool = True
    created_at: datetime
    updated_at: datetime
    
    class Config:
        json_schema_extra = {
            "example": {
                "id": "123e4567-e89b-12d3-a456-426614174012",
                "user_id": "123e4567-e89b-12d3-a456-426614174000",
                "title": "Journey to the Temple",
                "content": "Today I walked through ancient corridors...",
                "date": "2024-01-15T20:00:00",
                "cover_image": "/uploads/temple.jpg",
                "images": ["/uploads/temple.jpg", "/uploads/statue.jpg"],
                "mood": "peaceful",
                "tags": ["travel", "meditation"],
                "is_private": True,
                "created_at": "2024-01-15T20:00:00",
                "updated_at": "2024-01-15T20:00:00"
            }
        }
