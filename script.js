// Configuration
const GOOGLE_API_KEY = 'AIzaSyAHDnHtiGyJTgU3hCXFPZKx3gS9wqLtZ-U';
const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${GOOGLE_API_KEY}`;

// Enhanced Product Data with Ratings and Reviews
const products = [
    {
        id: 1,
        name: 'iPhone 14 Pro',
        category: 'Smartphones',
        price: 129900,
        originalPrice: 139900,
        discount: 7,
        icon: '📱',
        description: 'Latest Apple iPhone with A16 Bionic chip and 48MP camera system',
        specs: '6.1" OLED, 128GB, 48MP Triple Camera, A16 Bionic',
        rating: 4.7,
        reviews: 3428,
        stock: true,
        featured: true,
        deal: true,
        images: ['📱', '📸', '💫'],
        highlights: ['A16 Bionic chip', 'Dynamic Island', 'Pro camera system', '5G capable']
    },
    {
        id: 2,
        name: 'MacBook Air M2',
        category: 'Laptops',
        price: 114900,
        originalPrice: 119900,
        discount: 4,
        icon: '💻',
        description: 'Powerful and lightweight laptop with Apple M2 chip',
        specs: 'M2 chip, 8GB RAM, 256GB SSD, 13.6" Liquid Retina',
        rating: 4.8,
        reviews: 2156,
        stock: true,
        featured: true,
        deal: false,
        images: ['💻', '⌨️', '🖥️'],
        highlights: ['M2 chip performance', '18hr battery life', 'Lightweight design', 'Fanless cooling']
    },
    {
        id: 3,
        name: 'Sony WH-1000XM5',
        category: 'Audio',
        price: 29990,
        originalPrice: 34990,
        discount: 14,
        icon: '🎧',
        description: 'Industry-leading noise cancellation headphones',
        specs: '30-hour battery, Premium sound quality, Touch controls',
        rating: 4.6,
        reviews: 1842,
        stock: true,
        featured: false,
        deal: true,
        images: ['🎧', '🎵', '🔋'],
        highlights: ['Adaptive ANC', '30-hour battery', 'Premium comfort', 'LDAC support']
    },
    {
        id: 4,
        name: 'Samsung Galaxy S23 5G',
        category: 'Smartphones',
        price: 74999,
        originalPrice: 89999,
        discount: 17,
        icon: '📱',
        description: 'Flagship Android phone with Snapdragon 8 Gen 2 and 5G',
        specs: '6.1" AMOLED, 8GB RAM, 128GB, 50MP Triple Camera',
        rating: 4.5,
        reviews: 2943,
        stock: true,
        featured: true,
        deal: true,
        images: ['📱', '📷', '⚡'],
        highlights: ['Snapdragon 8 Gen 2', '5G connectivity', 'Night photography', '25W fast charging']
    },
    {
        id: 5,
        name: 'iPad Pro 11"',
        category: 'Tablets',
        price: 81900,
        originalPrice: 89900,
        discount: 9,
        icon: '📱',
        description: 'Professional tablet with M2 chip for creative work',
        specs: 'M2 chip, 128GB, ProMotion display, Apple Pencil support',
        rating: 4.7,
        reviews: 1523,
        stock: true,
        featured: false,
        deal: false,
        images: ['📱', '✏️', '🎨'],
        highlights: ['M2 chip power', 'ProMotion 120Hz', 'Apple Pencil ready', 'All-day battery']
    },
    {
        id: 6,
        name: 'Apple Watch Series 9',
        category: 'Wearables',
        price: 41900,
        originalPrice: 45900,
        discount: 9,
        icon: '⌚',
        description: 'Advanced smartwatch with health and fitness features',
        specs: 'S9 chip, Always-on display, Health tracking, GPS',
        rating: 4.6,
        reviews: 1876,
        stock: true,
        featured: true,
        deal: false,
        images: ['⌚', '❤️', '🏃'],
        highlights: ['S9 SiP chip', 'Health sensors', 'Always-on Retina', 'Water resistant']
    },
    {
        id: 7,
        name: 'Dell XPS 15',
        category: 'Laptops',
        price: 139990,
        originalPrice: 159990,
        discount: 13,
        icon: '💻',
        description: 'Premium Windows laptop for professionals',
        specs: 'Intel i7-13th Gen, 16GB RAM, 512GB SSD, RTX 3050',
        rating: 4.5,
        reviews: 987,
        stock: true,
        featured: false,
        deal: true,
        images: ['💻', '🎮', '⚙️'],
        highlights: ['13th Gen Intel', 'RTX graphics', '4K OLED display', 'Premium build']
    },
    {
        id: 8,
        name: 'AirPods Pro 2',
        category: 'Audio',
        price: 26900,
        originalPrice: 29900,
        discount: 10,
        icon: '🎧',
        description: 'True wireless earbuds with active noise cancellation',
        specs: 'ANC, Spatial Audio, 30hr battery with case, MagSafe',
        rating: 4.7,
        reviews: 3654,
        stock: true,
        featured: true,
        deal: false,
        images: ['🎧', '🔋', '🎵'],
        highlights: ['Active ANC', 'Spatial audio', 'Adaptive EQ', 'MagSafe case']
    },
    {
        id: 9,
        name: 'OnePlus 11',
        category: 'Smartphones',
        price: 56999,
        originalPrice: 61999,
        discount: 8,
        icon: '📱',
        description: 'Flagship killer with Hasselblad camera system',
        specs: 'Snapdragon 8 Gen 2, 16GB RAM, 256GB, Hasselblad',
        rating: 4.4,
        reviews: 2134,
        stock: true,
        featured: false,
        deal: false,
        images: ['📱', '📸', '⚡'],
        highlights: ['Snapdragon 8 Gen 2', 'Hasselblad camera', '100W charging', '5G support']
    },
    {
        id: 10,
        name: 'Samsung Galaxy Watch 6',
        category: 'Wearables',
        price: 31999,
        originalPrice: 35999,
        discount: 11,
        icon: '⌚',
        description: 'Feature-rich smartwatch with comprehensive health tracking',
        specs: 'AMOLED display, Health monitoring, GPS, Wear OS',
        rating: 4.3,
        reviews: 1432,
        stock: true,
        featured: false,
        deal: true,
        images: ['⌚', '💪', '🏃'],
        highlights: ['Wear OS', 'Sleep tracking', 'GPS built-in', 'Wireless charging']
    },
    {
        id: 11,
        name: 'HP Pavilion Gaming',
        category: 'Laptops',
        price: 74990,
        originalPrice: 84990,
        discount: 12,
        icon: '💻',
        description: 'Gaming laptop with powerful graphics',
        specs: 'AMD Ryzen 5, 16GB RAM, RTX 3050, 512GB SSD',
        rating: 4.2,
        reviews: 876,
        stock: true,
        featured: false,
        deal: true,
        images: ['💻', '🎮', '⚡'],
        highlights: ['Gaming ready', 'RTX 3050', 'High refresh rate', 'RGB keyboard']
    },
    {
        id: 12,
        name: 'JBL Flip 6',
        category: 'Audio',
        price: 11999,
        originalPrice: 13999,
        discount: 14,
        icon: '🔊',
        description: 'Portable Bluetooth speaker with powerful sound',
        specs: 'Waterproof, 12hr battery, Bold JBL sound, PartyBoost',
        rating: 4.5,
        reviews: 2341,
        stock: true,
        featured: false,
        deal: false,
        images: ['🔊', '🎵', '💧'],
        highlights: ['IP67 waterproof', '12hr battery', 'PartyBoost', 'Bold sound']
    }
];

// State Management
let cart = [];
let wishlist = [];
let orders = [];
let currentCategory = 'all';
let currentSlide = 0;
let chatHistory = [];
let filters = {
    maxPrice: 150000,
    categories: [],
    ratings: [],
    inStock: false
};

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    loadFromStorage();
    initializeCarousel();
    displayDeals();
    displayProducts();
    updateCartCount();
    updateWishlistCount();
    initializeCategoryNav();
    initializeSearch();
    startDealCountdown();
});

// Carousel Functions
function initializeCarousel() {
    const carousel = document.getElementById('bannerCarousel');
    const dotsContainer = document.getElementById('carouselDots');
    const items = carousel.querySelectorAll('.carousel-item');
    
    items.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.className = 'carousel-dot' + (index === 0 ? ' active' : '');
        dot.onclick = () => goToSlide(index);
        dotsContainer.appendChild(dot);
    });
    
    setInterval(nextSlide, 5000);
}

function nextSlide() {
    const items = document.querySelectorAll('.carousel-item');
    const dots = document.querySelectorAll('.carousel-dot');
    
    items[currentSlide].classList.remove('active');
    dots[currentSlide].classList.remove('active');
    
    currentSlide = (currentSlide + 1) % items.length;
    
    items[currentSlide].classList.add('active');
    dots[currentSlide].classList.add('active');
}

function prevSlide() {
    const items = document.querySelectorAll('.carousel-item');
    const dots = document.querySelectorAll('.carousel-dot');
    
    items[currentSlide].classList.remove('active');
    dots[currentSlide].classList.remove('active');
    
    currentSlide = (currentSlide - 1 + items.length) % items.length;
    
    items[currentSlide].classList.add('active');
    dots[currentSlide].classList.add('active');
}

function goToSlide(index) {
    const items = document.querySelectorAll('.carousel-item');
    const dots = document.querySelectorAll('.carousel-dot');
    
    items[currentSlide].classList.remove('active');
    dots[currentSlide].classList.remove('active');
    
    currentSlide = index;
    
    items[currentSlide].classList.add('active');
    dots[currentSlide].classList.add('active');
}

// Deal Countdown
function startDealCountdown() {
    setInterval(() => {
        const now = new Date();
        const midnight = new Date();
        midnight.setHours(24, 0, 0, 0);
        const diff = midnight - now;
        
        const hours = Math.floor(diff / 3600000);
        const minutes = Math.floor((diff % 3600000) / 60000);
        const seconds = Math.floor((diff % 60000) / 1000);
        
        document.getElementById('dealCountdown').textContent = 
            `Ends in: ${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }, 1000);
}

