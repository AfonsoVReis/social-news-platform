'use client';
import { createTheme } from '@mui/material/styles';
import { Inter } from 'next/font/google';

const inter = Inter({
  display: 'swap',
  subsets: ['latin'],
  weight: ['300', '400', '500', '700'],
});

export const themes = {
  dark: 'dark',
  light: 'light',
};

const defaultThemeProps = {
  breakpoints: {
    values: {
      lg: 1200,
      md: 1024,
      sm: 600,
      xl: 1536,
      xs: 0,
    },
  },
  colorSchemes: { dark: false, light: true },
  cssVariables: {
    colorSchemeSelector: 'class',
  },
  typography: {
    fontFamily: inter.style.fontFamily,
  },
};

export const darkTheme = createTheme({
  ...defaultThemeProps,
  palette: {
    background: {
      default: '#000000',
      paper: '#313030',
    },
    primary: {
      main: '#FFF',
    },
    secondary: {
      main: '#000000',
    },
    text: {
      primary: '#ffffff',
      secondary: '#bbbbbb',
    },
  },
});

export const lightTheme = createTheme({
  ...defaultThemeProps,
  palette: {
    background: {
      default: '#ffffff',
      paper: '#f8f8f8',
    },
    primary: {
      main: '#000000',
    },
    secondary: {
      main: '#ffffff',
    },
    text: {
      primary: '#000000',
      secondary: '#555555',
    },
  },
  typography: {
    fontFamily: inter.style.fontFamily,
  },
});

export const getTheme = (theme = themes.light) => {
  if (theme === themes.light) {
    return lightTheme;
  }

  return darkTheme;
};
