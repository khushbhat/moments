"""
Maps models - Database templates
"""
from pydantic import BaseModel
from uuid import UUID
from datetime import datetime
from typing import Optional


class Place(BaseModel):
    """
    Place/Location entity
    TODO: Connect to MongoDB places collection (for flexible media storage)
    """
    id: UUID
    user_id: UUID
    name: str
    coordinates: dict  # {"lat": float, "lng": float}
    type: str  # visited, planned
    category: str  # scenery, restaurant, trip, landmark, etc.
    description: Optional[str] = None
    media: list[str] = []  # URLs to photos/videos
    visit_date: Optional[datetime] = None
    rating: Optional[int] = None  # 1-5 stars
    notes: Optional[str] = None
    created_at: datetime
    updated_at: datetime
    
    class Config:
        json_schema_extra = {
            "example": {
                "id": "123e4567-e89b-12d3-a456-426614174011",
                "user_id": "123e4567-e89b-12d3-a456-426614174000",
                "name": "Bali Temple",
                "coordinates": {"lat": -8.5069, "lng": 115.2625},
                "type": "visited",
                "category": "landmark",
                "description": "Ancient temple with stunning architecture",
                "media": ["/uploads/bali1.jpg", "/uploads/bali2.jpg"],
                "visit_date": "2024-06-15T14:00:00",
                "rating": 5,
                "notes": "Must visit during sunrise",
                "created_at": "2024-06-15T20:00:00",
                "updated_at": "2024-06-15T20:00:00"
            }
        }
