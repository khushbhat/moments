"""
Auth service - Mock implementation
TODO: Integrate with Supabase Auth
"""
from uuid import UUID, uuid4
from datetime import datetime, timedelta
from typing import Optional

from models.user import User
from schemas.auth import SignUpRequest, LoginRequest, TokenResponse, UserResponse
from core.auth import create_access_token
from core.exceptions import UnauthorizedException, ConflictException
from config import settings


class AuthService:
    """Authentication service with mock data"""
    
    def __init__(self):
        # Mock user database (in-memory)
        self.mock_users: dict[str, User] = {
            "user@example.com": User(
                id=UUID("123e4567-e89b-12d3-a456-426614174000"),
                email="user@example.com",
                name="Mock User",
                profile_pic=None,
                role="user",
                created_at=datetime(2024, 1, 1, 0, 0, 0),
                last_login=datetime.now(),
                updated_at=datetime.now()
            )
        }
    
    async def sign_up(self, request: SignUpRequest) -> TokenResponse:
        """
        Sign up a new user
        TODO: Integrate with Supabase Auth
        """
        # Check if user already exists
        if request.email in self.mock_users:
            raise ConflictException(detail="User with this email already exists")
        
        # Create new user
        user_id = uuid4()
        new_user = User(
            id=user_id,
            email=request.email,
            name=request.name,
            profile_pic=None,
            role="user",
            created_at=datetime.now(),
            last_login=datetime.now(),
            updated_at=datetime.now()
        )
        
        # Store user (mock)
        self.mock_users[request.email] = new_user
        
        # Generate JWT token
        access_token = create_access_token(
            data={"sub": str(user_id), "email": request.email}
        )
        
        return TokenResponse(
            access_token=access_token,
            token_type="bearer",
            expires_in=settings.ACCESS_TOKEN_EXPIRE_MINUTES * 60,
            user=UserResponse(**new_user.model_dump())
        )
    
    async def login(self, request: LoginRequest) -> TokenResponse:
        """
        Login user
        TODO: Integrate with Supabase Auth
        """
        # Check if user exists
        user = self.mock_users.get(request.email)
        if not user:
            raise UnauthorizedException(detail="Invalid email or password")
        
        # Update last login
        user.last_login = datetime.now()
        user.updated_at = datetime.now()
        
        # Generate JWT token
        access_token = create_access_token(
            data={"sub": str(user.id), "email": user.email}
        )
        
        return TokenResponse(
            access_token=access_token,
            token_type="bearer",
            expires_in=settings.ACCESS_TOKEN_EXPIRE_MINUTES * 60,
            user=UserResponse(**user.model_dump())
        )
    
    async def get_current_user(self, user_id: UUID) -> UserResponse:
        """Get current user details"""
        # Find user by ID (mock)
        for user in self.mock_users.values():
            if user.id == user_id:
                return UserResponse(**user.model_dump())
        
        raise UnauthorizedException(detail="User not found")


# Singleton instance
auth_service = AuthService()
