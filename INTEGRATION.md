# Frontend-Backend Integration Guide

## Overview
This document describes the integration between the Moments React frontend and the FastAPI backend.

## Architecture

### Frontend Stack
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: TailwindCSS
- **Data Fetching**: Custom hooks with axios
- **State Management**: React hooks (useState, useEffect)

### Backend Stack
- **Framework**: FastAPI (Python)
- **Data Models**: Pydantic
- **Authentication**: JWT (stub implementation)
- **Storage**: In-memory mock data (templates for DB integration)

## API Integration

### API Client (`src/api/client.ts`)
The base axios client handles:
- Base URL configuration (`http://localhost:8000/api`)
- Authentication token injection from localStorage
- Standard response unwrapping
- Error handling and 401 redirects

### API Services

#### 1. Authentication (`src/api/auth.ts`)
- `signUp(email, password, name)` - User registration
- `login(email, password)` - User login with JWT
- `logout()` - Clear local session
- `getCurrentUser()` - Fetch current user data
- `isAuthenticated()` - Check if user is logged in
- `getStoredUser()` - Get user from localStorage

#### 2. Health Tracking (`src/api/health.ts`)
- `getEntries(params)` - List health entries with pagination
- `getEntry(id)` - Get single health entry
- `createEntry(data)` - Create new health entry
- `updateEntry(id, data)` - Update health entry
- `deleteEntry(id)` - Delete health entry
- `getStats(params)` - Get health statistics

#### 3. Calendar Events (`src/api/calendar.ts`)
- `getEvents(params)` - List events with date filtering
- `getEvent(id)` - Get single event
- `createEvent(data)` - Create new event
- `updateEvent(id, data)` - Update event
- `deleteEvent(id)` - Delete event

#### 4. Journal (`src/api/journal.ts`)
- `getEntries(params)` - List journal entries
- `getEntry(id)` - Get single entry
- `createEntry(data)` - Create new entry
- `updateEntry(id, data)` - Update entry
- `deleteEntry(id)` - Delete entry

#### 5. College Tasks (`src/api/college.ts`)
- `getTasks(params)` - List tasks with status filtering
- `getTask(id)` - Get single task
- `createTask(data)` - Create new task
- `updateTask(id, data)` - Update task
- `deleteTask(id)` - Delete task

#### 6. Daily Summary (`src/api/daily.ts`)
- `getSummary(date)` - Get aggregated daily data
- `sendEmail(data)` - Send daily summary email

## Custom Hooks

### Data Fetching Hooks (`src/hooks/`)
Each feature has a corresponding hook that wraps API calls:

#### `useHealthEntries(params)`
```typescript
const { data, loading, error, pagination, refetch, createEntry, updateEntry, deleteEntry } = useHealthEntries({ date: '2024-01-15' });
```

#### `useCalendarEvents(params)`
```typescript
const { data, loading, error, pagination, refetch, createEvent, updateEvent, deleteEvent } = useCalendarEvents({ 
  start_date: '2024-01-01',
  end_date: '2024-01-31'
});
```

#### `useJournalEntries(params)`
```typescript
const { data, loading, error, pagination, refetch, createEntry, updateEntry, deleteEntry } = useJournalEntries({ limit: 20 });
```

#### `useCollegeTasks(params)`
```typescript
const { data, loading, error, pagination, refetch, createTask, updateTask, deleteTask } = useCollegeTasks({ status: 'ongoing' });
```

#### `useDailySummary(date)`
```typescript
const { data, loading, error, refetch } = useDailySummary('2024-01-15');
```

#### `useAuth()`
```typescript
const { user, loading, error, login, signUp, logout, isAuthenticated } = useAuth();
```

## Component Integration

### Updated Components
The following components have been updated to use real API data:

1. **HealthScreen** - Displays health entries from backend
2. **CalendarScreen** - Shows calendar events from backend
3. **JournallingScreen** - Lists journal entries from backend
4. **CollegeScreen** - Shows college tasks from backend
5. **DailyScreen** - Displays aggregated daily summary

