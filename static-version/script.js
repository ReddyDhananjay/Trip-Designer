// Global State
let products = [...productsData];
let orders = JSON.parse(localStorage.getItem('kai-orders')) || [...initialOrders];
let chatMessages = JSON.parse(localStorage.getItem('kai-chat-history')) || [];
let selectedCategory = 'All';
let currentPage = 'home';

// Initialize App
document.addEventListener('DOMContentLoaded', function() {
    initializeNavigation();
    initializeChat();
    renderFeaturedProducts();
    renderProducts();
    renderCategoryFilters();
    renderOrders();
    renderAdminProducts();
    renderAdminOrders();
    
    // Load initial page from URL hash
    const hash = window.location.hash.slice(1) || 'home';
    navigateTo(hash);
});

// Navigation
function initializeNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const page = this.getAttribute('data-page');
            navigateTo(page);
        });
    });
}

function navigateTo(page) {
    // Update URL hash
    window.location.hash = page;
    
    // Hide all pages
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    
    // Show selected page
    const selectedPage = document.getElementById(`${page}-page`);
    if (selectedPage) {
        selectedPage.classList.add('active');
    }
    
    // Update active nav link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('data-page') === page) {
            link.classList.add('active');
        }
    });
    
    // Scroll to top
    window.scrollTo(0, 0);
    
    currentPage = page;
}

// Featured Products
function renderFeaturedProducts() {
    const container = document.getElementById('featured-products-grid');
    const featured = products.filter(p => p.featured).slice(0, 4);
    
    container.innerHTML = featured.map(product => createProductCard(product, true)).join('');
}

// Products Page
function renderProducts() {
    const searchQuery = document.getElementById('search-input')?.value.toLowerCase() || '';
    let filtered = products;
    
    // Filter by category
    if (selectedCategory !== 'All') {
        filtered = filtered.filter(p => p.category === selectedCategory);
    }
    
    // Filter by search
    if (searchQuery) {
        filtered = filtered.filter(p => 
            p.name.toLowerCase().includes(searchQuery) ||
            p.description.toLowerCase().includes(searchQuery)
        );
    }
    
    const container = document.getElementById('products-grid');
    const resultsCount = document.getElementById('results-count');
    
    if (resultsCount) {
        resultsCount.textContent = `Showing ${filtered.length} products`;
    }
    
    if (container) {
        if (filtered.length === 0) {
            container.innerHTML = `
                <div style="grid-column: 1/-1; text-align: center; padding: 3rem;">
                    <div style="font-size: 3rem; margin-bottom: 1rem;">😕</div>
                    <h3>No products found</h3>
                    <p style="color: var(--gray-500);">Try adjusting your search or filter criteria</p>
                </div>
            `;
        } else {
            container.innerHTML = filtered.map(product => createProductCard(product, false)).join('');
        }
    }
}

function renderCategoryFilters() {
    const container = document.getElementById('category-filters');
    if (!container) return;
    
    container.innerHTML = categories.map(category => `
        <button class="category-btn ${category === selectedCategory ? 'active' : ''}" 
                onclick="filterByCategory('${category}')">
            ${category}
        </button>
    `).join('');
}

function filterByCategory(category) {
    selectedCategory = category;
    renderCategoryFilters();
    renderProducts();
}

function filterProducts() {
    renderProducts();
}

function createProductCard(product, isFeatured) {
    return `
        <div class="product-card" onclick="showProductDetail('${product.id}')">
            <img src="${product.image}" alt="${product.name}" class="product-image">
            <div class="product-content">
                ${product.featured ? '<span class="product-badge">⭐ Featured</span>' : ''}
                <h3 class="product-name">${product.name}</h3>
                <p class="product-category">${product.category}</p>
                ${!isFeatured ? `<p class="product-description">${product.description}</p>` : ''}
                <div class="product-footer">
                    <span class="product-price">₹${product.price}</span>
                    <span class="product-stock">Stock: ${product.stock}</span>
                </div>
            </div>
        </div>
    `;
}

