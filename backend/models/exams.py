"""
Exams models - Database templates
"""
from pydantic import BaseModel
from uuid import UUID
from datetime import datetime, date
from typing import Optional


class ExamTemplate(BaseModel):
    """
    Exam template entity (reusable exam structure)
    TODO: Connect to PostgreSQL exam_templates table
    """
    id: UUID
    user_id: UUID
    name: str  # e.g., "Semester Exams", "Competitive Exams"
    description: Optional[str] = None
    created_at: datetime
    updated_at: datetime
    
    class Config:
        json_schema_extra = {
            "example": {
                "id": "123e4567-e89b-12d3-a456-426614174006",
                "user_id": "123e4567-e89b-12d3-a456-426614174000",
                "name": "Semester Exams",
                "description": "Regular semester examination template",
                "created_at": "2024-01-01T10:00:00",
                "updated_at": "2024-01-01T10:00:00"
            }
        }


class Exam(BaseModel):
    """
    Exam instance entity
    TODO: Connect to PostgreSQL exams table
    """
    id: UUID
    user_id: UUID
    template_id: Optional[UUID] = None  # Link to template if created from one
    name: str
    semester: Optional[str] = None
    exam_date: Optional[date] = None
    created_at: datetime
    updated_at: datetime
    
    class Config:
        json_schema_extra = {
            "example": {
                "id": "123e4567-e89b-12d3-a456-426614174007",
                "user_id": "123e4567-e89b-12d3-a456-426614174000",
                "template_id": "123e4567-e89b-12d3-a456-426614174006",
                "name": "Fall 2024 Semester Exams",
                "semester": "Fall 2024",
                "exam_date": "2024-12-15",
                "created_at": "2024-09-01T10:00:00",
                "updated_at": "2024-09-01T10:00:00"
            }
        }


class ExamSubject(BaseModel):
    """
    Exam subject entity
    TODO: Connect to PostgreSQL exam_subjects table
    """
    id: UUID
    exam_id: UUID
    name: str
    course_code: Optional[str] = None
    expected_marks: Optional[int] = None
    obtained_marks: Optional[int] = None
    created_at: datetime
    updated_at: datetime
    
    class Config:
        json_schema_extra = {
            "example": {
                "id": "123e4567-e89b-12d3-a456-426614174008",
                "exam_id": "123e4567-e89b-12d3-a456-426614174007",
                "name": "Data Structures",
                "course_code": "CS201",
                "expected_marks": 85,
                "obtained_marks": None,
                "created_at": "2024-09-01T10:00:00",
                "updated_at": "2024-09-01T10:00:00"
            }
        }


class ExamUnit(BaseModel):
    """
    Exam unit/topic entity
    TODO: Connect to PostgreSQL exam_units table
    """
    id: UUID
    subject_id: UUID
    name: str
    topics: list[str] = []
    study_status: str = "not_started"  # not_started, in_progress, completed
    materials: list[str] = []  # URLs to PDFs/PPTs
    notes: Optional[str] = None
    created_at: datetime
    updated_at: datetime
    
    class Config:
        json_schema_extra = {
            "example": {
                "id": "123e4567-e89b-12d3-a456-426614174009",
                "subject_id": "123e4567-e89b-12d3-a456-426614174008",
                "name": "Unit 1: Arrays & Linked Lists",
                "topics": ["Array basics", "Linked list operations", "Circular lists"],
                "study_status": "in_progress",
                "materials": ["/uploads/dsa_unit1.pdf"],
                "notes": "Focus on time complexity",
                "created_at": "2024-09-01T10:00:00",
                "updated_at": "2024-11-15T16:00:00"
            }
        }
