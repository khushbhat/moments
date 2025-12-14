import { useState } from 'react';
import { ChevronLeft, ChevronDown, ChevronUp, Calendar, Heart, BookOpen, GraduationCap } from 'lucide-react';
import { useDailySummary } from '@/hooks';

interface DailyScreenProps {
  onNavigate: (screen: string) => void;
}

export default function DailyScreen({ onNavigate }: DailyScreenProps) {
  const [expandedSections, setExpandedSections] = useState<string[]>(['health']);
  const [selectedDate, setSelectedDate] = useState(new Date());
  
  const dateString = selectedDate.toISOString().split('T')[0];
  const { data: summary, loading, error } = useDailySummary(dateString);

  const toggleSection = (section: string) => {
    setExpandedSections(prev =>
      prev.includes(section)
        ? prev.filter(s => s !== section)
        : [...prev, section]
    );
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      month: 'long', 
      day: 'numeric', 
      year: 'numeric' 
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-primary" style={{ fontFamily: "'Lora', serif" }}>Loading daily summary...</p>
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
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-10"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1617565084799-c4c60ea9ad7a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYXJjaG1lbnQlMjBwYXBlciUyMHRleHR1cmV8ZW58MXx8fHwxNzY1NzQzOTczfDA&ixlib=rb-4.1.0&q=80&w=1080')",
        }}
      />

      <div className="relative z-10 max-w-5xl mx-auto px-4 py-6">
        {/* Header */}
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
            Daily
          </h1>

          <div className="w-10" />
        </div>

        {/* Date selector */}
        <div className="mb-6 text-center">
          <p 
            className="text-primary text-sm"
            style={{ fontFamily: "'Cinzel', serif" }}
          >
            {formatDate(selectedDate)}
          </p>
        </div>

        {/* Daily Summary Cards */}
        <div className="space-y-3">
          {/* Health Section */}
          <div className="bg-card/90 backdrop-blur-sm rounded-md border border-primary/20 overflow-hidden">
            <button
              onClick={() => toggleSection('health')}
              className="w-full px-4 py-3 flex items-center justify-between hover:bg-primary/5 transition-colors"
            >
              <div className="flex items-center gap-3">
                <Heart className="w-4 h-4 text-primary" strokeWidth={1.5} />
                <span 
                  className="text-sm text-primary"
                  style={{ fontFamily: "'Cinzel', serif" }}
                >
                  HEALTH
                </span>
              </div>
              {expandedSections.includes('health') ? (
                <ChevronUp className="w-4 h-4 text-muted-foreground" />
              ) : (
                <ChevronDown className="w-4 h-4 text-muted-foreground" />
              )}
            </button>
            
            {expandedSections.includes('health') && summary?.health && (
              <div className="px-4 pb-4 border-t border-primary/10">
                <div className="grid grid-cols-3 gap-3 mt-3">
                  <div className="text-center p-2 bg-muted/30 rounded-sm">
                    <p className="text-xs text-muted-foreground" style={{ fontFamily: "'Cinzel', serif" }}>Water</p>
                    <p className="text-sm" style={{ fontFamily: "'Lora', serif" }}>
                      {summary.health.water || 0}/8
                    </p>
                  </div>
                  <div className="text-center p-2 bg-muted/30 rounded-sm">
                    <p className="text-xs text-muted-foreground" style={{ fontFamily: "'Cinzel', serif" }}>Steps</p>
                    <p className="text-sm" style={{ fontFamily: "'Lora', serif" }}>
                      {summary.health.steps ? (summary.health.steps / 1000).toFixed(1) + 'k' : '0'}
                    </p>
                  </div>
                  <div className="text-center p-2 bg-muted/30 rounded-sm">
                    <p className="text-xs text-muted-foreground" style={{ fontFamily: "'Cinzel', serif" }}>Meals</p>
                    <p className="text-sm" style={{ fontFamily: "'Lora', serif" }}>
                      {summary.health.meals?.length || 0}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* College Section */}
          <div className="bg-card/90 backdrop-blur-sm rounded-md border border-primary/20 overflow-hidden">
            <button
              onClick={() => toggleSection('college')}
              className="w-full px-4 py-3 flex items-center justify-between hover:bg-primary/5 transition-colors"
            >
              <div className="flex items-center gap-3">
                <GraduationCap className="w-4 h-4 text-primary" strokeWidth={1.5} />
                <span 
                  className="text-sm text-primary"
                  style={{ fontFamily: "'Cinzel', serif" }}
                >
                  COLLEGE TASKS
                </span>
              </div>
              {expandedSections.includes('college') ? (
                <ChevronUp className="w-4 h-4 text-muted-foreground" />
              ) : (
                <ChevronDown className="w-4 h-4 text-muted-foreground" />
              )}
            </button>
            
            {expandedSections.includes('college') && summary?.college_tasks && (
              <div className="px-4 pb-4 border-t border-primary/10 space-y-2 mt-3">
                {summary.college_tasks.slice(0, 3).map((task) => (
                  <div key={task.id} className="flex items-center justify-between p-2 bg-accent/10 rounded-sm border border-accent/30">
                    <span className="text-xs" style={{ fontFamily: "'Lora', serif" }}>{task.title}</span>
                    <span className="text-xs">{task.status === 'completed' ? '✓' : task.status === 'in_progress' ? '◐' : '○'}</span>
                  </div>
                ))}
                {summary.college_tasks.length === 0 && (
                  <p className="text-xs text-muted-foreground text-center py-2" style={{ fontFamily: "'Lora', serif" }}>
                    No tasks for today
                  </p>
                )}
              </div>
            )}
          </div>

          {/* Exams Section */}
          <div className="bg-card/90 backdrop-blur-sm rounded-md border border-primary/20 overflow-hidden">
            <button
              onClick={() => toggleSection('exams')}
              className="w-full px-4 py-3 flex items-center justify-between hover:bg-primary/5 transition-colors"
            >
              <div className="flex items-center gap-3">
                <BookOpen className="w-4 h-4 text-primary" strokeWidth={1.5} />
                <span 
                  className="text-sm text-primary"
                  style={{ fontFamily: "'Cinzel', serif" }}
                >
                  EXAMS
                </span>
              </div>
              {expandedSections.includes('exams') ? (
                <ChevronUp className="w-4 h-4 text-muted-foreground" />
              ) : (
                <ChevronDown className="w-4 h-4 text-muted-foreground" />
              )}
            </button>
            
            {expandedSections.includes('exams') && (
              <div className="px-4 pb-4 border-t border-primary/10 mt-3">
                <p className="text-xs text-muted-foreground" style={{ fontFamily: "'Lora', serif" }}>
                  Next exam: Mathematics - Unit 3
                </p>
                <p className="text-xs text-primary mt-1" style={{ fontFamily: "'Lora', serif" }}>
                  In 5 days
                </p>
              </div>
            )}
          </div>

          {/* Calendar Events */}
          <div className="bg-card/90 backdrop-blur-sm rounded-md border border-primary/20 overflow-hidden">
            <button
              onClick={() => toggleSection('events')}
              className="w-full px-4 py-3 flex items-center justify-between hover:bg-primary/5 transition-colors"
            >
              <div className="flex items-center gap-3">
                <Calendar className="w-4 h-4 text-primary" strokeWidth={1.5} />
                <span 
                  className="text-sm text-primary"
                  style={{ fontFamily: "'Cinzel', serif" }}
                >
                  EVENTS
                </span>
              </div>
              {expandedSections.includes('events') ? (
                <ChevronUp className="w-4 h-4 text-muted-foreground" />
              ) : (
                <ChevronDown className="w-4 h-4 text-muted-foreground" />
              )}
            </button>
            
            {expandedSections.includes('events') && (
              <div className="px-4 pb-4 border-t border-primary/10 space-y-2 mt-3">
                <div className="p-2 bg-primary/10 rounded-sm border border-primary/30">
                  <p className="text-xs" style={{ fontFamily: "'Lora', serif" }}>14:00 - Study session</p>
                </div>
                <div className="p-2 bg-muted/20 rounded-sm border border-muted">
                  <p className="text-xs" style={{ fontFamily: "'Lora', serif" }}>18:00 - Evening ritual</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
