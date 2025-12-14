import { ChevronLeft, Droplets, Footprints, Moon, Utensils } from 'lucide-react';
import { useHealthEntries } from '@/hooks';

interface HealthScreenProps {
  onNavigate: (screen: string) => void;
}

export default function HealthScreen({ onNavigate }: HealthScreenProps) {
  const { data: entries, loading, error } = useHealthEntries({ limit: 10 });

  const getMoonPhaseIcon = (phase: string | null) => {
    switch (phase) {
      case 'new':
        return '🌑';
      case 'waxing':
        return '🌓';
      case 'full':
        return '🌕';
      case 'waning':
        return '🌗';
      default:
        return '';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-primary" style={{ fontFamily: "'Lora', serif" }}>Loading health data...</p>
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
      {/* Palm leaf texture background */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-10"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1661072870117-ac57183ba2d4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYWxtJTIwbGVhZiUyMHRleHR1cmV8ZW58MXx8fHwxNzY1NzQzOTcyfDA&ixlib=rb-4.1.0&q=80&w=1080')",
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
            Health
          </h1>

          <div className="w-10" /> {/* Spacer */}
        </div>

        {/* Health entries - Compact cards */}
        <div className="space-y-3">
          {(entries || []).map((entry) => (
            <div
              key={entry.id}
              className="bg-card/90 backdrop-blur-sm rounded-md border border-primary/20 overflow-hidden"
            >
              {/* Date header - Minimal */}
              <div 
                className="px-4 py-2 bg-cover bg-center relative border-b border-primary/10"
                style={{
                  backgroundImage: "linear-gradient(rgba(139, 115, 85, 0.05), rgba(139, 115, 85, 0.02)), url('https://images.unsplash.com/photo-1697577313866-1e2b0a867727?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbmNpZW50JTIwdGVtcGxlJTIwc3RvbmUlMjB0ZXh0dXJlfGVufDF8fHx8MTc2NTc0Mzk3Mnww&ixlib=rb-4.1.0&q=80&w=400')",
                }}
              >
                <h3 
                  className="text-primary text-sm"
                  style={{ 
                    fontFamily: "'Cinzel', serif",
                    letterSpacing: '0.05em',
                  }}
                >
                  {formatDate(entry.date)}
                </h3>
              </div>

              {/* Content grid - Tighter */}
              <div className="p-4 grid grid-cols-2 md:grid-cols-4 gap-4">
                {/* Water intake */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="p-1.5 rounded-full bg-blue-500/10">
                      <Droplets className="w-4 h-4 text-blue-600 dark:text-blue-400" strokeWidth={1.5} />
                    </div>
                    <span 
                      className="text-muted-foreground text-xs"
                      style={{ fontFamily: "'Cinzel', serif" }}
                    >
                      WATER
                    </span>
                  </div>
                  
                  <div className="flex flex-wrap gap-1">
                    {Array.from({ length: 8 }, (_, i) => (
                      <div
                        key={i}
                        className={`w-5 h-7 rounded border ${
                          i < (entry.water || 0)
                            ? 'bg-blue-400/30 border-blue-500'
                            : 'bg-transparent border-muted'
                        }`}
                      />
                    ))}
                  </div>
                  <p style={{ fontFamily: "'Lora', serif" }} className="text-xs">
                    {entry.water || 0} / 8
                  </p>
                </div>

                {/* Steps */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="p-1.5 rounded-full bg-amber-500/10">
                      <Footprints className="w-4 h-4 text-amber-600 dark:text-amber-400" strokeWidth={1.5} />
                    </div>
                    <span 
                      className="text-muted-foreground text-xs"
                      style={{ fontFamily: "'Cinzel', serif" }}
                    >
                      STEPS
                    </span>
                  </div>
                  
                  <div className="space-y-1">
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-amber-500 to-amber-600 rounded-full"
                        style={{ width: `${Math.min(((entry.steps || 0) / 10000) * 100, 100)}%` }}
                      />
                    </div>
                    <p style={{ fontFamily: "'Lora', serif" }} className="text-xs">
                      {(entry.steps || 0).toLocaleString()}
                    </p>
                  </div>
                </div>

                {/* Meals */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="p-1.5 rounded-full bg-green-500/10">
                      <Utensils className="w-4 h-4 text-green-600 dark:text-green-400" strokeWidth={1.5} />
                    </div>
                    <span 
                      className="text-muted-foreground text-xs"
                      style={{ fontFamily: "'Cinzel', serif" }}
                    >
                      MEALS
                    </span>
                  </div>
                  
                  <div className="space-y-1">
                    {(entry.meals || []).map((meal, idx) => (
                      <div
                        key={idx}
                        className="p-1.5 rounded-sm bg-green-500/5 border border-green-500/20"
                      >
                        <p 
                          style={{ fontFamily: "'Lora', serif" }} 
                          className="text-xs truncate"
                        >
                          {meal}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Cycle */}
                {entry.cycle && (
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="p-1.5 rounded-full bg-purple-500/10">
                        <Moon className="w-4 h-4 text-purple-600 dark:text-purple-400" strokeWidth={1.5} />
                      </div>
                      <span 
                        className="text-muted-foreground text-xs"
                        style={{ fontFamily: "'Cinzel', serif" }}
                      >
                        CYCLE
                      </span>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">{getMoonPhaseIcon(entry.cycle)}</span>
                      <p 
                        style={{ fontFamily: "'Lora', serif" }} 
                        className="text-xs capitalize"
                      >
                        {entry.cycle}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Add new entry button - Smaller */}
        <div className="mt-6 flex justify-center">
          <button 
            className="px-6 py-2 bg-primary text-primary-foreground rounded-md border border-primary/30 hover:shadow-lg transition-all text-xs"
            style={{ 
              fontFamily: "'Cinzel', serif",
              letterSpacing: '0.05em',
            }}
          >
            + NEW ENTRY
          </button>
        </div>
      </div>
    </div>
  );
}