"""
Expenses models - Database templates
"""
from pydantic import BaseModel
from uuid import UUID
from datetime import date, datetime
from typing import Optional


class Expense(BaseModel):
    """
    Expense entry entity
    TODO: Connect to PostgreSQL expenses table
    """
    id: UUID
    user_id: UUID
    amount: float
    category: str  # food, transport, entertainment, education, health, etc.
    date: date
    description: str
    payment_method: Optional[str] = None  # cash, card, upi, etc.
    tags: list[str] = []
    created_at: datetime
    updated_at: datetime
    
    class Config:
        json_schema_extra = {
            "example": {
                "id": "123e4567-e89b-12d3-a456-426614174013",
                "user_id": "123e4567-e89b-12d3-a456-426614174000",
                "amount": 250.50,
                "category": "food",
                "date": "2024-01-15",
                "description": "Lunch at cafe",
                "payment_method": "card",
                "tags": ["dining", "lunch"],
                "created_at": "2024-01-15T14:00:00",
                "updated_at": "2024-01-15T14:00:00"
            }
        }


class Budget(BaseModel):
    """
    Monthly budget entity
    TODO: Connect to PostgreSQL budgets table
    """
    id: UUID
    user_id: UUID
    month: date  # First day of the month
    total_budget: float
    category_budgets: dict = {}  # {"food": 5000, "transport": 2000, ...}
    created_at: datetime
    updated_at: datetime
    
    class Config:
        json_schema_extra = {
            "example": {
                "id": "123e4567-e89b-12d3-a456-426614174014",
                "user_id": "123e4567-e89b-12d3-a456-426614174000",
                "month": "2024-01-01",
                "total_budget": 15000.00,
                "category_budgets": {
                    "food": 5000,
                    "transport": 2000,
                    "entertainment": 3000,
                    "education": 5000
                },
                "created_at": "2024-01-01T00:00:00",
                "updated_at": "2024-01-01T00:00:00"
            }
        }
