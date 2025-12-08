// Products Database
const products = [
    {
        id: "1",
        name: "boAt Rockerz 450 Bluetooth Wireless Headphones",
        category: "Electronics",
        price: 1499,
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500",
        description: "Premium wireless headphones with 40mm dynamic drivers, immersive audio, plush ear cushions, and up to 15 hours battery life. Available on Amazon & Flipkart.",
        specs: {
            battery: "15 hours",
            connectivity: "Bluetooth 4.2",
            weight: "220g",
            warranty: "1 year"
        },
        stock: 45,
        featured: true,
        platform: "Amazon, Flipkart"
    },
    {
        id: "2",
        name: "Fire-Boltt Phoenix Smart Watch",
        category: "Wearables",
        price: 1999,
        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500",
        description: "1.3\" full touch display, Bluetooth calling, 120+ sports modes, SpO2 & heart rate monitoring. India's #1 smartwatch brand on Flipkart & Amazon.",
        specs: {
            display: "1.3\" TFT",
            battery: "7 days",
            waterproof: "IP67",
            sensors: "Heart rate, SpO2, Sleep tracker"
        },
        stock: 32,
        featured: true,
        platform: "Amazon, Flipkart, Myntra"
    },
    {
        id: "3",
        name: "Lavie Sport Women's Backpack",
        category: "Bags",
        price: 1299,
        image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500",
        description: "Stylish & spacious laptop backpack with multiple compartments, water-resistant fabric. Perfect for college, office, and travel. Top seller on Myntra & Amazon.",
        specs: {
            material: "Polyester",
            capacity: "22L",
            laptop: "Up to 15.6\"",
            pockets: "5 compartments"
        },
        stock: 18,
        featured: true,
        platform: "Myntra, Amazon"
    },
    {
        id: "4",
        name: "Zebronics Zeb-Crystal Pro Webcam",
        category: "Electronics",
        price: 899,
        image: "https://images.unsplash.com/photo-1588874355576-b077e0446f56?w=500",
        description: "Full HD 1080p webcam with autofocus, built-in microphone, 360° rotation for video calls, online classes & streaming. Available on Amazon & Flipkart.",
        specs: {
            resolution: "1080p @ 30fps",
            fov: "90 degrees",
            microphone: "Built-in",
            mount: "Universal clip"
        },
        stock: 28,
        featured: false,
        platform: "Amazon, Flipkart"
    },
    {
        id: "5",
        name: "Cosmic Byte Equinox Cobra Gaming Mouse",
        category: "Accessories",
        price: 449,
        image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=500",
        description: "Wired gaming mouse with RGB LED lights, 6 buttons, adjustable DPI up to 3200. Perfect for gaming & office work. Bestseller on Amazon.",
        specs: {
            dpi: "Up to 3200",
            buttons: "6 programmable",
            cable: "1.5m braided",
            connectivity: "USB wired"
        },
        stock: 56,
        featured: false,
        platform: "Amazon, Flipkart"
    },
    {
        id: "6",
        name: "Portronics Konnect L 7-in-1 USB C Hub",
        category: "Accessories",
        price: 1799,
        image: "https://images.unsplash.com/photo-1625948515291-69613efd103f?w=500",
        description: "Premium Type-C hub with HDMI 4K output, 3 USB 3.0 ports, SD/TF card readers, and 100W PD charging. Compatible with all laptops. Amazon Choice product.",
        specs: {
            ports: "7 ports total",
            hdmi: "4K @ 30Hz",
            power: "100W PD",
            usb: "USB 3.0 5Gbps"
        },
        stock: 67,
        featured: false,
        platform: "Amazon, Flipkart"
    },
    {
        id: "7",
        name: "Campus Maxico Running Shoes for Men",
        category: "Shoes",
        price: 999,
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500",
        description: "Lightweight sports shoes with memory foam insole, anti-slip sole, and breathable mesh upper. Perfect for running, gym & casual wear. Top rated on Myntra & Flipkart.",
        specs: {
            weight: "250g",
            cushioning: "Memory foam",
            upper: "Breathable mesh",
            sole: "Phylon sole"
        },
        stock: 42,
        featured: true,
        platform: "Myntra, Flipkart, Amazon"
    },
    {
        id: "8",
        name: "boAt Stone 350 Bluetooth Speaker",
        category: "Electronics",
        price: 1299,
        image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500",
        description: "Portable wireless speaker with 10W premium sound, IPX7 waterproof rating, 12 hours playback. Perfect for outdoor parties. #1 on Amazon.",
        specs: {
            battery: "12 hours",
            waterproof: "IPX7",
            connectivity: "Bluetooth 5.0",
            power: "10W output"
        },
        stock: 39,
        featured: false,
        platform: "Amazon, Flipkart"
    },
    {
        id: "9",
        name: "WildHorn RFID Protected Leather Wallet",
        category: "Accessories",
        price: 599,
        image: "https://images.unsplash.com/photo-1627123424574-724758594e93?w=500",
        description: "Premium genuine leather wallet with RFID blocking, multiple card slots & coin pocket. Slim design for men. Bestseller on Amazon & Myntra.",
        specs: {
            material: "Genuine leather",
            capacity: "8 card slots",
            rfid: "Yes",
            dimensions: "11cm x 9cm"
        },
        stock: 91,
        featured: false,
        platform: "Amazon, Myntra"
    },
    {
        id: "10",
        name: "Zebronics Zeb-K25 Wireless Keyboard & Mouse Combo",
        category: "Accessories",
        price: 699,
        image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=500",
        description: "2.4GHz wireless keyboard and mouse combo with silent keys, spill-resistant design, and nano USB receiver. Perfect for home & office. Amazon bestseller.",
        specs: {
            layout: "104 keys",
            battery: "12 months",
            connectivity: "2.4GHz wireless",
            keys: "Silent chiclet"
        },
        stock: 24,
        featured: false,
        platform: "Amazon, Flipkart"
    },
    {
        id: "11",
        name: "Mi Smart Band 6 Fitness Tracker",
        category: "Wearables",
        price: 2999,
        image: "https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=500",
        description: "1.56\" AMOLED display, 30 sports modes, SpO2 & heart rate monitoring, 14-day battery life, 5ATM water resistant. #1 fitness band on Flipkart & Amazon.",
        specs: {
            display: "1.56\" AMOLED",
            battery: "14 days",
            waterproof: "5ATM",
            features: "30+ modes, SpO2, HR"
        },
        stock: 78,
        featured: false,
        platform: "Amazon, Flipkart, Mi Store"
    },
    {
        id: "12",
        name: "FabSeasons Canvas Tote Shopping Bag",
        category: "Bags",
        price: 349,
        image: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=500",
        description: "Eco-friendly jute & cotton blend tote bag, reusable, spacious, and stylish. Perfect for shopping, beach, or daily use. Popular on Amazon & Meesho.",
        specs: {
            material: "Jute & Cotton",
            capacity: "15L",
            handles: "Reinforced",
            washable: "Yes"
        },
        stock: 104,
        featured: false,
        platform: "Amazon, Meesho"
    },
    {
        id: "13",
        name: "Noise ColorFit Pro 3 Smartwatch",
        category: "Wearables",
        price: 2499,
        image: "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=500",
        description: "1.55\" HD display, 24x7 heart rate & SpO2 monitoring, 10-day battery, 100+ watch faces. India's top smartwatch brand on Amazon & Flipkart.",
        specs: {
            display: "1.55\" HD",
            battery: "10 days",
            waterproof: "IP68",
            sensors: "HR, SpO2, Sleep"
        },
        stock: 55,
        featured: true,
        platform: "Amazon, Flipkart"
    },
    {
        id: "14",
        name: "Portronics Konnect L POR-1401 Laptop Stand",
        category: "Accessories",
        price: 799,
        image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=500",
        description: "Adjustable aluminum laptop stand with 6-level height adjustment, ergonomic design, non-slip base. Compatible with all laptops. Amazon's Choice.",
        specs: {
            material: "Aluminum alloy",
            height: "6 adjustable levels",
            weight: "800g",
            compatibility: "10-17 inch laptops"
        },
        stock: 38,
        featured: false,
        platform: "Amazon, Flipkart"
    },
    {
        id: "15",
        name: "Puma Unisex Backpack",
        category: "Bags",
        price: 1699,
        image: "https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?w=500",
        description: "Stylish sports backpack with laptop sleeve, multiple pockets, padded shoulder straps, and water bottle holder. Bestseller on Myntra & Flipkart.",
        specs: {
            material: "Polyester",
            capacity: "28L",
            laptop: "15 inch",
            pockets: "Multiple compartments"
        },
        stock: 29,
        featured: false,
        platform: "Myntra, Flipkart, Amazon"
    }
];