// Product Detail Modal
function showProductDetail(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    const modal = document.getElementById('product-modal');
    const detailContainer = document.getElementById('product-detail');
    
    detailContainer.innerHTML = `
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 2rem;">
            <div>
                <img src="${product.image}" alt="${product.name}" style="width: 100%; border-radius: 12px;">
            </div>
            <div>
                <span style="display: inline-block; padding: 0.5rem 1rem; background: #eef2ff; color: var(--primary); border-radius: 20px; font-size: 0.875rem; font-weight: 600; margin-bottom: 1rem;">
                    ${product.category}
                </span>
                <h2 style="font-size: 2rem; margin-bottom: 1rem;">${product.name}</h2>
                <p style="color: var(--gray-600); margin-bottom: 1.5rem;">${product.description}</p>
                <div style="margin-bottom: 1.5rem;">
                    <span style="font-size: 2.5rem; font-weight: 800; color: var(--primary);">₹${product.price}</span>
                    <p style="color: ${product.stock > 0 ? 'var(--green-500)' : 'var(--red-500)'}; margin-top: 0.5rem;">
                        ${product.stock > 0 ? `✓ In Stock (${product.stock} available)` : '✗ Out of Stock'}
                    </p>
                </div>
                <div style="display: flex; gap: 1rem; margin-bottom: 2rem;">
                    <button class="btn btn-primary" onclick="createOrder('${product.id}', 1); closeProductModal();">
                        🛒 Create Mock Order
                    </button>
                    <button class="btn btn-secondary" onclick="askAboutProduct('${product.name}'); closeProductModal();">
                        💬 Ask KAI
                    </button>
                </div>
                <div style="background: var(--gray-50); padding: 1.5rem; border-radius: 12px;">
                    <h3 style="margin-bottom: 1rem;">Specifications</h3>
                    ${Object.entries(product.specs).map(([key, value]) => `
                        <div style="display: flex; justify-content: space-between; padding: 0.5rem 0; border-bottom: 1px solid var(--gray-200);">
                            <span style="font-weight: 600;">${key}</span>
                            <span>${value}</span>
                        </div>
                    `).join('')}
                </div>
            </div>
        </div>
    `;
    
    modal.classList.add('active');
}

function closeProductModal() {
    document.getElementById('product-modal').classList.remove('active');
}

function askAboutProduct(productName) {
    navigateTo('chat');
    setTimeout(() => {
        sendQuickMessage(`Tell me about ${productName}`);
    }, 300);
}

// Chat Functionality
function initializeChat() {
    // Load chat history or show welcome message
    if (chatMessages.length === 0) {
        chatMessages.push({
            role: 'assistant',
            content: "👋 Hi! I'm KAI, your smart shopping assistant! I can help you find products, answer questions, and even create mock orders. What can I help you with today?",
            timestamp: Date.now()
        });
        saveChatHistory();
    }
    renderChatMessages();
}

function renderChatMessages() {
    const container = document.getElementById('chat-messages');
    if (!container) return;
    
    container.innerHTML = chatMessages.map(msg => `
        <div class="message ${msg.role}">
            <div class="message-bubble">
                <p>${msg.content}</p>
                <p class="message-time">${new Date(msg.timestamp).toLocaleTimeString()}</p>
            </div>
        </div>
    `).join('');
    
    container.scrollTop = container.scrollHeight;
}

function sendMessage() {
    const input = document.getElementById('chat-input');
    const message = input.value.trim();
    
    if (!message) return;
    
    // Add user message
    chatMessages.push({
        role: 'user',
        content: message,
        timestamp: Date.now()
    });
    
    input.value = '';
    renderChatMessages();
    saveChatHistory();
    
    // Show typing indicator
    showTypingIndicator();
    
    // Simulate AI response
    setTimeout(() => {
        const response = generateAIResponse(message);
        hideTypingIndicator();
        
        chatMessages.push({
            role: 'assistant',
            content: response,
            timestamp: Date.now()
        });
        
        renderChatMessages();
        saveChatHistory();
    }, 1500);
}

