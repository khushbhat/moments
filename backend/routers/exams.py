"""
Exams router - Exams, templates, subjects, units endpoints
TODO: Implement full CRUD operations
"""
from fastapi import APIRouter, Depends

from core.auth import get_current_user, CurrentUser
from core.responses import Response

router = APIRouter()


@router.get("/templates", response_model=Response[list])
async def get_exam_templates(current_user: CurrentUser = Depends(get_current_user)):
    """Get exam templates - TODO: Implement"""
    return Response(
        success=True,
        message="Exam templates endpoint coming soon",
        data=[]
    )


@router.get("", response_model=Response[list])
async def get_exams(current_user: CurrentUser = Depends(get_current_user)):
    """Get exams - TODO: Implement"""
    return Response(
        success=True,
        message="Exams endpoint coming soon",
        data=[]
    )
