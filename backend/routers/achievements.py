"""
Achievements router - Achievements timeline endpoints
TODO: Implement full CRUD operations
"""
from fastapi import APIRouter, Depends

from core.auth import get_current_user, CurrentUser
from core.responses import Response

router = APIRouter()


@router.get("", response_model=Response[list])
async def get_achievements(current_user: CurrentUser = Depends(get_current_user)):
    """Get achievements timeline - TODO: Implement"""
    return Response(
        success=True,
        message="Achievements endpoint coming soon",
        data=[]
    )