function sendQuickMessage(message) {
    document.getElementById('chat-input').value = message;
    sendMessage();
}

function handleChatKeyPress(event) {
    if (event.key === 'Enter') {
        sendMessage();
    }
}

function clearChat() {
    if (confirm('Are you sure you want to clear chat history?')) {
        chatMessages = [{
            role: 'assistant',
            content: "👋 Hi! I'm KAI, your smart shopping assistant! I can help you find products, answer questions, and even create mock orders. What can I help you with today?",
            timestamp: Date.now()
        }];
        renderChatMessages();
        saveChatHistory();
    }
}

function showTypingIndicator() {
    const container = document.getElementById('chat-messages');
    const indicator = document.createElement('div');
    indicator.id = 'typing-indicator';
    indicator.className = 'message assistant';
    indicator.innerHTML = `
        <div class="message-bubble">
            <div class="typing-indicator">
                <div class="typing-dot"></div>
                <div class="typing-dot"></div>
                <div class="typing-dot"></div>
            </div>
        </div>
    `;
    container.appendChild(indicator);
    container.scrollTop = container.scrollHeight;
}

function hideTypingIndicator() {
    const indicator = document.getElementById('typing-indicator');
    if (indicator) {
        indicator.remove();
    }
}

function generateAIResponse(message) {
    const lowerMsg = message.toLowerCase();
    
    // Order creation
    if (lowerMsg.includes('order') || lowerMsg.includes('buy')) {
        const product = products[Math.floor(Math.random() * products.length)];
        return `I can help you create a mock order! I recommend the ${product.name} for ₹${product.price}. Would you like me to create an order for this? You can also browse our products page to find more options!`;
    }
    
    // Product recommendations
    if (lowerMsg.includes('recommend') || lowerMsg.includes('suggest')) {
        const featured = products.filter(p => p.featured);
        const product = featured[Math.floor(Math.random() * featured.length)];
        return `I'd recommend the ${product.name} for ₹${product.price}! ${product.description} It's one of our top-selling items. Would you like to know more about it?`;
    }
    
    // Popular items
    if (lowerMsg.includes('popular') || lowerMsg.includes('bestseller') || lowerMsg.includes('top')) {
        const featured = products.filter(p => p.featured).slice(0, 3);
        return `Here are our most popular items:\n\n${featured.map(p => `• ${p.name} - ₹${p.price}`).join('\n')}\n\nWould you like details about any of these?`;
    }
    
    // Electronics
    if (lowerMsg.includes('electronics') || lowerMsg.includes('gadget')) {
        const electronics = products.filter(p => p.category === 'Electronics').slice(0, 3);
        return `We have great electronics! Here are some options:\n\n${electronics.map(p => `• ${p.name} - ₹${p.price}`).join('\n')}\n\nAll available on Amazon & Flipkart!`;
    }
    
    // Wearables
    if (lowerMsg.includes('watch') || lowerMsg.includes('wearable') || lowerMsg.includes('smartwatch')) {
        const wearables = products.filter(p => p.category === 'Wearables');
        return `Check out our wearables collection:\n\n${wearables.map(p => `• ${p.name} - ₹${p.price}`).join('\n')}\n\nAll with great features and battery life!`;
    }
    
    // Price range
    if (lowerMsg.includes('under') || lowerMsg.includes('below')) {
        const match = lowerMsg.match(/\d+/);
        if (match) {
            const price = parseInt(match[0]);
            const affordable = products.filter(p => p.price <= price).slice(0, 3);
            if (affordable.length > 0) {
                return `Here are products under ₹${price}:\n\n${affordable.map(p => `• ${p.name} - ₹${p.price}`).join('\n')}\n\nGreat value for money!`;
            }
        }
    }
    
    // Stock
    if (lowerMsg.includes('stock') || lowerMsg.includes('available')) {
        return `All our products are in stock! We have ${products.length} items available across ${categories.length - 1} categories. Browse the products page to see our full catalog with stock information!`;
    }
    
    // Specific product inquiry
    const productMatch = products.find(p => lowerMsg.includes(p.name.toLowerCase().split(' ').slice(0, 2).join(' ')));
    if (productMatch) {
        return `The ${productMatch.name} is priced at ₹${productMatch.price}. ${productMatch.description} We currently have ${productMatch.stock} units in stock. Available on ${productMatch.platform}. Would you like to create an order?`;
    }
    
    // Deals
    if (lowerMsg.includes('deal') || lowerMsg.includes('offer') || lowerMsg.includes('discount')) {
        return `We have amazing deals during festival seasons! Check out our products page for the latest offers. During Diwali Sale and Big Billion Days, you can get up to 50% off on select items. All products come with manufacturer warranty! 🎉`;
    }
    
    // Help
    if (lowerMsg.includes('help')) {
        return `I can assist you with:\n\n• Product recommendations\n• Finding products by category\n• Checking stock availability\n• Creating mock orders\n• Answering product questions\n\nWhat would you like help with?`;
    }
    
    // Default response
    return `I'm here to help! I can recommend products, answer questions about our catalog, and help you create mock orders. We have ${products.length} products across categories like Electronics, Wearables, Bags, Accessories, and Shoes. All prices are in Indian Rupees (₹) and available on popular platforms like Amazon, Flipkart, and Myntra. What interests you?`;
}

