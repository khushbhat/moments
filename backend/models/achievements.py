"""
Achievements models - Database templates
"""
from pydantic import BaseModel
from uuid import UUID
from datetime import date, datetime
from typing import Optional


class Achievement(BaseModel):
    """
    Achievement entity
    TODO: Connect to PostgreSQL achievements table
    """
    id: UUID
    user_id: UUID
    title: str
    description: str
    date_earned: date
    type: str  # events, certifications, academics
    icon_url: Optional[str] = None
    metadata: dict = {}  # Additional data (certificate URL, event details, etc.)
    created_at: datetime
    updated_at: datetime
    
    class Config:
        json_schema_extra = {
            "example": {
                "id": "123e4567-e89b-12d3-a456-426614174010",
                "user_id": "123e4567-e89b-12d3-a456-426614174000",
                "title": "Won Hackathon",
                "description": "First place in regional hackathon",
                "date_earned": "2024-03-15",
                "type": "events",
                "icon_url": "/uploads/trophy.png",
                "metadata": {
                    "event_name": "TechFest 2024",
                    "prize": "$1000"
                },
                "created_at": "2024-03-15T18:00:00",
                "updated_at": "2024-03-15T18:00:00"
            }
        }
