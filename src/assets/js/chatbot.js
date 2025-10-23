class Chatbot {
  constructor() {
    this.isOpen = false;
    this.isTyping = false;
    this.conversationHistory = [];
    this.n8nWebhookUrl = 'https://your-n8n-instance.com/webhook/chatbot'; // Replace with your n8n webhook
    
    this.init();
  }
  
  init() {
    this.setupEventListeners();
    this.loadConversationHistory();
  }
  
  setupEventListeners() {
    const toggle = document.getElementById('chatbot-toggle');
    const close = document.getElementById('chatbot-close');
    const send = document.getElementById('chatbot-send');
    const input = document.getElementById('chatbot-input');
    const suggestions = document.querySelectorAll('.suggestion-btn');
    
    // Toggle chat window
    toggle.addEventListener('click', () => {
      this.toggleChat();
    });
    
    // Close chat window
    close.addEventListener('click', () => {
      this.closeChat();
    });
    
    // Send message
    send.addEventListener('click', () => {
      this.sendMessage();
    });
    
    // Enter key to send
    input.addEventListener('keypress', (e) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        this.sendMessage();
      }
    });
    
    // Suggestion buttons
    suggestions.forEach(btn => {
      btn.addEventListener('click', () => {
        const suggestion = btn.getAttribute('data-suggestion');
        input.value = suggestion;
        this.sendMessage();
      });
    });
    
    // Minimize on escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.isOpen) {
        this.closeChat();
      }
    });
  }
  
  toggleChat() {
    if (this.isOpen) {
      this.closeChat();
    } else {
      this.openChat();
    }
  }
  
  openChat() {
    const container = document.getElementById('chatbot-container');
    const window = document.getElementById('chatbot-window');
    
    container.classList.add('open');
    window.classList.add('open');
    this.isOpen = true;
    
    // Clear badge
    this.clearBadge();
    
    // Focus input
    setTimeout(() => {
      document.getElementById('chatbot-input').focus();
    }, 300);
  }
  
  closeChat() {
    const container = document.getElementById('chatbot-container');
    const window = document.getElementById('chatbot-window');
    
    container.classList.remove('open');
    window.classList.remove('open');
    this.isOpen = false;
  }
  
  async sendMessage() {
    const input = document.getElementById('chatbot-input');
    const message = input.value.trim();
    
    if (!message || this.isTyping) return;
    
    // Add user message
    this.addMessage(message, 'user');
    
    // Clear input
    input.value = '';
    
    // Show typing indicator
    this.showTypingIndicator();
    
    try {
      // Send to n8n workflow
      const response = await this.sendToN8N(message);
      
      // Hide typing indicator
      this.hideTypingIndicator();
      
      // Add bot response
      this.addMessage(response.message, 'bot', response.actions);
      
      // Save to history
      this.saveConversationHistory();
      
    } catch (error) {
      console.error('Error sending message:', error);
      this.hideTypingIndicator();
      this.addMessage('Sorry, I encountered an error. Please try again.', 'bot');
    }
  }
  
  async sendToN8N(message) {
    const payload = {
      message: message,
      conversationHistory: this.conversationHistory.slice(-5), // Send last 5 messages for context
      timestamp: new Date().toISOString(),
      sessionId: this.getSessionId()
    };
    
    const response = await fetch(this.n8nWebhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload)
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return await response.json();
  }
  
  addMessage(message, sender, actions = []) {
    const messagesContainer = document.getElementById('chatbot-messages');
    const messageElement = document.createElement('div');
    messageElement.className = `message ${sender}-message`;
    
    const avatar = document.createElement('div');
    avatar.className = 'message-avatar';
    avatar.innerHTML = sender === 'bot' ? '<i class="icon-robot"></i>' : '<i class="icon-user"></i>';
    
    const content = document.createElement('div');
    content.className = 'message-content';
    
    // Parse markdown-like syntax
    const formattedMessage = this.formatMessage(message);
    content.innerHTML = formattedMessage;
    
    // Add actions if provided
    if (actions && actions.length > 0) {
      const actionsContainer = document.createElement('div');
      actionsContainer.className = 'message-actions';
      
      actions.forEach(action => {
        const actionBtn = document.createElement('button');
        actionBtn.className = 'action-btn';
        actionBtn.textContent = action.label;
        actionBtn.addEventListener('click', () => {
          this.handleAction(action);
        });
        actionsContainer.appendChild(actionBtn);
      });
      
      content.appendChild(actionsContainer);
    }
    
    messageElement.appendChild(avatar);
    messageElement.appendChild(content);
    messagesContainer.appendChild(messageElement);
    
    // Scroll to bottom
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
    
    // Add to history
    this.conversationHistory.push({
      message: message,
      sender: sender,
      timestamp: new Date().toISOString()
    });
    
    // Show badge if chat is closed
    if (!this.isOpen && sender === 'bot') {
      this.showBadge();
    }
  }
  
  formatMessage(message) {
    // Simple markdown-like formatting
    return message
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/`(.*?)`/g, '<code>$1</code>')
      .replace(/\n/g, '<br>');
  }
  
  handleAction(action) {
    switch (action.type) {
      case 'link':
        window.open(action.url, '_blank');
        break;
      case 'email':
        window.location.href = `mailto:${action.email}`;
        break;
      case 'suggestion':
        document.getElementById('chatbot-input').value = action.text;
        this.sendMessage();
        break;
      default:
        console.log('Unknown action type:', action.type);
    }
  }
  
  showTypingIndicator() {
    this.isTyping = true;
    document.getElementById('typing-indicator').style.display = 'flex';
    
    // Scroll to bottom
    const messagesContainer = document.getElementById('chatbot-messages');
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  }
  
  hideTypingIndicator() {
    this.isTyping = false;
    document.getElementById('typing-indicator').style.display = 'none';
  }
  
  showBadge() {
    const badge = document.getElementById('chat-badge');
    badge.textContent = '1';
    badge.style.display = 'flex';
  }
  
  clearBadge() {
    const badge = document.getElementById('chat-badge');
    badge.textContent = '';
    badge.style.display = 'none';
  }
  
  getSessionId() {
    let sessionId = localStorage.getItem('chatbot_session_id');
    if (!sessionId) {
      sessionId = 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
      localStorage.setItem('chatbot_session_id', sessionId);
    }
    return sessionId;
  }
  
  saveConversationHistory() {
    try {
      localStorage.setItem('chatbot_history', JSON.stringify(this.conversationHistory));
    } catch (e) {
      console.error('Error saving conversation history:', e);
    }
  }
  
  loadConversationHistory() {
    try {
      const history = localStorage.getItem('chatbot_history');
      if (history) {
        this.conversationHistory = JSON.parse(history);
      }
    } catch (e) {
      console.error('Error loading conversation history:', e);
    }
  }
}
// Unified Chatbot Integration
class UnifiedChatbot {
  constructor() {
    this.floatingChatbot = null;
    this.globalChatbot = null;
    this.init();
  }
  
