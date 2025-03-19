<template>
  <div class="assistant-page">
    <!-- Main Layout -->
    <div class="main-layout" :class="{ 'drawer-open': isDrawerOpen }">
      <!-- File Drawer -->
      <div class="file-drawer" :class="{ 'open': isDrawerOpen }">
        <div class="drawer-header">
          <h2>Knowledge Base</h2>
          <button class="close-drawer-button" @click="toggleDrawer">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
        
        <div class="file-upload-area">
          <label for="file-upload" class="upload-label">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
              <polyline points="17 8 12 3 7 8"></polyline>
              <line x1="12" y1="3" x2="12" y2="15"></line>
            </svg>
            <span>Upload Files</span>
            <span class="file-types">Supports: PDF, DOCX, TXT, MD</span>
          </label>
          <input 
            type="file" 
            id="file-upload" 
            @change="handleFileUpload" 
            accept=".pdf,.docx,.txt,.md" 
            multiple 
            class="file-input"
          >
        </div>
        
        <div class="files-list">
          <h3>Your Files</h3>
          <div v-if="files.length === 0" class="no-files">
            <p>No files uploaded yet</p>
          </div>
          <div v-else class="file-items">
            <div 
              v-for="(file, index) in files" 
              :key="index" 
              class="file-item"
              @click="previewFile(file)"
              :class="{ 'active': selectedFile && selectedFile.id === file.id }"
            >
              <div class="file-icon">
                <svg v-if="file.type === 'pdf'" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                  <polyline points="14 2 14 8 20 8"></polyline>
                  <path d="M9 15h6"></path>
                  <path d="M9 11h6"></path>
                </svg>
                <svg v-else-if="file.type === 'docx'" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                  <polyline points="14 2 14 8 20 8"></polyline>
                  <line x1="16" y1="13" x2="8" y2="13"></line>
                  <line x1="16" y1="17" x2="8" y2="17"></line>
                  <polyline points="10 9 9 9 8 9"></polyline>
                </svg>
                <svg v-else xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                  <polyline points="14 2 14 8 20 8"></polyline>
                  <line x1="16" y1="13" x2="8" y2="13"></line>
                  <line x1="16" y1="17" x2="8" y2="17"></line>
                </svg>
              </div>
              <div class="file-info">
                <div class="file-name">{{ file.name }}</div>
                <div class="file-meta">{{ formatFileSize(file.size) }} · {{ file.type.toUpperCase() }}</div>
              </div>
              <button class="delete-file" @click.stop="deleteFile(index)">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <polyline points="3 6 5 6 21 6"></polyline>
                  <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Main Content -->
      <div class="main-content">
        <!-- Header -->
        <header class="assistant-header">
          <button class="drawer-toggle" @click="toggleDrawer">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
          </button>
          <h1 @click="goBack" style="cursor: pointer;">AI Assistant</h1>
          <div class="header-actions">
            <button class="clear-chat-button" @click="clearChat">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M3 6h18"></path>
                <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
                <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
              </svg>
              <span>Clear Chat</span>
            </button>
          </div>
        </header>
        
        <!-- Chat Area -->
        <div class="chat-container" :class="{ 'avatar-active': isAvatarActive }">
          <!-- Digital Human Space -->
          <div class="digital-human-container" v-if="isAvatarActive">
            <div class="digital-human-placeholder">
              <div class="avatar-frame">
                <img v-if="avatarLoaded" src="../assets/2.svg?height=400&width=300" alt="Digital Human" class="avatar-image">
                <div v-else class="avatar-loading">
                  <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="loading-icon">
                    <circle cx="12" cy="12" r="10"></circle>
                    <path d="M12 6v6l4 2"></path>
                  </svg>
                  <span>Loading Digital Human...</span>
                </div>
              </div>
            </div>
            <button class="close-avatar-button" @click="toggleAvatar">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>
          
          <!-- Chat Messages -->
          <div class="chat-messages" ref="chatMessages">
            <div v-if="messages.length === 0" class="welcome-message">
              <div class="welcome-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <circle cx="12" cy="12" r="10"></circle>
                  <path d="M8 14s1.5 2 4 2 4-2 4-2"></path>
                  <line x1="9" y1="9" x2="9.01" y2="9"></line>
                  <line x1="15" y1="9" x2="15.01" y2="9"></line>
                </svg>
              </div>
              <h2>Welcome to AI Assistant</h2>
              <p>Ask me anything or upload documents to your knowledge base.</p>
            </div>
            
            <div 
              v-for="(message, index) in messages" 
              :key="index" 
              :class="['message', message.sender === 'user' ? 'user-message' : 'assistant-message']"
            >
              <div class="message-avatar">
                <div v-if="message.sender === 'user'" class="user-avatar">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                  </svg>
                </div>
                <div v-else class="assistant-avatar">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M12 2a8 8 0 0 1 8 8v12l-4-4-4 4-4-4-4 4V10a8 8 0 0 1 8-8z"></path>
                  </svg>
                </div>
              </div>
              <div class="message-content">
                <div class="message-sender">{{ message.sender === 'user' ? 'You' : 'Assistant' }}</div>
                <div class="message-text" v-html="formatMessage(message.text)"></div>
                <div class="message-time">{{ formatTime(message.timestamp) }}</div>
              </div>
            </div>
            
            <div v-if="isTyping" class="message assistant-message typing">
              <div class="message-avatar">
                <div class="assistant-avatar">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M12 2a8 8 0 0 1 8 8v12l-4-4-4 4-4-4-4 4V10a8 8 0 0 1 8-8z"></path>
                  </svg>
                </div>
              </div>
              <div class="message-content">
                <div class="message-sender">Assistant</div>
                <div class="typing-indicator">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            </div>
          </div>
          
          <!-- File Preview -->
          <div class="file-preview" v-if="selectedFile">
            <div class="preview-header">
              <h3>{{ selectedFile.name }}</h3>
              <button class="close-preview-button" @click="closePreview">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>
            <div class="preview-content">
              <div v-if="selectedFile.type === 'pdf'" class="pdf-preview">
                <iframe :src="selectedFile.url" width="100%" height="100%"></iframe>
              </div>
              <div v-else-if="selectedFile.type === 'txt' || selectedFile.type === 'md'" class="text-preview">
                <pre>{{ selectedFile.content }}</pre>
              </div>
              <div v-else class="generic-preview">
                <p>Preview not available for this file type. Click the button below to use this document in your conversation.</p>
              </div>
            </div>
            <div class="preview-actions">
              <button class="use-document-button" @click="useDocumentInChat">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                  <polyline points="7 10 12 15 17 10"></polyline>
                  <line x1="12" y1="15" x2="12" y2="3"></line>
                </svg>
                <span>Use in Conversation</span>
              </button>
            </div>
          </div>
          
          <!-- Chat Input -->
          <div class="chat-input-container">
            <div class="input-wrapper">
              <textarea 
                v-model="userInput" 
                @keydown.enter.prevent="sendMessage"
                placeholder="Type your message here..."
                class="chat-input"
                ref="chatInput"
                rows="1"
                @input="autoResizeInput"
              ></textarea>
              <button class="send-button" @click="sendMessage" :disabled="!userInput.trim()">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <line x1="22" y1="2" x2="11" y2="13"></line>
                  <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                </svg>
              </button>
              <button class="avatar-toggle-button" @click="toggleAvatar">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
                <span>{{ isAvatarActive ? 'Hide' : 'Show' }} Digital Human</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, nextTick, watch } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const goBack = () => {
  if (window.history.length > 1) {
    router.go(-1)
  } else {
    router.push({ name: 'Home' })
  }
}
// State
const isDrawerOpen = ref(false)
const isAvatarActive = ref(false)
const avatarLoaded = ref(false)
const userInput = ref('')
const messages = ref([])
const isTyping = ref(false)
const files = ref([])
const selectedFile = ref(null)
const chatMessages = ref(null)
const chatInput = ref(null)

