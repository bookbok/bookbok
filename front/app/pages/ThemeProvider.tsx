import { createTheme } from '@material-ui/core';
import { ThemeProvider as MaterialThemeProvider } from '@material-ui/styles';
import { ReactNode, useMemo } from 'react';
import { DefaultTheme, ThemeProvider as StyledThemeProvider } from 'styled-components';

export default function ThemeProvider({ children }: { children: ReactNode }) {
  const theme = useTheme(false);
  return (
    <MaterialThemeProvider theme={theme}>
      <StyledThemeProvider theme={theme}>{children}</StyledThemeProvider>
    </MaterialThemeProvider>
  );
}

const useTheme = (isDark: boolean): DefaultTheme =>
  useMemo(
    () => ({
      ...createTheme({
        palette: {
          type: isDark ? 'dark' : 'light',
        },
      }),
    }),
    [isDark]
  );
