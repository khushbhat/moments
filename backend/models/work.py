"""
Work models - Database templates
"""
from pydantic import BaseModel
from uuid import UUID
from datetime import datetime
from typing import Optional


class Project(BaseModel):
    """
    Work project entity
    TODO: Connect to PostgreSQL projects table
    """
    id: UUID
    user_id: UUID
    title: str
    description: Optional[str] = None
    status: str  # idea, ongoing, implemented, modify
    type: str = "individual"  # individual, group
    subject: Optional[str] = None
    github_url: Optional[str] = None
    website_url: Optional[str] = None
    tech_stack: list[str] = []
    created_at: datetime
    updated_at: datetime
    
    class Config:
        json_schema_extra = {
            "example": {
                "id": "123e4567-e89b-12d3-a456-426614174004",
                "user_id": "123e4567-e89b-12d3-a456-426614174000",
                "title": "Personal Portfolio Website",
                "description": "Showcase projects and skills",
                "status": "implemented",
                "type": "individual",
                "subject": None,
                "github_url": "https://github.com/user/portfolio",
                "website_url": "https://myportfolio.com",
                "tech_stack": ["React", "TypeScript", "TailwindCSS"],
                "created_at": "2024-01-01T10:00:00",
                "updated_at": "2024-01-15T14:30:00"
            }
        }


class Interview(BaseModel):
    """
    Interview experience entity
    TODO: Connect to PostgreSQL interviews table
    """
    id: UUID
    user_id: UUID
    company: str
    role: str
    description: Optional[str] = None
    interview_date: Optional[datetime] = None
    notes: dict = {}  # preparation, technical, hr, experience
    rounds: list[str] = []  # List of interview rounds
    outcome: Optional[str] = None  # pending, selected, rejected
    created_at: datetime
    updated_at: datetime
    
    class Config:
        json_schema_extra = {
            "example": {
                "id": "123e4567-e89b-12d3-a456-426614174005",
                "user_id": "123e4567-e89b-12d3-a456-426614174000",
                "company": "Tech Corp",
                "role": "Frontend Developer",
                "description": "Interview for React developer position",
                "interview_date": "2024-01-15T10:00:00",
                "notes": {
                    "preparation": "Reviewed React hooks, system design",
                    "technical": "Solved 2 coding problems",
                    "hr": "Discussed team culture",
                    "experience": "Overall positive experience"
                },
                "rounds": ["HR", "Technical", "Manager"],
                "outcome": "pending",
                "created_at": "2024-01-10T10:00:00",
                "updated_at": "2024-01-15T14:30:00"
            }
        }
