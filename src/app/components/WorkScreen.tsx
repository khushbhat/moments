import { useState } from 'react';
import { ChevronLeft, ChevronDown, ChevronUp } from 'lucide-react';

interface WorkScreenProps {
  onNavigate: (screen: string) => void;
}

interface Project {
  id: string;
  title: string;
  status: 'idea' | 'ongoing' | 'implemented' | 'modify';
}

interface Interview {
  id: string;
  company: string;
  role: string;
  notes: {
    preparation?: string;
    technical?: string;
    hr?: string;
  };
  expanded: boolean;
}

export default function WorkScreen({ onNavigate }: WorkScreenProps) {
  const [activeTab, setActiveTab] = useState<'projects' | 'interviews'>('projects');
  const [projects] = useState<Project[]>([
    { id: '1', title: 'Personal Portfolio Website', status: 'implemented' },
    { id: '2', title: 'Task Management App', status: 'ongoing' },
    { id: '3', title: 'AI Chatbot Integration', status: 'idea' },
    { id: '4', title: 'Blog Platform', status: 'modify' },
    { id: '5', title: 'E-commerce Dashboard', status: 'ongoing' },
  ]);

  const [interviews, setInterviews] = useState<Interview[]>([
    {
      id: '1',
      company: 'Tech Corp',
      role: 'Frontend Developer',
      notes: {
        preparation: 'Reviewed React hooks, system design basics',
        technical: 'Solved 2 coding problems, discussed React optimization',
        hr: 'Discussed team culture and work-life balance',
      },
      expanded: false,
    },
    {
      id: '2',
      company: 'StartupXYZ',
      role: 'Full Stack Engineer',
      notes: {
        preparation: 'Prepared MERN stack projects',
        technical: 'Live coding session - built REST API',
      },
      expanded: false,
    },
  ]);

  const toggleInterview = (id: string) => {
    setInterviews(prev =>
      prev.map(interview =>
        interview.id === id
          ? { ...interview, expanded: !interview.expanded }
          : interview
      )
    );
  };

  const getStatusColor = (status: Project['status']) => {
    switch (status) {
      case 'idea':
        return 'bg-muted/30 border-muted text-muted-foreground';
      case 'ongoing':
        return 'bg-primary/20 border-primary/40 text-primary';
      case 'implemented':
        return 'bg-accent/20 border-accent/40 text-accent';
      case 'modify':
        return 'bg-amber-500/20 border-amber-500/40 text-amber-600 dark:text-amber-400';
    }
  };

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
            Work
          </h1>

          <div className="w-10" />
        </div>

        {/* Tab selector */}
        <div className="flex gap-1 bg-card/80 backdrop-blur-sm rounded-md p-1 border border-primary/20 mb-6">
          <button
            onClick={() => setActiveTab('projects')}
            className={`flex-1 px-4 py-2 rounded-sm transition-all text-xs ${
              activeTab === 'projects'
                ? 'bg-primary text-primary-foreground'
                : 'text-muted-foreground hover:text-foreground'
            }`}
            style={{ fontFamily: "'Cinzel', serif" }}
          >
            PROJECTS
          </button>
          <button
            onClick={() => setActiveTab('interviews')}
            className={`flex-1 px-4 py-2 rounded-sm transition-all text-xs ${
              activeTab === 'interviews'
                ? 'bg-primary text-primary-foreground'
                : 'text-muted-foreground hover:text-foreground'
            }`}
            style={{ fontFamily: "'Cinzel', serif" }}
          >
            INTERVIEWS
          </button>
        </div>

        {/* Content */}
        {activeTab === 'projects' ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {projects.map(project => (
              <div
                key={project.id}
                className="bg-card/90 backdrop-blur-sm rounded-md border border-primary/20 p-4 hover:shadow-lg transition-all"
              >
                <h3 
                  className="text-sm mb-2"
                  style={{ fontFamily: "'Lora', serif" }}
                >
                  {project.title}
                </h3>
                <div className={`inline-flex items-center px-2 py-1 rounded-sm border text-xs ${getStatusColor(project.status)}`}>
                  <span style={{ fontFamily: "'Cinzel', serif", letterSpacing: '0.05em' }}>
                    {project.status.toUpperCase()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-3">
            {interviews.map(interview => (
              <div
                key={interview.id}
                className="bg-card/90 backdrop-blur-sm rounded-md border border-primary/20 overflow-hidden"
              >
                <button
                  onClick={() => toggleInterview(interview.id)}
                  className="w-full px-4 py-3 flex items-center justify-between hover:bg-primary/5 transition-colors"
                >
                  <div className="text-left">
                    <h3 
                      className="text-sm text-primary"
                      style={{ fontFamily: "'Cinzel', serif" }}
                    >
                      {interview.company}
                    </h3>
                    <p 
                      className="text-xs text-muted-foreground mt-0.5"
                      style={{ fontFamily: "'Lora', serif" }}
                    >
                      {interview.role}
                    </p>
                  </div>
                  {interview.expanded ? (
                    <ChevronUp className="w-4 h-4 text-muted-foreground" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-muted-foreground" />
                  )}
                </button>

                {interview.expanded && (
                  <div className="px-4 pb-4 border-t border-primary/10 space-y-3 mt-2">
                    {interview.notes.preparation && (
                      <div>
                        <p 
                          className="text-xs text-primary mb-1"
                          style={{ fontFamily: "'Cinzel', serif", letterSpacing: '0.05em' }}
                        >
                          PREPARATION
                        </p>
                        <p 
                          className="text-xs text-muted-foreground"
                          style={{ fontFamily: "'Lora', serif" }}
                        >
                          {interview.notes.preparation}
                        </p>
                      </div>
                    )}
                    {interview.notes.technical && (
                      <div>
                        <p 
                          className="text-xs text-primary mb-1"
                          style={{ fontFamily: "'Cinzel', serif", letterSpacing: '0.05em' }}
                        >
                          TECHNICAL ROUND
                        </p>
                        <p 
                          className="text-xs text-muted-foreground"
                          style={{ fontFamily: "'Lora', serif" }}
                        >
                          {interview.notes.technical}
                        </p>
                      </div>
                    )}
                    {interview.notes.hr && (
                      <div>
                        <p 
                          className="text-xs text-primary mb-1"
                          style={{ fontFamily: "'Cinzel', serif", letterSpacing: '0.05em' }}
                        >
                          HR ROUND
                        </p>
                        <p 
                          className="text-xs text-muted-foreground"
                          style={{ fontFamily: "'Lora', serif" }}
                        >
                          {interview.notes.hr}
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
