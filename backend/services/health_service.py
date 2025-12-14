"""
Health service - Mock implementation
TODO: Connect to database
"""
from uuid import UUID, uuid4
from datetime import date, datetime, timedelta
from typing import Optional

from models.health import HealthEntry
from schemas.health import (
    CreateHealthEntryRequest,
    UpdateHealthEntryRequest,
    HealthEntryResponse,
    HealthStatsResponse
)
from core.exceptions import NotFoundException


class HealthService:
    """Health service with mock data"""
    
    def __init__(self):
        # Mock health entries database
        self.mock_entries: dict[UUID, HealthEntry] = {}
        self._seed_mock_data()
    
    def _seed_mock_data(self):
        """Seed with sample data"""
        user_id = UUID("123e4567-e89b-12d3-a456-426614174000")
        
        # Create entries for last 7 days
        for i in range(7):
            entry_date = date.today() - timedelta(days=i)
            entry_id = uuid4()
            
            self.mock_entries[entry_id] = HealthEntry(
                id=entry_id,
                user_id=user_id,
                date=entry_date,
                water=6 + (i % 3),
                steps=8000 + (i * 500),
                calories=1800 + (i * 100),
                meals=["Morning meal", "Afternoon meal", "Evening meal"],
                meal_types=["healthy", "healthy", "healthy"],
                cycle="waxing" if i % 2 == 0 else "full",
                period_day=None,
                bath=True,
                face_wash=True,
                notes=f"Day {i+1} notes",
                created_at=datetime.now() - timedelta(days=i),
                updated_at=datetime.now() - timedelta(days=i)
            )
    
    async def create_entry(
        self, user_id: UUID, request: CreateHealthEntryRequest
    ) -> HealthEntryResponse:
        """Create health entry"""
        entry_id = uuid4()
        entry = HealthEntry(
            id=entry_id,
            user_id=user_id,
            date=request.date,
            water=request.water,
            steps=request.steps,
            calories=request.calories,
            meals=request.meals,
            meal_types=request.meal_types,
            cycle=request.cycle,
            period_day=request.period_day,
            bath=request.bath,
            face_wash=request.face_wash,
            notes=request.notes,
            created_at=datetime.now(),
            updated_at=datetime.now()
        )
        
        self.mock_entries[entry_id] = entry
        return HealthEntryResponse(**entry.model_dump())
    
    async def get_entries(
        self, user_id: UUID, date: Optional[date] = None, page: int = 1, limit: int = 10
    ) -> tuple[list[HealthEntryResponse], int]:
        """Get health entries with pagination"""
        # Filter by user and optional date
        filtered = [
            e for e in self.mock_entries.values()
            if e.user_id == user_id and (date is None or e.date == date)
        ]
        
        # Sort by date descending
        filtered.sort(key=lambda x: x.date, reverse=True)
        
        total = len(filtered)
        start = (page - 1) * limit
        end = start + limit
        paginated = filtered[start:end]
        
        return [HealthEntryResponse(**e.model_dump()) for e in paginated], total
    
    async def get_entry_by_id(self, user_id: UUID, entry_id: UUID) -> HealthEntryResponse:
        """Get health entry by ID"""
        entry = self.mock_entries.get(entry_id)
        if not entry or entry.user_id != user_id:
            raise NotFoundException(detail="Health entry not found")
        
        return HealthEntryResponse(**entry.model_dump())
    
    async def update_entry(
        self, user_id: UUID, entry_id: UUID, request: UpdateHealthEntryRequest
    ) -> HealthEntryResponse:
        """Update health entry"""
        entry = self.mock_entries.get(entry_id)
        if not entry or entry.user_id != user_id:
            raise NotFoundException(detail="Health entry not found")
        
        # Update fields
        update_data = request.model_dump(exclude_unset=True)
        for field, value in update_data.items():
            setattr(entry, field, value)
        
        entry.updated_at = datetime.now()
        
        return HealthEntryResponse(**entry.model_dump())
    
    async def delete_entry(self, user_id: UUID, entry_id: UUID):
        """Delete health entry"""
        entry = self.mock_entries.get(entry_id)
        if not entry or entry.user_id != user_id:
            raise NotFoundException(detail="Health entry not found")
        
        del self.mock_entries[entry_id]
    
    async def get_stats(
        self, user_id: UUID, start_date: date, end_date: date
    ) -> HealthStatsResponse:
        """Get health statistics"""
        # Filter entries in date range
        filtered = [
            e for e in self.mock_entries.values()
            if e.user_id == user_id and start_date <= e.date <= end_date
        ]
        
        if not filtered:
            return HealthStatsResponse(
                period=f"{start_date} to {end_date}",
                avg_water=0,
                avg_steps=0,
                avg_calories=0,
                total_days=0,
                streak=0
            )
        
        # Calculate averages
        total_water = sum(e.water for e in filtered)
        total_steps = sum(e.steps for e in filtered)
        total_calories = sum(e.calories or 0 for e in filtered)
        count = len(filtered)
        
        return HealthStatsResponse(
            period=f"{start_date} to {end_date}",
            avg_water=round(total_water / count, 1),
            avg_steps=round(total_steps / count, 0),
            avg_calories=round(total_calories / count, 0) if total_calories > 0 else None,
            total_days=count,
            streak=count  # Simplified: assume all consecutive
        )


# Singleton instance
health_service = HealthService()