// Toggle drawer
const toggleDrawer = () => {
  isDrawerOpen.value = !isDrawerOpen.value
}

// Toggle avatar
const toggleAvatar = () => {
  isAvatarActive.value = !isAvatarActive.value
  
  if (isAvatarActive.value) {
    // Simulate avatar loading
    setTimeout(() => {
      avatarLoaded.value = true
    }, 1500)
  }
}

// Send message
const sendMessage = async () => {
  if (!userInput.value.trim()) return
  
  // Add user message
  const userMessage = {
    sender: 'user',
    text: userInput.value,
    timestamp: new Date()
  }
  
  messages.value.push(userMessage)
  
  // Clear input and scroll to bottom
  userInput.value = ''
  await nextTick()
  scrollToBottom()
  
  // Simulate assistant typing
  isTyping.value = true
  
  // Simulate response delay
  setTimeout(() => {
    isTyping.value = false
    
    // Add assistant response
    const assistantMessage = {
      sender: 'assistant',
      text: generateResponse(userMessage.text),
      timestamp: new Date()
    }
    
    messages.value.push(assistantMessage)
    
    // Scroll to bottom again after response
    nextTick(() => {
      scrollToBottom()
    })
  }, 1500)
}

// Auto-resize input
const autoResizeInput = () => {
  if (!chatInput.value) return
  
  chatInput.value.style.height = 'auto'
  chatInput.value.style.height = Math.min(chatInput.value.scrollHeight, 150) + 'px'
}

