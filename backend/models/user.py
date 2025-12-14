"""
User model - Database template
"""
from pydantic import BaseModel, EmailStr
from uuid import UUID
from datetime import datetime
from typing import Optional


class User(BaseModel):
    """
    User entity
    TODO: Connect to PostgreSQL users table
    """
    id: UUID
    email: EmailStr
    name: Optional[str] = None
    profile_pic: Optional[str] = None  # URL to profile picture
    role: str = "user"  # user, admin
    created_at: datetime
    last_login: datetime
    updated_at: datetime
    
    class Config:
        json_schema_extra = {
            "example": {
                "id": "123e4567-e89b-12d3-a456-426614174000",
                "email": "user@example.com",
                "name": "John Doe",
                "profile_pic": None,
                "role": "user",
                "created_at": "2024-01-01T00:00:00",
                "last_login": "2024-01-15T10:30:00",
                "updated_at": "2024-01-15T10:30:00"
            }
        }
