"""
Work router - Projects and interviews endpoints
TODO: Implement full CRUD operations
"""
from fastapi import APIRouter, Depends

from core.auth import get_current_user, CurrentUser
from core.responses import Response

router = APIRouter()


@router.get("/projects", response_model=Response[list])
async def get_projects(current_user: CurrentUser = Depends(get_current_user)):
    """Get user projects - TODO: Implement"""
    return Response(
        success=True,
        message="Projects endpoint coming soon",
        data=[]
    )


@router.get("/interviews", response_model=Response[list])
async def get_interviews(current_user: CurrentUser = Depends(get_current_user)):
    """Get user interviews - TODO: Implement"""
    return Response(
        success=True,
        message="Interviews endpoint coming soon",
        data=[]
    )
