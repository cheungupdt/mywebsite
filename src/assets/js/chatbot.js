class Chatbot {
  constructor() {
    this.isOpen = false;
    this.isTyping = false;
    this.conversationHistory = [];
    this.n8nWebhookUrl = 'https://your-n8n-instance.com/webhook/chatbot'; // Replace with your n8n webhook
    
    this.init();
  }
  
  init() {
    console.log('🔧 Global Chatbot initializing...');
    this.setupEventListeners();
    this.loadConversationHistory();
  }
  
  setupEventListeners() {
    const toggle = document.getElementById('chatbot-toggle');
    const close = document.getElementById('chatbot-close');
    const send = document.getElementById('chatbot-send');
    const input = document.getElementById('chatbot-input');
    const suggestions = document.querySelectorAll('.suggestion-btn');
    
    if (!toggle) {
      console.log('❌ Global chatbot toggle not found');
      return;
    }
    
    console.log('✅ Global chatbot elements found');
    
    // Toggle chat window
    toggle.addEventListener('click', () => {
      this.toggleChat();
    });
    
    // Close chat window
    if (close) {
      close.addEventListener('click', () => {
        this.closeChat();
      });
    }
    
    // Send message
    if (send) {
      send.addEventListener('click', () => {
        this.sendMessage();
      });
    }
    
    // Enter key to send
    if (input) {
      input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
          e.preventDefault();
          this.sendMessage();
        }
      });
    }
    
    // Suggestion buttons
    suggestions.forEach(btn => {
      btn.addEventListener('click', () => {
        const suggestion = btn.getAttribute('data-suggestion');
        if (input) input.value = suggestion;
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
  
  // ... keep all your existing Chatbot class methods unchanged ...
  // (toggleChat, openChat, closeChat, sendMessage, etc.)
}

// Unified Chatbot Integration
class UnifiedChatbot {
  constructor() {
    this.floatingChatbot = null;
    this.globalChatbot = null;
    this.init();
  }
  
  init() {
    console.log('🚀 Unified Chatbot System initializing...');
    
    // Run debug first to see what we're working with
    this.debugChatbotIssues();
    
    // Initialize floating chatbot (showcase version)
    this.initFloatingChatbot();
    
    // Initialize global chatbot (site-wide version)
    this.initGlobalChatbot();
    
    // Set up connections between them
    this.setupChatbotConnections();
  }
  
  debugChatbotIssues() {
    console.log('=== CHATBOT DEBUG INFO ===');
    console.log('Browser:', navigator.userAgent);
    console.log('Page URL:', window.location.href);
    
    const elements = {
      'floating-chatbot': document.getElementById('floating-chatbot'),
      'chatbot-toggle': document.getElementById('chatbot-toggle'),
      'chatbot-container': document.getElementById('chatbot-container'),
      'floating-chatbot-close': document.getElementById('floating-chatbot-close'),
      'try-chatbot-btn': document.getElementById('try-chatbot-btn'),
      'chatbot-window': document.getElementById('chatbot-window')
    };
    
    Object.entries(elements).forEach(([name, element]) => {
      if (element) {
        const styles = window.getComputedStyle(element);
        console.log(`✅ ${name}:`, {
          exists: true,
          display: styles.display,
          position: styles.position,
          visible: styles.display !== 'none' && styles.visibility !== 'hidden',
          classes: element.className,
          minimized: element.classList.contains('minimized')
        });
      } else {
        console.log(`❌ ${name}: NOT FOUND`);
      }
    });
  }
  
  initFloatingChatbot() {
    console.log('🔧 Setting up floating chatbot...');
    
    const chatbotToggle = document.getElementById('chatbot-toggle');
    const floatingChatbot = document.getElementById('floating-chatbot');
    const chatbotClose = document.getElementById('floating-chatbot-close');
    
    if (chatbotToggle && floatingChatbot) {
      console.log('✅ Found floating chatbot elements');
      
      chatbotToggle.addEventListener('click', () => {
        console.log('🎯 Chatbot toggle clicked');
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
      console.log('❌ Floating chatbot elements not found:', {
        toggle: !!chatbotToggle,
        chatbot: !!floatingChatbot,
        close: !!chatbotClose
      });
    }
  }
  
  initGlobalChatbot() {
    console.log('🔧 Setting up global chatbot...');
    
    // Check if global chatbot elements exist
    const globalContainer = document.getElementById('chatbot-container');
    if (globalContainer) {
      console.log('✅ Global chatbot found, initializing...');
      this.globalChatbot = new Chatbot();
    } else {
      console.log('ℹ️ No global chatbot container found');
    }
  }
  
  setupChatbotConnections() {
    // Connect "Try the real chatbot" button to open floating chatbot
    const tryChatbotBtn = document.getElementById('try-chatbot-btn');
    if (tryChatbotBtn) {
      console.log('✅ Found try chatbot button');
      tryChatbotBtn.addEventListener('click', () => {
        console.log('🎯 Try chatbot button clicked');
        
        if (this.floatingChatbot) {
          this.floatingChatbot.classList.remove('minimized');
          
          // Focus input
          setTimeout(() => {
            const input = document.getElementById('floating-chat-input');
            if (input) input.focus();
          }, 300);
        }
      });
    } else {
      console.log('❌ Try chatbot button not found');
    }
    
    // Connect floating chat input to send messages
    this.setupFloatingChatInput();
  }
  
  setupFloatingChatInput() {
    const floatingInput = document.getElementById('floating-chat-input');
    const floatingSendBtn = document.getElementById('floating-send-btn');
    
    if (floatingInput && floatingSendBtn) {
      console.log('✅ Setting up floating chat input');
      
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
    } else {
      console.log('❌ Floating chat input elements not found:', {
        input: !!floatingInput,
        sendBtn: !!floatingSendBtn
      });
    }
  }
  
  sendFloatingMessage() {
    const input = document.getElementById('floating-chat-input');
    const message = input.value.trim();
    const messagesContainer = document.querySelector('.floating-messages');
    
    if (!message) return;
    
    console.log('💬 Sending floating message:', message);
    
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
    if (!messagesContainer) {
      console.log('❌ Floating messages container not found');
      return;
    }
    
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
    
    console.log(`💬 Added ${sender} message to floating chat`);
  }
}

// Initialize unified chatbot system
document.addEventListener('DOMContentLoaded', () => {
  console.log('🏁 DOM loaded - initializing unified chatbot system');
  window.unifiedChatbot = new UnifiedChatbot();
});