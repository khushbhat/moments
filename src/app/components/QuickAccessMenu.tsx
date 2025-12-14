import { DollarSign, Calendar, FileText, Timer, Bell, X } from 'lucide-react';

interface QuickAccessMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function QuickAccessMenu({ isOpen, onClose }: QuickAccessMenuProps) {
  const menuItems = [
    { id: 'expenses', label: 'Expenses', icon: DollarSign },
    { id: 'daily', label: 'Daily', icon: Calendar },
    { id: 'notes', label: 'Notes / PDFs', icon: FileText },
    { id: 'pomodoro', label: 'Pomodoro', icon: Timer },
    { id: 'reminders', label: 'Reminders', icon: Bell },
  ];

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-background/50 backdrop-blur-sm z-40"
        onClick={onClose}
      />

      {/* Menu panel */}
      <div className="fixed top-0 right-0 h-full w-64 bg-card/95 backdrop-blur-sm border-l border-primary/20 z-50 shadow-2xl">
        <div className="p-4">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 
              className="text-primary text-sm"
              style={{ fontFamily: "'Cinzel', serif", letterSpacing: '0.05em' }}
            >
              QUICK ACCESS
            </h2>
            <button
              onClick={onClose}
              className="p-1.5 rounded-full hover:bg-muted/50 transition-colors"
            >
              <X className="w-4 h-4 text-muted-foreground" />
            </button>
          </div>

          {/* Menu items */}
          <div className="space-y-2">
            {menuItems.map(item => (
              <button
                key={item.id}
                className="w-full flex items-center gap-3 p-3 rounded-md hover:bg-primary/10 transition-colors border border-transparent hover:border-primary/20"
              >
                <div className="flex-shrink-0 p-2 rounded-full bg-primary/10">
                  <item.icon className="w-4 h-4 text-primary" strokeWidth={1.5} />
                </div>
                <span 
                  className="text-sm"
                  style={{ fontFamily: "'Lora', serif" }}
                >
                  {item.label}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
