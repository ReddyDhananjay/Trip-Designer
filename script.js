// Configuration
const GOOGLE_API_KEY = 'AIzaSyAHDnHtiGyJTgU3hCXFPZKx3gS9wqLtZ-U';
const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${GOOGLE_API_KEY}`;

// State Management
let chatHistory = [];
let orders = [];
let products = [];

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    loadFromLocalStorage();
    initializeNavigation();
    displayOrders();
});

// Navigation
function initializeNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
            
            const target = link.getAttribute('href');
            document.querySelector(target).scrollIntoView({ behavior: 'smooth' });
        });
    });
    
    // Update active link on scroll
    window.addEventListener('scroll', () => {
        const sections = document.querySelectorAll('section');
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (window.pageYOffset >= sectionTop - 100) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

function scrollToChat() {
    document.getElementById('chat').scrollIntoView({ behavior: 'smooth' });
}

function scrollToProducts() {
    document.getElementById('products').scrollIntoView({ behavior: 'smooth' });
}

// Chat Functions
function handleKeyPress(event) {
    if (event.key === 'Enter') {
        sendMessage();
    }
}

function sendQuickMessage(message) {
    const chatInput = document.getElementById('chatInput');
    chatInput.value = message;
    sendMessage();
}

async function sendMessage() {
    const input = document.getElementById('chatInput');
    const message = input.value.trim();
    
    if (!message) return;
    
    // Clear input
    input.value = '';
    
    // Hide welcome message
    const welcomeMessage = document.querySelector('.welcome-message');
    if (welcomeMessage) {
        welcomeMessage.style.display = 'none';
    }
    
    // Add user message
    addMessageToChat('user', message);
    
    // Add typing indicator
    addTypingIndicator();
    
    // Get AI response
    try {
        const response = await getAIResponse(message);
        removeTypingIndicator();
        addMessageToChat('ai', response);
        
        // Save to local storage
        saveToLocalStorage();
    } catch (error) {
        removeTypingIndicator();
        addMessageToChat('ai', 'Sorry, I encountered an error. Please try again.');
        console.error('Error:', error);
    }
}

function addMessageToChat(sender, content) {
    const chatBody = document.getElementById('chatBody');
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${sender}`;
    
    const contentDiv = document.createElement('div');
    contentDiv.className = 'message-content';
    contentDiv.innerHTML = content;
    
    messageDiv.appendChild(contentDiv);
    chatBody.appendChild(messageDiv);
    
    // Scroll to bottom
    chatBody.scrollTop = chatBody.scrollHeight;
    
    // Save to history
    chatHistory.push({ sender, content, timestamp: new Date().toISOString() });
}

function addTypingIndicator() {
    const chatBody = document.getElementById('chatBody');
    const typingDiv = document.createElement('div');
    typingDiv.className = 'message ai typing-message';
    typingDiv.innerHTML = `
        <div class="message-content typing-indicator">
            <div class="typing-dot"></div>
            <div class="typing-dot"></div>
            <div class="typing-dot"></div>
        </div>
    `;
    chatBody.appendChild(typingDiv);
    chatBody.scrollTop = chatBody.scrollHeight;
}

function removeTypingIndicator() {
    const typingMessage = document.querySelector('.typing-message');
    if (typingMessage) {
        typingMessage.remove();
    }
}

