// Configuration
const GOOGLE_API_KEY = 'AIzaSyAHDnHtiGyJTgU3hCXFPZKx3gS9wqLtZ-U';
const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${GOOGLE_API_KEY}`;

// State Management
let chatHistory = [];
let orders = [];

// Sample Products Data
const sampleProducts = [
    {
        id: 1,
        name: 'iPhone 14 Pro',
        category: 'Smartphones',
        price: 129900,
        icon: '📱',
        description: 'Latest Apple iPhone with A16 Bionic chip, 48MP camera, and Dynamic Island',
        rating: 4.8
    },
    {
        id: 2,
        name: 'MacBook Air M2',
        category: 'Laptops',
        price: 114900,
        icon: '💻',
        description: 'Powerful laptop with Apple M2 chip, 8GB RAM, 256GB SSD',
        rating: 4.9
    },
    {
        id: 3,
        name: 'Sony WH-1000XM5',
        category: 'Audio',
        price: 29990,
        icon: '🎧',
        description: 'Premium noise-cancelling headphones with 30-hour battery life',
        rating: 4.7
    },
    {
        id: 4,
        name: 'Samsung Galaxy S23',
        category: 'Smartphones',
        price: 74999,
        icon: '📱',
        description: 'Flagship Android phone with Snapdragon 8 Gen 2, 50MP camera',
        rating: 4.6
    },
    {
        id: 5,
        name: 'iPad Pro 11"',
        category: 'Tablets',
        price: 81900,
        icon: '📱',
        description: 'Professional tablet with M2 chip, perfect for creative work',
        rating: 4.8
    },
    {
        id: 6,
        name: 'Apple Watch Series 9',
        category: 'Wearables',
        price: 41900,
        icon: '⌚',
        description: 'Advanced smartwatch with health monitoring and fitness tracking',
        rating: 4.7
    },
    {
        id: 7,
        name: 'Dell XPS 15',
        category: 'Laptops',
        price: 139990,
        icon: '💻',
        description: 'Premium Windows laptop with Intel i7, 16GB RAM, 512GB SSD',
        rating: 4.6
    },
    {
        id: 8,
        name: 'AirPods Pro 2',
        category: 'Audio',
        price: 26900,
        icon: '🎧',
        description: 'True wireless earbuds with active noise cancellation',
        rating: 4.8
    },
    {
        id: 9,
        name: 'OnePlus 11',
        category: 'Smartphones',
        price: 56999,
        icon: '📱',
        description: 'Flagship killer with Snapdragon 8 Gen 2, 16GB RAM, 256GB storage',
        rating: 4.5
    },
    {
        id: 10,
        name: 'Samsung Galaxy Watch 6',
        category: 'Wearables',
        price: 31999,
        icon: '⌚',
        description: 'Feature-rich smartwatch with comprehensive health tracking',
        rating: 4.6
    },
    {
        id: 11,
        name: 'HP Pavilion Gaming',
        category: 'Laptops',
        price: 74990,
        icon: '💻',
        description: 'Gaming laptop with RTX 3050, AMD Ryzen 5, 16GB RAM',
        rating: 4.4
    },
    {
        id: 12,
        name: 'JBL Flip 6',
        category: 'Audio',
        price: 11999,
        icon: '🔊',
        description: 'Portable Bluetooth speaker with powerful sound and waterproof design',
        rating: 4.5
    }
];

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    loadFromLocalStorage();
    initializeNavigation();
    displayProducts();
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
    const sections = document.querySelectorAll('section');
    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            if (window.pageYOffset >= sectionTop) {
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

// Products Display
function displayProducts() {
    const productsGrid = document.getElementById('productsGrid');
    
    if (sampleProducts.length === 0) {
        productsGrid.innerHTML = `
            <div class="loading-spinner">
                <div class="spinner"></div>
                <p>Loading products...</p>
            </div>
        `;
        return;
    }
    
    productsGrid.innerHTML = sampleProducts.map((product, index) => `
        <div class="product-card" style="animation-delay: ${index * 0.1}s">
            <div class="product-image">${product.icon}</div>
            <div class="product-info">
                <span class="product-category">${product.category}</span>
                <h3 class="product-name">${product.name}</h3>
                <div class="product-price">₹${formatPrice(product.price)}</div>
                <p class="product-description">${product.description}</p>
                <div class="product-actions">
                    <button class="btn-small btn-ask" onclick="askAboutProduct('${product.name}')">Ask KAI</button>
                    <button class="btn-small btn-order" onclick="orderProduct('${product.name}', ${product.price})">Order Now</button>
                </div>
            </div>
        </div>
    `).join('');
}

function askAboutProduct(productName) {
    scrollToChat();
    setTimeout(() => {
        document.getElementById('chatInput').value = `Tell me more about ${productName}`;
        sendMessage();
    }, 500);
}

function orderProduct(productName, price) {
    scrollToChat();
    setTimeout(() => {
        document.getElementById('chatInput').value = `I want to order ${productName}`;
        sendMessage();
    }, 500);
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
    
    // Hide welcome card
    const welcomeCard = document.querySelector('.welcome-card');
    if (welcomeCard) {
        welcomeCard.style.display = 'none';
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
    const chatMessages = document.getElementById('chatMessages');
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${sender}`;
    
    const contentDiv = document.createElement('div');
    contentDiv.className = 'message-content';
    contentDiv.innerHTML = content;
    
    messageDiv.appendChild(contentDiv);
    chatMessages.appendChild(messageDiv);
    
    // Scroll to bottom
    chatMessages.scrollTop = chatMessages.scrollHeight;
    
    // Save to history
    chatHistory.push({ sender, content, timestamp: new Date().toISOString() });
}