  init() {
    console.log('Initializing unified chatbot system...');
    
    // Initialize floating chatbot (showcase version)
    this.initFloatingChatbot();
    
    // Initialize global chatbot (site-wide version)
    this.initGlobalChatbot();
    
    // Set up connections between them
    this.setupChatbotConnections();
  }
  
  initFloatingChatbot() {
    console.log('Setting up floating chatbot...');
    
    const chatbotToggle = document.getElementById('chatbot-toggle');
    const floatingChatbot = document.getElementById('floating-chatbot');
    const chatbotClose = document.getElementById('floating-chatbot-close');
    
    if (chatbotToggle && floatingChatbot) {
      console.log('Found floating chatbot elements');
      
      chatbotToggle.addEventListener('click', () => {
        console.log('Chatbot toggle clicked');
        floatingChatbot.classList.toggle('minimized');
        
        // Focus input when opening
        if (!floatingChatbot.classList.contains('minimized')) {
          setTimeout(() => {
            const input = document.getElementById('floating-chat-input');
            if (input) input.focus();
          }, 300);
        }
      });
      
      if (chatbotClose) {
        chatbotClose.addEventListener('click', (e) => {
          e.stopPropagation();
          floatingChatbot.classList.add('minimized');
        });
      }
      
      this.floatingChatbot = floatingChatbot;
    } else {
      console.log('Floating chatbot elements not found');
    }
  }
  
  initGlobalChatbot() {
    console.log('Setting up global chatbot...');
    
    // Check if global chatbot elements exist
    const globalContainer = document.getElementById('chatbot-container');
    if (globalContainer) {
      console.log('Global chatbot found, initializing...');
      this.globalChatbot = new Chatbot();
    } else {
      console.log('No global chatbot container found');
    }
  }
  
