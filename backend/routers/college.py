"""
College router - College tasks endpoints
"""
from fastapi import APIRouter, Depends, Query
from typing import Optional
from uuid import UUID
import math

from schemas.college import (
    CreateCollegeTaskRequest,
    UpdateCollegeTaskRequest,
    CollegeTaskResponse
)
from services.college_service import college_service
from core.auth import get_current_user, CurrentUser
from core.responses import Response, PaginatedResponse

router = APIRouter()


@router.post("/tasks", response_model=Response[CollegeTaskResponse])
async def create_task(
    request: CreateCollegeTaskRequest,
    current_user: CurrentUser = Depends(get_current_user)
):
    """Create a new college task"""
    task = await college_service.create_task(current_user.user_id, request)
    return Response(
        success=True,
        message="College task created successfully",
        data=task
    )


@router.get("/tasks", response_model=PaginatedResponse[CollegeTaskResponse])
async def get_tasks(
    status: Optional[str] = Query(None, description="Filter by status: ongoing, completed, pending, overdue"),
    page: int = Query(1, ge=1, description="Page number"),
    limit: int = Query(20, ge=1, le=100, description="Items per page"),
    current_user: CurrentUser = Depends(get_current_user)
):
    """Get college tasks with pagination"""
    tasks, total = await college_service.get_tasks(
        user_id=current_user.user_id,
        status=status,
        page=page,
        limit=limit
    )
    
    return PaginatedResponse(
        success=True,
        message="College tasks retrieved successfully",
        data=tasks,
        page=page,
        limit=limit,
        total=total,
        total_pages=math.ceil(total / limit)
    )


@router.get("/tasks/{task_id}", response_model=Response[CollegeTaskResponse])
async def get_task(
    task_id: UUID,
    current_user: CurrentUser = Depends(get_current_user)
):
    """Get college task by ID"""
    task = await college_service.get_task_by_id(current_user.user_id, task_id)
    return Response(
        success=True,
        message="College task retrieved successfully",
        data=task
    )


@router.put("/tasks/{task_id}", response_model=Response[CollegeTaskResponse])
async def update_task(
    task_id: UUID,
    request: UpdateCollegeTaskRequest,
    current_user: CurrentUser = Depends(get_current_user)
):
    """Update college task"""
    task = await college_service.update_task(current_user.user_id, task_id, request)
    return Response(
        success=True,
        message="College task updated successfully",
        data=task
    )


@router.delete("/tasks/{task_id}", response_model=Response[dict])
async def delete_task(
    task_id: UUID,
    current_user: CurrentUser = Depends(get_current_user)
):
    """Delete college task"""
    await college_service.delete_task(current_user.user_id, task_id)
    return Response(
        success=True,
        message="College task deleted successfully",
        data={}
    )
