# Moments Backend API

Backend API for **Moments** - A personal life chronicle and management system.

Built with **FastAPI**, designed for integration with **Supabase Auth**, and ready for **PostgreSQL + MongoDB** databases.

---

## 🏗️ Architecture

```
backend/
├── main.py                 # FastAPI app entry point
├── config.py              # Configuration & environment variables
├── requirements.txt       # Python dependencies
│
├── core/                  # Core utilities
│   ├── auth.py           # JWT auth middleware (stub)
│   ├── exceptions.py     # Custom exceptions
│   └── responses.py      # Standard API response models
│
├── models/               # Pydantic models (DB templates)
│   ├── user.py
│   ├── calendar.py
│   ├── health.py
│   ├── college.py
│   ├── work.py
│   ├── exams.py
│   ├── achievements.py
│   ├── maps.py
│   ├── journal.py
│   ├── expenses.py
│   ├── pomodoro.py
│   ├── daily.py
│   └── reminders.py
│
├── schemas/              # Request/Response schemas
│   ├── auth.py
│   ├── calendar.py
│   ├── health.py
│   ├── college.py
│   ├── journal.py
│   └── daily.py
│
├── services/             # Business logic (mock data for now)
│   ├── auth_service.py
│   ├── calendar_service.py
│   ├── health_service.py
│   ├── college_service.py
│   ├── journal_service.py
│   └── daily_service.py
│
├── routers/              # API route handlers
│   ├── auth.py           # /api/auth/*
│   ├── calendar.py       # /api/calendar/*
│   ├── health.py         # /api/health/*
│   ├── college.py        # /api/college/*
│   ├── journal.py        # /api/journal/*
│   ├── daily.py          # /api/daily/*
│   ├── work.py           # /api/work/* (placeholder)
│   ├── exams.py          # /api/exams/* (placeholder)
│   ├── achievements.py   # /api/achievements/* (placeholder)
│   ├── maps.py           # /api/maps/* (placeholder)
│   ├── expenses.py       # /api/expenses/* (placeholder)
│   ├── pomodoro.py       # /api/pomodoro/* (placeholder)
│   └── reminders.py      # /api/reminders/* (placeholder)
│
└── storage/
    └── uploads/          # File uploads storage
```

---

## 🚀 Quick Start

### 1. Install Dependencies

```bash
cd backend
pip install -r requirements.txt
```

### 2. Setup Environment Variables

Copy `.env.example` to `.env` and configure:

```bash
cp .env.example .env
```

Edit `.env`:
```env
# Supabase Configuration (TODO: Add your credentials)
SUPABASE_URL=your_supabase_project_url
SUPABASE_KEY=your_supabase_anon_key
SUPABASE_JWT_SECRET=your_supabase_jwt_secret

# JWT Configuration
JWT_SECRET_KEY=your-secret-key-change-in-production
```

### 3. Run the Server

```bash
python main.py
```

Or use uvicorn directly:
```bash
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

The API will be available at:
- **API**: http://localhost:8000
- **Docs**: http://localhost:8000/docs (Swagger UI)
- **ReDoc**: http://localhost:8000/redoc

---

## 📡 API Endpoints

### **Authentication** (`/api/auth`)
- `POST /signup` - Register new user
- `POST /login` - Login user
- `POST /logout` - Logout user
- `GET /me` - Get current user details

### **Calendar** (`/api/calendar`)
- `GET /events` - Get calendar events (with pagination)
- `POST /events` - Create calendar event
- `GET /events/{id}` - Get event by ID
- `PUT /events/{id}` - Update event
- `DELETE /events/{id}` - Delete event

### **Health** (`/api/health`)
- `GET /entries` - Get health entries (with pagination)
- `POST /entries` - Create health entry
- `GET /entries/{id}` - Get health entry by ID
- `PUT /entries/{id}` - Update health entry
- `DELETE /entries/{id}` - Delete health entry
- `GET /stats` - Get health statistics

### **College** (`/api/college`)
- `GET /tasks` - Get college tasks (with pagination)
- `POST /tasks` - Create college task
- `GET /tasks/{id}` - Get task by ID
- `PUT /tasks/{id}` - Update task
- `DELETE /tasks/{id}` - Delete task

### **Journal** (`/api/journal`)
- `GET /entries` - Get journal entries (with pagination)
- `POST /entries` - Create journal entry
- `GET /entries/{id}` - Get entry by ID
- `PUT /entries/{id}` - Update entry
- `DELETE /entries/{id}` - Delete entry

### **Daily Summary** (`/api/daily`)
- `GET /summary?date=YYYY-MM-DD` - Get daily summary
- `POST /email` - Send daily summary email (TODO)

### **Other Modules** (Placeholders - TODO)
- `/api/work` - Projects and interviews
- `/api/exams` - Exams, templates, subjects
- `/api/achievements` - Achievements timeline
- `/api/maps` - Places and locations
- `/api/expenses` - Expense tracking
- `/api/pomodoro` - Pomodoro sessions
- `/api/reminders` - Reminders

---

## 🔐 Authentication

Currently using **stub authentication** for development.

### Mock User
- **Email**: user@example.com
- **User ID**: `123e4567-e89b-12d3-a456-426614174000`

### TODO: Integrate Supabase Auth
1. Update `core/auth.py` to verify JWT tokens from Supabase
2. Use Supabase client for user management
3. Implement proper token validation

---

## 📦 Current Status

### ✅ Implemented
- FastAPI app with CORS middleware
- Auth router with signup/login (mock)
- Health tracking (full CRUD + pagination)
- Calendar events (full CRUD + pagination)
- College tasks (full CRUD + pagination)
- Journal entries (full CRUD + pagination)
- Daily summary aggregation
- Standard API response format
- Pagination support
- Mock data for testing

### 🚧 TODO
- [ ] Integrate Supabase Auth
- [ ] Connect to PostgreSQL database
- [ ] Connect to MongoDB for media-heavy data
- [ ] Implement remaining modules (Work, Exams, Achievements, Maps, Expenses, Pomodoro, Reminders)
- [ ] File upload endpoints
- [ ] Daily summary email service
- [ ] Background tasks (cron jobs)
- [ ] Rate limiting
- [ ] Request validation
- [ ] Error logging
- [ ] Unit tests
- [ ] API documentation

---

## 🎯 Development Notes

### Mock Data
All services use in-memory mock data. No real database connections yet.

### Pagination
All list endpoints support pagination:
- `page`: Page number (default: 1)
- `limit`: Items per page (default: 10-50 depending on endpoint)

### Response Format
All responses follow this format:
```json
{
  "success": true,
  "message": "Operation successful",
  "data": { ... }
}
```

Paginated responses:
```json
{
  "success": true,
  "message": "Data retrieved",
  "data": [...],
  "page": 1,
  "limit": 10,
  "total": 100,
  "total_pages": 10
}
```

---

## 🔧 Tech Stack

- **FastAPI** - Modern Python web framework
- **Pydantic** - Data validation and settings management
- **python-jose** - JWT token handling
- **Uvicorn** - ASGI server
- **Supabase** (planned) - Auth and database
- **PostgreSQL** (planned) - Primary database
- **MongoDB** (planned) - Media-heavy data storage

---

## 📝 License

Private project - All rights reserved.
