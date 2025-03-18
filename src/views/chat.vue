<template>
    <div class="assistant-page">
      <!-- Navigation Header -->
      <header class="main-header">
        <div class="container">
          <div class="logo">
            <h2>EarthChronicle AI</h2>
          </div>
          <nav class="main-nav">
            <a href="#" class="nav-link">Home</a>
            <a href="#" class="nav-link">Timeline</a>
            <a href="#" class="nav-link">Species</a>
            <a href="#" class="nav-link active">Assistant</a>
          </nav>
        </div>
      </header>
  
      <!-- Assistant Section -->
      <section class="assistant-section">
        <div class="container">
          <div class="section-header">
            <h2>EarthChronicle AI Assistant</h2>
            <p>Ask me anything about Earth's history, biodiversity, or conservation!</p>
          </div>
  
          <div class="chat-and-avatar-container">
            <!-- Chat Area -->
            <div class="chat-container" :style="{ width: avatarVisible ? '70%' : '100%' }">
              <TransitionGroup name="fade" tag="div" class="chat-messages">
                <div v-for="(message, index) in messages" :key="index" :class="['message', message.sender]">
                  <div class="message-content">
                    <p>{{ message.text }}</p>
                    <span class="message-time">{{ message.time }}</span>
                  </div>
                </div>
              </TransitionGroup>
            </div>
  
            <!-- Avatar Area (dynamically shown) -->
            <Transition name="slide">
              <div v-if="avatarVisible" class="avatar-container">
                <div class="avatar-placeholder">
                  <p>Digital Avatar (Coming Soon!)</p>
                  <!-- Replace with actual avatar image or 3D model -->
                </div>
              </div>
            </Transition>
  
            <!-- Call Avatar Button -->
            <button v-if="!avatarVisible" class="call-avatar-button" @click="toggleAvatar">
              Call Digital Avatar
            </button>
          </div>
  
          <!-- Chat Input -->
          <div class="chat-input">
            <input
              v-model="userInput"
              type="text"
              placeholder="Type your question..."
              @keyup.enter="sendMessage"
            />
            <button class="send-button" @click="sendMessage">Send</button>
          </div>
        </div>
      </section>
    </div>
  </template>

<script setup>
import { ref, computed } from 'vue'

const userInput = ref('')
const messages = ref([
  {
    text: 'Hello! I’m EarthChronicle AI. How can I assist you today?',
    sender: 'assistant',
    time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
  },
])
const avatarVisible = ref(false)

const sendMessage = () => {
  if (!userInput.value.trim()) return

  // Add user message
  const userMessage = {
    text: userInput.value,
    sender: 'user',
    time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
  }
  messages.value.push(userMessage)

  // Simulate AI response
  setTimeout(() => {
    const aiResponse = {
      text: generateAIResponse(userInput.value),
      sender: 'assistant',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    }
    messages.value.push(aiResponse)
  }, 1000)

  userInput.value = ''
}

const generateAIResponse = (input) => {
  const lowerInput = input.toLowerCase()
  if (lowerInput.includes('dinosaur')) {
    return 'Dinosaurs roamed the Earth during the Mesozoic Era (252-66 million years ago). The most famous extinction event, caused by an asteroid, occurred 66 million years ago.'
  } else if (lowerInput.includes('extinction')) {
    return 'Earth has experienced five major mass extinction events, the most severe being the Permian-Triassic extinction 252 million years ago, wiping out about 96% of marine species.'
  } else if (lowerInput.includes('climate')) {
    return 'Climate regulation is influenced by biodiversity, with ecosystems like forests and oceans storing carbon and mitigating extreme weather. The Cenozoic Era saw significant climate shifts.'
  } else {
    return 'I’m not sure about that! Please ask about Earth’s history, biodiversity, or conservation, and I’ll do my best to help.'
  }
}

const toggleAvatar = () => {
  avatarVisible.value = !avatarVisible.value
}
</script>

<style>
/* Base Styles */
:root {
  --primary-color: #2e7d32;
  --primary-light: #60ad5e;
  --primary-dark: #005005;
  --secondary-color: #1565c0;
  --text-primary: #212121;
  --text-secondary: #757575;
  --background-light: #f5f5f5;
  --background-white: #ffffff;
  --accent-color: #ffc107;
  --border-radius: 8px;
  --box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  --transition: all 0.3s ease;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  line-height: 1.6;
  color: var(--text-primary);
  background-color: var(--background-light);
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem;
}

h1, h2, h3, h4, h5 {
  font-weight: 600;
  line-height: 1.3;
  color: var(--primary-dark);
}

a {
  color: var(--secondary-color);
  text-decoration: none;
  transition: var(--transition);
}

a:hover {
  text-decoration: underline;
}

button {
  cursor: pointer;
  font-family: inherit;
  border: none;
  transition: var(--transition);
}