async function getAIResponse(userMessage) {
    const systemPrompt = `You are KAI, a smart AI shopping assistant for an e-commerce platform in India. 
    
Your capabilities:
1. Search and recommend products based on user queries
2. Provide detailed product information, comparisons, and specifications
3. Suggest multiple similar products with pros/cons
4. Recommend the BEST product to buy based on value, features, and ratings
5. Create mock orders with order IDs, prices in INR, and delivery dates
6. Answer questions about products, deals, offers, and shopping

When user asks about a product:
- Provide 2-3 similar product suggestions
- Include product name, price in INR (₹), key features, and ratings
- ALWAYS recommend which one is the best to buy and explain why
- Format prices as ₹X,XXX (Indian Rupee format)
- Be conversational, helpful, and enthusiastic

When user wants to order:
- Generate a mock order with:
  * Order ID: ORD-XXXXX (random)
  * Product name
  * Price in ₹ INR
  * Estimated delivery: 3-5 days from today
  * Status: Processing

User message: ${userMessage}

Provide a helpful, detailed response. Use HTML formatting if needed for better presentation.`;

    try {
        const response = await fetch(GEMINI_API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                contents: [{
                    parts: [{
                        text: systemPrompt
                    }]
                }],
                generationConfig: {
                    temperature: 0.9,
                    topK: 40,
                    topP: 0.95,
                    maxOutputTokens: 2048,
                }
            })
        });

        if (!response.ok) {
            throw new Error(`API request failed: ${response.status}`);
        }

        const data = await response.json();
        let aiResponse = data.candidates[0].content.parts[0].text;
        
        // Process the response for special actions
        aiResponse = processAIResponse(aiResponse, userMessage);
        
        return aiResponse;
    } catch (error) {
        console.error('API Error:', error);
        return getFallbackResponse(userMessage);
    }
}

function processAIResponse(response, userMessage) {
    // Check if response contains order information
    const orderPattern = /order|buy|purchase|checkout/i;
    if (orderPattern.test(userMessage) && orderPattern.test(response)) {
        // Extract order details and create order
        createMockOrder(response);
    }
    
    // Format the response with better HTML
    response = response.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    response = response.replace(/\n/g, '<br>');
    
    return response;
}

function createMockOrder(responseText) {
    // Generate order from AI response
    const orderId = 'ORD-' + Math.random().toString(36).substr(2, 9).toUpperCase();
    
    // Extract product name (basic extraction)
    let productName = 'Product';
    const productMatch = responseText.match(/(?:order|buy|purchase)\s+(?:a\s+)?([^.!?\n]+)/i);
    if (productMatch) {
        productName = productMatch[1].trim().substring(0, 50);
    }
    
    // Generate random price
    const price = Math.floor(Math.random() * 50000) + 5000;
    
    // Calculate delivery date
    const deliveryDate = new Date();
    deliveryDate.setDate(deliveryDate.getDate() + Math.floor(Math.random() * 3) + 3);
    
    const order = {
        id: orderId,
        productName: productName,
        price: price,
        status: 'processing',
        orderDate: new Date().toLocaleDateString('en-IN'),
        deliveryDate: deliveryDate.toLocaleDateString('en-IN'),
        timestamp: new Date().toISOString()
    };
    
    orders.push(order);
    saveToLocalStorage();
    displayOrders();
}

