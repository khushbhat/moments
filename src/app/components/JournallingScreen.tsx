import { useState } from 'react';
import { ChevronLeft, Plus, Image as ImageIcon, Calendar } from 'lucide-react';
import { useJournalEntries } from '@/hooks';

interface JournallingScreenProps {
  onNavigate: (screen: string) => void;
}

export default function JournallingScreen({ onNavigate }: JournallingScreenProps) {
  const [view, setView] = useState<'list' | 'write'>('list');
  const { data: entries, loading, error } = useJournalEntries({ limit: 20 });

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-primary" style={{ fontFamily: "'Lora', serif" }}>Loading journal entries...</p>
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
      {/* Parchment texture background */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-30"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1617565084799-c4c60ea9ad7a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYXJjaG1lbnQlMjBwYXBlciUyMHRleHR1cmV8ZW58MXx8fHwxNzY1NzQzOTczfDA&ixlib=rb-4.1.0&q=80&w=1080')",
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-4 py-6">
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
            Journal
          </h1>

          <button
            onClick={() => setView(view === 'list' ? 'write' : 'list')}
            className="p-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors border border-primary/30"
          >
            {view === 'list' ? (
              <Plus className="w-5 h-5" />
            ) : (
              <ChevronLeft className="w-5 h-5" />
            )}
          </button>
        </div>

        {view === 'list' ? (
          /* Journal Timeline - Compact grid */
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {(entries || []).map((entry) => (
                <div
                  key={entry.id}
                  className="group cursor-pointer"
                >
                  <div className="bg-card/90 backdrop-blur-sm rounded-md border border-primary/20 overflow-hidden transition-all duration-300 hover:shadow-lg hover:scale-105">
                    {/* Cover image - Smaller */}
                    {(entry.cover_image || (entry.images && entry.images.length > 0)) && (
                      <div className="relative h-24 overflow-hidden">
                        <img 
                          src={entry.cover_image || entry.images[0]}
                          alt={entry.title || 'Journal entry'}
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-card via-card/50 to-transparent" />
                      </div>
                    )}

                    {/* Content - Tighter */}
                    <div className="p-3 space-y-2">
                      <h3 
                        className="text-primary line-clamp-2 text-sm"
                        style={{ fontFamily: "'Cinzel', serif" }}
                      >
                        {entry.title || 'Untitled Entry'}
                      </h3>

                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Calendar className="w-3 h-3" />
                        <span style={{ fontFamily: "'Lora', serif" }}>
                          {new Date(entry.date).toLocaleDateString('en-US', { 
                            month: 'short', 
                            day: 'numeric', 
                            year: 'numeric' 
                          })}
                        </span>
                      </div>

                      <p 
                        className="text-muted-foreground line-clamp-2 text-xs leading-relaxed"
                        style={{ fontFamily: "'Lora', serif" }}
                      >
                        {entry.content}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          /* Writing View - Compact */
          <div className="max-w-3xl mx-auto">
            <div 
              className="bg-cover bg-center rounded-md border border-primary/20 overflow-hidden"
              style={{
                backgroundImage: "linear-gradient(rgba(250, 247, 242, 0.97), rgba(250, 247, 242, 0.97)), url('https://images.unsplash.com/photo-1617565084799-c4c60ea9ad7a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYXJjaG1lbnQlMjBwYXBlciUyMHRleHR1cmV8ZW58MXx8fHwxNzY1NzQzOTczfDA&ixlib=rb-4.1.0&q=80&w=1080')",
              }}
            >
              <div className="p-6">
                {/* Date stamp */}
                <div className="mb-4 flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-muted-foreground" />
                  <span 
                    className="text-muted-foreground text-xs"
                    style={{ fontFamily: "'Lora', serif", fontStyle: 'italic' }}
                  >
                    {formatDate(new Date())}
                  </span>
                </div>

                {/* Title input */}
                <input
                  type="text"
                  placeholder="Title your chronicle..."
                  className="w-full mb-4 px-0 py-2 bg-transparent border-0 border-b border-primary/30 focus:border-primary outline-none transition-colors text-primary text-sm"
                  style={{ 
                    fontFamily: "'Cinzel', serif",
                  }}
                />

                {/* Writing area - Smaller */}
                <textarea
                  placeholder="Begin your story..."
                  className="w-full h-64 p-3 bg-transparent border border-border/30 rounded-md focus:border-primary/50 outline-none resize-none transition-colors text-sm"
                  style={{ 
                    fontFamily: "'Times New Roman', 'Crimson Text', serif",
                    lineHeight: '1.8',
                  }}
                />

                {/* Toolbar - Compact */}
                <div className="mt-4 flex items-center justify-between">
                  <button className="p-2 rounded-md bg-muted/50 hover:bg-muted transition-colors">
                    <ImageIcon className="w-4 h-4 text-muted-foreground" />
                  </button>

                  <button 
                    className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:shadow-lg transition-all text-xs"
                    style={{ 
                      fontFamily: "'Cinzel', serif",
                      letterSpacing: '0.05em',
                    }}
                  >
                    SAVE ENTRY
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}