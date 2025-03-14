
import { createContext, useContext, useEffect, useState } from 'react';

type ThemeType = 'blue' | 'teal' | 'dark';

type ThemeContextType = {
  theme: ThemeType;
  setTheme: (theme: ThemeType) => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<ThemeType>('blue');

  useEffect(() => {
    // Get theme from localStorage if available
    const savedTheme = localStorage.getItem('mail-theme') as ThemeType;
    if (savedTheme && ['blue', 'teal', 'dark'].includes(savedTheme)) {
      setTheme(savedTheme);
    }
  }, []);

  useEffect(() => {
    // Apply theme class to body
    document.body.classList.remove('theme-blue', 'theme-teal', 'theme-dark');
    document.body.classList.add(`theme-${theme}`);
    
    // Save to localStorage
    localStorage.setItem('mail-theme', theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
