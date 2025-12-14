"""
Auth router - Authentication endpoints
"""
from fastapi import APIRouter, Depends

from schemas.auth import SignUpRequest, LoginRequest, TokenResponse, UserResponse
from services.auth_service import auth_service
from core.auth import get_current_user, CurrentUser
from core.responses import Response

router = APIRouter()


@router.post("/signup", response_model=Response[TokenResponse])
async def sign_up(request: SignUpRequest):
    """
    Sign up a new user
    
    TODO: Integrate with Supabase Auth
    """
    token_response = await auth_service.sign_up(request)
    return Response(
        success=True,
        message="User registered successfully",
        data=token_response
    )


@router.post("/login", response_model=Response[TokenResponse])
async def login(request: LoginRequest):
    """
    Login user
    
    TODO: Integrate with Supabase Auth
    """
    token_response = await auth_service.login(request)
    return Response(
        success=True,
        message="Login successful",
        data=token_response
    )


@router.post("/logout", response_model=Response[dict])
async def logout(current_user: CurrentUser = Depends(get_current_user)):
    """
    Logout user
    
    TODO: Implement token invalidation
    """
    return Response(
        success=True,
        message="Logout successful",
        data={}
    )


@router.get("/me", response_model=Response[UserResponse])
async def get_me(current_user: CurrentUser = Depends(get_current_user)):
    """Get current user details"""
    user = await auth_service.get_current_user(current_user.user_id)
    return Response(
        success=True,
        message="User details retrieved",
        data=user
    )
