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
        name: 'Samsung Galaxy S23 5G',
        category: 'Smartphones',
        price: 74999,
        icon: '📱',
        description: 'Flagship Android phone with Snapdragon 8 Gen 2 and 5G connectivity',
        specs: '6.1" display, 128GB, 50MP camera, 5G enabled'
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
    displayOrders();
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
2. **SHOW PRODUCT LISTS** - Display multiple products with details
3. **RECOMMEND BEST PRODUCTS** - Highlight the best option among alternatives
4. Provide detailed product information and specifications
5. Compare products and help users make informed decisions
6. Explain prices (all in Indian Rupees ₹)
7. Provide contact information when asked
8. Help with customer care and support queries
9. **CREATE ORDERS IMMEDIATELY** when user says buy/order/purchase
10. Generate order confirmations with Order IDs, prices, and delivery dates
11. Track order status
12. Answer questions about delivery, returns, refunds
13. Provide shopping tips and advice

IMPORTANT FOR SHOWING PRODUCTS:
When user asks about products (phones, laptops, headphones, etc.):
1. Show 2-4 relevant products from the list above
2. For each product display:
   - Product name
   - Price in ₹ format (₹1,29,900)
   - Key features/description
3. **RECOMMEND THE BEST** - Highlight which one is the best choice and WHY
4. Format products in a clear, easy-to-read list
5. Use <strong> tags for product names and prices

EXAMPLE PRODUCT RESPONSE FORMAT:
"Here are the best [category] products available:

<strong>1. [Product Name]</strong> - ₹[Price]
[Description and key features]

<strong>2. [Product Name]</strong> - ₹[Price]
[Description and key features]

<strong>3. [Product Name]</strong> - ₹[Price]
[Description and key features]

<strong>✨ Best Choice:</strong> I recommend the [Product Name] because [reason - best features, value for money, most popular, etc.]

Would you like to order any of these?"

IMPORTANT FOR ORDERING:
- When user says "I want to order [product]" or "buy [product]", confirm the order
- **ALWAYS MENTION THE EXACT PRODUCT NAME** the user wants to order
- Always say: "Order Placed Successfully! 🎉"
- Confirm: "Your [Product Name] order is confirmed!"
- Always include: Order ID will be generated, Price, Delivery in 3-5 days
- Always thank the customer
- System will automatically create the order in background

RESPONSE GUIDELINES:
- Be helpful, friendly, and professional
- Answer questions accurately using the information provided
- If asked about contact: provide email, phone numbers, and address
- If asked about customer care: mention 24/7 AI chat and phone support
- **For product queries: ALWAYS show 2-4 options with prices in ₹ format**
- **ALWAYS recommend which product is BEST and explain why**
- **FOR ORDERS: Immediately confirm "Order Placed Successfully!" with product name**
- For orders: mention Order ID will be generated, delivery in 3-5 days
- Be conversational but professional
- Use HTML formatting: <strong> for emphasis, <br> for line breaks
- Always end responses helpfully - offer to assist further

WHEN USER WANTS TO ORDER:
1. Confirm: "Order Placed Successfully! 🎉"
2. Mention the EXACT product name: "Your [Product Name] order is confirmed!"
3. State: "Order ID will be generated, Delivery in 3-5 business days"
4. Mention the price: "Amount: ₹[Price]"
5. Thank them for shopping
6. Ask if they need anything else

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
    const lower = userMessage.toLowerCase();
    if (lower.includes('order') || lower.includes('buy') || lower.includes('purchase')) {
        const orderDetails = createOrder(userMessage);
        
        // Find product icon
        const matchedProduct = products.find(p => p.name === orderDetails.product);
        const productIcon = matchedProduct ? matchedProduct.icon : '📦';
        
        // Add order confirmation to response
        const orderConfirmation = `
            <div style="background: linear-gradient(135deg, #10b981, #059669); padding: 1.5rem; border-radius: 12px; color: white; margin: 1rem 0; box-shadow: 0 8px 16px rgba(16, 185, 129, 0.3);">
                <div style="font-size: 1.75rem; margin-bottom: 0.5rem; font-weight: 700;">✅ Order Placed Successfully!</div>
                <div style="font-size: 1.125rem; font-weight: 600; margin-bottom: 1rem; opacity: 0.95;">Order #${orderDetails.id}</div>
                <div style="background: rgba(255,255,255,0.2); padding: 1rem; border-radius: 8px; backdrop-filter: blur(10px);">
                    <div style="margin-bottom: 0.5rem; font-size: 1rem;"><strong>${productIcon} Product:</strong> ${orderDetails.product}</div>
                    <div style="margin-bottom: 0.5rem; font-size: 1rem;"><strong>💰 Amount:</strong> ₹${formatPrice(orderDetails.price)}</div>
                    <div style="margin-bottom: 0.5rem; font-size: 1rem;"><strong>📅 Order Date:</strong> ${orderDetails.orderDate}</div>
                    <div style="margin-bottom: 0.5rem; font-size: 1rem;"><strong>🚚 Delivery By:</strong> ${orderDetails.deliveryDate}</div>
                    <div style="font-size: 1rem;"><strong>📍 Status:</strong> ${orderDetails.status}</div>
                </div>
                <div style="margin-top: 1rem; font-size: 0.875rem; opacity: 0.95; border-top: 1px solid rgba(255,255,255,0.3); padding-top: 1rem;">
                    ✨ <strong>Thank you for shopping with KAI!</strong><br>
                    Your order will be delivered in 3-5 business days. Check "Orders" section to track!
                </div>
            </div>
        `;
        
        // Add confirmation before or after AI response
        response = orderConfirmation + '<br>' + response;
    }
    
    // Format response
    response = response.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    response = response.replace(/\n/g, '<br>');
    
    return response;
}

