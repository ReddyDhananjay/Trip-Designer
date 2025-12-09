// Configuration
const GOOGLE_API_KEY = 'AIzaSyAHDnHtiGyJTgU3hCXFPZKx3gS9wqLtZ-U';
const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${GOOGLE_API_KEY}`;

// Website Information for AI Context
const WEBSITE_INFO = {
    name: "KAI - Intelligent Shopping Assistant",
    description: "AI-powered shopping platform with 24/7 online ordering",
    contact: {
        email: "support@kai-assistant.com",
        phone: "+91 1800-123-4567",
        phone2: "+91 98765-43210",
        address: "123 Tech Park, Electronic City, Bangalore, Karnataka 560100"
    },
    phoneHours: "Phone Support: Monday-Friday 9:00 AM - 8:00 PM, Saturday-Sunday 10:00 AM - 6:00 PM",
    ordering: "24/7 Online Ordering Available - Order products anytime, day or night!",
    features: [
        "24/7 online ordering - shop anytime!",
        "AI-powered product search and recommendations",
        "Real-time price comparisons",
        "24/7 AI chat support",
        "Easy ordering and tracking",
        "Secure payment processing"
    ]
};

// Sample Products Data
const products = [
    {
        id: 1,
        name: 'iPhone 14 Pro',
        category: 'Smartphones',
        price: 129900,
        icon: '📱',
        description: 'Latest Apple iPhone with A16 Bionic chip and advanced camera system',
        specs: '6.1" display, 128GB storage, 48MP camera'
    },
    {
        id: 2,
        name: 'MacBook Air M2',
        category: 'Laptops',
        price: 114900,
        icon: '💻',
        description: 'Powerful and lightweight laptop with Apple M2 chip',
        specs: 'M2 chip, 8GB RAM, 256GB SSD, 18hr battery'
    },
    {
        id: 3,
        name: 'Sony WH-1000XM5',
        category: 'Audio',
        price: 29990,
        icon: '🎧',
        description: 'Industry-leading noise cancellation headphones',
        specs: '30-hour battery, Premium sound quality'
    },
    {
        id: 4,
        name: 'Samsung Galaxy S23',
        category: 'Smartphones',
        price: 74999,
        icon: '📱',
        description: 'Flagship Android phone with Snapdragon 8 Gen 2',
        specs: '6.1" display, 128GB, 50MP camera'
    },
    {
        id: 5,
        name: 'iPad Pro 11"',
        category: 'Tablets',
        price: 81900,
        icon: '📱',
        description: 'Professional tablet with M2 chip for creative work',
        specs: 'M2 chip, 128GB, ProMotion display'
    },
    {
        id: 6,
        name: 'Apple Watch Series 9',
        category: 'Wearables',
        price: 41900,
        icon: '⌚',
        description: 'Advanced smartwatch with health and fitness features',
        specs: 'S9 chip, Always-on display, Health tracking'
    },
    {
        id: 7,
        name: 'Dell XPS 15',
        category: 'Laptops',
        price: 139990,
        icon: '💻',
        description: 'Premium Windows laptop for professionals',
        specs: 'Intel i7, 16GB RAM, 512GB SSD, RTX 3050'
    },
    {
        id: 8,
        name: 'AirPods Pro 2',
        category: 'Audio',
        price: 26900,
        icon: '🎧',
        description: 'True wireless earbuds with active noise cancellation',
        specs: 'ANC, Spatial Audio, 30hr battery with case'
    },
    {
        id: 9,
        name: 'OnePlus 11',
        category: 'Smartphones',
        price: 56999,
        icon: '📱',
        description: 'Flagship killer with Hasselblad camera system',
        specs: 'Snapdragon 8 Gen 2, 16GB RAM, 256GB'
    },
    {
        id: 10,
        name: 'Samsung Galaxy Watch 6',
        category: 'Wearables',
        price: 31999,
        icon: '⌚',
        description: 'Feature-rich smartwatch with comprehensive health tracking',
        specs: 'AMOLED display, Health monitoring, GPS'
    },
    {
        id: 11,
        name: 'HP Pavilion Gaming',
        category: 'Laptops',
        price: 74990,
        icon: '💻',
        description: 'Gaming laptop with powerful graphics',
        specs: 'AMD Ryzen 5, 16GB RAM, RTX 3050, 512GB SSD'
    },
    {
        id: 12,
        name: 'JBL Flip 6',
        category: 'Audio',
        price: 11999,
        icon: '🔊',
        description: 'Portable Bluetooth speaker with powerful sound',
        specs: 'Waterproof, 12hr battery, Bold JBL sound'
    }
];

// State
let chatHistory = [];
let orders = [];

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    loadProducts();
    initNavigation();
    loadFromStorage();
});

// Navigation
function initNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
            
            const targetId = link.getAttribute('href');
            document.querySelector(targetId).scrollIntoView({ behavior: 'smooth' });
        });
    });
    
    // Update active link on scroll
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

function scrollTo(target) {
    document.querySelector(target).scrollIntoView({ behavior: 'smooth' });
}

// Products
function loadProducts() {
    const grid = document.getElementById('productsGrid');
    
    if (products.length === 0) {
        grid.innerHTML = '<div class="loading"><div class="spinner"></div></div>';
        return;
    }
    
    grid.innerHTML = products.map(product => `
        <div class="product-card">
            <div class="product-image">${product.icon}</div>
            <div class="product-info">
                <span class="product-badge">${product.category}</span>
                <h3 class="product-name">${product.name}</h3>
                <div class="product-price">₹${formatPrice(product.price)}</div>
                <p class="product-description">${product.description}</p>
                <div class="product-actions">
                    <button class="btn-small btn-ask" onclick="askAboutProduct('${product.name}')">Ask KAI</button>
                    <button class="btn-small btn-buy" onclick="orderProduct('${product.name}', ${product.price})">Buy Now</button>
                </div>
            </div>
        </div>
    `).join('');
}

function askAboutProduct(productName) {
    openChat();
    setTimeout(() => {
        const input = document.getElementById('chatInput');
        input.value = `Tell me more about ${productName}`;
        sendChatMessage();
    }, 300);
}

function orderProduct(productName, price) {
    openChat();
    setTimeout(() => {
        const input = document.getElementById('chatInput');
        input.value = `I want to order ${productName}`;
        sendChatMessage();
    }, 300);
}

// Chat Functions
function toggleChat() {
    const widget = document.getElementById('chatWidget');
    const button = document.getElementById('chatButton');
    
    if (widget.classList.contains('active')) {
        closeChat();
    } else {
        openChat();
    }
}

function openChat() {
    const widget = document.getElementById('chatWidget');
    const button = document.getElementById('chatButton');
    
    widget.classList.add('active');
    button.style.display = 'none';
    
    // Clear new message badge
    const badge = document.querySelector('.chat-badge');
    if (badge) badge.style.display = 'none';
}

function closeChat() {
    const widget = document.getElementById('chatWidget');
    const button = document.getElementById('chatButton');
    
    widget.classList.remove('active');
    button.style.display = 'flex';
}

function handleChatKeyPress(event) {
    if (event.key === 'Enter') {
        sendChatMessage();
    }
}

async function sendChatMessage() {
    const input = document.getElementById('chatInput');
    const message = input.value.trim();
    
    if (!message) return;
    
    // Clear input
    input.value = '';
    
    // Hide welcome message
    const welcome = document.querySelector('.chat-welcome');
    if (welcome) welcome.style.display = 'none';
    
    // Add user message
    addChatMessage('user', message);
    
    // Show typing indicator
    showTypingIndicator();
    
    // Get AI response
    try {
        const response = await getAIResponse(message);
        hideTypingIndicator();
        addChatMessage('ai', response);
        saveToStorage();
    } catch (error) {
        hideTypingIndicator();
        addChatMessage('ai', 'I apologize, but I\'m having trouble connecting right now. Please try again or contact our customer care at +91 1800-123-4567.');
        console.error('Chat error:', error);
    }
}

function addChatMessage(sender, content) {
    const chatBody = document.getElementById('chatBody');
    const messageDiv = document.createElement('div');
    messageDiv.className = `chat-message ${sender}`;
    
    const bubble = document.createElement('div');
    bubble.className = 'message-bubble';
    bubble.innerHTML = content;
    
    messageDiv.appendChild(bubble);
    chatBody.appendChild(messageDiv);
    
    // Scroll to bottom
    chatBody.scrollTop = chatBody.scrollHeight;
    
    // Save to history
    chatHistory.push({ sender, content, timestamp: new Date().toISOString() });
}

function showTypingIndicator() {
    const chatBody = document.getElementById('chatBody');
    const indicator = document.createElement('div');
    indicator.className = 'chat-message ai typing-message';
    indicator.innerHTML = `
        <div class="message-bubble typing-indicator">
            <div class="typing-dot"></div>
            <div class="typing-dot"></div>
            <div class="typing-dot"></div>
        </div>
    `;
    chatBody.appendChild(indicator);
    chatBody.scrollTop = chatBody.scrollHeight;
}

function hideTypingIndicator() {
    const indicator = document.querySelector('.typing-message');
    if (indicator) indicator.remove();
}

async function getAIResponse(userMessage) {
    const productsList = products.map(p => 
        `${p.name} (${p.category}) - ₹${formatPrice(p.price)} - ${p.description}`
    ).join('\n');
    
    const systemPrompt = `You are KAI, an intelligent AI shopping assistant for the KAI Shopping Platform.

