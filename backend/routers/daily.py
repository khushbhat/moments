"""
Daily summary router - Daily aggregated data endpoints
"""
from fastapi import APIRouter, Depends, Query
from datetime import date
from typing import Optional

from schemas.daily import DailySummaryResponse, SendDailySummaryEmailRequest
from services.daily_service import daily_service
from core.auth import get_current_user, CurrentUser
from core.responses import Response

router = APIRouter()


@router.get("/summary", response_model=Response[DailySummaryResponse])
async def get_daily_summary(
    date: Optional[date] = Query(None, description="Date for summary (defaults to today)"),
    current_user: CurrentUser = Depends(get_current_user)
):
    """
    Get daily summary aggregating data from health, college, journal, expenses
    """
    summary = await daily_service.get_summary(current_user.user_id, date)
    return Response(
        success=True,
        message="Daily summary retrieved successfully",
        data=summary
    )


@router.post("/email", response_model=Response[dict])
async def send_daily_summary_email(
    request: SendDailySummaryEmailRequest,
    current_user: CurrentUser = Depends(get_current_user)
):
    """
    Send daily summary email
    
    TODO: Implement email sending logic
    - Fetch daily summary
    - Format as palm-leaf manuscript style HTML
    - Send via SMTP
    """
    return Response(
        success=True,
        message="Daily summary email feature coming soon",
        data={"note": "Email service will be implemented later"}
    )
