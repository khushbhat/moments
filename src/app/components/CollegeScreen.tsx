import { ChevronLeft, Check } from 'lucide-react';
import { useCollegeTasks } from '@/hooks';

interface CollegeScreenProps {
  onNavigate: (screen: string) => void;
}

export default function CollegeScreen({ onNavigate }: CollegeScreenProps) {
  const { data: tasks, loading, error } = useCollegeTasks({ limit: 50 });

  const assignments = (tasks || []).filter(t => t.type === 'assignment');
  const projects = (tasks || []).filter(t => t.type === 'project');

  const formatDueDate = (dateString?: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    const days = Math.ceil((date.getTime() - Date.now()) / 86400000);
    if (days < 0) return 'Completed';
    if (days === 0) return 'Due today';
    if (days === 1) return 'Due tomorrow';
    return `Due in ${days} days`;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-primary" style={{ fontFamily: "'Lora', serif" }}>Loading college tasks...</p>
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
            College
          </h1>

          <div className="w-10" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Assignments */}
          <div className="space-y-3">
            <h2 
              className="text-sm text-primary px-2"
              style={{ fontFamily: "'Cinzel', serif", letterSpacing: '0.05em' }}
            >
              ASSIGNMENTS
            </h2>
            
            <div className="space-y-2">
              {assignments.map(task => (
                <div
                  key={task.id}
                  className={`p-3 rounded-md border transition-all ${
                    task.status === 'completed'
                      ? 'bg-accent/10 border-accent/30 opacity-60'
                      : 'bg-card/90 border-primary/20 backdrop-blur-sm'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1">
                      <p 
                        className={`text-sm ${task.status === 'completed' ? 'line-through' : ''}`}
                        style={{ fontFamily: "'Lora', serif" }}
                      >
                        {task.title}
                      </p>
                      <p 
                        className="text-xs text-muted-foreground mt-1"
                        style={{ fontFamily: "'Lora', serif" }}
                      >
                        {formatDueDate(task.due_date)}
                      </p>
                    </div>
                    <div className={`flex-shrink-0 w-5 h-5 rounded-full border flex items-center justify-center ${
                      task.status === 'completed'
                        ? 'bg-accent border-accent'
                        : 'border-primary/30'
                    }`}>
                      {task.status === 'completed' && (
                        <Check className="w-3 h-3 text-primary-foreground" strokeWidth={3} />
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Projects */}
          <div className="space-y-3">
            <h2 
              className="text-sm text-primary px-2"
              style={{ fontFamily: "'Cinzel', serif", letterSpacing: '0.05em' }}
            >
              PROJECTS
            </h2>
            
            <div className="space-y-2">
              {projects.map(task => (
                <div
                  key={task.id}
                  className={`p-3 rounded-md border transition-all ${
                    task.status === 'completed'
                      ? 'bg-accent/10 border-accent/30 opacity-60'
                      : 'bg-card/90 border-primary/20 backdrop-blur-sm'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1">
                      <p 
                        className={`text-sm ${task.status === 'completed' ? 'line-through' : ''}`}
                        style={{ fontFamily: "'Lora', serif" }}
                      >
                        {task.title}
                      </p>
                      <p 
                        className="text-xs text-muted-foreground mt-1"
                        style={{ fontFamily: "'Lora', serif" }}
                      >
                        {formatDueDate(task.due_date)}
                      </p>
                    </div>
                    <div className={`flex-shrink-0 w-5 h-5 rounded-full border flex items-center justify-center ${
                      task.status === 'completed'
                        ? 'bg-accent border-accent'
                        : 'border-primary/30'
                    }`}>
                      {task.status === 'completed' && (
                        <Check className="w-3 h-3 text-primary-foreground" strokeWidth={3} />
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Add task button */}
        <div className="mt-6 flex justify-center">
          <button 
            className="px-6 py-2 bg-primary text-primary-foreground rounded-md border border-primary/30 hover:shadow-lg transition-all text-xs"
            style={{ 
              fontFamily: "'Cinzel', serif",
              letterSpacing: '0.05em',
            }}
          >
            + ADD TASK
          </button>
        </div>
      </div>
    </div>
  );
}