// Display Functions
function displayDeals() {
    const dealsGrid = document.getElementById('dealsGrid');
    const dealProducts = products.filter(p => p.deal).slice(0, 4);
    
    dealsGrid.innerHTML = dealProducts.map(product => createProductCard(product, true)).join('');
}

function displayProducts() {
    const grid = document.getElementById('productsGrid');
    let filtered = filterProducts();
    filtered = sortProducts(filtered);
    
    if (filtered.length === 0) {
        grid.innerHTML = '<div style="grid-column: 1/-1; text-align: center; padding: 3rem; color: var(--gray-500);">No products found matching your criteria</div>';
        return;
    }
    
    grid.innerHTML = filtered.map(product => createProductCard(product)).join('');
}

function createProductCard(product, isDeal = false) {
    const isInWishlist = wishlist.some(item => item.id === product.id);
    const isInCart = cart.some(item => item.id === product.id);
    
    return `
        <div class="product-card" onclick="showProductDetails(${product.id})">
            ${product.discount > 0 ? `<span class="product-badge">-${product.discount}% OFF</span>` : ''}
            <div class="product-image">${product.icon}</div>
            <div class="product-info">
                <h3 class="product-name">${product.name}</h3>
                <div class="product-rating">
                    <span class="rating-stars">${'⭐'.repeat(Math.floor(product.rating))}</span>
                    <span class="rating-count">(${product.reviews})</span>
                </div>
                <div class="product-price-section">
                    <div class="product-price">₹${formatPrice(product.price)}</div>
                    ${product.originalPrice ? `<div class="product-price-original">₹${formatPrice(product.originalPrice)}</div>` : ''}
                    ${product.discount > 0 ? `<div class="product-discount">${product.discount}% off</div>` : ''}
                </div>
                <p class="product-description">${product.description}</p>
                <div class="product-actions" onclick="event.stopPropagation()">
                    <button class="btn-add-cart" onclick="addToCart(${product.id})">
                        ${isInCart ? '✓ In Cart' : 'Add to Cart'}
                    </button>
                    <button class="btn-wishlist ${isInWishlist ? 'active' : ''}" onclick="toggleWishlistItem(${product.id})">
                        ${isInWishlist ? '❤️' : '🤍'}
                    </button>
                </div>
            </div>
        </div>
    `;
}

function filterProducts() {
    let filtered = products;
    
    // Filter by category
    if (currentCategory !== 'all') {
        filtered = filtered.filter(p => p.category === currentCategory);
    }
    
    // Filter by selected categories
    if (filters.categories.length > 0) {
        filtered = filtered.filter(p => filters.categories.includes(p.category));
    }
    
    // Filter by price
    filtered = filtered.filter(p => p.price <= filters.maxPrice);
    
    // Filter by rating
    if (filters.ratings.length > 0) {
        const minRating = Math.min(...filters.ratings);
        filtered = filtered.filter(p => p.rating >= minRating);
    }
    
    // Filter by stock
    if (filters.inStock) {
        filtered = filtered.filter(p => p.stock);
    }
    
    return filtered;
}

