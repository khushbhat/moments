"""
Health models - Database templates
"""
from pydantic import BaseModel
from uuid import UUID
from datetime import date, datetime
from typing import Optional


class HealthEntry(BaseModel):
    """
    Health daily entry entity
    TODO: Connect to PostgreSQL health_entries table
    """
    id: UUID
    user_id: UUID
    date: date
    water: int = 0  # glasses of water
    steps: int = 0
    calories: Optional[int] = None
    meals: list[str] = []  # List of meal descriptions
    meal_types: list[str] = []  # healthy/unhealthy for each meal
    cycle: Optional[str] = None  # Moon phase: new, waxing, full, waning
    period_day: Optional[int] = None  # Day of period cycle (1-28)
    bath: bool = False
    face_wash: bool = False
    notes: Optional[str] = None
    created_at: datetime
    updated_at: datetime
    
    class Config:
        json_schema_extra = {
            "example": {
                "id": "123e4567-e89b-12d3-a456-426614174002",
                "user_id": "123e4567-e89b-12d3-a456-426614174000",
                "date": "2024-01-15",
                "water": 6,
                "steps": 8420,
                "calories": 1800,
                "meals": ["Morning grains", "Noon feast", "Evening herbs"],
                "meal_types": ["healthy", "healthy", "healthy"],
                "cycle": "waxing",
                "period_day": None,
                "bath": True,
                "face_wash": True,
                "notes": "Felt energetic today",
                "created_at": "2024-01-15T20:00:00",
                "updated_at": "2024-01-15T20:00:00"
            }
        }