function createOrder(message) {
    const orderId = 'ORD-' + Math.random().toString(36).substr(2, 9).toUpperCase();
    
    // Enhanced product matching - find exact product name first
    let product = null;
    const lowerMessage = message.toLowerCase();
    
    // Method 1: Try to find full product name match
    product = products.find(p => 
        lowerMessage.includes(p.name.toLowerCase())
    );
    
    // Method 2: Try category-based matching (e.g., "samsung", "iphone", "macbook")
    if (!product) {
        const brandKeywords = {
            'iphone': ['iphone', 'apple phone'],
            'samsung': ['samsung', 's23', 's22', 'galaxy'],
            'macbook': ['macbook', 'mac book', 'apple laptop'],
            'dell': ['dell', 'xps'],
            'hp': ['hp', 'pavilion'],
            'oneplus': ['oneplus', 'one plus'],
            'sony': ['sony', 'wh-1000', 'headphone'],
            'boat': ['boat', 'airdopes'],
            'jbl': ['jbl', 'flip'],
            'watch': ['watch', 'smartwatch'],
            'airpods': ['airpods', 'air pods']
        };
        
        for (let p of products) {
            const productNameLower = p.name.toLowerCase();
            
            // Check if any brand keyword matches
            for (let [brand, keywords] of Object.entries(brandKeywords)) {
                if (productNameLower.includes(brand)) {
                    if (keywords.some(keyword => lowerMessage.includes(keyword))) {
                        product = p;
                        break;
                    }
                }
            }
            if (product) break;
        }
    }
    
    // Method 3: Try individual word matching (minimum 4 characters)
    if (!product) {
        for (let p of products) {
            const words = p.name.toLowerCase().split(' ');
            for (let word of words) {
                if (word.length >= 4 && lowerMessage.includes(word)) {
                    product = p;
                    break;
                }
            }
            if (product) break;
        }
    }
    
    // Method 4: Try category matching
    if (!product) {
        const categoryKeywords = {
            'phone': ['Smartphones'],
            'laptop': ['Laptops'],
            'headphone': ['Audio', 'Headphones'],
            'watch': ['Wearables'],
            'speaker': ['Audio']
        };
        
        for (let [keyword, categories] of Object.entries(categoryKeywords)) {
            if (lowerMessage.includes(keyword)) {
                product = products.find(p => categories.includes(p.category));
                if (product) break;
            }
        }
    }
    
    // Method 5: Default to first product if nothing matched
    if (!product) {
        product = products[0];
    }
    
    const deliveryDate = new Date();
    deliveryDate.setDate(deliveryDate.getDate() + Math.floor(Math.random() * 3) + 3);
    
    const order = {
        id: orderId,
        product: product.name,
        category: product.category,
        price: product.price,
        status: 'Processing',
        orderDate: new Date().toLocaleDateString('en-IN'),
        deliveryDate: deliveryDate.toLocaleDateString('en-IN'),
        timestamp: new Date().toISOString()
    };
    
    orders.push(order);
    saveToStorage();
    
    console.log('✅ Order created:', order);
    console.log('📦 Product matched:', product.name);
    
    return order;
}

