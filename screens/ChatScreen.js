import React, { useState, useRef, useEffect } from 'react';
import { View, TextInput, ScrollView, StyleSheet, KeyboardAvoidingView, Platform, TouchableOpacity,} from 'react-native';
import ChatMessage from '../components/ChatMessage';
import { useTheme } from '../context/ThemeContext';
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const OPENROUTER_API_KEY = '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'; 

const ChatScreen = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef();
  const { colors, toggleTheme, isDark } = useTheme();

  useEffect(() => {
    const loadHistory = async () => {
      try {
        const stored = await AsyncStorage.getItem('chat_history');
        if (stored) {
          setMessages(JSON.parse(stored));
        }
      } catch (err) {
        console.error('Failed to load chat history:', err);
      }
    };
    loadHistory();
  }, []);

  useEffect(() => {
    AsyncStorage.setItem('chat_history', JSON.stringify(messages)).catch(err =>
      console.error('Failed to save chat history:', err)
    );
  }, [messages]);

  const handleNewChat = async () => {
    setMessages([]);
    setInput('');
    await AsyncStorage.removeItem('chat_history');
  };

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { message: input, isUser: true };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    try {
      const res = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${OPENROUTER_API_KEY}`,
          'Content-Type': 'application/json',
          'HTTP-Referer': 'http://localhost',
          'X-Title': 'ChatWithAI',
        },
        body: JSON.stringify({
          model: 'mistralai/mistral-7b-instruct',
          messages: [{ role: 'user', content: input }],
        }),
      });

      const data = await res.json();
      const aiText = data?.choices?.[0]?.message?.content || 'No response from model.';
      const aiMessage = { message: aiText.trim(), isUser: false };
      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error('Error:', error.message);
      setMessages(prev => [...prev, { message: 'Error: ' + error.message, isUser: false }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      <ScrollView
        ref={scrollRef}
        style={styles.chatBox}
        onContentSizeChange={() => scrollRef.current?.scrollToEnd({ animated: true })}
      >
        {messages.map((msg, index) => (
          <ChatMessage key={index} message={msg.message} isUser={msg.isUser} />
        ))}
        {isTyping && <ChatMessage message="Typing..." isUser={false} />}
      </ScrollView>

      <View style={styles.inputRow}>
        <View style={styles.iconsLeft}>
          <TouchableOpacity onPress={handleNewChat} style={styles.iconButton}>
            <Icon name="chatbubble-ellipses-outline" size={35} color={colors.text} />
          </TouchableOpacity>
          <TouchableOpacity onPress={toggleTheme} style={styles.iconButton}>
            <Icon
              name={isDark ? 'sunny-outline' : 'moon-outline'}
              size={35}
              color={colors.text}
            />
          </TouchableOpacity>
        </View>

        <View style={[styles.inputContainer, { backgroundColor: colors.inputBg }]}>
          <TextInput
            value={input}
            onChangeText={setInput}
            style={[styles.input, { color: colors.text }]}
            placeholder="Type your message..."
            placeholderTextColor={isDark ? '#aaa' : '#555'}
          />
          <TouchableOpacity onPress={sendMessage}>
            <Icon name="send" size={24} color={isDark ? '#aaa' : '#555'} />
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    paddingTop: 50,
  },
  chatBox: {
    flex: 1,
    marginBottom: 10,
  },
  inputRow: {

    flexDirection: 'row',
    alignItems: 'flex-end',
    marginBottom: 30,
  },
  iconsLeft: {
    marginBottom: 20,
    justifyContent: 'space-between',
    marginRight: 10,
    height: 70,
  },
  iconButton: {
    padding: 4,
  },
  inputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 25,
    paddingHorizontal: 15,
    paddingVertical: 8,
  },
  input: {
    flex: 1,
    fontSize: 16,
    marginRight: 10,
  },
});

export default ChatScreen;