IMPORTANT: WE OFFER 24/7 ONLINE ORDERING!
Customers can order products ANYTIME - day or night, 365 days a year!

WEBSITE INFORMATION:
- Name: ${WEBSITE_INFO.name}
- Description: ${WEBSITE_INFO.description}
- ORDERING: ${WEBSITE_INFO.ordering}
- Email: ${WEBSITE_INFO.contact.email}
- Phone: ${WEBSITE_INFO.contact.phone} (Toll Free), ${WEBSITE_INFO.contact.phone2}
- Address: ${WEBSITE_INFO.contact.address}
- Phone Support Hours: ${WEBSITE_INFO.phoneHours}
- AI Chat: Available 24/7
- Online Orders: 24/7 - ANYTIME!

AVAILABLE PRODUCTS:
${productsList}

YOUR CAPABILITIES:
1. Answer ANY question about our website, products, services, or policies
2. Provide detailed product information and recommendations
3. Compare products and help users make informed decisions
4. Explain prices (all in Indian Rupees ₹)
5. Provide contact information when asked
6. Help with customer care and support queries
7. Create mock orders with order IDs
8. Track order status
9. Answer questions about delivery, returns, refunds
10. Provide shopping tips and advice

RESPONSE GUIDELINES:
- Be helpful, friendly, and professional
- Answer questions accurately using the information provided
- If asked about contact: provide email, phone numbers, and address
- If asked about customer care: mention 24/7 AI chat and phone support
- For product queries: recommend 2-3 options with prices in ₹ format
- For orders: generate Order ID (ORD-XXXXX) and delivery dates
- Be conversational but professional
- Use simple HTML formatting when helpful (<strong>, <br>, etc.)
- Always end responses helpfully - offer to assist further

