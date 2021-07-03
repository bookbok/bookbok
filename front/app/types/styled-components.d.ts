import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    color: {
      background: {
        base: string;
        component: string;
        note: string;
      };
      button: {
        primary: string;
        secondary: string;
        warning: string;
      };
      surface: {
        hover: string;
        press: string;
        focus: string;
        error: string;
      };
      divider: string;
      text: {
        primary: string;
        secondary: string;
        link: string;
        warning: string;
      };
      opacity: {
        disabled: string;
      };
    };
    padding: {
      xs: string;
      s: string;
      m: string;
      l: string;
      xl: string;
      xxl: string;
    };
    font: {
      size: {
        minimum: string;
        xs: string;
        s: string;
        m: string;
        l: string;
        xl: string;
      };
      height: {
        minimum: string;
        xs: string;
        s: string;
        m: string;
        l: string;
        xl: string;
      };
    };
    component: {
      main: {
        width: string;
      };
    };
  }
}
