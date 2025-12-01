// ============================================
// CHAT PAGE LOGIC
// ============================================

let messages = [];

document.addEventListener('DOMContentLoaded', function() {
    // Load initial messages
    messages = [...MOCK_DATA.chatMessages];
    renderChat();
});

function renderChat() {
    const desktopContent = document.getElementById('desktopContent');
    const mobileContent = document.getElementById('mobileContent');
    
    const chatHTML = generateChatHTML();
    
    if (desktopContent) desktopContent.innerHTML = chatHTML;
    if (mobileContent) mobileContent.innerHTML = chatHTML;
    
    setupChatListeners();
    scrollToBottom();
}

function generateChatHTML() {
    return `
        <div class="chat-header">
            <h3>Light</h3>
            <p>What can I help you with?</p>
        </div>
        
        <div class="chat-messages" id="chatMessages">
            ${messages.map(msg => generateMessageHTML(msg)).join('')}
        </div>
        
        <div class="chat-input-container">
            <div class="chat-input-wrapper">
                <input 
                    type="text" 
                    id="chatInput" 
                    class="chat-input" 
                    placeholder="Enter your message"
                />
                <button class="send-btn" id="sendBtn">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <line x1="22" y1="2" x2="11" y2="13"></line>
                        <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                    </svg>
                </button>
            </div>
        </div>
    `;
}

function generateMessageHTML(message) {
    const isUser = message.sender === 'user';
    return `
        <div class="message-wrapper ${isUser ? 'user' : 'bot'}">
            <div class="message-bubble ${isUser ? 'user' : 'bot'}">
                ${message.text}
            </div>
        </div>
    `;
}

function setupChatListeners() {
    const chatInput = document.getElementById('chatInput');
    const sendBtn = document.getElementById('sendBtn');
    
    if (sendBtn) {
        sendBtn.addEventListener('click', sendMessage);
    }
    
    if (chatInput) {
        chatInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                sendMessage();
            }
        });
        
        // Focus on input
        chatInput.focus();
    }
}

function sendMessage() {
    const chatInput = document.getElementById('chatInput');
    const messageText = chatInput.value.trim();
    
    if (!messageText) return;
    
    // Add user message
    const userMessage = {
        id: messages.length + 1,
        text: messageText,
        sender: 'user',
        timestamp: new Date()
    };
    
    messages.push(userMessage);
    
    // Clear input
    chatInput.value = '';
    
    // Update chat display
    updateChatMessages();
    
    // Show typing indicator
    showTypingIndicator();
    
    // Simulate bot response after delay
    setTimeout(() => {
        const botMessage = {
            id: messages.length + 1,
            text: getBotResponse(messageText),
            sender: 'bot',
            timestamp: new Date()
        };
        
        messages.push(botMessage);
        hideTypingIndicator();
        updateChatMessages();
    }, 1500);
}

function updateChatMessages() {
    const chatMessagesContainer = document.getElementById('chatMessages');
    if (chatMessagesContainer) {
        chatMessagesContainer.innerHTML = messages.map(msg => generateMessageHTML(msg)).join('');
        scrollToBottom();
    }
}

function showTypingIndicator() {
    const chatMessagesContainer = document.getElementById('chatMessages');
    if (chatMessagesContainer) {
        const typingHTML = `
            <div class="message-wrapper bot" id="typingIndicator">
                <div class="typing-indicator">
                    <div class="typing-dot"></div>
                    <div class="typing-dot"></div>
                    <div class="typing-dot"></div>
                </div>
            </div>
        `;
        chatMessagesContainer.insertAdjacentHTML('beforeend', typingHTML);
        scrollToBottom();
    }
}

function hideTypingIndicator() {
    const typingIndicator = document.getElementById('typingIndicator');
    if (typingIndicator) {
        typingIndicator.remove();
    }
}

function scrollToBottom() {
    const chatMessagesContainer = document.getElementById('chatMessages');
    if (chatMessagesContainer) {
        setTimeout(() => {
            chatMessagesContainer.scrollTop = chatMessagesContainer.scrollHeight;
        }, 100);
    }
}

function getBotResponse(userMessage) {
    const lowerMessage = userMessage.toLowerCase();
    
    // Simple response logic
    if (lowerMessage.includes('balance') || lowerMessage.includes('account')) {
        return "Your current account balance is $17,760.43. Would you like to see recent transactions?";
    } else if (lowerMessage.includes('transfer') || lowerMessage.includes('send')) {
        return "I can help you with transfers! You can send money by going to the Send Money page or I can guide you through the process here.";
    } else if (lowerMessage.includes('fee') || lowerMessage.includes('charge')) {
        return "Our standard transaction fees are: Domestic transfers - free, International transfers - $10.00, Wire transfers - $25.00. Is there a specific transaction you'd like me to explain?";
    } else if (lowerMessage.includes('investment') || lowerMessage.includes('stock')) {
        return "I can help you with your investment portfolio! Your total portfolio value is currently showing strong performance. Would you like details on specific holdings?";
    } else if (lowerMessage.includes('card') || lowerMessage.includes('credit')) {
        return "Your LL Credit Back Visa Card has a current balance of $2,560.47 with a limit of $10,000. Would you like to make a payment?";
    } else if (lowerMessage.includes('help') || lowerMessage.includes('support')) {
        return "I'm here to help! I can assist with account inquiries, transfers, investments, payments, and general banking questions. What do you need help with?";
    } else if (lowerMessage.includes('thank')) {
        return "You're welcome! Is there anything else I can help you with today?";
    } else if (lowerMessage.includes('hello') || lowerMessage.includes('hi')) {
        return "Hello! How can I assist you today?";
    } else {
        return "I'm here to help! I can assist with account balance inquiries, transfers, investments, fees, and more. What would you like to know?";
    }
}