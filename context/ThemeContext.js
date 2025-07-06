import React, { createContext, useContext, useState } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [isDark, setIsDark] = useState(false);

  const toggleTheme = () => setIsDark(!isDark);

  const theme = {
    isDark,
    toggleTheme,
    colors: isDark
      ? {
          background: '#000',
          text: '#fff',
          inputBg: '#222',
          bubbleUser: '#4CAF50',
          bubbleBot: '#333',
          button: '#444',
        }
      : {
          background: '#fff',
          text: '#000',
          inputBg: '#eee',
          bubbleUser: '#DCF8C6',
          bubbleBot: '#ECECEC',
          button: '#007AFF',
        },
  };

  return (
    <ThemeContext.Provider value={theme}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
