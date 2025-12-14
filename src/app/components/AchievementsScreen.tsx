import { useState } from 'react';
import { ChevronLeft, Award } from 'lucide-react';

interface AchievementsScreenProps {
  onNavigate: (screen: string) => void;
}

interface Achievement {
  id: string;
  title: string;
  date: Date;
  description: string;
}

export default function AchievementsScreen({ onNavigate }: AchievementsScreenProps) {
  const [achievements] = useState<Achievement[]>([
    { 
      id: '1', 
      title: 'Won Hackathon First Prize', 
      date: new Date('2024-11-15'), 
      description: 'Built an AI-powered task management system in 24 hours' 
    },
    { 
      id: '2', 
      title: 'Published Research Paper', 
      date: new Date('2024-09-20'), 
      description: 'Machine Learning applications in healthcare - IEEE Journal' 
    },
    { 
      id: '3', 
      title: 'Completed AWS Certification', 
      date: new Date('2024-07-10'), 
      description: 'AWS Certified Solutions Architect - Associate' 
    },
    { 
      id: '4', 
      title: 'Selected for Google Summer of Code', 
      date: new Date('2024-05-01'), 
      description: 'Contributing to open-source project for 3 months' 
    },
    { 
      id: '5', 
      title: 'Dean\'s List Academic Excellence', 
      date: new Date('2024-01-15'), 
      description: 'Top 5% of class - GPA 9.2/10' 
    },
  ]);

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-10"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1617565084799-c4c60ea9ad7a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYXJjaG1lbnQlMjBwYXBlciUyMHRleHR1cmV8ZW58MXx8fHwxNzY1NzQzOTczfDA&ixlib=rb-4.1.0&q=80&w=1080')",
        }}
      />

      <div className="relative z-10 max-w-4xl mx-auto px-4 py-6">
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
            Achievements
          </h1>

          <div className="w-10" />
        </div>

        {/* Vertical timeline */}
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-4 top-0 bottom-0 w-px bg-primary/30" />

          {/* Achievement items */}
          <div className="space-y-6">
            {achievements.map((achievement, index) => (
              <div key={achievement.id} className="relative pl-12">
                {/* Timeline dot */}
                <div className="absolute left-2.5 top-2 w-3 h-3 rounded-full bg-primary border-2 border-background" />

                {/* Achievement card */}
                <div className="bg-card/90 backdrop-blur-sm rounded-md border border-primary/20 p-4 hover:shadow-lg transition-all">
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 p-2 rounded-full bg-accent/20">
                      <Award className="w-4 h-4 text-accent" strokeWidth={1.5} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <h3 
                          className="text-sm text-primary"
                          style={{ fontFamily: "'Cinzel', serif" }}
                        >
                          {achievement.title}
                        </h3>
                        <span 
                          className="text-xs text-muted-foreground whitespace-nowrap"
                          style={{ fontFamily: "'Lora', serif" }}
                        >
                          {formatDate(achievement.date)}
                        </span>
                      </div>
                      <p 
                        className="text-xs text-muted-foreground"
                        style={{ fontFamily: "'Lora', serif" }}
                      >
                        {achievement.description}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Add achievement button */}
        <div className="mt-6 flex justify-center">
          <button 
            className="px-6 py-2 bg-primary text-primary-foreground rounded-md border border-primary/30 hover:shadow-lg transition-all text-xs"
            style={{ 
              fontFamily: "'Cinzel', serif",
              letterSpacing: '0.05em',
            }}
          >
            + ADD ACHIEVEMENT
          </button>
        </div>
      </div>
    </div>
  );
}