function getFallbackResponse(userMessage) {
    // Fallback responses when API fails
    const lowerMessage = userMessage.toLowerCase();
    
    if (lowerMessage.includes('smartphone') || lowerMessage.includes('phone') || lowerMessage.includes('mobile')) {
        return `
            <strong>📱 Top Smartphone Recommendations</strong><br><br>
            <div class="product-card-chat">
                <h4>1. Samsung Galaxy S23 5G</h4>
                <p><strong>₹74,999</strong></p>
                <p>✨ 8GB RAM, 256GB Storage</p>
                <p>📸 50MP Triple Camera</p>
                <p>⭐ Rating: 4.5/5</p>
            </div>
            <div class="product-card-chat">
                <h4>2. iPhone 14</h4>
                <p><strong>₹79,900</strong></p>
                <p>✨ A15 Bionic Chip</p>
                <p>📸 12MP Dual Camera</p>
                <p>⭐ Rating: 4.7/5</p>
            </div>
            <div class="product-card-chat">
                <h4>3. OnePlus 11 5G</h4>
                <p><strong>₹56,999</strong></p>
                <p>✨ 16GB RAM, 256GB Storage</p>
                <p>📸 50MP Hasselblad Camera</p>
                <p>⭐ Rating: 4.4/5</p>
            </div>
            <br>
            <strong>💡 Best Pick:</strong> Samsung Galaxy S23 5G offers the best value with excellent camera, performance, and battery life!
        `;
    } else if (lowerMessage.includes('laptop')) {
        return `
            <strong>💻 Top Laptop Recommendations</strong><br><br>
            <div class="product-card-chat">
                <h4>1. MacBook Air M2</h4>
                <p><strong>₹1,14,900</strong></p>
                <p>✨ Apple M2 Chip, 8GB RAM</p>
                <p>💾 256GB SSD</p>
                <p>⭐ Rating: 4.8/5</p>
            </div>
            <div class="product-card-chat">
                <h4>2. Dell XPS 13</h4>
                <p><strong>₹99,990</strong></p>
                <p>✨ Intel i7, 16GB RAM</p>
                <p>💾 512GB SSD</p>
                <p>⭐ Rating: 4.6/5</p>
            </div>
            <div class="product-card-chat">
                <h4>3. HP Pavilion 15</h4>
                <p><strong>₹65,990</strong></p>
                <p>✨ Ryzen 7, 16GB RAM</p>
                <p>💾 512GB SSD</p>
                <p>⭐ Rating: 4.3/5</p>
            </div>
            <br>
            <strong>💡 Best Pick:</strong> MacBook Air M2 for best performance and battery, or HP Pavilion 15 for best value!
        `;
    } else if (lowerMessage.includes('headphone') || lowerMessage.includes('earphone') || lowerMessage.includes('earbuds')) {
        return `
            <strong>🎧 Top Headphones/Earbuds</strong><br><br>
            <div class="product-card-chat">
                <h4>1. Sony WH-1000XM5</h4>
                <p><strong>₹29,990</strong></p>
                <p>✨ Premium ANC, 30hr battery</p>
                <p>⭐ Rating: 4.8/5</p>
            </div>
            <div class="product-card-chat">
                <h4>2. Apple AirPods Pro 2</h4>
                <p><strong>₹26,900</strong></p>
                <p>✨ Spatial Audio, ANC</p>
                <p>⭐ Rating: 4.7/5</p>
            </div>
            <div class="product-card-chat">
                <h4>3. boAt Airdopes 141</h4>
                <p><strong>₹1,299</strong></p>
                <p>✨ 42hr playback, Budget friendly</p>
                <p>⭐ Rating: 4.2/5</p>
            </div>
            <br>
            <strong>💡 Best Pick:</strong> Sony WH-1000XM5 for premium experience, boAt Airdopes 141 for budget!
        `;
    } else if (lowerMessage.includes('order') || lowerMessage.includes('buy')) {
        const orderId = 'ORD-' + Math.random().toString(36).substr(2, 9).toUpperCase();
        const price = Math.floor(Math.random() * 50000) + 5000;
        const deliveryDate = new Date();
        deliveryDate.setDate(deliveryDate.getDate() + 4);
        
        createMockOrder(userMessage);
        
        return `
            <strong>✅ Order Created Successfully!</strong><br><br>
            📦 <strong>Order ID:</strong> ${orderId}<br>
            💰 <strong>Amount:</strong> ₹${price.toLocaleString('en-IN')}<br>
            📅 <strong>Estimated Delivery:</strong> ${deliveryDate.toLocaleDateString('en-IN')}<br>
            📍 <strong>Status:</strong> Processing<br><br>
            Your order has been placed! Check the Orders section to track it.
        `;
    } else {
        return `
            Hello! I'm KAI, your shopping assistant. I can help you with:<br><br>
            🔍 <strong>Product Search</strong> - Find smartphones, laptops, headphones, and more<br>
            💡 <strong>Recommendations</strong> - Get the best products in your budget<br>
            📊 <strong>Comparisons</strong> - Compare products and features<br>
            🛒 <strong>Mock Orders</strong> - Experience the shopping journey<br><br>
            Try asking me:<br>
            • "Recommend a smartphone under ₹30,000"<br>
            • "Best laptop for programming"<br>
            • "Compare wireless headphones"<br>
            • "I want to buy a smartwatch"
        `;
    }
}

