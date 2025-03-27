<template>
    <div class="chat-interface">
      <!-- Header with avatar and status -->
      <header class="chat-header">
        <div class="header-left">
          <button class="back-button" @click="navigateBack">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
          </button>
        </div>
        <div class="header-title">
          <div class="assistant-avatar">
            <img src="@/assets/2.svg?height=40&width=40" alt="AI Assistant">
            <span class="status-indicator" :class="{ 'online': isAssistantOnline }"></span>
          </div>
          <div class="assistant-info">
            <h1>AI Assistant</h1>
            <span class="status-text">{{ isAssistantOnline ? 'Online' : 'Connecting...' }}</span>
          </div>
        </div>
        <div class="header-actions">
          <button class="menu-button" @click="toggleMenu">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="12" cy="12" r="1"></circle>
              <circle cx="12" cy="5" r="1"></circle>
              <circle cx="12" cy="19" r="1"></circle>
            </svg>
          </button>
        </div>
      </header>
  
      <!-- Menu dropdown -->
      <div class="dropdown-menu" v-if="showMenu" @click.stop>
        <div class="menu-item" @click="clearConversation">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="3 6 5 6 21 6"></polyline>
            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
          </svg>
          <span>Clear chat</span>
        </div>
        <div class="menu-item" @click="shareConversation">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="18" cy="5" r="3"></circle>
            <circle cx="6" cy="12" r="3"></circle>
            <circle cx="18" cy="19" r="3"></circle>
            <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
            <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
          </svg>
          <span>Share conversation</span>
        </div>
        <div class="menu-item" @click="openSettings">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="3"></circle>
            <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
          </svg>
          <span>Settings</span>
        </div>
        <div class="menu-item" @click="showHelp">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="10"></circle>
            <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
            <line x1="12" y1="17" x2="12.01" y2="17"></line>
          </svg>
          <span>Help</span>
        </div>
      </div>
  
      <!-- Main chat container -->
      <div class="chat-container" ref="chatContainer">
        <!-- Welcome message when no messages -->
        <div class="welcome-message" v-if="messages.length === 0">
          <div class="welcome-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="12" cy="12" r="10"></circle>
              <path d="M8 14s1.5 2 4 2 4-2 4-2"></path>
              <line x1="9" y1="9" x2="9.01" y2="9"></line>
              <line x1="15" y1="9" x2="15.01" y2="9"></line>
            </svg>
          </div>
          <h2>Welcome to AI Assistant</h2>
          <p>I can help answer your questions and assist with various tasks. Try asking me something like:</p>
          <div class="suggestion-chips">
            <button class="suggestion-chip" @click="askSuggestion('What can you help me with today?')">
              What can you help me with?
            </button>
            <button class="suggestion-chip" @click="askSuggestion('Tell me about the latest AI advancements')">
              Latest AI advancements
            </button>
            <button class="suggestion-chip" @click="askSuggestion('How do I create a compelling presentation?')">
              Creating a presentation
            </button>
          </div>
        </div>
  
        <!-- Messages list -->
        <div class="messages-list">
          <div 
            v-for="(message, index) in messages" 
            :key="index" 
            class="message-wrapper" 
            :class="{ 
              'user-message': message.sender === 'user', 
              'assistant-message': message.sender === 'assistant' 
            }"
          >
            <div class="message-avatar" v-if="message.sender === 'assistant'">
              <img src="@/assets/2.svg??height=36&width=36" alt="AI Assistant">
            </div>
            <div class="message-content">
              <div class="message-bubble">
                <!-- Text message -->
                <p v-if="message.type === 'text'" v-html="formatMessage(message.content)"></p>
                
                <!-- Image message -->
                <div v-else-if="message.type === 'image'" class="image-message">
                  <img :src="message.content" alt="Image" @click="previewImage(message.content)">
                </div>
                
                <!-- Audio message -->
                <div v-else-if="message.type === 'audio'" class="audio-message">
                  <audio controls>
                    <source :src="message.content" type="audio/mpeg">
                    Your browser does not support audio playback.
                  </audio>
                </div>
                
                <!-- Loading animation -->
                <div v-else-if="message.type === 'loading'" class="loading-message">
                  <div class="typing-indicator">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </div>
              </div>
              <div class="message-time">{{ formatTime(message.timestamp) }}</div>
            </div>
            <div class="message-avatar user-avatar" v-if="message.sender === 'user'">
              <img src="@/assets/2.svg?height=36&width=36" alt="User">
            </div>
          </div>
        </div>
  
        <!-- Error message -->
        <div class="error-message" v-if="error">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="8" x2="12" y2="12"></line>
            <line x1="12" y1="16" x2="12.01" y2="16"></line>
          </svg>
          <span>{{ error }}</span>
          <button class="retry-button" @click="retryLastMessage">Retry</button>
        </div>
      </div>
  
      <!-- Input area -->
      <div class="input-container">
        <div class="attachment-button-container">
          <button class="attachment-button" @click="toggleAttachmentOptions">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"></path>
            </svg>
          </button>
        </div>
        
        <!-- Attachment options -->
        <div class="attachment-options" v-if="showAttachmentOptions" @click.stop>
          <div class="attachment-option" @click="uploadImage">
            <div class="option-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                <circle cx="8.5" cy="8.5" r="1.5"></circle>
                <polyline points="21 15 16 10 5 21"></polyline>
              </svg>
            </div>
            <span>Image</span>
          </div>
          <div class="attachment-option" @click="startVoiceRecording">
            <div class="option-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"></path>
                <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
                <line x1="12" y1="19" x2="12" y2="23"></line>
                <line x1="8" y1="23" x2="16" y2="23"></line>
              </svg>
            </div>
            <span>Voice</span>
          </div>
          <div class="attachment-option" @click="uploadDocument">
            <div class="option-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                <polyline points="14 2 14 8 20 8"></polyline>
                <line x1="16" y1="13" x2="8" y2="13"></line>
                <line x1="16" y1="17" x2="8" y2="17"></line>
                <polyline points="10 9 9 9 8 9"></polyline>
              </svg>
            </div>
            <span>Document</span>
          </div>
        </div>
        
        <div class="input-wrapper">
          <textarea 
            class="message-input" 
            placeholder="Type your message..." 
            v-model="userInput"
            @keydown.enter.prevent="sendMessage"
            ref="messageInput"
            rows="1"
            @input="autoResizeTextarea"
          ></textarea>
        </div>
        
        <div class="action-buttons">
          <!-- Recording button when recording -->
          <button v-if="isRecording" class="voice-recording-button" @click="stopVoiceRecording">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <rect x="6" y="6" width="12" height="12" rx="2" ry="2"></rect>
            </svg>
            <span class="recording-time">{{ recordingTime }}</span>
          </button>
          <!-- Send button when text exists -->
          <button v-else-if="userInput.trim()" class="send-button" @click="sendMessage">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="22" y1="2" x2="11" y2="13"></line>
              <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
            </svg>
          </button>
          <!-- Voice button when no text -->
          <button v-else class="voice-button" @click="startVoiceRecording">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"></path>
              <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
              <line x1="12" y1="19" x2="12" y2="23"></line>
              <line x1="8" y1="23" x2="16" y2="23"></line>
            </svg>
          </button>
        </div>
      </div>
  
      <!-- Image preview modal -->
      <div class="modal-overlay" v-if="showImagePreview" @click="closeImagePreview">
        <div class="image-preview-container">
          <img :src="previewImageUrl" alt="Preview">
          <button class="close-preview-button" @click.stop="closeImagePreview">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
      </div>
  
      <!-- Voice recording indicator -->
      <div class="voice-recording-indicator" v-if="isRecording">
        <div class="recording-waves">
          <div class="wave"></div>
          <div class="wave"></div>
          <div class="wave"></div>
        </div>
        <div class="recording-text">Recording...</div>
        <div class="recording-actions">
          <button class="cancel-recording" @click="cancelVoiceRecording">Cancel</button>
          <button class="stop-recording" @click="stopVoiceRecording">Done</button>
        </div>
      </div>
  
      <!-- Hidden file inputs -->
      <input 
        type="file" 
        ref="fileInput" 
        style="display: none" 
        @change="handleFileSelected" 
        accept="image/*"
      >
      <input 
        type="file" 
        ref="documentInput" 
        style="display: none" 
        @change="handleDocumentSelected" 
        accept=".pdf,.doc,.docx,.txt"
      >
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted, nextTick, watch } from 'vue';
  
  // State variables
  const userInput = ref('');
  const messages = ref([]);
  const isAssistantOnline = ref(false);
  const showMenu = ref(false);
  const error = ref(null);
  const chatContainer = ref(null);
  const messageInput = ref(null);
  const showAttachmentOptions = ref(false);
  const isRecording = ref(false);
  const recordingTime = ref('00:00');
  const recordingInterval = ref(null);
  const recordingStartTime = ref(null);
  const fileInput = ref(null);
  const documentInput = ref(null);
  const showImagePreview = ref(false);
  const previewImageUrl = ref('');
  let mediaRecorder = null;
  let audioChunks = [];
  
  // Connect to AI assistant
  onMounted(() => {
    setTimeout(() => {
      isAssistantOnline.value = true;
    }, 1500);
  
    // Global click listener to close popups
    document.addEventListener('click', (event) => {
      // Close menu when clicking outside
      if (showMenu.value && !event.target.closest('.menu-button')) {
        showMenu.value = false;
      }
      
      // Close attachment options when clicking outside
      if (showAttachmentOptions.value && 
          !event.target.closest('.attachment-button') && 
          !event.target.closest('.attachment-options')) {
        showAttachmentOptions.value = false;
      }
    });
  
    // Adjust the message container for mobile viewport (accounting for virtual keyboard)
    window.addEventListener('resize', adjustMessageContainer);
    adjustMessageContainer();
  });
  
  // Format message content (process links and line breaks)
  const formatMessage = (content) => {
    if (!content) return '';
  
    // Convert URLs to clickable links
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    const withLinks = content.replace(urlRegex, '<a href="$1" target="_blank" rel="noopener noreferrer">$1</a>');
  
    // Process line breaks
    return withLinks.replace(/\n/g, '<br>');
  };
  
  // Format timestamp
  const formatTime = (timestamp) => {
    if (!timestamp) return '';
  
    const date = new Date(timestamp);
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
  
    return `${hours}:${minutes}`;
  };
  
  // Toggle menu visibility
  const toggleMenu = (event) => {
    event.stopPropagation();
    showMenu.value = !showMenu.value;
    showAttachmentOptions.value = false;
  };
  
  // Toggle attachment options visibility
  const toggleAttachmentOptions = (event) => {
    event.stopPropagation();
    showAttachmentOptions.value = !showAttachmentOptions.value;
    showMenu.value = false;
  };
  
  // Send message function
  const sendMessage = async () => {
    if (!userInput.value.trim() && !isRecording.value) return;
  
    // Add user message to chat
    const userMessage = {
      sender: 'user',
      content: userInput.value.trim(),
      type: 'text',
      timestamp: new Date().toISOString()
    };
  
    messages.value.push(userMessage);
  
    // Clear input and resize
    userInput.value = '';
    nextTick(() => {
      if (messageInput.value) {
        messageInput.value.style.height = 'auto';
      }
    });
  
    // Add loading message
    const loadingMessage = {
      sender: 'assistant',
      content: '',
      type: 'loading',
      timestamp: new Date().toISOString()
    };
  
    messages.value.push(loadingMessage);
    scrollToBottom();
  
    try {
      // Simulate AI response delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Remove loading message
      messages.value.pop();
      
      // Add AI response
      const aiResponse = await getAIResponse(userMessage.content);
      messages.value.push({
        sender: 'assistant',
        content: aiResponse,
        type: 'text',
        timestamp: new Date().toISOString()
      });
      
      error.value = null;
    } catch (err) {
      console.error('Error getting AI response:', err);
      
      // Remove loading message
      messages.value.pop();
      
      // Show error
      error.value = 'Failed to get a response. Please check your connection and try again.';
    }
  
    scrollToBottom();
  };
  
  // Get AI response (simulated)
  const getAIResponse = async (userMessage) => {
    // This would be replaced with an actual API call in a real implementation
    const responses = {
      'What can you help me with today?': `I can assist you with a variety of tasks:
  
  1. Answering questions on virtually any topic
  2. Drafting emails or messages
  3. Providing creative ideas
  4. Helping with research and summarizing information
  5. Explaining complex concepts
  6. Offering recommendations
  7. Assisting with code and technical problems
  8. Helping with planning and organization
  
  Just let me know what you need help with!`,
      
      'Tell me about the latest AI advancements': `Recent AI advancements include:
  
  1. **Multimodal Models**: Systems like GPT-4 and Claude 3 can now understand and process both text and images together.
  
  2. **Open-Source LLMs**: Models like Llama 3, Mistral, and Falcon have democratized access to powerful AI capabilities.
  
  3. **AI Agents**: Autonomous AI systems that can plan and execute complex tasks without human intervention.
  
  4. **Text-to-Image/Video Generation**: Tools like Midjourney, DALL-E 3, and Sora can create realistic images and videos from text descriptions.
  
  5. **AI for Scientific Discovery**: AlphaFold 3 predicts protein structures, while other AI systems help discover new materials and medicines.
  
  6. **Smaller, More Efficient Models**: Smaller but highly capable models that can run on personal devices without cloud processing.
  
  These technologies are rapidly evolving, with new breakthroughs happening regularly.`,
      
      'How do I create a compelling presentation?': `Creating a compelling presentation involves several key steps:
  
  1. **Know your audience**: Tailor your content to their knowledge level and interests.
  
  2. **Start with a strong hook**: Begin with a surprising fact, question, or story that captures attention.
  
  3. **Follow the 10-20-30 rule**: 
     - 10 slides maximum
     - 20 minutes maximum
     - 30-point font minimum
  
  4. **Use the rule of three**: Organize content into groups of three for better retention.
  
  5. **Show, don't tell**: Use visuals, charts, and graphics instead of text-heavy slides.
  
  6. **Create a narrative**: Structure your presentation as a story with a beginning, middle, and end.
  
  7. **One idea per slide**: Keep each slide focused on a single concept.
  
  8. **Practice delivery**: Rehearse timing, transitions, and handling potential questions.
  
  9. **End with a clear call to action**: What do you want your audience to do with this information?
  
  10. **Design matters**: Use consistent, clean design that supports your message without distracting.
  
  Would you like me to elaborate on any of these points?`
    };
  
    // Check if there's a specific response for this message
    for (const [key, value] of Object.entries(responses)) {
      if (userMessage.toLowerCase().includes(key.toLowerCase())) {
        return value;
      }
    }
  
    // Default response
    return "I understand your message. How can I assist you further with your question?";
  };
  
  // Ask a suggested question
  const askSuggestion = (suggestion) => {
    userInput.value = suggestion;
    sendMessage();
  };
  
  // Navigate back function
  const navigateBack = () => {
    // In a real app, this would use the router or history API
    console.log('Navigate back');
  };
  
  // Clear conversation
  const clearConversation = () => {
    if (confirm('Are you sure you want to clear this conversation?')) {
      messages.value = [];
      showMenu.value = false;
    }
  };
  
  // Share conversation
  const shareConversation = () => {
    showMenu.value = false;
    // In a real app, implement sharing functionality
    alert('Sharing functionality would be implemented here');
  };
  
  // Open settings
  const openSettings = () => {
    showMenu.value = false;
    // In a real app, open settings page or modal
    alert('Settings would open here');
  };
  
  // Show help
  const showHelp = () => {
    showMenu.value = false;
    // In a real app, show help documentation
    alert('Help documentation would show here');
  };
  
  // Auto-resize textarea
  const autoResizeTextarea = () => {
    const textarea = messageInput.value;
    if (!textarea) return;
    
    textarea.style.height = 'auto';
    textarea.style.height = `${Math.min(textarea.scrollHeight, 120)}px`;
  };
  
  // Scroll to bottom of chat
  const scrollToBottom = () => {
    nextTick(() => {
      if (chatContainer.value) {
        chatContainer.value.scrollTop = chatContainer.value.scrollHeight;
      }
    });
  };
  
  // Upload image
  const uploadImage = () => {
    showAttachmentOptions.value = false;
    fileInput.value.click();
  };
  
  // Handle file selection
  const handleFileSelected = (event) => {
    const file = event.target.files[0];
    if (!file) return;
    
    // Check if file is an image
    if (!file.type.startsWith('image/')) {
      alert('Please select an image file');
      return;
    }
    
    // Create URL for the file
    const imageUrl = URL.createObjectURL(file);
    
    // Add image message to chat
    messages.value.push({
      sender: 'user',
      content: imageUrl,
      type: 'image',
      timestamp: new Date().toISOString()
    });
    
    // Add loading message
    const loadingMessage = {
      sender: 'assistant',
      content: '',
      type: 'loading',
      timestamp: new Date().toISOString()
    };
    
    messages.value.push(loadingMessage);
    scrollToBottom();
    
    // Process image (simulated)
    setTimeout(() => {
      // Remove loading message
      messages.value.pop();
      
      // Add AI response about the image
      messages.value.push({
        sender: 'assistant',
        content: 'I received your image. What would you like me to do with it?',
        type: 'text',
        timestamp: new Date().toISOString()
      });
      
      scrollToBottom();
    }, 1500);
  };
  
  // Upload document
  const uploadDocument = () => {
    showAttachmentOptions.value = false;
    documentInput.value.click();
  };
  
  // Handle document selection
  const handleDocumentSelected = (event) => {
    const file = event.target.files[0];
    if (!file) return;
    
    // Add message about document
    messages.value.push({
      sender: 'user',
      content: `Uploaded document: ${file.name}`,
      type: 'text',
      timestamp: new Date().toISOString()
    });
    
    // Add loading message
    const loadingMessage = {
      sender: 'assistant',
      content: '',
      type: 'loading',
      timestamp: new Date().toISOString()
    };
    
    messages.value.push(loadingMessage);
    scrollToBottom();
    
    // Process document (simulated)
    setTimeout(() => {
      // Remove loading message
      messages.value.pop();
      
      // Add AI response about the document
      messages.value.push({
        sender: 'assistant',
        content: `I've received your document "${file.name}". Would you like me to analyze its contents?`,
        type: 'text',
        timestamp: new Date().toISOString()
      });
      
      scrollToBottom();
    }, 2000);
  };
  
  // Start voice recording
  const startVoiceRecording = async () => {
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      alert('Voice recording is not supported in your browser');
      return;
    }
    
    try {
      showAttachmentOptions.value = false;
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      
      // Setup recording
      mediaRecorder = new MediaRecorder(stream);
      audioChunks = [];
      
      mediaRecorder.ondataavailable = (event) => {
        audioChunks.push(event.data);
      };
      
      mediaRecorder.onstop = () => {
        // Create blob from chunks
        const audioBlob = new Blob(audioChunks, { type: 'audio/mpeg' });
        const audioUrl = URL.createObjectURL(audioBlob);
        
        // Only process if recording wasn't cancelled
        if (isRecording.value) {
          // Add audio message
          messages.value.push({
            sender: 'user',
            content: audioUrl,
            type: 'audio',
            timestamp: new Date().toISOString()
          });
          
          // Simulate speech-to-text processing with loading message
          const loadingMessage = {
            sender: 'assistant',
            content: '',
            type: 'loading',
            timestamp: new Date().toISOString()
          };
          
          messages.value.push(loadingMessage);
          scrollToBottom();
          
          // Simulate processing (would be real speech-to-text API)
          setTimeout(() => {
            // Remove loading message
            messages.value.pop();
            
            // Add AI response
            messages.value.push({
              sender: 'assistant',
              content: 'I heard your voice message. In a real implementation, I would transcribe and respond to what you said.',
              type: 'text',
              timestamp: new Date().toISOString()
            });
            
            scrollToBottom();
          }, 2000);
        }
        
        // Reset recording state
        isRecording.value = false;
        clearInterval(recordingInterval.value);
        
        // Stop all tracks
        stream.getTracks().forEach(track => track.stop());
      };
      
      // Start recording
      mediaRecorder.start();
      isRecording.value = true;
      recordingStartTime.value = Date.now();
      
      // Update recording time
      recordingInterval.value = setInterval(updateRecordingTime, 1000);
    } catch (err) {
      console.error('Error starting voice recording:', err);
      alert('Could not access microphone. Please check permissions.');
    }
  };
  
  // Update recording time display
  const updateRecordingTime = () => {
    const elapsedSeconds = Math.floor((Date.now() - recordingStartTime.value) / 1000);
    const minutes = Math.floor(elapsedSeconds / 60).toString().padStart(2, '0');
    const seconds = (elapsedSeconds % 60).toString().padStart(2, '0');
    recordingTime.value = `${minutes}:${seconds}`;
  };
  
  // Stop voice recording
  const stopVoiceRecording = () => {
    if (mediaRecorder && mediaRecorder.state !== 'inactive') {
      mediaRecorder.stop();
    }
  };
  
  // Cancel voice recording
  const cancelVoiceRecording = () => {
    isRecording.value = false;
    if (mediaRecorder && mediaRecorder.state !== 'inactive') {
      mediaRecorder.stop();
    }
  };
  
  // Preview image
  const previewImage = (imageUrl) => {
    previewImageUrl.value = imageUrl;
    showImagePreview.value = true;
  };
  
  // Close image preview
  const closeImagePreview = () => {
    showImagePreview.value = false;
  };
  
  // Retry last message
  const retryLastMessage = () => {
    error.value = null;
    // Find last user message
    const lastUserMessageIndex = [...messages.value].reverse().findIndex(m => m.sender === 'user');
    if (lastUserMessageIndex >= 0) {
      const actualIndex = messages.value.length - 1 - lastUserMessageIndex;
      const message = messages.value[actualIndex];
      
      // Add loading message
      const loadingMessage = {
        sender: 'assistant',
        content: '',
        type: 'loading',
        timestamp: new Date().toISOString()
      };
      
      messages.value.push(loadingMessage);
      scrollToBottom();
      
      // Retry AI response
      setTimeout(async () => {
        // Remove loading message
        messages.value.pop();
        
        try {
          // Add AI response
          const aiResponse = await getAIResponse(message.content);
          messages.value.push({
            sender: 'assistant',
            content: aiResponse,
            type: 'text',
            timestamp: new Date().toISOString()
          });
        } catch (err) {
          error.value = 'Failed to get a response. Please check your connection and try again.';
        }
        
        scrollToBottom();
      }, 1000);
    }
  };
  
  // Adjust message container for mobile viewport
  const adjustMessageContainer = () => {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  };
  
  // Watch for messages changes to scroll to bottom
  watch(messages, () => {
    scrollToBottom();
  }, { deep: true });
  </script>
  
  <style scoped>
  .chat-interface {
    display: flex;
    flex-direction: column;
    height: 100vh;
    height: calc(var(--vh, 1vh) * 100);
    background-color: #f8f9fa;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    position: relative;
    overflow: hidden;
  }
  
  /* Header styles */
  .chat-header {
    display: flex;
    align-items: center;
    padding: 0.75rem 1rem;
    background-color: #ffffff;
    border-bottom: 1px solid #e1e4e8;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
    z-index: 10;
  }
  
  .header-left {
    display: flex;
    align-items: center;
    margin-right: 0.5rem;
  }
  
  .back-button {
    background: none;
    border: none;
    padding: 0.5rem;
    margin: -0.5rem;
    cursor: pointer;
    color: #555;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
  }
  
  .back-button:hover {
    background-color: #f1f3f5;
    color: #333;
  }
  
  .header-title {
    display: flex;
    align-items: center;
    flex: 1;
  }
  
  .assistant-avatar {
    position: relative;
    margin-right: 0.75rem;
  }
  
  .assistant-avatar img {
    border-radius: 50%;
    width: 40px;
    height: 40px;
    object-fit: cover;
    background-color: #e1e4e8;
  }
  
  .status-indicator {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background-color: #adb5bd;
    position: absolute;
    bottom: 0;
    right: 0;
    border: 2px solid #ffffff;
  }
  
  .status-indicator.online {
    background-color: #40c057;
  }
  
  .assistant-info {
    display: flex;
    flex-direction: column;
  }
  
  .assistant-info h1 {
    font-size: 1rem;
    font-weight: 600;
    margin: 0;
    color: #333;
  }
  
  .status-text {
    font-size: 0.75rem;
    color: #868e96;
  }
  
  .header-actions {
    display: flex;
    align-items: center;
  }
  
  .menu-button {
    background: none;
    border: none;
    padding: 0.5rem;
    margin: -0.5rem;
    cursor: pointer;
    color: #555;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
  }
  
  .menu-button:hover {
    background-color: #f1f3f5;
    color: #333;
  }
  
  /* Dropdown menu */
  .dropdown-menu {
    position: absolute;
    top: 60px;
    right: 1rem;
    background-color: #ffffff;
    border-radius: 0.5rem;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    padding: 0.5rem 0;
    z-index: 100;
    min-width: 200px;
    overflow: hidden;
  }
  
  .menu-item {
    display: flex;
    align-items: center;
    padding: 0.75rem 1rem;
    cursor: pointer;
    color: #333;
    font-size: 0.875rem;
  }
  
  .menu-item:hover {
    background-color: #f1f3f5;
  }
  
  .menu-item svg {
    margin-right: 0.75rem;
    color: #666;
  }
  
  /* Chat container */
  .chat-container {
    flex: 1;
    overflow-y: auto;
    padding: 1rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    scrollbar-width: thin;
    scrollbar-color: #ccc transparent;
  }
  
  .chat-container::-webkit-scrollbar {
    width: 5px;
  }
  
  .chat-container::-webkit-scrollbar-thumb {
    background-color: #ccc;
    border-radius: 5px;
  }
  
  .chat-container::-webkit-scrollbar-track {
    background-color: transparent;
  }
  
  /* Welcome message */
  .welcome-message {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    padding: 2rem 1rem;
    margin: auto 0;
  }
  
  .welcome-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 80px;
    height: 80px;
    background-color: #e6f3ff;
    border-radius: 50%;
    margin-bottom: 1.5rem;
    color: #2b7ffa;
  }
  
  .welcome-message h2 {
    font-size: 1.5rem;
    font-weight: 600;
    margin-bottom: 1rem;
    color: #333;
  }
  
  .welcome-message p {
    font-size: 0.95rem;
    color: #666;
    margin-bottom: 1.5rem;
    max-width: 500px;
  }
  
  .suggestion-chips {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    justify-content: center;
  }
  
  .suggestion-chip {
    background-color: #e9ecef;
    border: none;
    border-radius: 1rem;
    padding: 0.5rem 1rem;
    font-size: 0.875rem;
    color: #495057;
    cursor: pointer;
    transition: background-color 0.2s;
  }
  
  .suggestion-chip:hover {
    background-color: #dee2e6;                                                
  }
  
  /* Messages */
  .messages-list {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  
  .message-wrapper {
    display: flex;
    gap: 0.75rem;
    max-width: 85%;
  }
  
  .user-message {
    align-self: flex-end;
    flex-direction: row-reverse;
  }
  
  .assistant-message {
    align-self: flex-start;
  }
  
  .message-avatar {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    overflow: hidden;
    flex-shrink: 0;
  }
  
  .message-avatar img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    background-color: #e1e4e8;
  }
  
  .user-avatar {
    background-color: #007bff;
  }
  
  .message-content {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
  }
  
  .message-bubble {
    padding: 0.75rem 1rem;
    border-radius: 1rem;
    background-color: #ffffff;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
    position: relative;
    max-width: 100%;
    overflow-wrap: break-word;
    word-break: break-word;
  }
  
  .user-message .message-bubble {
    background-color: #2b7ffa;
    color: white;
    border-bottom-right-radius: 0.25rem;
  }
  
  .assistant-message .message-bubble {
    background-color: #ffffff;
    color: #333;
    border-bottom-left-radius: 0.25rem;
  }
  
  .message-bubble p {
    margin: 0;
    line-height: 1.5;
  }
  
  .message-bubble a {
    color: inherit;
    text-decoration: underline;
  }
  
  .message-time {
    font-size: 0.75rem;
    color: #868e96;
    align-self: flex-end;
  }
  
  .user-message .message-time {
    margin-right: 0.5rem;
  }
  
  .assistant-message .message-time {
    margin-left: 0.5rem;
  }
  
  /* Message types */
  .image-message img {
    max-width: 250px;
    max-height: 250px;
    border-radius: 0.5rem;
    cursor: pointer;
  }
  
  .audio-message audio {
    max-width: 250px;
    height: 40px;
  }
  
  /* Loading animation */
  .loading-message {
    min-width: 60px;
    min-height: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .typing-indicator {
    display: flex;
    gap: 0.25rem;
  }
  
  .typing-indicator span {
    width: 8px;
    height: 8px;
    background-color: #adb5bd;
    border-radius: 50%;
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
    0%, 80%, 100% {
      transform: scale(0.8);
      opacity: 0.5;
    }
    40% {
      transform: scale(1);
      opacity: 1;
    }
  }
  
  /* Error message */
  .error-message {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.75rem 1rem;
    background-color: #fff0f0;
    border-radius: 0.5rem;
    color: #e03131;
    font-size: 0.875rem;
    margin-top: 0.5rem;
    margin-bottom: 0.5rem;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  }
  
  .retry-button {
    margin-left: auto;
    background-color: #f8f9fa;
    border: 1px solid #dee2e6;
    padding: 0.25rem 0.75rem;
    border-radius: 0.25rem;
    font-size: 0.75rem;
    cursor: pointer;
  }
  
  .retry-button:hover {
    background-color: #e9ecef;
  }
  
  /* Input container */
  .input-container {
    display: flex;
    align-items: flex-end;
    gap: 0.5rem;
    padding: 0.75rem;
    background-color: #ffffff;
    border-top: 1px solid #e1e4e8;
    position: relative;
    z-index: 10;
  }
  
  .attachment-button-container {
    display: flex;
    align-items: center;
  }
  
  .attachment-button {
    background: none;
    border: none;
    padding: 0.5rem;
    color: #555;
    cursor: pointer;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .attachment-button:hover {
    background-color: #f1f3f5;
    color: #333;
  }
  
  .attachment-options {
    position: absolute;
    bottom: calc(100% - 0.5rem);
    left: 1rem;
    background-color: white;
    border-radius: 0.5rem;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    padding: 0.5rem;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    z-index: 11;
  }
  
  .attachment-option {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem 1rem;
    cursor: pointer;
    border-radius: 0.25rem;
  }
  
  .attachment-option:hover {
    background-color: #f1f3f5;
  }
  
  .option-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    color: #666;
  }
  
  .input-wrapper {
    flex: 1;
    position: relative;
  }
  
  .message-input {
    width: 100%;
    min-height: 40px;
    max-height: 120px;
    padding: 0.75rem 1rem;
    border: 1px solid #e1e4e8;
    border-radius: 1.5rem;
    resize: none;
    font-family: inherit;
    font-size: 0.95rem;
    line-height: 1.5;
    outline: none;
    transition: border-color 0.2s;
    box-sizing: border-box;
  }
  
  .message-input:focus {
    border-color: #2b7ffa;
  }
  
  .action-buttons {
    display: flex;
    align-items: center;
  }
  
  .send-button, .voice-button, .voice-recording-button {
    background: none;
    border: none;
    padding: 0.5rem;
    color: #2b7ffa;
    cursor: pointer;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .voice-recording-button {
    background-color: #ff4d4f;
    color: white;
  }
  
  .recording-time {
    margin-left: 0.5rem;
    font-size: 0.75rem;
  }
  
  /* Image preview modal */
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.7);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
  }
  
  .image-preview-container {
    position: relative;
    max-width: 90%;
    max-height: 90%;
  }
  
  .image-preview-container img {
    max-width: 100%;
    max-height: 90vh;
    object-fit: contain;
    border-radius: 0.25rem;
    background-color: white;
  }
  
  .close-preview-button {
    position: absolute;
    top: -40px;
    right: 0;
    background: none;
    border: none;
    color: white;
    font-size: 1.5rem;
    cursor: pointer;
    padding: 0.5rem;
  }
  
  /* Voice recording indicator */
  .voice-recording-indicator {
    position: fixed;
    bottom: 80px;
    left: 50%;
    transform: translateX(-50%);
    background-color: white;
    border-radius: 1rem;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
    padding: 1rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    z-index: 900;
    width: 80%;
    max-width: 300px;
  }
  
  .recording-waves {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.25rem;
    margin-bottom: 0.75rem;
  }
  
  .wave {
    width: 6px;
    height: 20px;
    background-color: #ff4d4f;
    border-radius: 3px;
    animation: wave 1.5s infinite ease-in-out;
  }
  
  .wave:nth-child(1) {
    animation-delay: 0s;
  }
  
  .wave:nth-child(2) {
    animation-delay: 0.2s;
    height: 35px;
  }
  
  .wave:nth-child(3) {
    animation-delay: 0.4s;
  }
  
  @keyframes wave {
    0%, 100% {
      height: 20px;
    }
    50% {
      height: 40px;
    }
  }
  
  .recording-text {
    font-size: 0.875rem;
    color: #333;
    margin-bottom: 1rem;
  }
  
  .recording-actions {
    display: flex;
    gap: 1rem;
  }
  
  .cancel-recording, .stop-recording {
    padding: 0.5rem 1rem;
    border-radius: 1.5rem;
    font-size: 0.875rem;
    cursor: pointer;
  }
  
  .cancel-recording {
    background-color: #f1f3f5;
    border: 1px solid #dee2e6;
    color: #495057;
  }
  
  .stop-recording {
    background-color: #ff4d4f;
    border: none;
    color: white;
  }
  
  /* Responsive adjustments */
  @media (max-width: 767px) {
    .message-wrapper {
      max-width: 90%;
    }
    
    .image-message img {
      max-width: 200px;
    }
  }
  </style>