function getSmartFallback(userMessage) {
    const lower = userMessage.toLowerCase();
    
    // Order/Buy queries - create order
    if (lower.includes('order') || lower.includes('buy') || lower.includes('purchase')) {
        // Order will be created by processResponse
        return `
            <strong>Order Confirmed! 🎉</strong><br><br>
            Your order has been successfully placed! You can see the details above.<br><br>
            <strong>What happens next?</strong><br>
            ✅ Order confirmed and processing<br>
            📦 Packaging and quality check<br>
            🚚 Shipped to your address<br>
            🎁 Delivered in 3-5 business days<br><br>
            <strong>Need help?</strong><br>
            • Track your order anytime<br>
            • Contact us: +91 1800-123-4567<br>
            • Email: support@kai-assistant.com<br><br>
            Would you like to order anything else?
        `;
    }
    
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
    
    // Product queries - Enhanced with better recommendations
    if (lower.includes('product') || lower.includes('phone') || lower.includes('laptop') || 
        lower.includes('headphone') || lower.includes('watch') || lower.includes('recommend') ||
        lower.includes('suggest') || lower.includes('best') || lower.includes('show')) {
        
        let relevantProducts = [];
        let category = '';
        
        // Determine category
        if (lower.includes('phone') || lower.includes('mobile')) {
            relevantProducts = products.filter(p => p.category === 'Smartphones').slice(0, 3);
            category = 'Smartphones';
        } else if (lower.includes('laptop')) {
            relevantProducts = products.filter(p => p.category === 'Laptops').slice(0, 3);
            category = 'Laptops';
        } else if (lower.includes('headphone') || lower.includes('audio') || lower.includes('speaker')) {
            relevantProducts = products.filter(p => p.category === 'Audio').slice(0, 3);
            category = 'Audio Products';
        } else if (lower.includes('watch')) {
            relevantProducts = products.filter(p => p.category === 'Wearables').slice(0, 3);
            category = 'Smartwatches';
        } else {
            // Show popular products from different categories
            relevantProducts = [products[0], products[3], products[6]];
            category = 'Popular Products';
        }
        
        if (relevantProducts.length > 0) {
            let response = `<strong>Here are the best ${category} available:</strong><br><br>`;
            
            relevantProducts.forEach((p, index) => {
                response += `<strong>${index + 1}. ${p.name}</strong> - ₹${formatPrice(p.price)}<br>`;
                response += `${p.icon} ${p.description}<br>`;
                if (p.specs) response += `<em>${p.specs}</em><br>`;
                response += `<br>`;
            });
            
            // Recommend the best one
            const bestProduct = relevantProducts[0];
            response += `<strong>✨ Best Choice:</strong> I recommend the <strong>${bestProduct.name}</strong> `;
            
            // Provide reasoning based on category
            if (category === 'Smartphones') {
                response += `because it offers the best camera quality, performance, and overall value for money!<br><br>`;
            } else if (category === 'Laptops') {
                response += `because it provides excellent performance, portability, and battery life!<br><br>`;
            } else if (category === 'Audio Products') {
                response += `because it delivers superior sound quality and great battery life!<br><br>`;
            } else {
                response += `because it's our most popular product with excellent features and reliability!<br><br>`;
            }
            
            response += `Would you like to order any of these? Just say "I want to order [product name]"!`;
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

// Orders Display
function displayOrders() {
    const container = document.getElementById('ordersContainer');
    
    if (!container) return;
    
    if (orders.length === 0) {
        container.innerHTML = `
            <div class="empty-orders">
                <div class="empty-icon">📦</div>
                <h3>No orders yet</h3>
                <p>Start shopping with KAI and your orders will appear here!</p>
                <button class="btn btn-primary" onclick="openChat()">Start Shopping</button>
            </div>
        `;
        return;
    }
    
    // Sort orders by timestamp (newest first)
    const sortedOrders = [...orders].sort((a, b) => {
        return new Date(b.timestamp || 0) - new Date(a.timestamp || 0);
    });
    
    container.innerHTML = sortedOrders.map(order => {
        // Find product icon
        const matchedProduct = products.find(p => p.name === order.product);
        const productIcon = matchedProduct ? matchedProduct.icon : '📦';
        
        return `
        <div class="order-card">
            <div class="order-header">
                <div class="order-id">
                    <span style="font-size: 1.5rem; margin-right: 0.5rem;">${productIcon}</span>
                    Order #${order.id}
                </div>
                <div class="order-status ${order.status.toLowerCase()}">${order.status}</div>
            </div>
            <div class="order-details">
                <div class="order-detail">
                    <div class="order-detail-label">Product</div>
                    <div class="order-detail-value">${order.product}</div>
                </div>
                <div class="order-detail">
                    <div class="order-detail-label">Amount</div>
                    <div class="order-detail-value">₹${formatPrice(order.price)}</div>
                </div>
                <div class="order-detail">
                    <div class="order-detail-label">Order Date</div>
                    <div class="order-detail-value">${order.orderDate}</div>
                </div>
                <div class="order-detail">
                    <div class="order-detail-label">Delivery Date</div>
                    <div class="order-detail-value">${order.deliveryDate}</div>
                </div>
            </div>
        </div>
        `;
    }).join('');
}

// Utility Functions
function formatPrice(price) {
    return price.toLocaleString('en-IN');
}

function saveToStorage() {
    localStorage.setItem('kai_chat_history', JSON.stringify(chatHistory));
    localStorage.setItem('kai_orders', JSON.stringify(orders));
    
    // Update orders display whenever we save
    displayOrders();
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
