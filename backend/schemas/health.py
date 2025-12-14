"""
Health schemas - Request/Response models for health tracking
"""
from pydantic import BaseModel
from uuid import UUID
from datetime import date, datetime
from typing import Optional


class CreateHealthEntryRequest(BaseModel):
    """Create health entry request"""
    date: date
    water: int = 0
    steps: int = 0
    calories: Optional[int] = None
    meals: list[str] = []
    meal_types: list[str] = []
    cycle: Optional[str] = None
    period_day: Optional[int] = None
    bath: bool = False
    face_wash: bool = False
    notes: Optional[str] = None
    
    class Config:
        json_schema_extra = {
            "example": {
                "date": "2024-01-15",
                "water": 6,
                "steps": 8420,
                "calories": 1800,
                "meals": ["Morning grains", "Noon feast"],
                "meal_types": ["healthy", "healthy"],
                "cycle": "waxing",
                "period_day": None,
                "bath": True,
                "face_wash": True,
                "notes": "Felt energetic"
            }
        }


class UpdateHealthEntryRequest(BaseModel):
    """Update health entry request"""
    water: Optional[int] = None
    steps: Optional[int] = None
    calories: Optional[int] = None
    meals: Optional[list[str]] = None
    meal_types: Optional[list[str]] = None
    cycle: Optional[str] = None
    period_day: Optional[int] = None
    bath: Optional[bool] = None
    face_wash: Optional[bool] = None
    notes: Optional[str] = None


class HealthEntryResponse(BaseModel):
    """Health entry response"""
    id: UUID
    user_id: UUID
    date: date
    water: int
    steps: int
    calories: Optional[int]
    meals: list[str]
    meal_types: list[str]
    cycle: Optional[str]
    period_day: Optional[int]
    bath: bool
    face_wash: bool
    notes: Optional[str]
    created_at: datetime
    updated_at: datetime


class HealthStatsResponse(BaseModel):
    """Health statistics response"""
    period: str  # weekly, monthly
    avg_water: float
    avg_steps: float
    avg_calories: Optional[float]
    total_days: int
    streak: int  # consecutive days with entries