function sortProducts(products) {
    const sortBy = document.getElementById('sortSelect')?.value || 'popularity';
    
    switch (sortBy) {
        case 'price-low':
            return [...products].sort((a, b) => a.price - b.price);
        case 'price-high':
            return [...products].sort((a, b) => b.price - a.price);
        case 'rating':
            return [...products].sort((a, b) => b.rating - a.rating);
        case 'newest':
            return [...products].sort((a, b) => b.id - a.id);
        default:
            return [...products].sort((a, b) => b.reviews - a.reviews);
    }
}

// Cart Functions
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({ ...product, quantity: 1 });
    }
    
    updateCartCount();
    displayCartItems();
    saveToStorage();
    showToast(`${product.name} added to cart!`);
    displayProducts(); // Refresh to update button state
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCartCount();
    displayCartItems();
    saveToStorage();
    displayProducts();
}

function updateQuantity(productId, change) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            removeFromCart(productId);
        } else {
            displayCartItems();
            saveToStorage();
        }
    }
}

function displayCartItems() {
    const cartItems = document.getElementById('cartItems');
    const cartFooter = document.getElementById('cartFooter');
    const cartItemCount = document.getElementById('cartItemCount');
    
    cartItemCount.textContent = cart.length;
    
    if (cart.length === 0) {
        cartItems.innerHTML = `
            <div class="empty-cart">
                <svg width="100" height="100" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                    <circle cx="9" cy="21" r="1"></circle>
                    <circle cx="20" cy="21" r="1"></circle>
                    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                </svg>
                <p>Your cart is empty</p>
                <button class="btn btn-primary" onclick="toggleCart()">Start Shopping</button>
            </div>
        `;
        cartFooter.style.display = 'none';
        return;
    }
    
    cartItems.innerHTML = cart.map(item => `
        <div class="cart-item">
            <div class="cart-item-image">${item.icon}</div>
            <div class="cart-item-details">
                <div class="cart-item-name">${item.name}</div>
                <div class="cart-item-price">₹${formatPrice(item.price)}</div>
                <div class="cart-item-controls">
                    <button class="qty-btn" onclick="updateQuantity(${item.id}, -1)">-</button>
                    <span class="cart-item-qty">${item.quantity}</span>
                    <button class="qty-btn" onclick="updateQuantity(${item.id}, 1)">+</button>
                    <button class="remove-btn" onclick="removeFromCart(${item.id})">Remove</button>
                </div>
            </div>
        </div>
    `).join('');
    
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    document.getElementById('cartSubtotal').textContent = `₹${formatPrice(subtotal)}`;
    cartFooter.style.display = 'block';
}

function updateCartCount() {
    const count = cart.reduce((sum, item) => sum + item.quantity, 0);
    document.getElementById('cartCount').textContent = count;
}

function toggleCart() {
    const cartSidebar = document.getElementById('cartSidebar');
    const overlay = document.getElementById('overlay');
    const isActive = cartSidebar.classList.toggle('active');
    overlay.classList.toggle('active', isActive);
    if (isActive) displayCartItems();
}

// Wishlist Functions
function toggleWishlistItem(productId) {
    const product = products.find(p => p.id === productId);
    const existingIndex = wishlist.findIndex(item => item.id === productId);
    
    if (existingIndex > -1) {
        wishlist.splice(existingIndex, 1);
        showToast(`Removed from wishlist`);
    } else {
        wishlist.push(product);
        showToast(`${product.name} added to wishlist!`);
    }
    
    updateWishlistCount();
    displayWishlistItems();
    saveToStorage();
    displayProducts();
    displayDeals();
}

function displayWishlistItems() {
    const wishlistItems = document.getElementById('wishlistItems');
    const wishlistItemCount = document.getElementById('wishlistItemCount');
    
    wishlistItemCount.textContent = wishlist.length;
    
    if (wishlist.length === 0) {
        wishlistItems.innerHTML = `
            <div class="empty-cart">
                <svg width="100" height="100" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                </svg>
                <p>Your wishlist is empty</p>
                <button class="btn btn-primary" onclick="toggleWishlist()">Browse Products</button>
            </div>
        `;
        return;
    }
    
    wishlistItems.innerHTML = wishlist.map(item => `
        <div class="cart-item">
            <div class="cart-item-image">${item.icon}</div>
            <div class="cart-item-details">
                <div class="cart-item-name">${item.name}</div>
                <div class="cart-item-price">₹${formatPrice(item.price)}</div>
                <div class="cart-item-controls">
                    <button class="btn-add-cart" style="margin-right: 0.5rem;" onclick="addToCart(${item.id}); toggleWishlist();">Add to Cart</button>
                    <button class="remove-btn" onclick="toggleWishlistItem(${item.id})">Remove</button>
                </div>
            </div>
        </div>
    `).join('');
}

function updateWishlistCount() {
    document.getElementById('wishlistCount').textContent = wishlist.length;
}

function toggleWishlist() {
    const wishlistSidebar = document.getElementById('wishlistSidebar');
    const overlay = document.getElementById('overlay');
    const isActive = wishlistSidebar.classList.toggle('active');
    overlay.classList.toggle('active', isActive);
    if (isActive) displayWishlistItems();
}

// Category Navigation
function initializeCategoryNav() {
    const categoryItems = document.querySelectorAll('.category-item');
    categoryItems.forEach(item => {
        item.addEventListener('click', () => {
            categoryItems.forEach(cat => cat.classList.remove('active'));
            item.classList.add('active');
            currentCategory = item.dataset.category;
            displayProducts();
        });
    });
}

// Search Functions
function initializeSearch() {
    const searchInput = document.getElementById('searchInput');
    searchInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase();
        if (query.length < 2) {
            document.getElementById('searchSuggestions').classList.remove('active');
            return;
        }
        showSearchSuggestions(query);
    });
}

function showSearchSuggestions(query) {
    const suggestions = products.filter(p => 
        p.name.toLowerCase().includes(query) || 
        p.category.toLowerCase().includes(query) ||
        p.description.toLowerCase().includes(query)
    ).slice(0, 5);
    
    const suggestionsDiv = document.getElementById('searchSuggestions');
    
    if (suggestions.length === 0) {
        suggestionsDiv.classList.remove('active');
        return;
    }
    
    suggestionsDiv.innerHTML = suggestions.map(product => `
        <div class="suggestion-item" onclick="showProductDetails(${product.id}); document.getElementById('searchSuggestions').classList.remove('active');">
            <div style="display: flex; align-items: center; gap: 1rem;">
                <span style="font-size: 2rem;">${product.icon}</span>
                <div>
                    <div style="font-weight: 600;">${product.name}</div>
                    <div style="font-size: 0.875rem; color: var(--gray-600);">₹${formatPrice(product.price)} • ${product.category}</div>
                </div>
            </div>
        </div>
    `).join('');
    
    suggestionsDiv.classList.add('active');
}