User Question: ${userMessage}

Provide a helpful, accurate, and professional response.`;

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
            throw new Error('API request failed');
        }

        const data = await response.json();
        let aiResponse = data.candidates[0].content.parts[0].text;
        
        // Process response for special actions
        aiResponse = processResponse(aiResponse, userMessage);
        
        return aiResponse;
    } catch (error) {
        console.error('AI Error:', error);
        return getSmartFallback(userMessage);
    }
}

function processResponse(response, userMessage) {
    // Check for order creation
    if (userMessage.toLowerCase().includes('order') || userMessage.toLowerCase().includes('buy')) {
        createOrder(userMessage);
    }
    
    // Format response
    response = response.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    response = response.replace(/\n/g, '<br>');
    
    return response;
}

function createOrder(message) {
    const orderId = 'ORD-' + Math.random().toString(36).substr(2, 9).toUpperCase();
    
    // Find product in message
    let product = products.find(p => 
        message.toLowerCase().includes(p.name.toLowerCase())
    );
    
    if (!product) {
        product = products[Math.floor(Math.random() * products.length)];
    }
    
    const deliveryDate = new Date();
    deliveryDate.setDate(deliveryDate.getDate() + Math.floor(Math.random() * 3) + 3);
    
    const order = {
        id: orderId,
        product: product.name,
        price: product.price,
        status: 'Processing',
        orderDate: new Date().toLocaleDateString('en-IN'),
        deliveryDate: deliveryDate.toLocaleDateString('en-IN')
    };
    
    orders.push(order);
    saveToStorage();
}

function getSmartFallback(userMessage) {
    const lower = userMessage.toLowerCase();
    
    // Contact queries
    if (lower.includes('contact') || lower.includes('email') || lower.includes('phone') || lower.includes('call') || lower.includes('hours')) {
        return `
            <strong>Contact Information</strong><br><br>
            🛒 <strong>ORDER ANYTIME 24/7!</strong><br>
            Shop and place orders anytime - day or night!<br><br>
            📧 <strong>Email:</strong> support@kai-assistant.com<br>
            📞 <strong>Phone:</strong> +91 1800-123-4567 (Toll Free)<br>
            📱 <strong>Mobile:</strong> +91 98765-43210<br>
            📍 <strong>Address:</strong> 123 Tech Park, Electronic City, Bangalore, Karnataka 560100<br><br>
            <strong>Phone Support Hours:</strong><br>
            Monday-Friday: 9:00 AM - 8:00 PM<br>
            Saturday-Sunday: 10:00 AM - 6:00 PM<br><br>
            💬 <strong>AI Chat & Online Ordering:</strong> 24/7 Available!<br><br>
            How else can I help you?
        `;
    }
    
    // Help/support queries
    if (lower.includes('help') || lower.includes('support') || lower.includes('customer care')) {
        return `
            <strong>Customer Support - 24/7 Available!</strong><br><br>
            🛒 <strong>Order Anytime:</strong> Place orders 24/7 online!<br><br>
            I'm here to help you anytime! You can:<br><br>
            💬 <strong>Chat with me 24/7</strong> - I can answer any questions<br>
            🛍️ <strong>Order products 24/7</strong> - Shop anytime, day or night<br>
            📞 <strong>Call us</strong> - +91 1800-123-4567 (Mon-Fri: 9 AM - 8 PM)<br>
            📧 <strong>Email us</strong> - support@kai-assistant.com<br><br>
            What would you like help with today?
        `;
    }
    
    // Product queries
    if (lower.includes('product') || lower.includes('phone') || lower.includes('laptop')) {
        const relevantProducts = products.filter(p => 
            lower.includes(p.category.toLowerCase()) || 
            lower.includes(p.name.toLowerCase())
        ).slice(0, 3);
        
        if (relevantProducts.length > 0) {
            let response = '<strong>Here are some great products for you:</strong><br><br>';
            relevantProducts.forEach(p => {
                response += `<strong>${p.name}</strong> - ₹${formatPrice(p.price)}<br>`;
                response += `${p.description}<br><br>`;
            });
            response += 'Would you like to know more about any of these?';
            return response;
        }
    }
    
    // Default helpful response
    return `
        <strong>I'm KAI, your 24/7 shopping assistant!</strong><br><br>
        🛒 <strong>Order Anytime!</strong> Shop 24/7 - day or night!<br><br>
        I can help you with:<br><br>
        🛍️ Order products 24/7<br>
        💰 Product recommendations & price comparisons<br>
        📞 Contact information<br>
        💬 Any questions about shopping<br>
        📦 Orders and delivery<br>
        🆘 Customer support<br><br>
        What would you like to know or order?
    `;
}

// Utility Functions
function formatPrice(price) {
    return price.toLocaleString('en-IN');
}

function saveToStorage() {
    localStorage.setItem('kai_chat_history', JSON.stringify(chatHistory));
    localStorage.setItem('kai_orders', JSON.stringify(orders));
}

function loadFromStorage() {
    const savedChat = localStorage.getItem('kai_chat_history');
    const savedOrders = localStorage.getItem('kai_orders');
    
    if (savedChat) {
        chatHistory = JSON.parse(savedChat);
    }
    
    if (savedOrders) {
        orders = JSON.parse(savedOrders);
    }
}

console.log('KAI Assistant Ready! 🤖');