// Chat state
let chatMessages = [];
let currentFilter = 'all';

// OpenRouter API Configuration
const OPENROUTER_API_KEY = 'sk-or-v1-f55e93c03c81a7b5d5f98c8a7e3b4f2e1d6c9a8b7c5d4e3f2a1b0c9d8e7f6a5b4c3'; // Replace with your actual key
const OPENROUTER_API_URL = 'https://openrouter.ai/api/v1/chat/completions';

// Initialize app
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    loadFeaturedProducts();
    loadAllProducts();
    loadOrders();
    loadPopularProductsSidebar();
    loadAdminProducts();
    setupNavigation();
    setupFormHandlers();
    
    // Load chat history from localStorage
    const savedChat = localStorage.getItem('chatHistory');
    if (savedChat) {
        chatMessages = JSON.parse(savedChat);
        renderChatMessages();
    }
}

// Navigation
function setupNavigation() {
    const navLinks = document.querySelectorAll('.nav-link, .mobile-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth' });
                
                // Update active link
                document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
                document.querySelectorAll('.nav-link').forEach(l => {
                    if (l.getAttribute('href') === `#${targetId}`) {
                        l.classList.add('active');
                    }
                });
            }
        });
    });
}

function toggleMobileMenu() {
    const mobileMenu = document.getElementById('mobileMenu');
    mobileMenu.classList.toggle('active');
}

