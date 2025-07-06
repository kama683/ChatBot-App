import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import Icon from 'react-native-vector-icons/Ionicons';

const ChatMessage = ({ message, isUser }) => {
  const { colors } = useTheme();

  return (
    <View
      style={[
        styles.messageContainer,
        { flexDirection: isUser ? 'row-reverse' : 'row' },
      ]}
    >
      {!isUser && (
        <View style={styles.avatar}>
          <Icon name="hardware-chip-outline" size={24} color="#888" />
        </View>
      )}
      <View
        style={[
          styles.bubble,
          { backgroundColor: isUser ? colors.bubbleUser : colors.bubbleBot },
        ]}
      >
        <Text style={[styles.text, { color: colors.text }]}>{message}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  messageContainer: {
    paddingVertical: 6,
    paddingHorizontal: 10,
    alignItems: 'flex-start',
  },
  avatar: {
    marginHorizontal: 6,
    marginTop: 4,
  },
  bubble: {
    borderRadius: 15,
    padding: 12,
    maxWidth: '80%',
  },
  text: {
    fontSize: 16,
    lineHeight: 20,
  },
});

export default ChatMessage;
