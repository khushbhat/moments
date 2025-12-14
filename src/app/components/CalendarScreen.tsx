import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Circle } from 'lucide-react';
import { useCalendarEvents } from '@/hooks';

interface CalendarScreenProps {
  onNavigate: (screen: string) => void;
}

export default function CalendarScreen({ onNavigate }: CalendarScreenProps) {
  const [view, setView] = useState<'month' | 'day' | 'hour'>('month');
  const [selectedDate, setSelectedDate] = useState(new Date());

  // Get start and end dates for the current month
  const startDate = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1).toISOString().split('T')[0];
  const endDate = new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 0).toISOString().split('T')[0];

  // Fetch events
  const { data: events, loading, error } = useCalendarEvents({
    start_date: startDate,
    end_date: endDate,
    limit: 50,
  });

  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 
                      'July', 'August', 'September', 'October', 'November', 'December'];

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();
    
    return { daysInMonth, startingDayOfWeek };
  };

  const { daysInMonth, startingDayOfWeek } = getDaysInMonth(selectedDate);
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const emptyDays = Array.from({ length: startingDayOfWeek }, (_, i) => i);

  const getCategoryColor = (category?: string) => {
    switch (category) {
      case 'work':
        return 'bg-blue-500/20 border-blue-500/40';
      case 'college':
        return 'bg-purple-500/20 border-purple-500/40';
      case 'health':
        return 'bg-green-500/20 border-green-500/40';
      case 'personal':
        return 'bg-amber-500/20 border-amber-500/40';
      default:
        return 'bg-muted/50 border-muted-foreground/20';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-primary" style={{ fontFamily: "'Lora', serif" }}>Loading calendar...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-destructive" style={{ fontFamily: "'Lora', serif" }}>Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Stone texture background */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-10"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1697577313866-1e2b0a867727?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbmNpZW50JTIwdGVtcGxlJTIwc3RvbmUlMjB0ZXh0dXJlfGVufDF8fHx8MTc2NTc0Mzk3Mnww&ixlib=rb-4.1.0&q=80&w=1080')",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 py-6">
        {/* Header - Compact */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => onNavigate('home')}
            className="p-2 rounded-lg bg-card/80 backdrop-blur-sm hover:bg-card transition-colors border border-primary/20"
          >
            <ChevronLeft className="w-5 h-5 text-primary" />
          </button>

          <h1 
            className="text-primary"
            style={{ 
              fontFamily: "'Parisienne', cursive",
              fontSize: 'clamp(1.5rem, 3vw, 2.5rem)',
            }}
          >
            Calendar
          </h1>

          {/* View toggles - Smaller */}
          <div className="flex gap-1 bg-card/80 backdrop-blur-sm rounded-md p-1 border border-primary/20">
            {(['month', 'day', 'hour'] as const).map((v) => (
              <button
                key={v}
                onClick={() => setView(v)}
                className={`px-3 py-1 rounded-sm transition-all text-xs ${
                  view === v 
                    ? 'bg-primary text-primary-foreground' 
                    : 'text-muted-foreground hover:text-foreground'
                }`}
                style={{ fontFamily: "'Cinzel', serif" }}
              >
                {v.charAt(0).toUpperCase() + v.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Calendar Content - Tighter grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Main Calendar View */}
          <div className="lg:col-span-2">
            <div className="bg-card/90 backdrop-blur-sm rounded-md p-4 border border-primary/20">
              {/* Month navigation - Compact */}
              <div className="flex items-center justify-between mb-4">
                <button 
                  onClick={() => setSelectedDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth() - 1))}
                  className="p-1.5 rounded-full hover:bg-primary/10 transition-colors"
                >
                  <ChevronLeft className="w-4 h-4 text-primary" />
                </button>
                
                <h2 
                  className="text-primary text-sm"
                  style={{ fontFamily: "'Cinzel', serif" }}
                >
                  {monthNames[selectedDate.getMonth()]} {selectedDate.getFullYear()}
                </h2>
                
                <button 
                  onClick={() => setSelectedDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1))}
                  className="p-1.5 rounded-full hover:bg-primary/10 transition-colors"
                >
                  <ChevronRight className="w-4 h-4 text-primary" />
                </button>
              </div>

              {/* Calendar grid - Tighter spacing */}
              <div className="grid grid-cols-7 gap-1">
                {/* Day headers */}
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                  <div 
                    key={day}
                    className="text-center p-2 text-muted-foreground text-xs"
                    style={{ fontFamily: "'Cinzel', serif" }}
                  >
                    {day}
                  </div>
                ))}

                {/* Empty cells for days before month starts */}
                {emptyDays.map((i) => (
                  <div key={`empty-${i}`} className="aspect-square" />
                ))}

                {/* Days - Smaller cells */}
                {days.map((day) => {
                  const isToday = day === new Date().getDate() && 
                                  selectedDate.getMonth() === new Date().getMonth() &&
                                  selectedDate.getFullYear() === new Date().getFullYear();
                  
                  return (
                    <button
                      key={day}
                      className={`
                        aspect-square p-1 rounded-md transition-all text-xs
                        ${isToday 
                          ? 'bg-primary/20 border border-primary ring-1 ring-primary/30' 
                          : 'hover:bg-muted/50 border border-transparent'
                        }
                      `}
                      style={{ fontFamily: "'Lora', serif" }}
                    >
                      <div className="flex flex-col items-center justify-center h-full">
                        <span className={isToday ? 'text-primary' : 'text-foreground'}>
                          {day}
                        </span>
                        {isToday && (
                          <Circle className="w-1 h-1 fill-primary text-primary mt-0.5" />
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Events Timeline - Compact scroll */}
          <div className="lg:col-span-1">
            <div 
              className="bg-cover bg-center rounded-md border border-primary/20 overflow-hidden"
              style={{
                backgroundImage: "linear-gradient(rgba(250, 247, 242, 0.95), rgba(250, 247, 242, 0.95)), url('https://images.unsplash.com/photo-1617565084799-c4c60ea9ad7a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYXJjaG1lbnQlMjBwYXBlciUyMHRleHR1cmV8ZW58MXx8fHwxNzY1NzQzOTczfDA&ixlib=rb-4.1.0&q=80&w=1080')",
              }}
            >
              <div className="p-4">
                <h3 
                  className="mb-3 text-primary text-sm"
                  style={{ fontFamily: "'Cinzel', serif" }}
                >
                  Today's Chronicle
                </h3>

                <div className="space-y-2">
                  {(events || []).map((event) => {
                    const eventTime = event.start_time ? new Date(event.start_time).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false }) : '';
                    return (
                      <div
                        key={event.id}
                        className={`p-3 rounded-md border ${getCategoryColor(event.category)} backdrop-blur-sm transition-all hover:shadow-sm`}
                      >
                        <div className="flex items-start justify-between mb-1">
                          <span 
                            className="text-xs opacity-70"
                            style={{ fontFamily: "'Lora', serif" }}
                          >
                            {eventTime}
                          </span>
                          {event.category && (
                            <span className="text-xs px-2 py-0.5 rounded bg-background/50 capitalize" style={{ fontFamily: "'Cinzel', serif" }}>
                              {event.category}
                            </span>
                          )}
                        </div>
                        <p className="text-sm font-medium" style={{ fontFamily: "'Lora', serif" }}>
                          {event.title}
                        </p>
                        {event.description && (
                          <p className="text-xs text-muted-foreground mt-1" style={{ fontFamily: "'Lora', serif" }}>
                            {event.description}
                          </p>
                        )}
                      </div>
                    );
                  })}
                  {(!events || events.length === 0) && (
                    <p className="text-xs text-muted-foreground text-center py-4" style={{ fontFamily: "'Lora', serif" }}>
                      No events for this period
                    </p>
                  )}
                </div>

                {/* Legend - Compact */}
                <div className="mt-4 pt-3 border-t border-border/50">
                  <p 
                    className="text-xs text-muted-foreground mb-2"
                    style={{ fontFamily: "'Cinzel', serif", letterSpacing: '0.05em' }}
                  >
                    MARKS
                  </p>
                  <div className="space-y-1 text-xs" style={{ fontFamily: "'Lora', serif" }}>
                    <div className="flex items-center gap-2">
                      <span className="text-xs">✓</span>
                      <span className="text-muted-foreground">Done</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs">◐</span>
                      <span className="text-muted-foreground">Active</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs">○</span>
                      <span className="text-muted-foreground">Planned</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}