// Products
function loadFeaturedProducts() {
    const featuredProductsContainer = document.getElementById('featuredProducts');
    const featuredProducts = products.filter(p => p.featured).slice(0, 6);
    
    featuredProductsContainer.innerHTML = featuredProducts.map(product => createProductCard(product)).join('');
}

function loadAllProducts() {
    const productsGrid = document.getElementById('productsGrid');
    productsGrid.innerHTML = products.map(product => createProductCard(product)).join('');
}

function createProductCard(product) {
    return `
        <div class="product-card" onclick="showProductDetail('${product.id}')">
            <img src="${product.image}" alt="${product.name}" class="product-image">
            <div class="product-info">
                <div class="product-category">${product.category}</div>
                <h3 class="product-name">${product.name}</h3>
                <div class="product-price">₹${product.price.toLocaleString()}</div>
                <p class="product-description">${product.description}</p>
                <div class="product-actions">
                    <button class="btn btn-primary" onclick="event.stopPropagation(); askKAIAboutProduct('${product.id}')">
                        <svg class="btn-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
                        </svg>
                        Ask KAI
                    </button>
                </div>
            </div>
        </div>
    `;
}

function filterProducts(category) {
    currentFilter = category;
    
    // Update active filter button
    document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
    
    const productsGrid = document.getElementById('productsGrid');
    const filteredProducts = category === 'all' 
        ? products 
        : products.filter(p => p.category === category);
    
    productsGrid.innerHTML = filteredProducts.map(product => createProductCard(product)).join('');
}

function searchProducts() {
    const searchTerm = document.getElementById('productSearch').value.toLowerCase();
    const productsGrid = document.getElementById('productsGrid');
    
    let filteredProducts = currentFilter === 'all' 
        ? products 
        : products.filter(p => p.category === currentFilter);
    
    if (searchTerm) {
        filteredProducts = filteredProducts.filter(p => 
            p.name.toLowerCase().includes(searchTerm) || 
            p.description.toLowerCase().includes(searchTerm)
        );
    }
    
    productsGrid.innerHTML = filteredProducts.map(product => createProductCard(product)).join('');
}