// Scroll to bottom of chat
const scrollToBottom = () => {
  if (chatMessages.value) {
    chatMessages.value.scrollTop = chatMessages.value.scrollHeight
  }
}

// Clear chat
const clearChat = () => {
  if (messages.value.length > 0) {
    if (confirm('Are you sure you want to clear the chat history?')) {
      messages.value = []
    }
  }
}

// Handle file upload
const handleFileUpload = (event) => {
  const uploadedFiles = event.target.files
  
  if (!uploadedFiles.length) return
  
  Array.from(uploadedFiles).forEach(file => {
    const fileType = file.name.split('.').pop().toLowerCase()
    
    // Create file object
    const fileObj = {
      id: Date.now() + Math.random().toString(36).substring(2, 9),
      name: file.name,
      size: file.size,
      type: fileType,
      url: URL.createObjectURL(file),
      content: null
    }
    
    // For text files, read content
    if (fileType === 'txt' || fileType === 'md') {
      const reader = new FileReader()
      reader.onload = (e) => {
        fileObj.content = e.target.result
      }
      reader.readAsText(file)
    }
    
    files.value.push(fileObj)
  })
  
  // Reset file input
  event.target.value = null
}

// Delete file
const deleteFile = (index) => {
  // If the file to delete is currently selected, close preview
  if (selectedFile.value && selectedFile.value.id === files.value[index].id) {
    selectedFile.value = null
  }
  
  // Remove file
  files.value.splice(index, 1)
}

// Preview file
const previewFile = (file) => {
  selectedFile.value = file
}

// Close preview
const closePreview = () => {
  selectedFile.value = null
}

// Use document in chat
const useDocumentInChat = () => {
  if (!selectedFile.value) return
  
  userInput.value = `I want to ask about the document: ${selectedFile.value.name}`
  closePreview()
  
  // Focus on input
  nextTick(() => {
    chatInput.value.focus()
  })
}

// Format file size
const formatFileSize = (bytes) => {
  if (bytes < 1024) return bytes + ' B'
  else if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB'
  else return (bytes / 1048576).toFixed(1) + ' MB'
}

// Format message with line breaks
const formatMessage = (text) => {
  return text.replace(/\n/g, '<br>')
}

// Format timestamp
const formatTime = (timestamp) => {
  return new Intl.DateTimeFormat('en-US', {
    hour: '2-digit',
    minute: '2-digit'
  }).format(timestamp)
}

