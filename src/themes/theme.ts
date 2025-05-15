import 'styled-components';
import { DefaultTheme } from 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    background: string;
    text: string;
    link: string;
    linkHover: string;
    buttonBackground: string;
    buttonText: string;
    buttonHover: string;
    headerBackground: string;
    cardBackground: string;
  }
}

export const lightTheme: DefaultTheme = {
  background: '#ffffff',
  text: '#333333',
  link: '#1e90ff',
  linkHover: '#1c86ee',
  buttonBackground: '#1e90ff',
  buttonText: '#ffffff',
  buttonHover: '#1c86ee',
  headerBackground: '#f5f5f5',
  cardBackground: '#f9f9f9',
};

export const darkTheme: DefaultTheme = {
  background: '#1e1e1e',
  text: '#e0e0e0',
  link: '#61dafb',
  linkHover: '#21a1f1',
  buttonBackground: '#61dafb',
  buttonText: '#1e1e1e',
  buttonHover: '#21a1f1',
  headerBackground: '#333333',
  cardBackground: '#2a2a2a',
};