### Integration Pattern
Each component follows this pattern:
```typescript
import { useHealthEntries } from '@/hooks';

export default function HealthScreen({ onNavigate }: Props) {
  const { data, loading, error } = useHealthEntries({ limit: 10 });

  if (loading) return <LoadingState />;
  if (error) return <ErrorState message={error} />;

  return (
    <div>
      {data.map(entry => <EntryCard key={entry.id} entry={entry} />)}
    </div>
  );
}
```

## Running the Application

### 1. Start Backend Server
```bash
cd backend
python main.py
```
Backend runs on: `http://localhost:8000`
API docs: `http://localhost:8000/docs`

### 2. Start Frontend Dev Server
```bash
npm run dev
```
Frontend runs on: `http://localhost:5173`

### 3. Access Application
Open browser to: `http://localhost:5173`

## Mock Authentication

Currently using stub authentication that returns a mock user:
- **User ID**: `123e4567-e89b-12d3-a456-426614174000`
- **Email**: `user@example.com`

To login, use any email/password combination (authentication is stubbed).

## Data Flow

```
Component → Hook → API Service → axios → FastAPI Backend → Pydantic Service → Mock Data
```

## Environment Variables

Create `.env` file in project root:
```env
VITE_API_URL=http://localhost:8000/api
```

## TypeScript Configuration

Path aliases configured in:
- `tsconfig.json` - For TypeScript
- `vite.config.ts` - For Vite bundler

Allows imports like:
```typescript
import { healthApi } from '@/api';
import { useHealth } from '@/hooks';
```

## CORS Configuration

Backend is configured to allow requests from:
- `http://localhost:5173` (Vite dev server)
- `http://127.0.0.1:5173`

## Next Steps

### Immediate
- [ ] Add authentication UI (login/signup forms)
- [ ] Implement error toast notifications
- [ ] Add loading skeletons for better UX
- [ ] Add form validation

### Near-term
- [ ] Replace mock services with real database
- [ ] Implement Supabase authentication
- [ ] Add file upload support for journal images
- [ ] Implement real-time updates with WebSockets

### Long-term
- [ ] Add offline support with service workers
- [ ] Implement data caching strategies
- [ ] Add progressive web app (PWA) features
- [ ] Deploy to production environment

## Troubleshooting

### Frontend can't connect to backend
1. Ensure backend server is running on port 8000
2. Check `.env` file has correct `VITE_API_URL`
3. Restart Vite dev server after changing `.env`

### 401 Unauthorized errors
1. Check if token exists in localStorage
2. Try clearing localStorage and re-login
3. Verify backend auth middleware is working

### CORS errors
1. Ensure backend CORS is configured for `http://localhost:5173`
2. Check browser console for specific CORS error
3. Verify backend `config.py` has correct `ALLOWED_ORIGINS`

### TypeScript errors
1. Run `npm install` to ensure all types are installed
2. Check `tsconfig.json` path aliases are correct
3. Restart VS Code TypeScript server

## File Structure

```
moments/
├── backend/                 # FastAPI backend
│   ├── main.py             # App entry point
│   ├── core/               # Auth, exceptions, responses
│   ├── models/             # Pydantic models
│   ├── schemas/            # Request/response schemas
│   ├── services/           # Business logic
│   └── routers/            # API endpoints
├── src/
│   ├── api/                # API client and services
│   │   ├── client.ts       # Axios configuration
│   │   ├── auth.ts         # Auth API
│   │   ├── health.ts       # Health API
│   │   ├── calendar.ts     # Calendar API
│   │   ├── journal.ts      # Journal API
│   │   ├── college.ts      # College API
│   │   ├── daily.ts        # Daily API
│   │   └── index.ts        # Exports
│   ├── hooks/              # Custom React hooks
│   │   ├── useAuth.ts      # Auth hook
│   │   ├── useHealth.ts    # Health hook
│   │   ├── useCalendar.ts  # Calendar hook
│   │   ├── useJournal.ts   # Journal hook
│   │   ├── useCollege.ts   # College hook
│   │   ├── useDaily.ts     # Daily hook
│   │   └── index.ts        # Exports
│   └── app/
│       ├── App.tsx         # Main app component
│       └── components/     # Screen components
└── .env                    # Environment variables
```

## API Documentation

Full API documentation available at: `http://localhost:8000/docs` (when backend is running)

## Support

For issues or questions:
1. Check this README
2. Review API docs at `/docs`
3. Check browser console for errors
4. Review backend logs