function searchProducts() {
    const query = document.getElementById('searchInput').value.toLowerCase();
    const category = document.getElementById('searchCategory').value;
    
    let filtered = products;
    
    if (category !== 'all') {
        filtered = filtered.filter(p => p.category === category);
    }
    
    if (query) {
        filtered = filtered.filter(p => 
            p.name.toLowerCase().includes(query) || 
            p.description.toLowerCase().includes(query)
        );
    }
    
    document.getElementById('productsGrid').innerHTML = filtered.map(p => createProductCard(p)).join('');
    document.getElementById('searchSuggestions').classList.remove('active');
    scrollToProducts();
}

// Product Detail Modal
function showProductDetails(productId) {
    const product = products.find(p => p.id === productId);
    const modal = document.getElementById('productModal');
    const modalBody = document.getElementById('productModalBody');
    const isInWishlist = wishlist.some(item => item.id === product.id);
    
    modalBody.innerHTML = `
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 2rem;">
            <div>
                <div style="font-size: 8rem; text-align: center; background: var(--gray-100); padding: 2rem; border-radius: 12px; margin-bottom: 1rem;">
                    ${product.icon}
                </div>
                <div style="display: flex; gap: 1rem; justify-content: center;">
                    ${product.images.map(img => `
                        <div style="font-size: 3rem; padding: 1rem; background: var(--gray-100); border-radius: 8px; cursor: pointer;">
                            ${img}
                        </div>
                    `).join('')}
                </div>
            </div>
            <div>
                <h2 style="font-size: 2rem; margin-bottom: 1rem;">${product.name}</h2>
                <div style="display: flex; align-items: center; gap: 1rem; margin-bottom: 1rem;">
                    <div style="display: flex; align-items: center; gap: 0.5rem;">
                        <span>${'⭐'.repeat(Math.floor(product.rating))}</span>
                        <span style="font-weight: 600;">${product.rating}</span>
                    </div>
                    <span style="color: var(--gray-600);">${product.reviews} reviews</span>
                </div>
                <div style="display: flex; align-items: center; gap: 1rem; margin-bottom: 2rem;">
                    <div style="font-size: 2rem; font-weight: 700; color: var(--primary);">₹${formatPrice(product.price)}</div>
                    ${product.originalPrice ? `
                        <div style="font-size: 1.25rem; color: var(--gray-500); text-decoration: line-through;">₹${formatPrice(product.originalPrice)}</div>
                        <div style="color: var(--success); font-weight: 600;">${product.discount}% OFF</div>
                    ` : ''}
                </div>
                <p style="color: var(--gray-700); line-height: 1.8; margin-bottom: 2rem;">${product.description}</p>
                <div style="background: var(--gray-100); padding: 1.5rem; border-radius: 8px; margin-bottom: 2rem;">
                    <h4 style="margin-bottom: 1rem;">Key Highlights</h4>
                    <ul style="list-style: none; padding: 0;">
                        ${product.highlights.map(h => `<li style="padding: 0.5rem 0; border-bottom: 1px solid var(--gray-200);">✓ ${h}</li>`).join('')}
                    </ul>
                </div>
                <div style="display: flex; gap: 1rem;">
                    <button class="btn btn-primary" style="flex: 1;" onclick="addToCart(${product.id}); closeProductModal();">Add to Cart</button>
                    <button class="btn-wishlist ${isInWishlist ? 'active' : ''}" style="padding: 0.75rem 1.5rem;" onclick="toggleWishlistItem(${product.id}); showProductDetails(${product.id});">
                        ${isInWishlist ? '❤️ Saved' : '🤍 Save'}
                    </button>
                </div>
                <button class="btn btn-secondary" style="width: 100%; margin-top: 1rem;" onclick="buyNow(${product.id})">Buy Now</button>
            </div>
        </div>
    `;
    
    modal.classList.add('active');
}

function closeProductModal() {
    document.getElementById('productModal').classList.remove('active');
}

function buyNow(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    // INSTANT BUY - Order immediately!
    closeProductModal();
    
    const orderId = 'ORD-' + Math.random().toString(36).substr(2, 9).toUpperCase();
    const deliveryDate = new Date();
    deliveryDate.setDate(deliveryDate.getDate() + Math.floor(Math.random() * 3) + 3);
    
    const order = {
        id: orderId,
        items: [{
            name: product.name,
            price: product.price,
            quantity: 1,
            icon: product.icon
        }],
        subtotal: product.price,
        delivery: product.price > 999 ? 0 : 50,
        total: product.price + (product.price > 999 ? 0 : 50),
        status: 'Processing',
        orderDate: new Date().toLocaleDateString('en-IN'),
        deliveryDate: deliveryDate.toLocaleDateString('en-IN'),
        timestamp: new Date().toISOString()
    };
    
    orders.push(order);
    saveToStorage();
    
    // Show instant success
    showToast(`🎉 ${product.name} ordered instantly! Order ID: ${orderId}`);
    
    // Show success modal
    const modal = document.getElementById('checkoutModal');
    const content = document.getElementById('checkoutContent');
    
    content.innerHTML = `
        <div style="text-align: center; padding: 3rem 2rem;">
            <div style="font-size: 5rem; margin-bottom: 1.5rem; animation: bounce 1s;">⚡</div>
            <h2 style="font-size: 2.5rem; margin-bottom: 1rem; background: var(--gradient-success); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;">
                Ordered Instantly!
            </h2>
            <p style="font-size: 1.25rem; color: var(--gray-600); margin-bottom: 2rem;">
                <strong>That was fast!</strong> Order placed in 1 click! 🚀
            </p>
            
            <div style="background: var(--gradient-primary); color: white; padding: 2.5rem; border-radius: 20px; margin-bottom: 2rem; box-shadow: 0 12px 32px rgba(99, 102, 241, 0.5);">
                <div style="font-size: 4rem; margin-bottom: 1rem;">${product.icon}</div>
                <h3 style="font-size: 1.75rem; margin-bottom: 1.5rem; font-weight: 700;">${product.name}</h3>
                
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; margin-bottom: 1.5rem;">
                    <div style="background: rgba(255,255,255,0.2); padding: 1rem; border-radius: 12px; backdrop-filter: blur(10px);">
                        <div style="opacity: 0.9; font-size: 0.875rem;">Order ID</div>
                        <div style="font-size: 1.25rem; font-weight: 700;">${orderId}</div>
                    </div>
                    <div style="background: rgba(255,255,255,0.2); padding: 1rem; border-radius: 12px; backdrop-filter: blur(10px);">
                        <div style="opacity: 0.9; font-size: 0.875rem;">Total</div>
                        <div style="font-size: 1.25rem; font-weight: 700;">₹${formatPrice(order.total)}</div>
                    </div>
                </div>
                
                <div style="background: rgba(255,255,255,0.2); padding: 1.25rem; border-radius: 12px; backdrop-filter: blur(10px);">
                    <div style="opacity: 0.9; font-size: 0.875rem; margin-bottom: 0.5rem;">Expected Delivery</div>
                    <div style="font-size: 1.5rem; font-weight: 700;">${deliveryDate.toLocaleDateString('en-IN', {weekday: 'short', day: 'numeric', month: 'short'})}</div>
                </div>
            </div>
            
            <div style="display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap;">
                <button class="btn btn-primary" onclick="closeCheckoutModal(); showOrders();" style="padding: 1rem 2rem;">
                    📦 Track Order
                </button>
                <button class="btn btn-secondary" onclick="closeCheckoutModal(); scrollToProducts();" style="padding: 1rem 2rem;">
                    🛍️ Continue Shopping
                </button>
            </div>
            
            <p style="margin-top: 2.5rem; color: var(--success); font-weight: 700; font-size: 1rem;">
                ✨ Instant 1-click ordering - Faster than Amazon, Flipkart & Meesho!
            </p>
        </div>
    `;
    
    modal.classList.add('active');
}

