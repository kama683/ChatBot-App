# 🤖 ChatWithAI (React Native)

ChatWithAI is a simple and beautiful mobile chat interface that connects to a language model. The app supports light/dark themes, conversation history, and offline local storage via AsyncStorage.


<p align="center">
  <img src="https://github.com/user-attachments/assets/7a3830a8-eedf-4e2c-b310-0075451e5cc6" width="250"/>
  <img src="https://github.com/user-attachments/assets/72f7db07-f301-403b-bb88-29c8b80ecadc" width="250"/>
  <img src="https://github.com/user-attachments/assets/631688f8-4347-40ac-88d5-df01e92fe5a7" width="250"/>
</p>


## ✨ Features

- 🧠 Chat with an AI assistant
- 🎨 Light and dark themes
- 💾 AsyncStorage-based chat history
- 🆕 Start new chats anytime
- 📱 Responsive and minimal design

## ⚙️ Technologies

- React Native
- Expo
- OpenRouter API
- AsyncStorage

## 🚀 Getting Started

### Prerequisites

- Node.js
- Expo CLI (`npm install -g expo-cli`)
- Android Studio (or real Android device)
- Git

### 📥 Installation

```bash
git clone https://github.com/your-username/ChatWithAI.git
cd ChatWithAI
npm install
```

### ▶️ Running the App

```bash
npx expo start
```

Scan the QR code via Expo Go or run on an emulator.

### 📦 Building for Android

```bash
eas build --platform android
```

Ensure you are logged into Expo and `eas.json` is set up.

## 🔐 Environment Variables

Create a file named `env.js` and add your OpenRouter API key:

```js
// env.js
export const OPENROUTER_API_KEY = 'YOUR_API_KEY_HERE';
```

