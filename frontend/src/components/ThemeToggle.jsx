import { Moon, Sun } from 'lucide-react';
import { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';

export default function ThemeToggle() {
  const { isDark, toggleTheme } = useContext(ThemeContext);

  return (
    <button
      onClick={toggleTheme}
      className="fixed bottom-6 right-6 z-50 p-3.5 rounded-full bg-gray-900 dark:bg-white text-white dark:text-gray-900 shadow-[0_4px_20px_rgba(0,0,0,0.3)] dark:shadow-[0_4px_20px_rgba(255,255,255,0.3)] transition-all hover:scale-110 flex items-center justify-center"
      aria-label="Toggle Theme"
    >
      {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
    </button>
  );
}
