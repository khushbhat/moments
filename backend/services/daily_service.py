"""
Daily summary service - Aggregates data from multiple sources
TODO: Connect to database
"""
from uuid import UUID
from datetime import date
from typing import Optional

from schemas.daily import DailySummaryResponse
from services.health_service import health_service
from services.college_service import college_service
from services.journal_service import journal_service


class DailySummaryService:
    """Daily summary service - aggregates data from multiple modules"""
    
    async def get_summary(self, user_id: UUID, summary_date: Optional[date] = None) -> DailySummaryResponse:
        """
        Get daily summary for a specific date
        Aggregates data from health, college, journal, expenses
        """
        if summary_date is None:
            summary_date = date.today()
        
        # Fetch health entry for the date
        health_entries, _ = await health_service.get_entries(
            user_id=user_id,
            date=summary_date,
            page=1,
            limit=1
        )
        health_entry = health_entries[0] if health_entries else None
        
        # Fetch college tasks (due today or overdue)
        college_tasks, _ = await college_service.get_tasks(
            user_id=user_id,
            page=1,
            limit=50
        )
        
        # Filter tasks relevant to today
        relevant_tasks = [
            t for t in college_tasks
            if t.due_date and t.due_date.date() <= summary_date
        ]
        
        # Fetch journal entries for the date
        from datetime import datetime, time
        start_datetime = datetime.combine(summary_date, time.min)
        end_datetime = datetime.combine(summary_date, time.max)
        
        journal_entries, _ = await journal_service.get_entries(
            user_id=user_id,
            start_date=start_datetime,
            end_date=end_datetime,
            page=1,
            limit=10
        )
        
        # Calculate stats
        tasks_completed = len([t for t in relevant_tasks if t.status == "completed"])
        tasks_pending = len([t for t in relevant_tasks if t.status != "completed"])
        
        return DailySummaryResponse(
            date=summary_date,
            user_id=user_id,
            health=health_entry,
            college_tasks=relevant_tasks,
            journal_entries=journal_entries,
            total_expenses=0.0,  # TODO: Fetch from expenses service
            water_intake=health_entry.water if health_entry else 0,
            steps=health_entry.steps if health_entry else 0,
            tasks_completed=tasks_completed,
            tasks_pending=tasks_pending
        )


# Singleton instance
daily_service = DailySummaryService()