function saveChatHistory() {
    localStorage.setItem('kai-chat-history', JSON.stringify(chatMessages));
}

// Orders Page
function renderOrders() {
    const container = document.getElementById('orders-container');
    const statsContainer = document.getElementById('orders-stats');
    
    if (!container) return;
    
    if (orders.length === 0) {
        container.innerHTML = `
            <div style="background: white; padding: 3rem; text-align: center; border-radius: 12px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
                <div style="font-size: 4rem; margin-bottom: 1rem;">🛒</div>
                <h3>No orders yet</h3>
                <p style="color: var(--gray-500); margin: 1rem 0;">Start shopping and create your first order!</p>
                <div style="display: flex; gap: 1rem; justify-content: center; margin-top: 2rem;">
                    <button class="btn btn-primary" onclick="navigateTo('products')">Browse Products</button>
                    <button class="btn btn-secondary" onclick="navigateTo('chat')">Chat with KAI</button>
                </div>
            </div>
        `;
        if (statsContainer) statsContainer.innerHTML = '';
        return;
    }
    
    container.innerHTML = orders.slice().reverse().map(order => createOrderCard(order)).join('');
    
    // Render stats
    if (statsContainer) {
        const stats = {
            total: orders.length,
            processing: orders.filter(o => o.status === 'Processing').length,
            shipped: orders.filter(o => o.status === 'Shipped').length,
            delivered: orders.filter(o => o.status === 'Delivered').length
        };
        
        statsContainer.innerHTML = `
            <div class="stat-card">
                <div class="stat-number" style="color: var(--primary);">${stats.total}</div>
                <div class="stat-label">Total Orders</div>
            </div>
            <div class="stat-card">
                <div class="stat-number" style="color: var(--blue-500);">${stats.processing}</div>
                <div class="stat-label">Processing</div>
            </div>
            <div class="stat-card">
                <div class="stat-number" style="color: var(--purple-500);">${stats.shipped}</div>
                <div class="stat-label">Shipped</div>
            </div>
            <div class="stat-card">
                <div class="stat-number" style="color: var(--green-500);">${stats.delivered}</div>
                <div class="stat-label">Delivered</div>
            </div>
        `;
    }
}

