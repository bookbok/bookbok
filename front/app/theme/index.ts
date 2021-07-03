import { useMemo } from 'react';
import { DefaultTheme } from 'styled-components';
import { darkColors, defaultColors } from './colors';

export const useTheme = (isDark: boolean): DefaultTheme =>
  useMemo(
    () => ({
      color: isDark ? darkColors : defaultColors,
      padding: {
        xs: '0.4rem',
        s: '0.8rem',
        m: '1.6rem',
        l: '2.4rem',
        xl: '3.2rem',
        xxl: '4.0rem',
      },
      font: {
        size: {
          minimum: '1rem',
          xs: '1.2rem',
          s: '1.4rem',
          m: '1.6rem',
          l: '2.0rem',
          xl: '2.4rem',
        },
        height: {
          minimum: '1.4rem',
          xs: '1.6rem',
          s: '2.2rem',
          m: '2.4rem',
          l: '2.8rem',
          xl: '3.2rem',
        },
      },
      component: {
        main: { width: '1400px' },
      },
    }),
    [isDark]
  );
