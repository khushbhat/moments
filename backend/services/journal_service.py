"""
Journal service - Mock implementation
TODO: Connect to database
"""
from uuid import UUID, uuid4
from datetime import datetime, timedelta
from typing import Optional

from models.journal import JournalEntry
from schemas.journal import (
    CreateJournalEntryRequest,
    UpdateJournalEntryRequest,
    JournalEntryResponse
)
from core.exceptions import NotFoundException


class JournalService:
    """Journal service with mock data"""
    
    def __init__(self):
        self.mock_entries: dict[UUID, JournalEntry] = {}
        self._seed_mock_data()
    
    def _seed_mock_data(self):
        """Seed with sample journal entries"""
        user_id = UUID("123e4567-e89b-12d3-a456-426614174000")
        
        entries_data = [
            {
                "title": "Journey to the Temple",
                "content": "Today I walked through ancient corridors...",
                "cover_image": "https://images.unsplash.com/photo-1714593216669-595b046ff738?w=400",
                "mood": "peaceful",
                "tags": ["travel", "meditation"]
            },
            {
                "title": "Reflections by Candlelight",
                "content": "The flickering flame reminds me of life's impermanence...",
                "cover_image": "https://images.unsplash.com/photo-1610265963088-5455f5df3cc9?w=400",
                "mood": "contemplative",
                "tags": ["reflection"]
            },
            {
                "title": "Among the Sacred Carvings",
                "content": "Stories etched in stone, speaking across millennia...",
                "cover_image": "https://images.unsplash.com/photo-1647771280861-8586df0a3b16?w=400",
                "mood": "inspired",
                "tags": ["history", "art"]
            }
        ]
        
        for i, data in enumerate(entries_data):
            entry_id = uuid4()
            entry_date = datetime.now() - timedelta(days=i)
            
            self.mock_entries[entry_id] = JournalEntry(
                id=entry_id,
                user_id=user_id,
                date=entry_date,
                images=[data["cover_image"]] if data["cover_image"] else [],
                is_private=True,
                created_at=entry_date,
                updated_at=entry_date,
                **data
            )
    
    async def create_entry(
        self, user_id: UUID, request: CreateJournalEntryRequest
    ) -> JournalEntryResponse:
        """Create journal entry"""
        entry_id = uuid4()
        entry = JournalEntry(
            id=entry_id,
            user_id=user_id,
            date=request.date or datetime.now(),
            created_at=datetime.now(),
            updated_at=datetime.now(),
            **request.model_dump(exclude={"date"})
        )
        
        self.mock_entries[entry_id] = entry
        return JournalEntryResponse(**entry.model_dump())
    
    async def get_entries(
        self, user_id: UUID, start_date: Optional[datetime] = None,
        end_date: Optional[datetime] = None, page: int = 1, limit: int = 10
    ) -> tuple[list[JournalEntryResponse], int]:
        """Get journal entries with pagination"""
        filtered = [
            e for e in self.mock_entries.values()
            if e.user_id == user_id and
            (start_date is None or e.date >= start_date) and
            (end_date is None or e.date <= end_date)
        ]
        
        filtered.sort(key=lambda x: x.date, reverse=True)
        
        total = len(filtered)
        start = (page - 1) * limit
        end = start + limit
        paginated = filtered[start:end]
        
        return [JournalEntryResponse(**e.model_dump()) for e in paginated], total
    
    async def get_entry_by_id(self, user_id: UUID, entry_id: UUID) -> JournalEntryResponse:
        """Get journal entry by ID"""
        entry = self.mock_entries.get(entry_id)
        if not entry or entry.user_id != user_id:
            raise NotFoundException(detail="Journal entry not found")
        
        return JournalEntryResponse(**entry.model_dump())
    
    async def update_entry(
        self, user_id: UUID, entry_id: UUID, request: UpdateJournalEntryRequest
    ) -> JournalEntryResponse:
        """Update journal entry"""
        entry = self.mock_entries.get(entry_id)
        if not entry or entry.user_id != user_id:
            raise NotFoundException(detail="Journal entry not found")
        
        update_data = request.model_dump(exclude_unset=True)
        for field, value in update_data.items():
            setattr(entry, field, value)
        
        entry.updated_at = datetime.now()
        return JournalEntryResponse(**entry.model_dump())
    
    async def delete_entry(self, user_id: UUID, entry_id: UUID):
        """Delete journal entry"""
        entry = self.mock_entries.get(entry_id)
        if not entry or entry.user_id != user_id:
            raise NotFoundException(detail="Journal entry not found")
        
        del self.mock_entries[entry_id]


# Singleton instance
journal_service = JournalService()
