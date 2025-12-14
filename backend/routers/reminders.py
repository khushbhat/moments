"""
Reminders router - Reminders endpoints
TODO: Implement full CRUD operations
"""
from fastapi import APIRouter, Depends

from core.auth import get_current_user, CurrentUser
from core.responses import Response

router = APIRouter()


@router.get("", response_model=Response[list])
async def get_reminders(current_user: CurrentUser = Depends(get_current_user)):
    """Get reminders - TODO: Implement"""
    return Response(
        success=True,
        message="Reminders endpoint coming soon",
        data=[]
    )


@router.patch("/{reminder_id}/complete", response_model=Response[dict])
async def complete_reminder(
    reminder_id: str,
    current_user: CurrentUser = Depends(get_current_user)
):
    """Mark reminder as complete - TODO: Implement"""
    return Response(
        success=True,
        message="Reminder completion endpoint coming soon",
        data={}
    )