// Generate simple response (placeholder)
const generateResponse = (userText) => {
  const responses = [
    "I understand you're asking about " + userText.substring(0, 30) + "... Could you provide more details?",
    "That's an interesting question. Let me think about " + userText.substring(0, 20) + "...",
    "I've analyzed your query about " + userText.substring(0, 25) + " and here's what I found...",
    "Based on my knowledge, I can help you with your question about " + userText.substring(0, 15) + ".",
    "I'm processing your request about " + userText.substring(0, 20) + ". Here's what I can tell you..."
  ]
  
  return responses[Math.floor(Math.random() * responses.length)]
}

// Watch for changes in messages to scroll to bottom
watch(messages, () => {
  nextTick(() => {
    scrollToBottom()
  })
})

// Lifecycle hooks
onMounted(() => {
  // Focus on input when component mounts
  chatInput.value.focus()
})
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
  --border-color: #e0e0e0;
  --drawer-width: 320px;
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
  overflow: hidden;
  height: 100vh;
}

.assistant-page {
  height: 100vh;
  overflow: hidden;
}

/* Main Layout */
.main-layout {
  display: flex;
  height: 100vh;
  position: relative;
  transition: var(--transition);
}

/* File Drawer */
.file-drawer {
  width: var(--drawer-width);
  height: 100%;
  background-color: var(--background-white);
  box-shadow: 2px 0 8px rgba(0, 0, 0, 0.1);
  position: absolute;
  left: calc(-1 * var(--drawer-width));
  top: 0;
  z-index: 50;
  transition: var(--transition);
  display: flex;
  flex-direction: column;
}

.file-drawer.open {
  left: 0;
}

.drawer-header {
  padding: 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid var(--border-color);
}

.drawer-header h2 {
  color: var(--primary-dark);
  font-size: 1.5rem;
}

.close-drawer-button {
  background: none;
  border: none;
  color: var(--text-secondary);
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: var(--transition);
}

.close-drawer-button:hover {
  background-color: var(--background-light);
  color: var(--text-primary);
}

.file-upload-area {
  padding: 1.5rem;
  border-bottom: 1px solid var(--border-color);
}

.upload-label {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  border: 2px dashed var(--border-color);
  border-radius: var(--border-radius);
  cursor: pointer;
  transition: var(--transition);
  text-align: center;
}

.upload-label:hover {
  border-color: var(--primary-color);
  background-color: rgba(46, 125, 50, 0.05);
}

.upload-label svg {
  color: var(--primary-color);
  margin-bottom: 1rem;
}

.upload-label span {
  font-weight: 500;
  color: var(--text-primary);
}

.file-types {
  font-size: 0.8rem;
  color: var(--text-secondary);
  margin-top: 0.5rem;
}

.file-input {
  display: none;
}

.files-list {
  flex: 1;
  padding: 1.5rem;
  overflow-y: auto;
}

.files-list h3 {
  margin-bottom: 1rem;
  color: var(--text-primary);
}

.no-files {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100px;
  color: var(--text-secondary);
  font-style: italic;
}

