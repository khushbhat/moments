import { useState } from 'react';
import { ChevronLeft, MapPin, X } from 'lucide-react';

interface MapsScreenProps {
  onNavigate: (screen: string) => void;
}

interface Location {
  id: string;
  name: string;
  country: string;
  status: 'visited' | 'planned';
  description: string;
  image?: string;
  coordinates: { lat: number; lng: number };
}

export default function MapsScreen({ onNavigate }: MapsScreenProps) {
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);
  const [locations] = useState<Location[]>([
    {
      id: '1',
      name: 'Bali',
      country: 'Indonesia',
      status: 'visited',
      description: 'Explored ancient temples and rice terraces',
      image: 'https://images.unsplash.com/photo-1714593216669-595b046ff738?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYWxpJTIwdGVtcGxlJTIwYXJjaGl0ZWN0dXJlfGVufDF8fHx8MTc2NTcwMzgwN3ww&ixlib=rb-4.1.0&q=80&w=400',
      coordinates: { lat: -8.4095, lng: 115.1889 },
    },
    {
      id: '2',
      name: 'Kyoto',
      country: 'Japan',
      status: 'planned',
      description: 'Visit traditional temples and gardens',
      coordinates: { lat: 35.0116, lng: 135.7681 },
    },
    {
      id: '3',
      name: 'Varanasi',
      country: 'India',
      status: 'visited',
      description: 'Sacred city on the Ganges, ancient temples',
      coordinates: { lat: 25.3176, lng: 82.9739 },
    },
    {
      id: '4',
      name: 'Machu Picchu',
      country: 'Peru',
      status: 'planned',
      description: 'Ancient Incan citadel in the Andes',
      coordinates: { lat: -13.1631, lng: -72.5450 },
    },
  ]);

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Globe background */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-30"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1659431245880-4e9ad1225f1d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxqdW5nbGUlMjBmb2xpYWdlJTIwZ3JlZW58ZW58MXx8fHwxNzY1NzQzOTczfDA&ixlib=rb-4.1.0&q=80&w=1080')",
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-4 py-6 h-screen flex flex-col">
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
            Maps
          </h1>

          <div className="w-10" />
        </div>

        {/* Map visualization area */}
        <div className="flex-1 relative rounded-lg overflow-hidden border border-primary/20 bg-card/50 backdrop-blur-sm">
          {/* Simplified map representation */}
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-20"
            style={{
              backgroundImage: "url('https://images.unsplash.com/photo-1697577313866-1e2b0a867727?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbmNpZW50JTIwdGVtcGxlJTIwc3RvbmUlMjB0ZXh0dXJlfGVufDF8fHx8MTc2NTc0Mzk3Mnww&ixlib=rb-4.1.0&q=80&w=1080')",
            }}
          />

          {/* Location pins - positioned relatively */}
          <div className="absolute inset-0 p-8">
            <div className="relative h-full">
              {locations.map((location, index) => {
                // Simple positioning based on index for demo
                const positions = [
                  { top: '30%', left: '70%' },
                  { top: '25%', left: '80%' },
                  { top: '35%', left: '62%' },
                  { top: '60%', left: '25%' },
                ];
                const pos = positions[index] || { top: '50%', left: '50%' };

                return (
                  <button
                    key={location.id}
                    onClick={() => setSelectedLocation(location)}
                    className="absolute transform -translate-x-1/2 -translate-y-1/2 group"
                    style={{ top: pos.top, left: pos.left }}
                  >
                    <div 
                      className={`p-2 rounded-full border-2 transition-all ${
                        location.status === 'visited'
                          ? 'bg-green-500/30 border-green-500 hover:bg-green-500/50'
                          : 'bg-blue-500/30 border-blue-500 hover:bg-blue-500/50'
                      }`}
                    >
                      <MapPin 
                        className={`w-4 h-4 ${
                          location.status === 'visited' ? 'text-green-600' : 'text-blue-600'
                        }`} 
                        strokeWidth={2}
                      />
                    </div>
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-1 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                      <p 
                        className="text-xs bg-card/90 px-2 py-1 rounded border border-primary/20"
                        style={{ fontFamily: "'Lora', serif" }}
                      >
                        {location.name}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Legend */}
          <div className="absolute bottom-4 left-4 bg-card/90 backdrop-blur-sm rounded-md border border-primary/20 p-3">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-green-500 border border-green-600" />
                <span className="text-xs" style={{ fontFamily: "'Lora', serif" }}>Visited</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-blue-500 border border-blue-600" />
                <span className="text-xs" style={{ fontFamily: "'Lora', serif" }}>Planned</span>
              </div>
            </div>
          </div>
        </div>

        {/* Location info card */}
        {selectedLocation && (
          <div className="fixed inset-0 bg-background/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-card/95 backdrop-blur-sm rounded-lg border border-primary/20 max-w-md w-full overflow-hidden">
              {selectedLocation.image && (
                <div className="h-32 overflow-hidden">
                  <img 
                    src={selectedLocation.image} 
                    alt={selectedLocation.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <div className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 
                      className="text-primary text-sm"
                      style={{ fontFamily: "'Cinzel', serif" }}
                    >
                      {selectedLocation.name}
                    </h3>
                    <p 
                      className="text-xs text-muted-foreground"
                      style={{ fontFamily: "'Lora', serif" }}
                    >
                      {selectedLocation.country}
                    </p>
                  </div>
                  <button
                    onClick={() => setSelectedLocation(null)}
                    className="p-1 rounded-full hover:bg-muted/50 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
                
                <div className={`inline-flex items-center px-2 py-1 rounded-sm border text-xs mb-3 ${
                  selectedLocation.status === 'visited'
                    ? 'bg-green-500/20 border-green-500/40 text-green-600'
                    : 'bg-blue-500/20 border-blue-500/40 text-blue-600'
                }`}>
                  <span style={{ fontFamily: "'Cinzel', serif", letterSpacing: '0.05em' }}>
                    {selectedLocation.status.toUpperCase()}
                  </span>
                </div>

                <p 
                  className="text-xs text-muted-foreground"
                  style={{ fontFamily: "'Lora', serif" }}
                >
                  {selectedLocation.description}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
