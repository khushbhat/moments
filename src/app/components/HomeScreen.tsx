import { Calendar, Heart, BookOpen } from 'lucide-react';

interface HomeScreenProps {
  onNavigate: (screen: string) => void;
}

export default function HomeScreen({ onNavigate }: HomeScreenProps) {
  const features = [
    { id: 'daily', title: 'Daily', description: 'Your daily chronicle', icon: Calendar },
    { id: 'calendar', title: 'Calendar', description: 'Track your moments', icon: Calendar },
    { id: 'health', title: 'Health', description: 'Well-being records', icon: Heart },
    { id: 'journalling', title: 'Journal', description: 'Sacred writings', icon: BookOpen },
    { id: 'college', title: 'College', description: 'Academic tasks', icon: BookOpen },
    { id: 'work', title: 'Work', description: 'Projects & interviews', icon: BookOpen },
    { id: 'exams', title: 'Exams', description: 'Study records', icon: BookOpen },
    { id: 'achievements', title: 'Achievements', description: 'Milestones', icon: BookOpen },
    { id: 'maps', title: 'Maps', description: 'Journey trails', icon: BookOpen },
  ];

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background with temple texture */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-20 dark:opacity-10"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1714593216669-595b046ff738?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYWxpJTIwdGVtcGxlJTIwYXJjaGl0ZWN0dXJlfGVufDF8fHx8MTc2NTcwMzgwN3ww&ixlib=rb-4.1.0&q=80&w=1080')",
          backgroundBlendMode: 'multiply',
        }}
      />
      
      {/* Foliage overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-10 dark:opacity-5"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1659431245880-4e9ad1225f1d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxqdW5nbGUlMjBmb2xpYWdlJTIwZ3JlZW58ZW58MXx8fHwxNzY1NzQzOTczfDA&ixlib=rb-4.1.0&q=80&w=1080')",
          mixBlendMode: 'overlay',
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-4 py-8">
        {/* Hero Section - More compact */}
        <div className="text-center mb-12">
          <h1 
            className="mb-3"
            style={{ 
              fontFamily: "'Parisienne', cursive",
              fontSize: 'clamp(3rem, 8vw, 5rem)',
              lineHeight: 1,
              color: 'var(--primary)',
              textShadow: '2px 2px 4px rgba(0,0,0,0.1)',
            }}
          >
            moments
          </h1>
          <p 
            className="opacity-80 tracking-wider text-sm"
            style={{ 
              fontFamily: "'Cinzel', serif",
              letterSpacing: '0.2em',
            }}
          >
            be yourself, work for yourself
          </p>
        </div>

        {/* Feature Cards - Compact grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {features.map((feature) => (
            <button
              key={feature.id}
              onClick={() => onNavigate(feature.id)}
              className="group relative overflow-hidden rounded-md transition-all duration-300 hover:scale-105"
              style={{
                fontFamily: "'Lora', serif",
              }}
            >
              {/* Card background with texture */}
              <div className="absolute inset-0 bg-card/90 backdrop-blur-sm" />
              <div 
                className="absolute inset-0 opacity-10 bg-cover bg-center"
                style={{ 
                  backgroundImage: "url('https://images.unsplash.com/photo-1617565084799-c4c60ea9ad7a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYXJjaG1lbnQlMjBwYXBlciUyMHRleHR1cmV8ZW58MXx8fHwxNzY1NzQzOTczfDA&ixlib=rb-4.1.0&q=80&w=1080')" 
                }}
              />
              
              {/* Card content */}
              <div className="relative p-4 flex flex-col items-center text-center space-y-2 border border-primary/20 rounded-md">
                {/* Icon */}
                <div className="p-2 rounded-full bg-primary/10">
                  <feature.icon className="w-5 h-5 text-primary" strokeWidth={1.5} />
                </div>

                {/* Title */}
                <h3 
                  style={{ 
                    fontFamily: "'Cinzel', serif",
                    fontSize: '0.875rem',
                  }}
                  className="text-primary"
                >
                  {feature.title}
                </h3>

                {/* Description */}
                <p className="text-muted-foreground text-xs leading-snug">
                  {feature.description}
                </p>
              </div>

              {/* Hover glow */}
              <div className="absolute inset-0 bg-gradient-to-t from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}