function createOrderCard(order) {
    const statusIcons = {
        'Processing': '⏳',
        'Shipped': '🚚',
        'Delivered': '✅',
        'Cancelled': '❌'
    };
    
    const statusClass = `status-${order.status.toLowerCase()}`;
    const daysRemaining = Math.ceil((new Date(order.estimatedDelivery) - new Date()) / (1000 * 60 * 60 * 24));
    
    return `
        <div class="order-card">
            <div class="order-header">
                <div>
                    <h3 class="order-title">${order.productName}</h3>
                    <p class="order-id">Order ID: ${order.id}</p>
                </div>
                <span class="order-status ${statusClass}">
                    ${statusIcons[order.status]} ${order.status}
                </span>
            </div>
            <div class="order-details">
                <div class="order-detail-item">
                    <h4>Order Date</h4>
                    <p>${new Date(order.orderDate).toLocaleDateString()}</p>
                    <p style="font-size: 0.75rem; color: var(--gray-500);">${new Date(order.orderDate).toLocaleTimeString()}</p>
                </div>
                <div class="order-detail-item">
                    <h4>Estimated Delivery</h4>
                    <p>${new Date(order.estimatedDelivery).toLocaleDateString()}</p>
                    <p style="font-size: 0.75rem; color: var(--gray-500);">${daysRemaining > 0 ? daysRemaining + ' days remaining' : 'Delivered'}</p>
                </div>
                <div class="order-detail-item">
                    <h4>Total Price</h4>
                    <p style="font-size: 1.5rem; font-weight: 800; color: var(--primary);">₹${order.totalPrice}</p>
                    <p style="font-size: 0.75rem; color: var(--gray-500);">Qty: ${order.quantity}</p>
                </div>
            </div>
            <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
                <button class="btn btn-sm btn-secondary" onclick="showProductDetail('${order.productId}')">View Product</button>
                <button class="btn btn-sm btn-secondary" onclick="navigateTo('chat')">💬 Ask KAI</button>
                ${order.status !== 'Cancelled' && order.status !== 'Delivered' ? 
                    `<button class="btn btn-sm" style="background: #fee2e2; color: var(--red-500);" onclick="cancelOrder('${order.id}')">Cancel Order</button>` 
                    : ''}
            </div>
        </div>
    `;
}

function createOrder(productId, quantity = 1) {
    const product = products.find(p => p.id === productId);
    if (!product) {
        alert('Product not found!');
        return;
    }
    
    if (product.stock < quantity) {
        alert('Insufficient stock!');
        return;
    }
    
    const order = {
        id: `ORD-${Date.now()}`,
        productId: product.id,
        productName: product.name,
        price: product.price,
        quantity: quantity,
        totalPrice: product.price * quantity,
        status: 'Processing',
        orderDate: new Date().toISOString(),
        estimatedDelivery: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString()
    };
    
    orders.push(order);
    saveOrders();
    
    alert(`Order ${order.id} created successfully! Redirecting to orders page...`);
    navigateTo('orders');
    renderOrders();
}

function cancelOrder(orderId) {
    if (!confirm('Are you sure you want to cancel this order?')) return;
    
    const order = orders.find(o => o.id === orderId);
    if (order) {
        order.status = 'Cancelled';
        saveOrders();
        renderOrders();
        alert('Order cancelled successfully!');
    }
}

function saveOrders() {
    localStorage.setItem('kai-orders', JSON.stringify(orders));
}

// Admin Panel
function switchAdminTab(tab) {
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelectorAll('.admin-tab-content').forEach(content => content.classList.remove('active'));
    
    event.target.classList.add('active');
    document.getElementById(`admin-${tab}-tab`).classList.add('active');
}

function renderAdminProducts() {
    const container = document.getElementById('admin-products-table');
    if (!container) return;
    
    container.innerHTML = `
        <table>
            <thead>
                <tr>
                    <th>Product</th>
                    <th>Category</th>
                    <th>Price</th>
                    <th>Stock</th>
                    <th>Featured</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                ${products.map(product => `
                    <tr>
                        <td>
                            <div style="display: flex; align-items: center; gap: 0.75rem;">
                                <img src="${product.image}" style="width: 40px; height: 40px; border-radius: 8px; object-fit: cover;">
                                <span style="font-weight: 600;">${product.name}</span>
                            </div>
                        </td>
                        <td>${product.category}</td>
                        <td style="font-weight: 600;">₹${product.price}</td>
                        <td>${product.stock}</td>
                        <td>
                            ${product.featured ? 
                                '<span style="padding: 0.25rem 0.5rem; background: #fef3c7; color: #92400e; border-radius: 12px; font-size: 0.75rem; font-weight: 600;">Yes</span>' : 
                                '<span style="padding: 0.25rem 0.5rem; background: var(--gray-100); color: var(--gray-600); border-radius: 12px; font-size: 0.75rem; font-weight: 600;">No</span>'}
                        </td>
                        <td>
                            <div class="table-actions">
                                <button class="action-btn edit" onclick="alert('Edit functionality - In production, this would open an edit form')">Edit</button>
                                <button class="action-btn delete" onclick="deleteProduct('${product.id}')">Delete</button>
                            </div>
                        </td>
                    </tr>
                `).join('')}
            </tbody>
        </table>
    `;
}

