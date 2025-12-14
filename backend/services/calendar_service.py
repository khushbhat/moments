"""
Calendar service - Mock implementation
TODO: Connect to database
"""
from uuid import UUID, uuid4
from datetime import datetime, timedelta
from typing import Optional

from models.calendar import CalendarEvent
from schemas.calendar import CreateEventRequest, UpdateEventRequest, EventResponse
from core.exceptions import NotFoundException


class CalendarService:
    """Calendar service with mock data"""
    
    def __init__(self):
        self.mock_events: dict[UUID, CalendarEvent] = {}
        self._seed_mock_data()
    
    def _seed_mock_data(self):
        """Seed with sample calendar events"""
        user_id = UUID("123e4567-e89b-12d3-a456-426614174000")
        
        # Sample events
        events_data = [
            {
                "title": "Team Meeting",
                "description": "Weekly sync",
                "start_time": datetime.now() + timedelta(hours=2),
                "end_time": datetime.now() + timedelta(hours=3),
                "category": "work",
                "color": "#3b82f6"
            },
            {
                "title": "Assignment Due",
                "description": "Data Structures",
                "start_time": datetime.now() + timedelta(days=5),
                "end_time": datetime.now() + timedelta(days=5, hours=1),
                "category": "college",
                "color": "#ef4444"
            },
            {
                "title": "Gym Session",
                "description": "Workout",
                "start_time": datetime.now() - timedelta(hours=5),
                "end_time": datetime.now() - timedelta(hours=4),
                "category": "health",
                "color": "#10b981"
            }
        ]
        
        for data in events_data:
            event_id = uuid4()
            self.mock_events[event_id] = CalendarEvent(
                id=event_id,
                user_id=user_id,
                all_day=False,
                location=None,
                reminder_minutes=15,
                created_at=datetime.now(),
                updated_at=datetime.now(),
                **data
            )
    
    async def create_event(
        self, user_id: UUID, request: CreateEventRequest
    ) -> EventResponse:
        """Create calendar event"""
        event_id = uuid4()
        event = CalendarEvent(
            id=event_id,
            user_id=user_id,
            created_at=datetime.now(),
            updated_at=datetime.now(),
            **request.model_dump()
        )
        
        self.mock_events[event_id] = event
        return EventResponse(**event.model_dump())
    
    async def get_events(
        self, user_id: UUID, start_date: Optional[datetime] = None,
        end_date: Optional[datetime] = None, page: int = 1, limit: int = 50
    ) -> tuple[list[EventResponse], int]:
        """Get calendar events with optional date filtering"""
        filtered = [
            e for e in self.mock_events.values()
            if e.user_id == user_id and
            (start_date is None or e.start_time >= start_date) and
            (end_date is None or e.start_time <= end_date)
        ]
        
        filtered.sort(key=lambda x: x.start_time)
        
        total = len(filtered)
        start = (page - 1) * limit
        end = start + limit
        paginated = filtered[start:end]
        
        return [EventResponse(**e.model_dump()) for e in paginated], total
    
    async def get_event_by_id(self, user_id: UUID, event_id: UUID) -> EventResponse:
        """Get event by ID"""
        event = self.mock_events.get(event_id)
        if not event or event.user_id != user_id:
            raise NotFoundException(detail="Calendar event not found")
        
        return EventResponse(**event.model_dump())
    
    async def update_event(
        self, user_id: UUID, event_id: UUID, request: UpdateEventRequest
    ) -> EventResponse:
        """Update calendar event"""
        event = self.mock_events.get(event_id)
        if not event or event.user_id != user_id:
            raise NotFoundException(detail="Calendar event not found")
        
        update_data = request.model_dump(exclude_unset=True)
        for field, value in update_data.items():
            setattr(event, field, value)
        
        event.updated_at = datetime.now()
        return EventResponse(**event.model_dump())
    
    async def delete_event(self, user_id: UUID, event_id: UUID):
        """Delete calendar event"""
        event = self.mock_events.get(event_id)
        if not event or event.user_id != user_id:
            raise NotFoundException(detail="Calendar event not found")
        
        del self.mock_events[event_id]


# Singleton instance
calendar_service = CalendarService()
