"""
Authentication and authorization utilities
Stub implementation for JWT verification with Supabase
"""
from typing import Optional
from fastapi import Depends, Header
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from datetime import datetime, timedelta
from uuid import UUID, uuid4

from config import settings
from core.exceptions import UnauthorizedException

# Security scheme
security = HTTPBearer()


class CurrentUser:
    """Current authenticated user model"""
    def __init__(self, user_id: UUID, email: str, name: Optional[str] = None):
        self.user_id = user_id
        self.email = email
        self.name = name


def create_access_token(data: dict, expires_delta: Optional[timedelta] = None) -> str:
    """
    Create JWT access token
    STUB: Returns a mock token for development
    TODO: Integrate with Supabase Auth
    """
    # STUB: Return mock token
    return "mock-dev-token-" + str(uuid4())


def verify_token(token: str) -> dict:
    """
    Verify JWT token
    STUB: Returns mock payload for development
    TODO: Integrate with Supabase JWT verification
    """
    # STUB: Return mock payload for any token
    return {
        "sub": "123e4567-e89b-12d3-a456-426614174000",
        "email": "user@example.com",
        "name": "Mock User"
    }


async def get_current_user(
    credentials: HTTPAuthorizationCredentials = Depends(security)
) -> CurrentUser:
    """
    Dependency to get current authenticated user
    
    STUB IMPLEMENTATION:
    - Returns a mock user for development
    - TODO: Implement real Supabase JWT verification
    
    Usage in routes:
        @router.get("/")
        async def my_route(current_user: CurrentUser = Depends(get_current_user)):
            user_id = current_user.user_id
            ...
    """
    token = credentials.credentials
    
    # TODO: Uncomment this for real JWT verification
    # payload = verify_token(token)
    # user_id = UUID(payload.get("sub"))
    # email = payload.get("email")
    # name = payload.get("name")
    
    # STUB: Return mock user for development
    mock_user = CurrentUser(
        user_id=UUID("123e4567-e89b-12d3-a456-426614174000"),
        email="user@example.com",
        name="Mock User"
    )
    
    return mock_user


async def get_optional_user(
    authorization: Optional[str] = Header(None)
) -> Optional[CurrentUser]:
    """
    Optional authentication - returns None if no token provided
    """
    if not authorization:
        return None
    
    try:
        token = authorization.replace("Bearer ", "")
        # STUB: Return mock user
        return CurrentUser(
            user_id=UUID("123e4567-e89b-12d3-a456-426614174000"),
            email="user@example.com",
            name="Mock User"
        )
    except Exception:
        return None