function renderAdminOrders() {
    const container = document.getElementById('admin-orders-table');
    if (!container) return;
    
    if (orders.length === 0) {
        container.innerHTML = '<div style="padding: 2rem; text-align: center; color: var(--gray-500);">No orders yet</div>';
        return;
    }
    
    container.innerHTML = `
        <table>
            <thead>
                <tr>
                    <th>Order ID</th>
                    <th>Product</th>
                    <th>Qty</th>
                    <th>Total</th>
                    <th>Status</th>
                    <th>Order Date</th>
                </tr>
            </thead>
            <tbody>
                ${orders.slice().reverse().map(order => `
                    <tr>
                        <td style="font-weight: 600;">${order.id}</td>
                        <td>${order.productName}</td>
                        <td>${order.quantity}</td>
                        <td style="font-weight: 600;">₹${order.totalPrice}</td>
                        <td>
                            <select onchange="updateOrderStatus('${order.id}', this.value)" style="padding: 0.5rem; border: 1px solid var(--gray-300); border-radius: 6px;">
                                <option value="Processing" ${order.status === 'Processing' ? 'selected' : ''}>Processing</option>
                                <option value="Shipped" ${order.status === 'Shipped' ? 'selected' : ''}>Shipped</option>
                                <option value="Delivered" ${order.status === 'Delivered' ? 'selected' : ''}>Delivered</option>
                                <option value="Cancelled" ${order.status === 'Cancelled' ? 'selected' : ''}>Cancelled</option>
                            </select>
                        </td>
                        <td>${new Date(order.orderDate).toLocaleDateString()}</td>
                    </tr>
                `).join('')}
            </tbody>
        </table>
    `;
}

function showAddProductForm() {
    document.getElementById('add-product-form').style.display = 'block';
}

function hideAddProductForm() {
    document.getElementById('add-product-form').style.display = 'none';
    document.getElementById('add-product-form').querySelector('form').reset();
}

function addProduct(event) {
    event.preventDefault();
    
    const newProduct = {
        id: String(Date.now()),
        name: document.getElementById('product-name').value,
        category: document.getElementById('product-category').value,
        price: parseFloat(document.getElementById('product-price').value),
        stock: parseInt(document.getElementById('product-stock').value),
        image: document.getElementById('product-image').value,
        description: document.getElementById('product-description').value,
        featured: document.getElementById('product-featured').checked,
        specs: {},
        platform: "Amazon, Flipkart"
    };
    
    products.push(newProduct);
    alert('Product added successfully!');
    hideAddProductForm();
    renderAdminProducts();
    renderProducts();
    renderFeaturedProducts();
}

function deleteProduct(productId) {
    if (!confirm('Are you sure you want to delete this product?')) return;
    
    products = products.filter(p => p.id !== productId);
    alert('Product deleted successfully!');
    renderAdminProducts();
    renderProducts();
    renderFeaturedProducts();
}

function updateOrderStatus(orderId, newStatus) {
    const order = orders.find(o => o.id === orderId);
    if (order) {
        order.status = newStatus;
        saveOrders();
        renderOrders();
        renderAdminOrders();
        alert('Order status updated successfully!');
    }
}

// Close modal when clicking outside
window.onclick = function(event) {
    const modal = document.getElementById('product-modal');
    if (event.target === modal) {
        closeProductModal();
    }
}
