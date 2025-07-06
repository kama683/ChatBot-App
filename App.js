import React from 'react';
import ChatScreen from './screens/ChatScreen';
import { ThemeProvider } from './context/ThemeContext';

export default function App() {
  return (
    <ThemeProvider>
      <ChatScreen />
    </ThemeProvider>
  );
}
