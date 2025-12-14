"""
Daily summary schemas
"""
from pydantic import BaseModel
from uuid import UUID
from datetime import date
from typing import Optional

from schemas.health import HealthEntryResponse
from schemas.college import CollegeTaskResponse
from schemas.journal import JournalEntryResponse


class DailySummaryResponse(BaseModel):
    """Daily summary response"""
    date: date
    user_id: UUID
    health: Optional[HealthEntryResponse] = None
    college_tasks: list[CollegeTaskResponse] = []
    journal_entries: list[JournalEntryResponse] = []
    total_expenses: float = 0.0
    water_intake: int = 0
    steps: int = 0
    tasks_completed: int = 0
    tasks_pending: int = 0


class SendDailySummaryEmailRequest(BaseModel):
    """Send daily summary email request"""
    date: Optional[date] = None  # Defaults to today
    recipient_email: Optional[str] = None  # Defaults to user's email