// INSTANT CHECKOUT - No Forms, No Hassle! (Better than Flipkart/Amazon)
function proceedToCheckout() {
    if (cart.length === 0) {
        showToast('Your cart is empty!');
        return;
    }
    
    // INSTANT ORDER PLACEMENT - NO FORMS NEEDED!
    toggleCart();
    
    const orderId = 'ORD-' + Math.random().toString(36).substr(2, 9).toUpperCase();
    const deliveryDate = new Date();
    deliveryDate.setDate(deliveryDate.getDate() + Math.floor(Math.random() * 3) + 3);
    
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const delivery = subtotal > 999 ? 0 : 50;
    const total = subtotal + delivery;
    
    const order = {
        id: orderId,
        items: cart.map(item => ({
            name: item.name,
            price: item.price,
            quantity: item.quantity,
            icon: item.icon
        })),
        subtotal: subtotal,
        delivery: delivery,
        total: total,
        status: 'Processing',
        orderDate: new Date().toLocaleDateString('en-IN'),
        deliveryDate: deliveryDate.toLocaleDateString('en-IN'),
        timestamp: new Date().toISOString()
    };
    
    orders.push(order);
    const orderedItems = [...cart]; // Save for display
    cart = [];
    
    updateCartCount();
    saveToStorage();
    
    // Show instant success message
    const modal = document.getElementById('checkoutModal');
    const content = document.getElementById('checkoutContent');
    
    content.innerHTML = `
        <div style="text-align: center; padding: 3rem 2rem;">
            <div style="font-size: 5rem; margin-bottom: 1.5rem; animation: bounce 1s;">🎉</div>
            <h2 style="font-size: 2.5rem; margin-bottom: 1rem; background: var(--gradient-success); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;">
                Order Placed Instantly!
            </h2>
            <p style="font-size: 1.25rem; color: var(--gray-600); margin-bottom: 2rem;">
                <strong>No forms, no hassle - Done in seconds!</strong> ⚡
            </p>
            
            <div style="background: var(--gradient-primary); color: white; padding: 2rem; border-radius: 16px; margin-bottom: 2rem; box-shadow: 0 8px 24px rgba(99, 102, 241, 0.4);">
                <div style="font-size: 1rem; opacity: 0.9; margin-bottom: 0.5rem;">Order ID</div>
                <div style="font-size: 2rem; font-weight: 800; margin-bottom: 1.5rem;">${orderId}</div>
                
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; text-align: left;">
                    <div>
                        <div style="opacity: 0.9; font-size: 0.875rem;">Total Amount</div>
                        <div style="font-size: 1.75rem; font-weight: 700;">₹${formatPrice(total)}</div>
                    </div>
                    <div>
                        <div style="opacity: 0.9; font-size: 0.875rem;">Delivery By</div>
                        <div style="font-size: 1.75rem; font-weight: 700;">${deliveryDate.toLocaleDateString('en-IN', {day: 'numeric', month: 'short'})}</div>
                    </div>
                </div>
            </div>
            
            <div style="background: var(--gray-100); padding: 1.5rem; border-radius: 12px; margin-bottom: 2rem; text-align: left;">
                <h4 style="margin-bottom: 1rem; font-size: 1.125rem;">Ordered Items (${orderedItems.length})</h4>
                ${orderedItems.map(item => `
                    <div style="display: flex; justify-content: space-between; padding: 0.75rem 0; border-bottom: 1px solid var(--gray-300);">
                        <div>
                            <span style="font-size: 2rem; margin-right: 0.5rem;">${item.icon}</span>
                            <strong>${item.name}</strong> <span style="color: var(--gray-600);">x${item.quantity}</span>
                        </div>
                        <div style="font-weight: 700;">₹${formatPrice(item.price * item.quantity)}</div>
                    </div>
                `).join('')}
            </div>
            
            <div style="display: flex; gap: 1rem; justify-content: center;">
                <button class="btn btn-primary" onclick="closeCheckoutModal(); showOrders();" style="padding: 1rem 2rem;">
                    📦 View My Orders
                </button>
                <button class="btn btn-secondary" onclick="closeCheckoutModal(); scrollToProducts();" style="padding: 1rem 2rem;">
                    🛍️ Continue Shopping
                </button>
            </div>
            
            <p style="margin-top: 2rem; color: var(--gray-600); font-size: 0.875rem;">
                ✨ <strong>This is KAI's instant ordering!</strong> No address forms, no payment forms - Just click and done! 🚀
            </p>
        </div>
    `;
    
    modal.classList.add('active');
}

function placeOrder(event) {
    // This function is now handled by proceedToCheckout - kept for compatibility
    if (event) event.preventDefault();
    proceedToCheckout();
}

