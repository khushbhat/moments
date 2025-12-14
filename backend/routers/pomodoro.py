"""
Pomodoro router - Pomodoro sessions and stats endpoints
TODO: Implement full CRUD operations
"""
from fastapi import APIRouter, Depends

from core.auth import get_current_user, CurrentUser
from core.responses import Response

router = APIRouter()


@router.get("/sessions", response_model=Response[list])
async def get_pomodoro_sessions(current_user: CurrentUser = Depends(get_current_user)):
    """Get pomodoro sessions - TODO: Implement"""
    return Response(
        success=True,
        message="Pomodoro sessions endpoint coming soon",
        data=[]
    )


@router.get("/stats", response_model=Response[dict])
async def get_pomodoro_stats(current_user: CurrentUser = Depends(get_current_user)):
    """Get pomodoro statistics - TODO: Implement"""
    return Response(
        success=True,
        message="Pomodoro stats endpoint coming soon",
        data={}
    )
