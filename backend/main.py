"""
Main FastAPI application for Moments - Personal Life Management System
"""
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
import os

from config import settings
from routers import (
    auth,
    calendar,
    health,
    college,
    work,
    exams,
    achievements,
    maps,
    journal,
    expenses,
    pomodoro,
    daily,
    reminders,
)

# Create FastAPI app
app = FastAPI(
    title=settings.APP_NAME,
    version=settings.APP_VERSION,
    debug=settings.DEBUG,
    description="Backend API for Moments - A personal life chronicle and management system",
)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Mount static files for uploads
if os.path.exists(settings.UPLOAD_DIR):
    app.mount("/uploads", StaticFiles(directory=settings.UPLOAD_DIR), name="uploads")

# Include routers
app.include_router(auth.router, prefix="/api/auth", tags=["Auth"])
app.include_router(calendar.router, prefix="/api/calendar", tags=["Calendar"])
app.include_router(health.router, prefix="/api/health", tags=["Health"])
app.include_router(college.router, prefix="/api/college", tags=["College"])
app.include_router(work.router, prefix="/api/work", tags=["Work"])
app.include_router(exams.router, prefix="/api/exams", tags=["Exams"])
app.include_router(achievements.router, prefix="/api/achievements", tags=["Achievements"])
app.include_router(maps.router, prefix="/api/maps", tags=["Maps"])
app.include_router(journal.router, prefix="/api/journal", tags=["Journal"])
app.include_router(expenses.router, prefix="/api/expenses", tags=["Expenses"])
app.include_router(pomodoro.router, prefix="/api/pomodoro", tags=["Pomodoro"])
app.include_router(daily.router, prefix="/api/daily", tags=["Daily Summary"])
app.include_router(reminders.router, prefix="/api/reminders", tags=["Reminders"])


@app.get("/")
async def root():
    """Health check endpoint"""
    return {
        "app": settings.APP_NAME,
        "version": settings.APP_VERSION,
        "status": "running",
        "message": "Welcome to Moments API - Your personal life chronicle"
    }


@app.get("/health")
async def health_check():
    """API health check"""
    return {"status": "healthy"}


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=8000,
        reload=True
    )