/* Header Styles */
.main-header {
  background-color: var(--background-white);
  padding: 1rem 0;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 100;
}

.main-header .container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo h2 {
  color: var(--primary-color);
  font-size: 1.5rem;
}

.main-nav {
  display: flex;
  gap: 1.5rem;
}

.nav-link {
  color: var(--text-secondary);
  font-weight: 500;
  padding: 0.5rem 0;
  position: relative;
}

.nav-link:hover, .nav-link.active {
  color: var(--primary-color);
  text-decoration: none;
}

.nav-link.active::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 2px;
  background-color: var(--primary-color);
}

/* Assistant Section */
.assistant-section {
  padding: 5rem 0;
  min-height: calc(100vh - 80px); /* 减去 header 高度 */
  background-color: var(--background-white);
}

.section-header {
  text-align: center;
  margin-bottom: 3rem;
}

.section-header h2 {
  font-size: 2.5rem;
  margin-bottom: 1rem;
}

.section-header p {
  max-width: 700px;
  margin: 0 auto;
  color: var(--text-secondary);
  font-size: 1.1rem;
}

.chat-and-avatar-container {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 2rem;
  margin-bottom: 2rem;
}

.chat-container {
  flex: 1;
  height: 600px; /* 增大对话框高度 */
  overflow-y: auto;
  background-color: var(--background-light);
  border-radius: var(--border-radius);
  padding: 2rem;
  box-shadow: var(--box-shadow);
  transition: width 0.3s ease;
}

.chat-messages {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.message {
  max-width: 70%;
  padding: 1.5rem;
  border-radius: var(--border-radius);
}

.message.user {
  align-self: flex-end;
  background-color: var(--primary-color);
  color: white;
}

.message.assistant {
  align-self: flex-start;
  background-color: var(--background-white);
  border: 1px solid var(--primary-light);
}

.message-content {
  position: relative;
}

.message-content p {
  margin: 0;
  word-wrap: break-word;
}

.message-time {
  display: block;
  font-size: 0.7rem;
  color: var(--text-secondary);
  text-align: right;
  margin-top: 0.25rem;
}

.avatar-container {
  width: 25%;
  height: 600px; /* 与对话框高度一致 */
  background-color: var(--background-light);
  border-radius: var(--border-radius);
  padding: 2rem;
  box-shadow: var(--box-shadow);
  display: flex;
  align-items: center;
  justify-content: center;
}

.avatar-placeholder {
  text-align: center;
  color: var(--text-primary);
}

.call-avatar-button {
  background-color: var(--accent-color);
  color: var(--text-primary);
  padding: 1rem 2rem;
  border-radius: var(--border-radius);
  font-weight: 500;
  position: absolute;
  right: 1.5rem;
  top: 15rem;
  cursor: pointer;
}

.call-avatar-button:hover {
  background-color: #ffb300;
  transform: translateY(-2px);
}

.chat-input {
  max-width: 800px;
  margin: 0 auto;
  display: flex;
  gap: 1rem;
}

.chat-input input {
  flex: 1;
  padding: 1rem;
  border: 1px solid var(--primary-light);
  border-radius: var(--border-radius) 0 0 var(--border-radius);
  font-size: 1rem;
}

.send-button {
  background-color: var(--accent-color);
  color: var(--text-primary);
  padding: 1rem 2rem;
  border-radius: 0 var(--border-radius) var(--border-radius) 0;
  font-weight: 500;
}

.send-button:hover {
  background-color: #ffb300;
  transform: translateY(-2px);
}

/* Animation Definitions */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.slide-enter-active,
.slide-leave-active {
  transition: transform 0.5s ease, opacity 0.5s ease;
}

.slide-enter-from {
  opacity: 0;
  transform: translateX(100%);
}

.slide-leave-to {
  opacity: 0;
  transform: translateX(100%);
}

/* Responsive Styles */
@media (max-width: 1024px) {
  .chat-container {
    height: 500px;
  }

  .avatar-container {
    height: 500px;
  }
}

@media (max-width: 768px) {
  .chat-and-avatar-container {
    flex-direction: column;
  }

  .chat-container {
    width: 100%;
    height: 400px;
  }

  .avatar-container {
    width: 100%;
    height: 300px;
  }

  .call-avatar-button {
    position: static;
    width: 100%;
    margin-top: 1rem;
  }

  .chat-input {
    flex-direction: column;
  }

  .chat-input input {
    border-radius: var(--border-radius);
    margin-bottom: 1rem;
  }

  .send-button {
    border-radius: var(--border-radius);
    padding: 1rem 0;
  }
}

@media (max-width: 480px) {
  .main-header .container {
    flex-direction: column;
    gap: 1rem;
  }

  .main-nav {
    width: 100%;
    justify-content: space-between;
  }

  .section-header h2 {
    font-size: 1.75rem;
  }

  .chat-container {
    height: 300px;
  }

  .avatar-container {
    height: 250px;
  }
}
</style>