function addTypingIndicator() {
    const chatMessages = document.getElementById('chatMessages');
    const typingDiv = document.createElement('div');
    typingDiv.className = 'message ai typing-message';
    typingDiv.innerHTML = `
        <div class="message-content typing-indicator">
            <div class="typing-dot"></div>
            <div class="typing-dot"></div>
            <div class="typing-dot"></div>
        </div>
    `;
    chatMessages.appendChild(typingDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function removeTypingIndicator() {
    const typingMessage = document.querySelector('.typing-message');
    if (typingMessage) {
        typingMessage.remove();
    }
}

async function getAIResponse(userMessage) {
    const systemPrompt = `You are KAI, a professional AI shopping assistant for an e-commerce platform in India.

Your capabilities:
1. Recommend products based on user queries
2. Provide detailed product information and comparisons
3. Suggest 2-3 similar products with pros/cons
4. Recommend the BEST product to buy with clear reasoning
5. Create mock orders with order details
6. Answer product-related questions

Product categories available: Smartphones, Laptops, Tablets, Audio Devices, Wearables

When recommending products:
- Include product name, price in INR (₹), key features
- Format: ₹XX,XXX (Indian format)
- Provide ratings out of 5 stars
- Explain why you recommend it
- Compare 2-3 options

When creating orders:
- Generate Order ID: ORD-XXXXX
- Show product name and price in ₹
- Delivery: 3-5 business days
- Status: Processing

User query: ${userMessage}

Provide a helpful, professional response. Use simple HTML for formatting if needed.`;

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
                    temperature: 0.7,
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
        
        // Process the response
        aiResponse = processAIResponse(aiResponse, userMessage);
        
        return aiResponse;
    } catch (error) {
        console.error('API Error:', error);
        return getFallbackResponse(userMessage);
    }
}

function processAIResponse(response, userMessage) {
    // Check if response contains order information
    const orderPattern = /order|buy|purchase/i;
    if (orderPattern.test(userMessage)) {
        createMockOrderFromMessage(userMessage);
    }
    
    // Format the response
    response = response.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    response = response.replace(/\n/g, '<br>');
    
    return response;
}

function createMockOrderFromMessage(message) {
    const orderId = 'ORD-' + Math.random().toString(36).substr(2, 9).toUpperCase();
    
    // Try to find product in message
    let productName = 'Product';
    let price = 0;
    
    const product = sampleProducts.find(p => 
        message.toLowerCase().includes(p.name.toLowerCase())
    );
    
    if (product) {
        productName = product.name;
        price = product.price;
    } else {
        price = Math.floor(Math.random() * 50000) + 5000;
        const match = message.match(/([A-Z][a-z]+(?:\s+[A-Z][a-z]+)*)/);
        if (match) {
            productName = match[0];
        }
    }
    
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
    const lowerMessage = userMessage.toLowerCase();
    
    if (lowerMessage.includes('smartphone') || lowerMessage.includes('phone') || lowerMessage.includes('mobile')) {
        return `
            <strong>📱 Top Smartphone Recommendations</strong><br><br>
            
            <strong>1. iPhone 14 Pro - ₹1,29,900</strong><br>
            • A16 Bionic chip with 6-core CPU<br>
            • 48MP Pro camera system<br>
            • Dynamic Island feature<br>
            • ⭐ Rating: 4.8/5<br><br>
            
            <strong>2. Samsung Galaxy S23 - ₹74,999</strong><br>
            • Snapdragon 8 Gen 2 processor<br>
            • 50MP triple camera<br>
            • 8GB RAM, 256GB storage<br>
            • ⭐ Rating: 4.6/5<br><br>
            
            <strong>3. OnePlus 11 - ₹56,999</strong><br>
            • Snapdragon 8 Gen 2<br>
            • 16GB RAM, 256GB storage<br>
            • Hasselblad camera system<br>
            • ⭐ Rating: 4.5/5<br><br>
            
            <strong>💡 Recommendation:</strong> iPhone 14 Pro offers the best overall experience with superior camera quality and ecosystem, but Samsung Galaxy S23 provides excellent value for Android users.
        `;
    } else if (lowerMessage.includes('laptop')) {
        return `
            <strong>💻 Top Laptop Recommendations</strong><br><br>
            
            <strong>1. MacBook Air M2 - ₹1,14,900</strong><br>
            • Apple M2 chip (8-core CPU)<br>
            • 8GB unified memory<br>
            • 18-hour battery life<br>
            • ⭐ Rating: 4.9/5<br><br>
            
            <strong>2. Dell XPS 15 - ₹1,39,990</strong><br>
            • Intel Core i7 12th Gen<br>
            • 16GB RAM, 512GB SSD<br>
            • NVIDIA RTX 3050 Ti<br>
            • ⭐ Rating: 4.6/5<br><br>
            
            <strong>3. HP Pavilion Gaming - ₹74,990</strong><br>
            • AMD Ryzen 5 5600H<br>
            • 16GB RAM, 512GB SSD<br>
            • RTX 3050 graphics<br>
            • ⭐ Rating: 4.4/5<br><br>
            
            <strong>💡 Recommendation:</strong> MacBook Air M2 for best battery life and performance, Dell XPS 15 for Windows users, HP Pavilion for budget gaming.
        `;
    } else if (lowerMessage.includes('headphone') || lowerMessage.includes('earphone')) {
        return `
            <strong>🎧 Top Audio Device Recommendations</strong><br><br>
            
            <strong>1. Sony WH-1000XM5 - ₹29,990</strong><br>
            • Industry-leading noise cancellation<br>
            • 30-hour battery life<br>
            • Premium build quality<br>
            • ⭐ Rating: 4.7/5<br><br>
            
            <strong>2. AirPods Pro 2 - ₹26,900</strong><br>
            • Active Noise Cancellation<br>
            • Spatial Audio support<br>
            • H2 chip for better sound<br>
            • ⭐ Rating: 4.8/5<br><br>
            
            <strong>3. JBL Flip 6 - ₹11,999</strong><br>
            • Portable Bluetooth speaker<br>
            • IP67 waterproof<br>
            • 12-hour battery<br>
            • ⭐ Rating: 4.5/5<br><br>
            
            <strong>💡 Recommendation:</strong> Sony WH-1000XM5 for best noise cancellation, AirPods Pro 2 for Apple ecosystem users.
        `;
    } else if (lowerMessage.includes('order') || lowerMessage.includes('buy')) {
        createMockOrderFromMessage(userMessage);
        const orderId = orders[orders.length - 1]?.id || 'ORD-XXXXX';
        const price = orders[orders.length - 1]?.price || 25000;
        const deliveryDate = orders[orders.length - 1]?.deliveryDate || 'Within 5 days';
        
        return `
            <strong>✅ Order Created Successfully!</strong><br><br>
            📦 <strong>Order ID:</strong> ${orderId}<br>
            💰 <strong>Amount:</strong> ₹${formatPrice(price)}<br>
            📅 <strong>Estimated Delivery:</strong> ${deliveryDate}<br>
            📍 <strong>Status:</strong> Processing<br><br>
            Your order has been placed successfully! You can track it in the Orders section.
        `;
    } else {
        return `
            Hello! I'm KAI, your AI shopping assistant. I can help you with:<br><br>
            
            🔍 <strong>Product Search</strong> - Find smartphones, laptops, audio devices, and more<br>
            💡 <strong>Recommendations</strong> - Get personalized product suggestions<br>
            📊 <strong>Comparisons</strong> - Compare features and prices<br>
            🛒 <strong>Orders</strong> - Create and track mock orders<br><br>
            
            Try asking:<br>
            • "Show me smartphones under ₹30,000"<br>
            • "Best laptop for programming"<br>
            • "Compare wireless headphones"<br>
            • "I want to order an iPhone"
        `;
    }
}

function clearChat() {
    const chatMessages = document.getElementById('chatMessages');
    chatMessages.innerHTML = `
        <div class="welcome-card">
            <div class="welcome-icon">
                <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                    <circle cx="24" cy="24" r="24" fill="url(#welcome-gradient2)"/>
                    <path d="M16 20C16 20 20 18 24 18C28 18 32 20 32 20M18 28H30" stroke="white" stroke-width="2" stroke-linecap="round"/>
                    <defs>
                        <linearGradient id="welcome-gradient2">
                            <stop offset="0%" stop-color="#667eea"/>
                            <stop offset="100%" stop-color="#764ba2"/>
                        </linearGradient>
                    </defs>
                </svg>
            </div>
            <h3>Hello! I'm KAI</h3>
            <p>Your intelligent shopping assistant. I can help you find products, compare prices, and make informed purchase decisions.</p>
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
                <p>Start shopping with KAI to create orders</p>
                <button class="btn btn-primary" onclick="scrollToChat()">Start Shopping</button>
            </div>
        `;
        return;
    }
    
    // Sort orders by timestamp (newest first)
    orders.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
    
    ordersContainer.innerHTML = orders.map((order, index) => `
        <div class="order-card" style="animation-delay: ${index * 0.1}s">
            <div class="order-header">
                <span class="order-id">Order #${order.id}</span>
                <span class="order-status ${order.status}">${order.status}</span>
            </div>
            <div class="order-details">
                <div class="order-detail">
                    <span class="order-detail-label">Product</span>
                    <span class="order-detail-value">${order.productName}</span>
                </div>
                <div class="order-detail">
                    <span class="order-detail-label">Amount</span>
                    <span class="order-detail-value">₹${formatPrice(order.price)}</span>
                </div>
                <div class="order-detail">
                    <span class="order-detail-label">Order Date</span>
                    <span class="order-detail-value">${order.orderDate}</span>
                </div>
                <div class="order-detail">
                    <span class="order-detail-label">Delivery Date</span>
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
    }
    
    if (savedOrders) {
        orders = JSON.parse(savedOrders);
    }
}

// Utility Functions
function formatPrice(price) {
    return price.toLocaleString('en-IN');
}

console.log('🤖 KAI is ready! Professional AI shopping assistant initialized.');
