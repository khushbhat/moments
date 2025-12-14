"""
Expenses router - Expenses tracking and budget endpoints
TODO: Implement full CRUD operations
"""
from fastapi import APIRouter, Depends

from core.auth import get_current_user, CurrentUser
from core.responses import Response

router = APIRouter()


@router.get("", response_model=Response[list])
async def get_expenses(current_user: CurrentUser = Depends(get_current_user)):
    """Get expenses - TODO: Implement"""
    return Response(
        success=True,
        message="Expenses endpoint coming soon",
        data=[]
    )


@router.get("/reports", response_model=Response[dict])
async def get_expense_reports(current_user: CurrentUser = Depends(get_current_user)):
    """Get expense reports - TODO: Implement"""
    return Response(
        success=True,
        message="Expense reports endpoint coming soon",
        data={}
    )
