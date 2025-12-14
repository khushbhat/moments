"""
Maps router - Places and locations endpoints
TODO: Implement full CRUD operations
"""
from fastapi import APIRouter, Depends

from core.auth import get_current_user, CurrentUser
from core.responses import Response

router = APIRouter()


@router.get("/places", response_model=Response[list])
async def get_places(current_user: CurrentUser = Depends(get_current_user)):
    """Get user places (visited/planned) - TODO: Implement"""
    return Response(
        success=True,
        message="Maps places endpoint coming soon",
        data=[]
    )