// Product Detail Modal
function showProductDetail(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    const modal = document.getElementById('productModal');
    const modalContent = document.getElementById('productModalContent');
    
    modalContent.innerHTML = `
        <div class="product-detail-grid">
            <img src="${product.image}" alt="${product.name}" class="product-detail-image">
            <div class="product-detail-info">
                <div class="product-category">${product.category}</div>
                <h2>${product.name}</h2>
                <div class="product-detail-price">₹${product.price.toLocaleString()}</div>
                <p>${product.description}</p>
                <p style="margin-top: 1rem;"><strong>Available on:</strong> ${product.platform}</p>
                <p><strong>Stock:</strong> ${product.stock} units available</p>
                
                <div class="product-specs">
                    <h4>Specifications</h4>
                    ${Object.entries(product.specs).map(([key, value]) => `
                        <div class="spec-item">
                            <span class="spec-label">${key.charAt(0).toUpperCase() + key.slice(1)}</span>
                            <span class="spec-value">${value}</span>
                        </div>
                    `).join('')}
                </div>
                
                <div class="product-actions" style="margin-top: 1.5rem;">
                    <button class="btn btn-primary btn-lg" onclick="askKAIAboutProduct('${product.id}')">
                        <svg class="btn-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
                        </svg>
                        Ask KAI about this
                    </button>
                    <button class="btn btn-secondary btn-lg" onclick="createMockOrderFromProduct('${product.id}')">
                        <svg class="btn-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path>
                        </svg>
                        Mock Buy Now
                    </button>
                </div>
            </div>
        </div>
    `;
    
    modal.classList.add('active');
}

function closeProductModal() {
    document.getElementById('productModal').classList.remove('active');
}

function askKAIAboutProduct(productId) {
    const product = products.find(p => p.id === productId);
    if (product) {
        closeProductModal();
        document.getElementById('chat').scrollIntoView({ behavior: 'smooth' });
        setTimeout(() => {
            sendQuickMessage(`Tell me more about ${product.name}`);
        }, 500);
    }
}

function createMockOrderFromProduct(productId) {
    closeProductModal();
    document.getElementById('chat').scrollIntoView({ behavior: 'smooth' });
    setTimeout(() => {
        sendQuickMessage(`Create a mock order for product ID ${productId}`);
    }, 500);
}

// Chat Functions
function renderChatMessages() {
    const chatMessagesContainer = document.getElementById('chatMessages');
    
    // Keep the initial KAI message
    const initialMessage = chatMessagesContainer.querySelector('.assistant-message');
    chatMessagesContainer.innerHTML = '';
    
    if (initialMessage && chatMessages.length === 0) {
        chatMessagesContainer.appendChild(initialMessage);
    } else if (chatMessages.length > 0) {
        chatMessages.forEach(msg => {
            const messageDiv = createMessageElement(msg);
            chatMessagesContainer.appendChild(messageDiv);
        });
    }
    
    // Scroll to bottom
    chatMessagesContainer.scrollTop = chatMessagesContainer.scrollHeight;
}

