import React from 'react';
import { default as defaultTheme } from './default-theme.json';

export const ThemeContext = React.createContext({
  theme: defaultTheme,
});