function clearChat() {
    const chatBody = document.getElementById('chatBody');
    chatBody.innerHTML = `
        <div class="welcome-message">
            <div class="welcome-icon">👋</div>
            <h3>Hello! I'm KAI</h3>
            <p>Your smart shopping assistant. Ask me anything about products!</p>
            <div class="quick-actions">
                <button class="quick-btn" onclick="sendQuickMessage('Recommend a smartphone under ₹30,000')">📱 Smartphones</button>
                <button class="quick-btn" onclick="sendQuickMessage('Find the best laptop deals')">💻 Laptops</button>
                <button class="quick-btn" onclick="sendQuickMessage('Show me wireless headphones')">🎧 Headphones</button>
                <button class="quick-btn" onclick="sendQuickMessage('Best smartwatch under ₹10,000')">⌚ Smartwatches</button>
            </div>
        </div>
    `;
    chatHistory = [];
    saveToLocalStorage();
}

// Orders Functions
function displayOrders() {
    const ordersContainer = document.getElementById('ordersContainer');
    
    if (orders.length === 0) {
        ordersContainer.innerHTML = `
            <div class="empty-orders">
                <div class="empty-icon">📦</div>
                <h3>No orders yet</h3>
                <p>Start chatting with KAI to create mock orders!</p>
                <button class="btn btn-primary" onclick="scrollToChat()">Start Shopping</button>
            </div>
        `;
        return;
    }
    
    // Sort orders by timestamp (newest first)
    orders.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
    
    ordersContainer.innerHTML = orders.map(order => `
        <div class="order-card">
            <div class="order-header">
                <span class="order-id">Order #${order.id}</span>
                <span class="order-status ${order.status}">${order.status.toUpperCase()}</span>
            </div>
            <div class="order-details">
                <div class="order-detail">
                    <span class="order-detail-label">Product</span>
                    <span class="order-detail-value">${order.productName}</span>
                </div>
                <div class="order-detail">
                    <span class="order-detail-label">Amount</span>
                    <span class="order-detail-value">₹${order.price.toLocaleString('en-IN')}</span>
                </div>
                <div class="order-detail">
                    <span class="order-detail-label">Order Date</span>
                    <span class="order-detail-value">${order.orderDate}</span>
                </div>
                <div class="order-detail">
                    <span class="order-detail-label">Estimated Delivery</span>
                    <span class="order-detail-value">${order.deliveryDate}</span>
                </div>
            </div>
        </div>
    `).join('');
}

// Local Storage
function saveToLocalStorage() {
    localStorage.setItem('kai_chat_history', JSON.stringify(chatHistory));
    localStorage.setItem('kai_orders', JSON.stringify(orders));
}

function loadFromLocalStorage() {
    const savedChat = localStorage.getItem('kai_chat_history');
    const savedOrders = localStorage.getItem('kai_orders');
    
    if (savedChat) {
        chatHistory = JSON.parse(savedChat);
        // Optionally restore chat messages
    }
    
    if (savedOrders) {
        orders = JSON.parse(savedOrders);
    }
}

// Utility Functions
function formatPrice(price) {
    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        maximumFractionDigits: 0
    }).format(price);
}

function formatDate(date) {
    return new Date(date).toLocaleDateString('en-IN', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
}

// Add smooth scroll behavior
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add scroll reveal animations
window.addEventListener('scroll', () => {
    const reveals = document.querySelectorAll('.feature-card, .product-card, .order-card');
    
    reveals.forEach(element => {
        const windowHeight = window.innerHeight;
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < windowHeight - elementVisible) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
});

// Initialize scroll animations
document.querySelectorAll('.feature-card, .product-card, .order-card').forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(30px)';
    element.style.transition = 'all 0.6s ease';
});

console.log('🤖 KAI is ready! Start chatting to discover amazing products.');