.file-items {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.file-item {
  display: flex;
  align-items: center;
  padding: 0.75rem;
  border-radius: var(--border-radius);
  background-color: var(--background-light);
  cursor: pointer;
  transition: var(--transition);
  position: relative;
}

.file-item:hover {
  background-color: rgba(46, 125, 50, 0.1);
}

.file-item.active {
  background-color: rgba(46, 125, 50, 0.15);
  border-left: 3px solid var(--primary-color);
}

.file-icon {
  margin-right: 0.75rem;
  color: var(--primary-color);
}

.file-info {
  flex: 1;
  overflow: hidden;
}

.file-name {
  font-weight: 500;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.file-meta {
  font-size: 0.8rem;
  color: var(--text-secondary);
}

.delete-file {
  background: none;
  border: none;
  color: var(--text-secondary);
  cursor: pointer;
  padding: 0.25rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: var(--transition);
}

.delete-file:hover {
  background-color: rgba(244, 67, 54, 0.1);
  color: #f44336;
}

/* Main Content */
.main-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  height: 100%;
  transition: var(--transition);
  margin-left: 0;
}

.drawer-open .main-content {
  margin-left: var(--drawer-width);
}

/* Assistant Header */
.assistant-header {
  display: flex;
  align-items: center;
  padding: 1rem 1.5rem;
  background-color: var(--background-white);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  z-index: 10;
}

.drawer-toggle {
  background: none;
  border: none;
  color: var(--text-secondary);
  cursor: pointer;
  padding: 0.5rem;
  margin-right: 1rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: var(--transition);
}

.drawer-toggle:hover {
  background-color: var(--background-light);
  color: var(--text-primary);
}

.assistant-header h1 {
  font-size: 1.5rem;
  color: var(--primary-dark);
  flex: 1;
}

.header-actions {
  display: flex;
  gap: 0.5rem;
}

.clear-chat-button {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background-color: var(--background-light);
  border: none;
  border-radius: var(--border-radius);
  color: var(--text-secondary);
  font-size: 0.9rem;
  cursor: pointer;
  transition: var(--transition);
}

.clear-chat-button:hover {
  background-color: rgba(244, 67, 54, 0.1);
  color: #f44336;
}

/* Chat Container */
.chat-container {
  flex: 1;
  display: flex;
  flex-direction: column;
  position: relative;
  transition: var(--transition);
}

.chat-container.avatar-active {
  padding-left: 300px; /* Space for digital human */
}

/* Digital Human Container */
.digital-human-container {
  position: absolute;
  left: 0;
  top: 0;
  width: 300px;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.03);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 5;
  border-right: 1px solid var(--border-color);
}

.digital-human-placeholder {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
}

.avatar-frame {
  width: 240px;
  height: 320px;
  background-color: var(--background-light);
  border-radius: var(--border-radius);
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: var(--box-shadow);
}

.avatar-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.avatar-loading {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: var(--text-secondary);
}

.loading-icon {
  animation: spin 2s linear infinite;
  margin-bottom: 1rem;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.close-avatar-button {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: none;
  border: none;
  color: var(--text-secondary);
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: var(--transition);
}

.close-avatar-button:hover {
  background-color: var(--background-light);
  color: var(--text-primary);
}

/* Chat Messages */
.chat-messages {
  flex: 1;
  max-height: 83.5vh;
  padding: 1.5rem;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  background-color: var(--background-light);
}

.welcome-message {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 3rem 1rem;
  margin: auto 0;
}

.welcome-icon {
  color: var(--primary-color);
  margin-bottom: 1.5rem;
}

.welcome-message h2 {
  margin-bottom: 1rem;
  color: var(--primary-dark);
}

.welcome-message p {
  color: var(--text-secondary);
  max-width: 500px;
}

.message {
  display: flex;
  gap: 1rem;
  max-width: 80%;
}

.user-message {
  align-self: flex-end;
  flex-direction: row-reverse;
}

.assistant-message {
  align-self: flex-start;
}

.message-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.user-avatar {
  background-color: var(--secondary-color);
  color: white;
}

.assistant-avatar {
  background-color: var(--primary-color);
  color: white;
}

.message-content {
  background-color: var(--background-white);
  padding: 1rem;
  border-radius: var(--border-radius);
  box-shadow: var(--box-shadow);
  position: relative;
}

.user-message .message-content {
  background-color: #e3f2fd;
}

.message-sender {
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: var(--text-primary);
}

.message-text {
  color: var(--text-primary);
  line-height: 1.5;
}

.message-time {
  font-size: 0.8rem;
  color: var(--text-secondary);
  margin-top: 0.5rem;
  text-align: right;
}

.typing-indicator {
  display: flex;
  gap: 0.5rem;
  padding: 0.5rem 0;
}

.typing-indicator span {
  width: 8px;
  height: 8px;
  background-color: var(--text-secondary);
  border-radius: 50%;
  display: inline-block;
  animation: typing 1.4s infinite ease-in-out both;
}

.typing-indicator span:nth-child(1) {
  animation-delay: 0s;
}

.typing-indicator span:nth-child(2) {
  animation-delay: 0.2s;
}

.typing-indicator span:nth-child(3) {
  animation-delay: 0.4s;
}

@keyframes typing {
  0%, 80%, 100% { transform: scale(0.6); opacity: 0.6; }
  40% { transform: scale(1); opacity: 1; }
}

/* File Preview */
.file-preview {
  position: absolute;
  bottom: 80px;
  left: 1.5rem;
  right: 1.5rem;
  background-color: var(--background-white);
  border-radius: var(--border-radius);
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  z-index: 20;
  max-height: 50%;
}

.preview-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 1.5rem;
  border-bottom: 1px solid var(--border-color);
}