function closeCheckoutModal() {
    document.getElementById('checkoutModal').classList.remove('active');
}

// Orders
function showOrders() {
    closeAllSidebars();
    document.querySelector('.products-section').style.display = 'none';
    document.querySelector('.deals-section').style.display = 'none';
    document.querySelector('.carousel-section').style.display = 'none';
    
    const ordersSection = document.getElementById('ordersSection');
    ordersSection.style.display = 'block';
    
    displayOrdersList();
}

function hideOrders() {
    document.getElementById('ordersSection').style.display = 'none';
    document.querySelector('.products-section').style.display = 'block';
    document.querySelector('.deals-section').style.display = 'block';
    document.querySelector('.carousel-section').style.display = 'block';
}

function displayOrdersList() {
    const ordersList = document.getElementById('ordersList');
    
    if (orders.length === 0) {
        ordersList.innerHTML = `
            <div class="empty-cart">
                <svg width="100" height="100" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                    <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                    <circle cx="8.5" cy="7" r="4"></circle>
                    <polyline points="17 11 19 13 23 9"></polyline>
                </svg>
                <p>No orders yet</p>
                <button class="btn btn-primary" onclick="hideOrders()">Start Shopping</button>
            </div>
        `;
        return;
    }
    
    ordersList.innerHTML = orders.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp)).map(order => `
        <div style="background: white; padding: 2rem; border-radius: 12px; border: 1px solid var(--gray-200);">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem; padding-bottom: 1rem; border-bottom: 1px solid var(--gray-200);">
                <div>
                    <h3 style="font-size: 1.25rem; margin-bottom: 0.5rem;">Order #${order.id}</h3>
                    <p style="color: var(--gray-600);">Placed on ${order.orderDate}</p>
                </div>
                <span style="padding: 0.5rem 1rem; background: rgba(255, 193, 7, 0.1); color: #f59e0b; border-radius: 20px; font-weight: 600;">${order.status}</span>
            </div>
            <div style="margin-bottom: 1.5rem;">
                ${order.items.map(item => `
                    <div style="display: flex; align-items: center; gap: 1rem; padding: 0.75rem 0;">
                        <span style="font-size: 2rem;">${item.icon}</span>
                        <div style="flex: 1;">
                            <div style="font-weight: 600;">${item.name}</div>
                            <div style="color: var(--gray-600); font-size: 0.875rem;">Quantity: ${item.quantity}</div>
                        </div>
                        <div style="font-weight: 600;">₹${formatPrice(item.price * item.quantity)}</div>
                    </div>
                `).join('')}
            </div>
            <div style="display: flex; justify-content: space-between; align-items: center; padding-top: 1rem; border-top: 1px solid var(--gray-200);">
                <div>
                    <div style="font-size: 0.875rem; color: var(--gray-600); margin-bottom: 0.25rem;">Expected Delivery</div>
                    <div style="font-weight: 600;">${order.deliveryDate}</div>
                </div>
                <div style="text-align: right;">
                    <div style="font-size: 0.875rem; color: var(--gray-600); margin-bottom: 0.25rem;">Total Amount</div>
                    <div style="font-size: 1.5rem; font-weight: 700; color: var(--primary);">₹${formatPrice(order.total)}</div>
                </div>
            </div>
        </div>
    `).join('');
}

// Filters
function toggleFilters() {
    const sidebar = document.getElementById('filtersSidebar');
    sidebar.classList.toggle('mobile-active');
    document.getElementById('overlay').classList.add('active');
}

function updatePriceRange() {
    const value = document.getElementById('priceRange').value;
    document.getElementById('maxPrice').textContent = `₹${formatPrice(value)}`;
    filters.maxPrice = parseInt(value);
    applyFilters();
}

function applyFilters() {
    // Get selected categories
    filters.categories = Array.from(document.querySelectorAll('.filter-group input[type="checkbox"][value^="S"], .filter-group input[type="checkbox"][value="Laptops"], .filter-group input[type="checkbox"][value="Audio"], .filter-group input[type="checkbox"][value="Wearables"]'))
        .filter(cb => cb.checked)
        .map(cb => cb.value);
    
    // Get selected ratings
    filters.ratings = Array.from(document.querySelectorAll('.filter-group input[value="4"], .filter-group input[value="3"]'))
        .filter(cb => cb.checked)
        .map(cb => parseInt(cb.value));
    
    // Get stock filter
    filters.inStock = document.querySelector('.filter-group input[value="instock"]')?.checked || false;
    
    displayProducts();
}

function clearFilters() {
    filters = {
        maxPrice: 150000,
        categories: [],
        ratings: [],
        inStock: false
    };
    
    document.getElementById('priceRange').value = 150000;
    document.getElementById('maxPrice').textContent = '₹1,50,000';
    document.querySelectorAll('.filter-group input[type="checkbox"]').forEach(cb => cb.checked = false);
    
    displayProducts();
}

// Account Functions
function toggleAccount() {
    const dropdown = document.getElementById('accountDropdown');
    dropdown.classList.toggle('active');
}

function showProfile() {
    closeAllSidebars();
    showToast('Profile feature coming soon!');
}

function showAddresses() {
    closeAllSidebars();
    showToast('Addresses feature coming soon!');
}

function showNotifications() {
    closeAllSidebars();
    showToast('Notifications feature coming soon!');
}

function logout() {
    closeAllSidebars();
    showToast('Logged out successfully!');
}

// Chat Functions
function toggleChat() {
    const widget = document.getElementById('chatWidget');
    const button = document.getElementById('chatButton');
    
    if (widget.classList.contains('active')) {
        closeChat();
    } else {
        widget.classList.add('active');
        button.style.display = 'none';
    }
}

function closeChat() {
    document.getElementById('chatWidget').classList.remove('active');
    document.getElementById('chatButton').style.display = 'flex';
}

function handleChatKeyPress(event) {
    if (event.key === 'Enter') {
        sendChatMessage();
    }
}

function sendQuickQuestion(question) {
    document.getElementById('chatInput').value = question;
    sendChatMessage();
}

