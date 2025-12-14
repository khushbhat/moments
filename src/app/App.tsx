import { useState, useEffect } from 'react';
import { Moon, Sun, Menu } from 'lucide-react';
import HomeScreen from './components/HomeScreen';
import CalendarScreen from './components/CalendarScreen';
import HealthScreen from './components/HealthScreen';
import JournallingScreen from './components/JournallingScreen';
import DailyScreen from './components/DailyScreen';
import CollegeScreen from './components/CollegeScreen';
import WorkScreen from './components/WorkScreen';
import ExamsScreen from './components/ExamsScreen';
import AchievementsScreen from './components/AchievementsScreen';
import MapsScreen from './components/MapsScreen';
import QuickAccessMenu from './components/QuickAccessMenu';

type Screen = 'home' | 'calendar' | 'health' | 'journalling' | 'daily' | 'college' | 'work' | 'exams' | 'achievements' | 'maps';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('home');
  const [isDark, setIsDark] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Initialize theme
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const shouldBeDark = savedTheme === 'dark' || (!savedTheme && prefersDark);
    
    setIsDark(shouldBeDark);
    if (shouldBeDark) {
      document.documentElement.classList.add('dark');
    }
  }, []);

  // Toggle theme
  const toggleTheme = () => {
    const newIsDark = !isDark;
    setIsDark(newIsDark);
    
    if (newIsDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  const handleNavigate = (screen: string) => {
    setCurrentScreen(screen as Screen);
  };

  return (
    <div 
      className="min-h-screen bg-background text-foreground transition-colors duration-500"
      style={{ fontFamily: "'Lora', serif" }}
    >
      {/* Theme toggle button */}
      <button
        onClick={toggleTheme}
        className="fixed top-4 right-16 z-50 p-3 bg-card/90 backdrop-blur-sm rounded-full shadow-xl border border-border/50 hover:scale-110 transition-all duration-300 group"
        aria-label="Toggle theme"
      >
        {isDark ? (
          <Sun className="w-5 h-5 text-primary group-hover:rotate-90 transition-transform duration-300" />
        ) : (
          <Moon className="w-5 h-5 text-primary group-hover:-rotate-12 transition-transform duration-300" />
        )}
      </button>

      {/* Quick access menu button */}
      <button
        onClick={() => setIsMenuOpen(true)}
        className="fixed top-4 right-4 z-50 p-3 bg-card/90 backdrop-blur-sm rounded-full shadow-xl border border-border/50 hover:scale-110 transition-all duration-300"
        aria-label="Quick access menu"
      >
        <Menu className="w-5 h-5 text-primary" />
      </button>

      {/* Quick access menu */}
      <QuickAccessMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />

      {/* Screen Router */}
      {currentScreen === 'home' && <HomeScreen onNavigate={handleNavigate} />}
      {currentScreen === 'daily' && <DailyScreen onNavigate={handleNavigate} />}
      {currentScreen === 'calendar' && <CalendarScreen onNavigate={handleNavigate} />}
      {currentScreen === 'health' && <HealthScreen onNavigate={handleNavigate} />}
      {currentScreen === 'journalling' && <JournallingScreen onNavigate={handleNavigate} />}
      {currentScreen === 'college' && <CollegeScreen onNavigate={handleNavigate} />}
      {currentScreen === 'work' && <WorkScreen onNavigate={handleNavigate} />}
      {currentScreen === 'exams' && <ExamsScreen onNavigate={handleNavigate} />}
      {currentScreen === 'achievements' && <AchievementsScreen onNavigate={handleNavigate} />}
      {currentScreen === 'maps' && <MapsScreen onNavigate={handleNavigate} />}

      {/* Subtle vignette effect */}
      <div className="fixed inset-0 pointer-events-none bg-gradient-radial from-transparent via-transparent to-background/30" />
    </div>
  );
}