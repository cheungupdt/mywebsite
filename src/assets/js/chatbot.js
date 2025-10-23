// Simple Floating Chatbot
class FloatingChatbot {
    constructor() {
        this.isOpen = false;
        this.isTyping = false;
        this.n8nWebhookUrl = 'https://your-n8n-instance.com/webhook/chatbot'; // Replace with your actual n8n webhook
        
        this.init();
    }
    
    init() {
        console.log('🔧 Floating Chatbot initializing...');
        this.setupEventListeners();
        this.loadInitialMessage();
    }
    
    setupEventListeners() {
        const toggle = document.getElementById('chatbot-toggle');
        const close = document.getElementById('floating-chatbot-close');
        const send = document.getElementById('floating-send-btn');
        const input = document.getElementById('floating-chat-input');
        const suggestions = document.querySelectorAll('.suggestion-btn');
        
        if (!toggle) {
            console.error('❌ Chatbot toggle not found');
            return;
        }
        
        console.log('✅ Chatbot elements found');
        
        // Toggle chat window
        toggle.addEventListener('click', () => {
            this.toggleChat();
        });
        
        // Close chat window
        if (close) {
            close.addEventListener('click', (e) => {
                e.stopPropagation();
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
        
        // Close on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.isOpen) {
                this.closeChat();
            }
        });
    }
    
    toggleChat() {
        const chatbot = document.getElementById('floating-chatbot');
        if (!chatbot) return;
        
        if (this.isOpen) {
            this.closeChat();
        } else {
            this.openChat();
        }
    }
    
    openChat() {
        const chatbot = document.getElementById('floating-chatbot');
        const input = document.getElementById('floating-chat-input');
        
        if (chatbot) {
            chatbot.classList.remove('minimized');
            this.isOpen = true;
            
            // Focus input after animation
            setTimeout(() => {
                if (input) input.focus();
            }, 300);
            
            console.log('💬 Chatbot opened');
        }
    }
    
    closeChat() {
        const chatbot = document.getElementById('floating-chatbot');
        if (chatbot) {
            chatbot.classList.add('minimized');
            this.isOpen = false;
            console.log('💬 Chatbot closed');
        }
    }
    
    sendMessage() {
        const input = document.getElementById('floating-chat-input');
        const message = input?.value.trim();
        
        if (!message) return;
        
        console.log('💬 Sending message:', message);
        
        // Add user message
        this.addMessage(message, 'user');
        
        // Clear input
        if (input) input.value = '';
        
        // Show typing indicator
        this.showTyping();
        
        // Send to n8n webhook (replace with your actual implementation)
        this.sendToN8N(message);
    }
    
    async sendToN8N(message) {
        try {
            // Simulate API call - replace with your actual n8n webhook
            const response = await this.simulateN8NResponse(message);
            
            // Hide typing indicator
            this.hideTyping();
            
            // Add bot response
            this.addMessage(response, 'bot');
            
        } catch (error) {
            console.error('❌ Error sending message to n8n:', error);
            this.hideTyping();
            this.addMessage("I'm having trouble connecting right now. Please try again later.", 'bot');
        }
    }
    
    async simulateN8NResponse(userMessage) {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 1000));
        
        // Simple response logic - replace with your actual n8n integration
        const responses = {
            'robotics': "KC has extensive experience in robotics including industrial automation, robotic arms, and AI-powered robotics systems. He specializes in creating scalable robotic solutions.",
            'n8n': "KC can create complex n8n workflows for automation, data processing, API integrations, and business process automation. He's experienced in both simple and enterprise-level workflows.",
            'collaboration': "KC is available for consulting, project collaboration, and technical advisory. You can reach out via the contact page to discuss potential collaborations.",
            'default': "I can help you learn about KC's expertise in robotics, automation, and n8n workflows. Feel free to ask about specific projects, technologies, or collaboration opportunities."
        };
        
        const lowerMessage = userMessage.toLowerCase();
        
        if (lowerMessage.includes('robot')) {
            return responses.robotics;
        } else if (lowerMessage.includes('n8n') || lowerMessage.includes('workflow')) {
            return responses.n8n;
        } else if (lowerMessage.includes('collaborat') || lowerMessage.includes('work together')) {
            return responses.collaboration;
        } else {
            return responses.default;
        }
    }
    
    addMessage(text, sender) {
        const messagesContainer = document.getElementById('floating-messages');
        if (!messagesContainer) return;
        
        const messageElement = document.createElement('div');
        messageElement.className = `floating-message ${sender}`;
        
        const avatar = document.createElement('div');
        avatar.className = 'floating-message-avatar';
        avatar.innerHTML = sender === 'bot' ? '🤖' : '👤';
        
        const content = document.createElement('div');
        content.className = 'floating-message-content';
        content.textContent = text;
        
        messageElement.appendChild(avatar);
        messageElement.appendChild(content);
        messagesContainer.appendChild(messageElement);
        
        // Scroll to bottom
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }
    
    showTyping() {
        const indicator = document.getElementById('typing-indicator');
        if (indicator) {
            indicator.style.display = 'flex';
            this.isTyping = true;
            
            // Scroll to bottom
            const messagesContainer = document.getElementById('floating-messages');
            if (messagesContainer) {
                messagesContainer.scrollTop = messagesContainer.scrollHeight;
            }
        }
    }
    
    hideTyping() {
        const indicator = document.getElementById('typing-indicator');
        if (indicator) {
            indicator.style.display = 'none';
            this.isTyping = false;
        }
    }
    
    loadInitialMessage() {
        // Initial message is already in the HTML
        console.log('✅ Initial message loaded');
    }
}

// Initialize chatbot when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 Initializing Floating Chatbot...');
    window.floatingChatbot = new FloatingChatbot();
});