async function sendChatMessage() {
    const input = document.getElementById('chatInput');
    const message = input.value.trim();
    
    if (!message) return;
    
    input.value = '';
    
    // Hide welcome
    const welcome = document.querySelector('.chat-welcome');
    if (welcome) welcome.style.display = 'none';
    
    // Add user message
    addChatMessage('user', message);
    
    // Show typing
    showTypingIndicator();
    
    // Get AI response
    try {
        const response = await getAIResponse(message);
        hideTypingIndicator();
        addChatMessage('ai', response);
    } catch (error) {
        hideTypingIndicator();
        addChatMessage('ai', 'I apologize, but I\'m having trouble connecting right now. Please try again!');
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
    chatBody.scrollTop = chatBody.scrollHeight;
    
    chatHistory.push({ sender, content, timestamp: new Date().toISOString() });
}

function showTypingIndicator() {
    const chatBody = document.getElementById('chatBody');
    const indicator = document.createElement('div');
    indicator.className = 'chat-message ai typing-message';
    indicator.innerHTML = `<div class="message-bubble">Typing...</div>`;
    chatBody.appendChild(indicator);
    chatBody.scrollTop = chatBody.scrollHeight;
}

function hideTypingIndicator() {
    const indicator = document.querySelector('.typing-message');
    if (indicator) indicator.remove();
}

async function getAIResponse(userMessage) {
    const productsList = products.map(p => 
        `${p.name} (${p.category}) - ₹${formatPrice(p.price)} - Rating: ${p.rating}★ (${p.reviews} reviews) - Discount: ${p.discount}% OFF - ${p.description}`
    ).join('\n');
    
    const systemPrompt = `You are KAI, an advanced AI shopping assistant with INSTANT ordering capability.

AVAILABLE PRODUCTS:
${productsList}

YOUR CAPABILITIES:
1. INSTANT PRODUCT RECOMMENDATIONS - Show 2-3 best products clearly
2. SMART FILTERING - Understand "under 50000", "budget", price ranges
3. INSTANT ORDERING - When user wants to order, confirm and process immediately
4. ACCURATE MATCHING - Match products by name, brand, category
5. PRICE COMPARISONS - Compare and suggest best value
6. DETAILED INFO - Provide specs when asked

ORDERING PROTOCOL:
When user says "order", "buy", "purchase", "I want":
- Identify EXACT product
- Say: "✅ Ordering [PRODUCT NAME] instantly!"
- Show price and delivery
- Mention: "Order placed - no forms needed! 🎉"

PRODUCT RESPONSE FORMAT:
<strong>🏆 Top [Category]:</strong><br><br>

<strong>1. [Name]</strong> - ₹[Price] (-[X]% OFF)<br>
⭐ [Rating]★ ([Reviews] reviews)<br>
📦 [Features]<br><br>

<strong>💡 Best Choice:</strong> [Product Name] - [Why]<br><br>

Say "Order [name]" for instant ordering! 🚀

RULES:
- ALWAYS use EXACT product names
- ALWAYS show prices with ₹ symbol
- ALWAYS mention discounts
- ALWAYS show ratings
- Be specific and concise
- Use emojis
- Be enthusiastic

User: ${userMessage}

Response:`;
    
    try {
        const response = await fetch(GEMINI_API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{ parts: [{ text: systemPrompt }] }],
                generationConfig: {
                    temperature: 0.7,
                    topK: 40,
                    topP: 0.95,
                    maxOutputTokens: 2048,
                }
            })
        });
        
        if (!response.ok) throw new Error('API request failed');
        
        const data = await response.json();
        let aiResponse = data.candidates[0].content.parts[0].text;
        
        // Check for instant order
        if (userMessage.toLowerCase().includes('order') || 
            userMessage.toLowerCase().includes('buy') || 
            userMessage.toLowerCase().includes('purchase') ||
            userMessage.toLowerCase().includes('i want')) {
            processInstantOrder(userMessage);
        }
        
        aiResponse = aiResponse.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
        aiResponse = aiResponse.replace(/\n/g, '<br>');
        
        return aiResponse;
    } catch (error) {
        console.error('AI Error:', error);
        return getSmartFallback(userMessage);
    }
}

// NEW: Instant Order Processing
function processInstantOrder(message) {
    const lower = message.toLowerCase();
    let matchedProduct = null;
    
    // Exact product name match
    for (let product of products) {
        if (lower.includes(product.name.toLowerCase())) {
            matchedProduct = product;
            break;
        }
    }
    
    // Brand/keyword matching
    if (!matchedProduct) {
        const keywords = {
            'iphone': 'iPhone 14 Pro',
            'macbook': 'MacBook Air M2',
            'samsung': 'Samsung Galaxy S23 5G',
            'oneplus': 'OnePlus 11',
            'sony': 'Sony WH-1000XM5',
            'airpods': 'AirPods Pro 2',
            'dell': 'Dell XPS 15',
            'hp': 'HP Pavilion Gaming',
            'watch': 'Apple Watch Series 9',
            'jbl': 'JBL Flip 6',
            'ipad': 'iPad Pro 11"'
        };
        
        for (let [keyword, productName] of Object.entries(keywords)) {
            if (lower.includes(keyword)) {
                matchedProduct = products.find(p => p.name === productName);
                break;
            }
        }
    }
    
    // Category fallback
    if (!matchedProduct) {
        if (lower.includes('phone')) matchedProduct = products.find(p => p.category === 'Smartphones');
        else if (lower.includes('laptop')) matchedProduct = products.find(p => p.category === 'Laptops');
        else if (lower.includes('audio')) matchedProduct = products.find(p => p.category === 'Audio');
        else matchedProduct = products[0];
    }
    
    if (matchedProduct) {
        const orderId = 'ORD-' + Math.random().toString(36).substr(2, 9).toUpperCase();
        const deliveryDate = new Date();
        deliveryDate.setDate(deliveryDate.getDate() + Math.floor(Math.random() * 3) + 3);
        
        const order = {
            id: orderId,
            items: [{
                name: matchedProduct.name,
                price: matchedProduct.price,
                quantity: 1,
                icon: matchedProduct.icon
            }],
            total: matchedProduct.price,
            status: 'Processing',
            orderDate: new Date().toLocaleDateString('en-IN'),
            deliveryDate: deliveryDate.toLocaleDateString('en-IN'),
            timestamp: new Date().toISOString()
        };
        
        orders.push(order);
        saveToStorage();
        showToast(`🎉 ${matchedProduct.name} ordered instantly! Order ID: ${orderId}`);
        
        setTimeout(() => displayOrdersList(), 500);
    }
}