function createMessageElement(message) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${message.role}-message`;
    
    messageDiv.innerHTML = `
        <div class="message-avatar">${message.role === 'assistant' ? 'K' : 'U'}</div>
        <div class="message-content">
            <div class="message-text">${message.content}</div>
        </div>
    `;
    
    return messageDiv;
}

function addTypingIndicator() {
    const chatMessagesContainer = document.getElementById('chatMessages');
    const typingDiv = document.createElement('div');
    typingDiv.className = 'message assistant-message';
    typingDiv.id = 'typing-indicator';
    
    typingDiv.innerHTML = `
        <div class="message-avatar">K</div>
        <div class="message-content">
            <div class="typing-indicator">
                <div class="typing-dot"></div>
                <div class="typing-dot"></div>
                <div class="typing-dot"></div>
            </div>
        </div>
    `;
    
    chatMessagesContainer.appendChild(typingDiv);
    chatMessagesContainer.scrollTop = chatMessagesContainer.scrollHeight;
}

function removeTypingIndicator() {
    const typingIndicator = document.getElementById('typing-indicator');
    if (typingIndicator) {
        typingIndicator.remove();
    }
}

async function sendMessage() {
    const input = document.getElementById('chatInput');
    const message = input.value.trim();
    
    if (!message) return;
    
    // Add user message
    chatMessages.push({ role: 'user', content: message });
    renderChatMessages();
    
    // Clear input
    input.value = '';
    
    // Show typing indicator
    addTypingIndicator();
    
    // Send to API
    try {
        const response = await callKAI(message);
        
        // Remove typing indicator
        removeTypingIndicator();
        
        // Add assistant response
        chatMessages.push({ role: 'assistant', content: response });
        renderChatMessages();
        
        // Save to localStorage
        localStorage.setItem('chatHistory', JSON.stringify(chatMessages));
        
        // Check if response contains order information and create order
        checkAndCreateOrder(response);
        
    } catch (error) {
        removeTypingIndicator();
        chatMessages.push({ 
            role: 'assistant', 
            content: 'Sorry, I encountered an error. Please make sure the API key is configured correctly. You can still browse products and use other features! 😊' 
        });
        renderChatMessages();
    }
}

async function callKAI(userMessage) {
    // Create product catalog summary for AI context
    const productSummary = products.map(p => 
        `${p.name} (ID: ${p.id}) - ${p.category} - ₹${p.price} - ${p.description}`
    ).join('\n');

    const systemPrompt = `You are KAI, a smart AI shopping assistant for Indian online shopping platforms (Amazon India, Flipkart, Myntra, Meesho). You are friendly, helpful, and enthusiastic about helping customers find the best products in India.

YOUR CAPABILITIES:
- Recommend products from popular Indian e-commerce platforms
- Provide detailed product information with Indian Rupees (₹) pricing
- Answer questions about pricing, specifications, and availability in India
- Help customers find products available on Amazon India, Flipkart, Myntra, Meesho
- Create mock orders with order IDs, prices in ₹, and delivery dates
- Compare products and provide purchasing advice for Indian market

AVAILABLE PRODUCTS IN CATALOG:
${productSummary}

