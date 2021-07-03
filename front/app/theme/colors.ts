import { DefaultTheme } from 'styled-components';

export const defaultColors: DefaultTheme['color'] = {
  background: {
    base: '#fafafa',
    component: '#ffffff',
    note: '#f0f2f5',
  },
  button: {
    primary: '#1976d2',
    secondary: '#e4e6eb',
    warning: '#f44336',
  },
  surface: {
    hover: 'rgba(0, 0, 0, 0.05)',
    press: 'rgba(0, 0, 0, 0.25)',
    focus: '#1976d2',
    error: '#f44336',
  },
  divider: '#ced0d4',
  text: {
    primary: '#050505',
    secondary: '#65676b',
    link: '#3578e5',
    warning: '#f44336',
  },
  opacity: {
    disabled: '0.3',
  },
};

export const darkColors: DefaultTheme['color'] = {
  background: {
    base: '#18191A',
    component: '#242526',
    note: '#3a3b3c',
  },
  button: {
    primary: '#1976d2',
    secondary: 'rgba(255, 255, 255, 0.1)',
    warning: '#f44336',
  },
  surface: {
    hover: 'rgba(255, 255, 255, 0.1)',
    press: 'rgba(255, 255, 255, 0.3)',
    focus: '#1976d2',
    error: '#f44336',
  },
  divider: '#3e4042',
  text: {
    primary: '#e4e6eb',
    secondary: '#b0b3b8',
    link: '#3578e5',
    warning: '#f44336',
  },
  opacity: {
    disabled: '0.3',
  },
};