function getSmartFallback(userMessage) {
    const lower = userMessage.toLowerCase();
    
    // Handle ordering
    if (lower.includes('order') || lower.includes('buy') || lower.includes('purchase')) {
        processInstantOrder(userMessage);
        return `<div style="background: linear-gradient(135deg, #10b981, #059669); padding: 1.5rem; border-radius: 12px; color: white; margin: 1rem 0;">
            <strong style="font-size: 1.5rem;">✅ Order Confirmed Instantly!</strong><br><br>
            Your order has been placed successfully!<br>
            📦 Delivery: 3-5 days<br>
            🎁 No forms, no hassle - done in seconds!<br><br>
            <em>Check "My Orders" to track your order 🚀</em>
        </div>`;
    }
    
    // Phone queries
    if (lower.includes('phone') || lower.includes('mobile')) {
        const phones = products.filter(p => p.category === 'Smartphones').slice(0, 3);
        let response = '<strong>🏆 Top Smartphones for You:</strong><br><br>';
        phones.forEach((p, i) => {
            response += `<strong>${i+1}. ${p.name}</strong> - ₹${formatPrice(p.price)} `;
            if (p.discount) response += `<span style="color: #16a34a;">(-${p.discount}% OFF)</span>`;
            response += `<br>⭐ ${p.rating}★ (${p.reviews.toLocaleString()} reviews)<br>`;
            response += `📦 ${p.description}<br><br>`;
        });
        response += `<strong>💡 Best Choice:</strong> ${phones[0].name} - Highest rated!<br><br>`;
        response += `Say "<strong>Order ${phones[0].name}</strong>" for instant ordering! 🚀`;
        return response;
    }
    
    // Laptop queries
    if (lower.includes('laptop')) {
        const laptops = products.filter(p => p.category === 'Laptops').slice(0, 3);
        let response = '<strong>🏆 Top Laptops for You:</strong><br><br>';
        laptops.forEach((p, i) => {
            response += `<strong>${i+1}. ${p.name}</strong> - ₹${formatPrice(p.price)} `;
            if (p.discount) response += `<span style="color: #16a34a;">(-${p.discount}% OFF)</span>`;
            response += `<br>⭐ ${p.rating}★ (${p.reviews.toLocaleString()} reviews)<br>`;
            response += `📦 ${p.description}<br><br>`;
        });
        response += `<strong>💡 Best Choice:</strong> ${laptops[0].name} - Best performance!<br><br>`;
        response += `Say "<strong>Order ${laptops[0].name}</strong>" for instant ordering! 🚀`;
        return response;
    }
    
    // Budget queries
    if (lower.includes('budget') || lower.includes('cheap') || lower.includes('under')) {
        const affordableProducts = products.filter(p => p.price < 60000).sort((a, b) => a.price - b.price).slice(0, 3);
        let response = '<strong>🏆 Best Budget Products:</strong><br><br>';
        affordableProducts.forEach((p, i) => {
            response += `<strong>${i+1}. ${p.name}</strong> - ₹${formatPrice(p.price)} `;
            if (p.discount) response += `<span style="color: #16a34a;">(-${p.discount}% OFF)</span>`;
            response += `<br>⭐ ${p.rating}★ • ${p.category}<br>`;
            response += `📦 ${p.description}<br><br>`;
        });
        response += `<strong>💰 Best Value:</strong> ${affordableProducts[0].name}<br><br>`;
        response += `Say "<strong>Order [product name]</strong>" for instant ordering! 🚀`;
        return response;
    }
    
    // Deals queries
    if (lower.includes('deal') || lower.includes('offer') || lower.includes('discount')) {
        const dealProducts = products.filter(p => p.deal && p.discount > 10).slice(0, 3);
        let response = '<strong>🔥 Hot Deals Right Now:</strong><br><br>';
        dealProducts.forEach((p, i) => {
            response += `<strong>${i+1}. ${p.name}</strong> - ₹${formatPrice(p.price)} `;
            response += `<span style="color: #dc2626; font-weight: 700;">(-${p.discount}% OFF!)</span><br>`;
            response += `⭐ ${p.rating}★ • Save ₹${formatPrice(p.originalPrice - p.price)}<br>`;
            response += `📦 ${p.description}<br><br>`;
        });
        response += `<strong>🎁 Best Deal:</strong> ${dealProducts[0].name} - Save ${dealProducts[0].discount}%!<br><br>`;
        response += `Order now: "<strong>Order ${dealProducts[0].name}</strong>" 🚀`;
        return response;
    }
    
    // Default helpful response
    return `<strong>👋 Hi! I'm KAI - Your Instant Shopping Assistant!</strong><br><br>
        I can help you:<br>
        🔍 <strong>Find products</strong> - "Show me phones"<br>
        💰 <strong>Compare prices</strong> - "Best laptop under 80000"<br>
        🎯 <strong>Get recommendations</strong> - "Which phone is best?"<br>
        ⚡ <strong>Order instantly</strong> - "Order iPhone 14 Pro"<br><br>
        <strong>✨ No forms, no hassle - order in seconds!</strong><br><br>
        What can I help you find today? 🛍️`;
}

// Utility Functions
function formatPrice(price) {
    return price.toLocaleString('en-IN');
}

function showToast(message) {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.classList.add('active');
    setTimeout(() => toast.classList.remove('active'), 3000);
}

function closeAllSidebars() {
    document.getElementById('cartSidebar').classList.remove('active');
    document.getElementById('wishlistSidebar').classList.remove('active');
    document.getElementById('accountDropdown').classList.remove('active');
    document.getElementById('overlay').classList.remove('active');
    document.getElementById('searchSuggestions').classList.remove('active');
}

function scrollToProducts() {
    document.querySelector('.products-section').scrollIntoView({ behavior: 'smooth' });
}

function saveToStorage() {
    localStorage.setItem('kai_cart', JSON.stringify(cart));
    localStorage.setItem('kai_wishlist', JSON.stringify(wishlist));
    localStorage.setItem('kai_orders', JSON.stringify(orders));
    localStorage.setItem('kai_chat_history', JSON.stringify(chatHistory));
}

function loadFromStorage() {
    const savedCart = localStorage.getItem('kai_cart');
    const savedWishlist = localStorage.getItem('kai_wishlist');
    const savedOrders = localStorage.getItem('kai_orders');
    const savedChat = localStorage.getItem('kai_chat_history');
    
    if (savedCart) cart = JSON.parse(savedCart);
    if (savedWishlist) wishlist = JSON.parse(savedWishlist);
    if (savedOrders) orders = JSON.parse(savedOrders);
    if (savedChat) chatHistory = JSON.parse(savedChat);
}

// Close dropdowns when clicking outside
document.addEventListener('click', (e) => {
    if (!e.target.closest('.header-btn') && !e.target.closest('.account-dropdown')) {
        document.getElementById('accountDropdown').classList.remove('active');
    }
    if (!e.target.closest('.search-bar')) {
        document.getElementById('searchSuggestions').classList.remove('active');
    }
});

console.log('🛒 KAI E-Commerce Platform Ready!');
