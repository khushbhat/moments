"""
Auth schemas - Request/Response models for authentication
"""
from pydantic import BaseModel, EmailStr
from uuid import UUID
from datetime import datetime
from typing import Optional


class SignUpRequest(BaseModel):
    """Sign up request"""
    email: EmailStr
    password: str
    name: Optional[str] = None
    
    class Config:
        json_schema_extra = {
            "example": {
                "email": "user@example.com",
                "password": "SecurePassword123!",
                "name": "John Doe"
            }
        }


class LoginRequest(BaseModel):
    """Login request"""
    email: EmailStr
    password: str
    
    class Config:
        json_schema_extra = {
            "example": {
                "email": "user@example.com",
                "password": "SecurePassword123!"
            }
        }


class UserResponse(BaseModel):
    """User response"""
    id: UUID
    email: EmailStr
    name: Optional[str] = None
    profile_pic: Optional[str] = None
    role: str = "user"
    created_at: datetime
    last_login: datetime
    
    class Config:
        json_schema_extra = {
            "example": {
                "id": "123e4567-e89b-12d3-a456-426614174000",
                "email": "user@example.com",
                "name": "John Doe",
                "profile_pic": None,
                "role": "user",
                "created_at": "2024-01-01T00:00:00",
                "last_login": "2024-01-15T10:30:00"
            }
        }


class TokenResponse(BaseModel):
    """JWT token response"""
    access_token: str
    token_type: str = "bearer"
    expires_in: int  # seconds
    user: UserResponse
    
    class Config:
        json_schema_extra = {
            "example": {
                "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
                "token_type": "bearer",
                "expires_in": 604800,
                "user": {
                    "id": "123e4567-e89b-12d3-a456-426614174000",
                    "email": "user@example.com",
                    "name": "John Doe",
                    "profile_pic": None
                }
            }
        }
