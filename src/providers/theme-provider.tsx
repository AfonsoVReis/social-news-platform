'use client';
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import { ReactNode, createContext, useEffect, useState } from 'react';
import { getTheme } from '@/theme/theme';

export type ThemeType = 'light' | 'dark';

export interface ThemeContextType {
  theme: ThemeType;
  setTheme: (theme: ThemeType) => void;
}

export const ThemeContext = createContext<ThemeContextType | undefined>(
  undefined,
);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<ThemeType | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedTheme =
        (localStorage.getItem('theme') as ThemeType) || 'light';
      setTheme(storedTheme);
    }
  }, []);

  const handleSetTheme = (newTheme: ThemeType) => {
    setTheme(newTheme);

    if (typeof window !== 'undefined') {
      localStorage.setItem('theme', newTheme);
    }
  };

  if (!theme) {
    return;
  }

  return (
    <ThemeContext.Provider value={{ setTheme: handleSetTheme, theme }}>
      <MuiThemeProvider theme={getTheme(theme)}>{children}</MuiThemeProvider>
    </ThemeContext.Provider>
  );
};
