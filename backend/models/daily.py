"""
Daily summary models - Database templates
"""
from pydantic import BaseModel
from uuid import UUID
from datetime import date, datetime
from typing import Optional

from models.health import HealthEntry
from models.college import CollegeTask
from models.work import Project, Interview
from models.journal import JournalEntry
from models.expenses import Expense


class DailySummary(BaseModel):
    """
    Daily summary aggregated response
    This is NOT stored in DB - generated dynamically from other collections
    """
    date: date
    user_id: UUID
    health: Optional[HealthEntry] = None
    college_tasks: list[CollegeTask] = []
    work_projects: list[Project] = []
    interviews: list[Interview] = []
    journal_entries: list[JournalEntry] = []
    expenses: list[Expense] = []
    total_expenses: float = 0.0
    
    # Summary stats
    water_intake: int = 0
    steps: int = 0
    tasks_completed: int = 0
    tasks_pending: int = 0
    
    class Config:
        json_schema_extra = {
            "example": {
                "date": "2024-01-15",
                "user_id": "123e4567-e89b-12d3-a456-426614174000",
                "health": None,
                "college_tasks": [],
                "work_projects": [],
                "interviews": [],
                "journal_entries": [],
                "expenses": [],
                "total_expenses": 450.50,
                "water_intake": 6,
                "steps": 8420,
                "tasks_completed": 3,
                "tasks_pending": 5
            }
        }
