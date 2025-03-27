'use client';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import { SvgIcon } from '@mui/material';
import { useCallback } from 'react';
import { useTheme } from '@/hooks/use-theme';
import { IconButton } from '@/components/icon-button';

export const ThemeSwitcher = () => {
  const { setTheme, theme } = useTheme();

  const handleOnThemeChange = useCallback(() => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  }, [setTheme, theme]);

  return (
    <IconButton onClick={handleOnThemeChange}>
      {theme === 'light' ? (
        <SvgIcon color="secondary">
          <LightModeIcon />
        </SvgIcon>
      ) : (
        <SvgIcon color="secondary">
          <DarkModeIcon />
        </SvgIcon>
      )}
    </IconButton>
  );
};