  setupChatbotConnections() {
    // Connect "Try the real chatbot" button to open floating chatbot
    const tryChatbotBtn = document.getElementById('try-chatbot-btn');
    if (tryChatbotBtn) {
      tryChatbotBtn.addEventListener('click', () => {
        console.log('Try chatbot button clicked');
        
        if (this.floatingChatbot) {
          this.floatingChatbot.classList.remove('minimized');
          
          // Focus input
          setTimeout(() => {
            const input = document.getElementById('floating-chat-input');
            if (input) input.focus();
          }, 300);
        }
      });
    }
    
    // Connect floating chat input to send messages
    this.setupFloatingChatInput();
  }
  
  setupFloatingChatInput() {
    const floatingInput = document.getElementById('floating-chat-input');
    const floatingSendBtn = document.getElementById('floating-send-btn');
    
    if (floatingInput && floatingSendBtn) {
      // Send message on button click
      floatingSendBtn.addEventListener('click', () => {
        this.sendFloatingMessage();
      });
      
      // Send message on Enter key
      floatingInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
          e.preventDefault();
          this.sendFloatingMessage();
        }
      });
    }
  }
  
  sendFloatingMessage() {
    const input = document.getElementById('floating-chat-input');
    const message = input.value.trim();
    const messagesContainer = document.querySelector('.floating-messages');
    
    if (!message) return;
    
    // Add user message to floating chat
    this.addFloatingMessage(message, 'user');
    
    // Clear input
    input.value = '';
    
    // Simulate bot response (replace with your actual bot logic)
    setTimeout(() => {
      const responses = [
        "I'm the floating chatbot! How can I help you?",
        "Thanks for your message! This is the showcase version.",
        "I can help demonstrate the chatbot functionality!"
      ];
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      this.addFloatingMessage(randomResponse, 'bot');
    }, 1000);
  }
  
  addFloatingMessage(message, sender) {
    const messagesContainer = document.querySelector('.floating-messages');
    if (!messagesContainer) return;
    
    const messageElement = document.createElement('div');
    messageElement.className = `floating-message ${sender}`;
    
    const avatar = document.createElement('div');
    avatar.className = 'floating-message-avatar';
    avatar.innerHTML = sender === 'bot' ? '<i class="icon-robot"></i>' : '<i class="icon-user"></i>';
    
    const content = document.createElement('div');
    content.className = 'floating-message-content';
    content.textContent = message;
    
    messageElement.appendChild(avatar);
    messageElement.appendChild(content);
    messagesContainer.appendChild(messageElement);
    
    // Scroll to bottom
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  }
}

// Initialize unified chatbot system
document.addEventListener('DOMContentLoaded', () => {
  console.log('DOM loaded - initializing unified chatbot system');
  window.unifiedChatbot = new UnifiedChatbot();
});

// Initialize chatbot when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new Chatbot();
});

// Debug browser compatibility - Add this at the END of chatbot.js
function debugChatbotIssues() {
  console.log('=== CHATBOT DEBUG INFO ===');
  console.log('Browser:', navigator.userAgent);
  console.log('Floating chatbot element:', document.getElementById('floating-chatbot'));
  console.log('Toggle button:', document.getElementById('chatbot-toggle'));
  console.log('Global chatbot container:', document.getElementById('chatbot-container'));
  console.log('CSS loaded:', !!document.querySelector('style, link[rel="stylesheet"]'));
  
  // Check for common browser issues
  const isChrome = /Chrome/.test(navigator.userAgent);
  const isFirefox = /Firefox/.test(navigator.userAgent);
  const isEdge = /Edge/.test(navigator.userAgent);
  
  if (isChrome) console.log('Chrome detected - checking for extension conflicts');
  if (isFirefox) console.log('Firefox detected - checking privacy settings');
  if (isEdge) console.log('Edge detected - checking compatibility mode');
  
  // Check element styles
  const floatingChatbot = document.getElementById('floating-chatbot');
  if (floatingChatbot) {
    const styles = window.getComputedStyle(floatingChatbot);
    console.log('Floating chatbot styles:', {
      display: styles.display,
      position: styles.position,
      visibility: styles.visibility,
      opacity: styles.opacity,
      bottom: styles.bottom,
      right: styles.right,
      zIndex: styles.zIndex
    });
  }
  
  const toggleButton = document.getElementById('chatbot-toggle');
  if (toggleButton) {
    const styles = window.getComputedStyle(toggleButton);
    console.log('Toggle button styles:', {
      display: styles.display,
      position: styles.position,
      bottom: styles.bottom,
      right: styles.right,
      zIndex: styles.zIndex
    });
  }
}

// Run debug when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  console.log('=== RUNNING CHATBOT DEBUG ===');
  debugChatbotIssues();
  
  // Also run after a short delay to catch any dynamic changes
  setTimeout(debugChatbotIssues, 1000);
});