.preview-header h3 {
  font-size: 1.1rem;
  color: var(--text-primary);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.close-preview-button {
  background: none;
  border: none;
  color: var(--text-secondary);
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: var(--transition);
}

.close-preview-button:hover {
  background-color: var(--background-light);
  color: var(--text-primary);
}

.preview-content {
  flex: 1;
  overflow: auto;
  padding: 1.5rem;
}

.text-preview pre {
  white-space: pre-wrap;
  font-family: 'Courier New', monospace;
  line-height: 1.5;
}

.generic-preview {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 200px;
  text-align: center;
  color: var(--text-secondary);
  padding: 1rem;
}

.preview-actions {
  padding: 1rem 1.5rem;
  border-top: 1px solid var(--border-color);
  display: flex;
  justify-content: flex-end;
}

.use-document-button {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.25rem;
  background-color: var(--primary-color);
  color: white;
  border: none;
  border-radius: var(--border-radius);
  font-weight: 500;
  cursor: pointer;
  transition: var(--transition);
}

.use-document-button:hover {
  background-color: var(--primary-dark);
}

/* Chat Input */
.chat-input-container {
  padding: 1rem 1.5rem;
  background-color: var(--background-white);
  border-top: 1px solid var(--border-color);
}

.input-wrapper {
  display: flex;
  align-items: flex-end;
  gap: 0.75rem;
  position: relative;
}

.chat-input {
  flex: 1;
  padding: 0.75rem 1rem;
  border: 1px solid var(--border-color);
  border-radius: var(--border-radius);
  font-family: inherit;
  font-size: 1rem;
  resize: none;
  max-height: 150px;
  overflow-y: auto;
  transition: var(--transition);
}

.chat-input:focus {
  outline: none;
  border-color: var(--primary-color);
  box-shadow: 0 0 0 2px rgba(46, 125, 50, 0.2);
}

.send-button {
  background-color: var(--primary-color);
  color: white;
  border: none;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: var(--transition);
}

.send-button:hover {
  background-color: var(--primary-dark);
}

.send-button:disabled {
  background-color: var(--text-secondary);
  cursor: not-allowed;
}

.avatar-toggle-button {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background-color: var(--background-light);
  border: 1px solid var(--border-color);
  border-radius: var(--border-radius);
  color: var(--text-primary);
  font-size: 0.9rem;
  cursor: pointer;
  transition: var(--transition);
}

.avatar-toggle-button:hover {
  background-color: var(--background-white);
  border-color: var(--primary-color);
}

/* Responsive Styles */
@media (max-width: 768px) {
  .chat-container.avatar-active {
    padding-left: 0;
  }
  
  .digital-human-container {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(255, 255, 255, 0.95);
    z-index: 100;
  }
  
  .message {
    max-width: 90%;
  }
  
  .avatar-toggle-button span {
    display: none;
  }
}

@media (max-width: 480px) {
  .file-drawer {
    width: 100%;
  }
  
  .drawer-open .main-content {
    margin-left: 0;
    filter: blur(2px);
    pointer-events: none;
  }
  
  .message {
    max-width: 95%;
  }
  
  .message-avatar {
    width: 32px;
    height: 32px;
  }
  
  .input-wrapper {
    flex-wrap: wrap;
  }
  
  .chat-input {
    order: 1;
    width: calc(100% - 50px);
  }
  
  .send-button {
    order: 2;
  }
  
  .avatar-toggle-button {
    order: 3;
    margin-top: 0.5rem;
    width: 100%;
    justify-content: center;
  }
  
  .avatar-toggle-button span {
    display: inline;
  }
}
</style>