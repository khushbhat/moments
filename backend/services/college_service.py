"""
College service - Mock implementation
TODO: Connect to database
"""
from uuid import UUID, uuid4
from datetime import datetime, timedelta
from typing import Optional

from models.college import CollegeTask
from schemas.college import (
    CreateCollegeTaskRequest,
    UpdateCollegeTaskRequest,
    CollegeTaskResponse
)
from core.exceptions import NotFoundException


class CollegeService:
    """College service with mock data"""
    
    def __init__(self):
        self.mock_tasks: dict[UUID, CollegeTask] = {}
        self._seed_mock_data()
    
    def _seed_mock_data(self):
        """Seed with sample college tasks"""
        user_id = UUID("123e4567-e89b-12d3-a456-426614174000")
        
        tasks_data = [
            {
                "title": "Complete Data Structures Assignment 3",
                "description": "Implement Binary Search Tree operations",
                "type": "assignment",
                "status": "ongoing",
                "due_date": datetime.now() + timedelta(days=2),
                "priority": "high",
                "subject": "Data Structures",
                "tags": ["DSA", "Programming"]
            },
            {
                "title": "Web Development Project - Phase 2",
                "description": "Build REST API endpoints",
                "type": "project",
                "status": "ongoing",
                "due_date": datetime.now() + timedelta(days=5),
                "priority": "high",
                "subject": "Web Development",
                "tags": ["Web", "Backend"]
            },
            {
                "title": "Database Lab Report",
                "description": "Document SQL queries",
                "type": "assignment",
                "status": "completed",
                "due_date": datetime.now() - timedelta(days=1),
                "priority": "medium",
                "subject": "Database Management",
                "tags": ["Database", "SQL"]
            }
        ]
        
        for data in tasks_data:
            task_id = uuid4()
            self.mock_tasks[task_id] = CollegeTask(
                id=task_id,
                user_id=user_id,
                created_at=datetime.now() - timedelta(days=7),
                updated_at=datetime.now(),
                **data
            )
    
    async def create_task(
        self, user_id: UUID, request: CreateCollegeTaskRequest
    ) -> CollegeTaskResponse:
        """Create college task"""
        task_id = uuid4()
        task = CollegeTask(
            id=task_id,
            user_id=user_id,
            created_at=datetime.now(),
            updated_at=datetime.now(),
            **request.model_dump()
        )
        
        self.mock_tasks[task_id] = task
        return CollegeTaskResponse(**task.model_dump())
    
    async def get_tasks(
        self, user_id: UUID, status: Optional[str] = None, page: int = 1, limit: int = 20
    ) -> tuple[list[CollegeTaskResponse], int]:
        """Get college tasks with pagination"""
        filtered = [
            t for t in self.mock_tasks.values()
            if t.user_id == user_id and (status is None or t.status == status)
        ]
        
        # Sort by due date (nulls last) then by created_at
        filtered.sort(key=lambda x: (x.due_date is None, x.due_date or datetime.max, x.created_at))
        
        total = len(filtered)
        start = (page - 1) * limit
        end = start + limit
        paginated = filtered[start:end]
        
        return [CollegeTaskResponse(**t.model_dump()) for t in paginated], total
    
    async def get_task_by_id(self, user_id: UUID, task_id: UUID) -> CollegeTaskResponse:
        """Get college task by ID"""
        task = self.mock_tasks.get(task_id)
        if not task or task.user_id != user_id:
            raise NotFoundException(detail="College task not found")
        
        return CollegeTaskResponse(**task.model_dump())
    
    async def update_task(
        self, user_id: UUID, task_id: UUID, request: UpdateCollegeTaskRequest
    ) -> CollegeTaskResponse:
        """Update college task"""
        task = self.mock_tasks.get(task_id)
        if not task or task.user_id != user_id:
            raise NotFoundException(detail="College task not found")
        
        update_data = request.model_dump(exclude_unset=True)
        for field, value in update_data.items():
            setattr(task, field, value)
        
        task.updated_at = datetime.now()
        return CollegeTaskResponse(**task.model_dump())
    
    async def delete_task(self, user_id: UUID, task_id: UUID):
        """Delete college task"""
        task = self.mock_tasks.get(task_id)
        if not task or task.user_id != user_id:
            raise NotFoundException(detail="College task not found")
        
        del self.mock_tasks[task_id]


# Singleton instance
college_service = CollegeService()