BEHAVIOR GUIDELINES:
- Always mention prices in Indian Rupees (₹)
- If a customer asks about a product in the catalog, provide accurate details
- If a customer asks about a product NOT in the catalog, suggest similar items
- When creating mock orders, generate an order ID like "ORD-${Date.now()}", include the price in ₹, quantity, total, and estimated delivery date (usually 5-7 days from now)
- Be conversational and engaging
- Use emojis occasionally to be friendly 😊
- Keep responses concise but informative
- Always prioritize customer satisfaction`;

    try {
        const response = await fetch(OPENROUTER_API_URL, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
                'Content-Type': 'application/json',
                'HTTP-Referer': window.location.origin,
                'X-Title': 'KAI Shopping Assistant'
            },
            body: JSON.stringify({
                model: 'anthropic/claude-3.5-sonnet',
                messages: [
                    { role: 'system', content: systemPrompt },
                    ...chatMessages.map(msg => ({ role: msg.role, content: msg.content })),
                    { role: 'user', content: userMessage }
                ],
                temperature: 0.7,
                max_tokens: 800
            })
        });

        if (!response.ok) {
            throw new Error('API request failed');
        }

        const data = await response.json();
        return data.choices[0].message.content;
    } catch (error) {
        console.error('OpenRouter API error:', error);
        throw error;
    }
}

function sendQuickMessage(message) {
    document.getElementById('chatInput').value = message;
    sendMessage();
}

function handleChatKeyPress(event) {
    if (event.key === 'Enter') {
        sendMessage();
    }
}

function checkAndCreateOrder(response) {
    // Look for order ID pattern in response
    const orderIdMatch = response.match(/ORD-\d+/);
    if (orderIdMatch) {
        // Try to extract product information from the response
        const priceMatch = response.match(/₹[\d,]+/);
        
        // Find mentioned product
        let mentionedProduct = null;
        for (const product of products) {
            if (response.toLowerCase().includes(product.name.toLowerCase().substring(0, 15))) {
                mentionedProduct = product;
                break;
            }
        }
        
        if (mentionedProduct) {
            const order = {
                id: orderIdMatch[0],
                productId: mentionedProduct.id,
                productName: mentionedProduct.name,
                productImage: mentionedProduct.image,
                price: mentionedProduct.price,
                quantity: 1,
                totalPrice: mentionedProduct.price,
                status: 'Processing',
                orderDate: new Date().toLocaleDateString('en-IN'),
                estimatedDelivery: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString('en-IN')
            };
            
            saveOrder(order);
            loadOrders();
            loadAdminOrders();
        }
    }
}

// Orders
function loadOrders() {
    const ordersContainer = document.getElementById('ordersContainer');
    const orders = getOrders();
    
    if (orders.length === 0) {
        ordersContainer.innerHTML = `
            <div class="empty-state">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
                </svg>
                <h3>No orders yet</h3>
                <p>Start chatting with KAI to create mock orders</p>
                <a href="#chat" class="btn btn-primary">Chat with KAI</a>
            </div>
        `;
        return;
    }
    
    ordersContainer.innerHTML = orders.map(order => `
        <div class="order-card">
            <div class="order-header">
                <div>
                    <div class="order-id">${order.id}</div>
                    <div style="font-size: 0.875rem; color: var(--gray-600); margin-top: 0.25rem;">
                        Ordered on ${order.orderDate}
                    </div>
                </div>
                <span class="order-status ${order.status.toLowerCase()}">${order.status}</span>
            </div>
            <div class="order-body">
                <img src="${order.productImage}" alt="${order.productName}" class="order-image">
                <div class="order-details">
                    <h3>${order.productName}</h3>
                    <div class="order-meta">
                        <span>Qty: ${order.quantity}</span>
                        <span>•</span>
                        <span>Delivery by: ${order.estimatedDelivery}</span>
                    </div>
                </div>
                <div class="order-actions">
                    <div class="order-price">₹${order.totalPrice.toLocaleString()}</div>
                    ${order.status !== 'Cancelled' ? `
                        <button class="btn btn-secondary" onclick="cancelOrder('${order.id}')">Cancel Order</button>
                    ` : ''}
                </div>
            </div>
        </div>
    `).join('');
}

function getOrders() {
    const orders = localStorage.getItem('orders');
    return orders ? JSON.parse(orders) : [];
}

function saveOrder(order) {
    const orders = getOrders();
    orders.unshift(order);
    localStorage.setItem('orders', JSON.stringify(orders));
}

function cancelOrder(orderId) {
    const orders = getOrders();
    const orderIndex = orders.findIndex(o => o.id === orderId);
    if (orderIndex !== -1) {
        orders[orderIndex].status = 'Cancelled';
        localStorage.setItem('orders', JSON.stringify(orders));
        loadOrders();
        loadAdminOrders();
    }
}

function changeOrderStatus(orderId, newStatus) {
    const orders = getOrders();
    const orderIndex = orders.findIndex(o => o.id === orderId);
    if (orderIndex !== -1) {
        orders[orderIndex].status = newStatus;
        localStorage.setItem('orders', JSON.stringify(orders));
        loadOrders();
        loadAdminOrders();
    }
}

// Popular Products Sidebar
function loadPopularProductsSidebar() {
    const sidebar = document.getElementById('popularProductsSidebar');
    const popularProducts = products.filter(p => p.featured).slice(0, 3);
    
    sidebar.innerHTML = popularProducts.map(product => `
        <div class="sidebar-product" onclick="showProductDetail('${product.id}')">
            <img src="${product.image}" alt="${product.name}" class="sidebar-product-image">
            <div class="sidebar-product-info">
                <div class="sidebar-product-name">${product.name}</div>
                <div class="sidebar-product-price">₹${product.price.toLocaleString()}</div>
            </div>
        </div>
    `).join('');
}

// Admin Panel
function switchAdminTab(tab) {
    // Update tab buttons
    document.querySelectorAll('.admin-tab').forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
    
    // Show/hide content
    document.getElementById('adminProductsTab').style.display = tab === 'products' ? 'block' : 'none';
    document.getElementById('adminOrdersTab').style.display = tab === 'orders' ? 'block' : 'none';
    
    if (tab === 'orders') {
        loadAdminOrders();
    }
}

function loadAdminProducts() {
    const grid = document.getElementById('adminProductsGrid');
    
    grid.innerHTML = products.map(product => `
        <div class="admin-product-card">
            <img src="${product.image}" alt="${product.name}" class="admin-product-image">
            <div class="admin-product-info">
                <h4>${product.name}</h4>
                <div class="admin-product-meta">
                    <span><strong>Category:</strong> ${product.category}</span>
                    <span><strong>Price:</strong> ₹${product.price.toLocaleString()}</span>
                    <span><strong>Stock:</strong> ${product.stock}</span>
                    <span><strong>Featured:</strong> ${product.featured ? 'Yes' : 'No'}</span>
                </div>
            </div>
            <div class="admin-product-actions">
                <button class="btn btn-primary" onclick="alert('Edit functionality - In a real app, this would open an edit modal')">Edit</button>
                <button class="btn btn-secondary" onclick="alert('Delete functionality - In a real app, this would delete the product')">Delete</button>
            </div>
        </div>
    `).join('');
}

function loadAdminOrders() {
    const list = document.getElementById('adminOrdersList');
    const orders = getOrders();
    
    if (orders.length === 0) {
        list.innerHTML = `
            <div class="empty-state">
                <p>No orders have been placed yet.</p>
            </div>
        `;
        return;
    }
    
    list.innerHTML = orders.map(order => `
        <div class="admin-order-card">
            <div>
                <strong>${order.id}</strong> - ${order.productName}
                <div style="font-size: 0.875rem; color: var(--gray-600); margin-top: 0.25rem;">
                    ${order.orderDate} • ₹${order.totalPrice.toLocaleString()}
                </div>
            </div>
            <div style="display: flex; gap: 0.5rem; align-items: center;">
                <select class="admin-status-select" onchange="changeOrderStatus('${order.id}', this.value)" style="padding: 0.5rem; border-radius: 0.5rem; border: 2px solid var(--gray-200);">
                    <option value="Processing" ${order.status === 'Processing' ? 'selected' : ''}>Processing</option>
                    <option value="Shipped" ${order.status === 'Shipped' ? 'selected' : ''}>Shipped</option>
                    <option value="Delivered" ${order.status === 'Delivered' ? 'selected' : ''}>Delivered</option>
                    <option value="Cancelled" ${order.status === 'Cancelled' ? 'selected' : ''}>Cancelled</option>
                </select>
                <span class="order-status ${order.status.toLowerCase()}">${order.status}</span>
            </div>
        </div>
    `).join('');
}

function showAddProductModal() {
    document.getElementById('addProductModal').classList.add('active');
}

function closeAddProductModal() {
    document.getElementById('addProductModal').classList.remove('active');
    document.getElementById('addProductForm').reset();
}

function setupFormHandlers() {
    const form = document.getElementById('addProductForm');
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = new FormData(form);
        const newProduct = {
            id: String(products.length + 1),
            name: formData.get('name'),
            category: formData.get('category'),
            price: parseInt(formData.get('price')),
            image: formData.get('image'),
            description: formData.get('description'),
            specs: {},
            stock: parseInt(formData.get('stock')),
            featured: formData.get('featured') === 'on',
            platform: 'Amazon, Flipkart'
        };
        
        products.push(newProduct);
        
        // Reload products
        loadFeaturedProducts();
        loadAllProducts();
        loadAdminProducts();
        
        closeAddProductModal();
        
        alert('Product added successfully! (Note: In a real app, this would be saved to a database)');
    });
}

// Close modals when clicking outside
window.addEventListener('click', function(event) {
    const productModal = document.getElementById('productModal');
    const addProductModal = document.getElementById('addProductModal');
    
    if (event.target === productModal) {
        closeProductModal();
    }
    
    if (event.target === addProductModal) {
        closeAddProductModal();
    }
});

// Smooth scroll observer for nav highlighting
const observerOptions = {
    root: null,
    rootMargin: '-50% 0px -50% 0px',
    threshold: 0
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const id = entry.target.getAttribute('id');
            document.querySelectorAll('.nav-link').forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${id}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}, observerOptions);

// Observe all sections
document.querySelectorAll('section[id]').forEach(section => {
    observer.observe(section);
});
