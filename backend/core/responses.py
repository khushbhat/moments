"""
Standard API response models
"""
from typing import Generic, TypeVar, Optional, Any
from pydantic import BaseModel

T = TypeVar('T')


class Response(BaseModel, Generic[T]):
    """Standard API response wrapper"""
    success: bool
    message: Optional[str] = None
    data: Optional[T] = None
    
    class Config:
        json_schema_extra = {
            "example": {
                "success": True,
                "message": "Operation successful",
                "data": {}
            }
        }


class PaginatedResponse(BaseModel, Generic[T]):
    """Paginated API response"""
    success: bool
    message: Optional[str] = None
    data: list[T]
    page: int
    limit: int
    total: int
    total_pages: int
    
    class Config:
        json_schema_extra = {
            "example": {
                "success": True,
                "message": "Data retrieved successfully",
                "data": [],
                "page": 1,
                "limit": 10,
                "total": 100,
                "total_pages": 10
            }
        }


class ErrorResponse(BaseModel):
    """Error response model"""
    success: bool = False
    message: str
    errors: Optional[Any] = None
    
    class Config:
        json_schema_extra = {
            "example": {
                "success": False,
                "message": "An error occurred",
                "errors": None
            }
        }
