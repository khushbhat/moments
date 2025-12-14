"""
Authentication and authorization utilities
Stub implementation for JWT verification with Supabase
"""
from typing import Optional
from fastapi import Depends, Header
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from jose import jwt, JWTError
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
    TODO: Integrate with Supabase Auth
    """
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, settings.JWT_SECRET_KEY, algorithm=settings.JWT_ALGORITHM)
    return encoded_jwt


def verify_token(token: str) -> dict:
    """
    Verify JWT token
    TODO: Integrate with Supabase JWT verification
    """
    try:
        payload = jwt.decode(token, settings.JWT_SECRET_KEY, algorithms=[settings.JWT_ALGORITHM])
        return payload
    except JWTError:
        raise UnauthorizedException(detail="Invalid or expired token")


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
