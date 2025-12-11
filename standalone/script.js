// ================================
// KAI - The Voice of Commerce
// Main JavaScript File
// ================================

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // ================================
    // Mobile Menu Toggle
    // ================================
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileMenuLinks = document.querySelectorAll('.mobile-menu-link');
    
    mobileMenuBtn.addEventListener('click', function() {
        mobileMenu.classList.toggle('active');
    });
    
    // Close mobile menu when clicking a link
    mobileMenuLinks.forEach(link => {
        link.addEventListener('click', function() {
            mobileMenu.classList.remove('active');
        });
    });
    
    
    // ================================
    // Header Scroll Effect
    // ================================
    const header = document.getElementById('header');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.1)';
        }
    });
    
    
    // ================================
    // Smooth Scrolling for Navigation Links
    // ================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
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
    
    
    // ================================
    // Chat Widget Functionality
    // ================================
    const chatButton = document.getElementById('chatButton');
    const chatWindow = document.getElementById('chatWindow');
    const closeChat = document.getElementById('closeChat');
    const chatInput = document.getElementById('chatInput');
    const sendMessage = document.getElementById('sendMessage');
    const chatMessages = document.getElementById('chatMessages');
    
    // Open chat
    chatButton.addEventListener('click', openChat);
    
    function openChat() {
        chatWindow.classList.add('active');
        chatButton.style.display = 'none';
        chatInput.focus();
    }
    
    // Expose openChat globally for demo button
    window.openChat = openChat;
    
    // Close chat
    closeChat.addEventListener('click', function() {
        chatWindow.classList.remove('active');
        chatButton.style.display = 'flex';
    });
    
    // Send message
    function handleSendMessage() {
        const message = chatInput.value.trim();
        if (message === '') return;
        
        // Add user message
        addMessage(message, 'user');
        chatInput.value = '';
        
        // Show typing indicator
        const typingIndicator = addTypingIndicator();
        
        // Simulate AI response after delay
        setTimeout(() => {
            typingIndicator.remove();
            handleAIResponse(message);
        }, 1000 + Math.random() * 1000);
    }
    
    sendMessage.addEventListener('click', handleSendMessage);
    
    chatInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            handleSendMessage();
        }
    });
    
    // Add message to chat
    function addMessage(text, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message message-${sender}`;
        
        const bubbleDiv = document.createElement('div');
        bubbleDiv.className = 'message-bubble';
        bubbleDiv.textContent = text;
        
        messageDiv.appendChild(bubbleDiv);
        chatMessages.appendChild(messageDiv);
        
        // Scroll to bottom
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
    
    // Add typing indicator
    function addTypingIndicator() {
        const messageDiv = document.createElement('div');
        messageDiv.className = 'message message-bot typing-indicator';
        
        const bubbleDiv = document.createElement('div');
        bubbleDiv.className = 'message-bubble';
        bubbleDiv.innerHTML = 'KAI is typing...';
        
        messageDiv.appendChild(bubbleDiv);
        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
        
        return messageDiv;
    }
    
    // Handle AI Response
    function handleAIResponse(userMessage) {
        const lowerMessage = userMessage.toLowerCase();
        
        // Detect keywords and provide appropriate responses
        if (lowerMessage.includes('shirt') || lowerMessage.includes('cotton') || lowerMessage.includes('blue')) {
            addMessage("I found 8 blue cotton shirts! Here are some great options:", 'bot');
            addProductCards([
                { name: 'Premium Blue Cotton Shirt', price: 1299, stock: 'In Stock' },
                { name: 'Classic Oxford Shirt', price: 1599, stock: 'In Stock' }
            ]);
        } else if (lowerMessage.includes('jeans') || lowerMessage.includes('denim')) {
            addMessage("Great choice! Here are our premium denim options:", 'bot');
            addProductCards([
                { name: 'Classic Blue Jeans - Slim Fit', price: 2499, stock: 'In Stock' },
                { name: 'Dark Wash Denim Jeans', price: 2799, stock: 'In Stock' }
            ]);
        } else if (lowerMessage.includes('shoe') || lowerMessage.includes('sneaker')) {
            addMessage("Here are some stylish footwear options:", 'bot');
            addProductCards([
                { name: 'White Leather Sneakers', price: 3499, stock: 'In Stock' },
                { name: 'Running Shoes - Black', price: 4299, stock: 'In Stock' }
            ]);
        } else if (lowerMessage.includes('price') || lowerMessage.includes('cost') || lowerMessage.includes('under')) {
            addMessage("I can help you find products within your budget. What's your price range?", 'bot');
        } else if (lowerMessage.includes('stock') || lowerMessage.includes('available') || lowerMessage.includes('store')) {
            addMessage("Yes! I can check real-time inventory across all our stores. Which product are you interested in?", 'bot');
        } else if (lowerMessage.includes('thank')) {
            addMessage("You're welcome! Is there anything else I can help you with? 😊", 'bot');
        } else if (lowerMessage.includes('help') || lowerMessage.includes('hi') || lowerMessage.includes('hello')) {
            addMessage("I'd be happy to help you! You can ask me about:\n• Products (shirts, jeans, shoes, etc.)\n• Sizes and colors\n• Store availability\n• Price ranges\n• Reservations\n\nWhat would you like to explore?", 'bot');
        } else if (lowerMessage.includes('reserve') || lowerMessage.includes('book')) {
            addMessage("Great! I can reserve that item for you at your nearest store. Which product would you like to reserve?", 'bot');
        } else {
            // Default response
            addMessage("I'd love to help you find the perfect product! Try asking about:\n• Shirts, jeans, shoes\n• Sizes and colors\n• Store availability\n• Reservations\n\nWhat are you looking for?", 'bot');
        }
    }
    
    // Add product cards to chat
    function addProductCards(products) {
        const messageDiv = document.createElement('div');
        messageDiv.className = 'message message-bot';
        
        const cardsContainer = document.createElement('div');
        cardsContainer.className = 'product-cards';
        
        products.forEach(product => {
            const card = document.createElement('div');
            card.className = 'product-card-mini';
            
            card.innerHTML = `
                <div class="product-icon">👕</div>
                <div class="product-info">
                    <div class="product-name">${product.name}</div>
                    <div class="product-price">₹${product.price.toLocaleString()}</div>
                    <div class="product-stock">✓ ${product.stock}</div>
                </div>
            `;
            
            card.addEventListener('click', function() {
                addMessage(`I'd like to know more about the ${product.name}`, 'user');
                setTimeout(() => {
                    addMessage(`The ${product.name} is a great choice! It's priced at ₹${product.price.toLocaleString()} and is currently ${product.stock.toLowerCase()} at Store #42 (MG Road). Would you like to reserve it for try-on?`, 'bot');
                }, 1000);
            });
            
            cardsContainer.appendChild(card);
        });
        
        messageDiv.appendChild(cardsContainer);
        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
    
    
    // ================================
    // Contact Form Submission
    // ================================
    const contactForm = document.getElementById('contactForm');
    const successModal = document.getElementById('successModal');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Show success modal
            successModal.classList.add('active');
            
            // Reset form
            contactForm.reset();
            
            // Auto-close modal after 3 seconds
            setTimeout(() => {
                closeModal();
            }, 3000);
        });
    }
    
    // Close modal function
    window.closeModal = function() {
        successModal.classList.remove('active');
    };
    
    // Close modal when clicking outside
    successModal.addEventListener('click', function(e) {
        if (e.target === successModal) {
            closeModal();
        }
    });
    
    
    // ================================
    // Scroll Animations
    // ================================
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe all cards and sections
    document.querySelectorAll('.problem-card, .benefit-card, .feature-card, .step, .pricing-card, .team-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
    
    
    // ================================
    // Active Navigation Link
    // ================================
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    function setActiveLink() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }
    
    window.addEventListener('scroll', setActiveLink);
    
    
    // ================================
    // Typing Effect for Hero (Optional)
    // ================================
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const originalText = heroTitle.innerHTML;
        // You can add a typing effect here if desired
    }
    
    
    // ================================
    // Random Product Icons
    // ================================
    const productIcons = ['👕', '👔', '👖', '👗', '👠', '👟', '👞', '👡', '🎒', '👜', '🕶️', '⌚'];
    
    document.querySelectorAll('.product-icon').forEach(icon => {
        if (icon.textContent === '👕') {
            icon.textContent = productIcons[Math.floor(Math.random() * productIcons.length)];
        }
    });
    
    
    // ================================
    // Add Particle Animation to Hero
    // ================================
    function createParticle() {
        const particle = document.createElement('div');
        particle.style.position = 'absolute';
        particle.style.width = Math.random() * 100 + 50 + 'px';
        particle.style.height = particle.style.width;
        particle.style.borderRadius = '50%';
        particle.style.background = 'rgba(0, 168, 155, 0.1)';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.pointerEvents = 'none';
        particle.style.animation = `float ${Math.random() * 3 + 2}s ease-in-out infinite`;
        
        const heroBackground = document.querySelector('.hero-background');
        if (heroBackground) {
            heroBackground.appendChild(particle);
        }
    }
    
    // Create some particles
    for (let i = 0; i < 10; i++) {
        createParticle();
    }
    
    
    // ================================
    // Console Welcome Message
    // ================================
    console.log('%c🛍️ KAI - The Voice of Commerce', 'font-size: 24px; font-weight: bold; color: #00a89b;');
    console.log('%cBuilt for EY Techathon 6.0', 'font-size: 14px; color: #0b2140;');
    console.log('%cPowered by Agentic AI 🚀', 'font-size: 14px; color: #f6c24b;');
    
    
    // ================================
    // Performance Logging (Optional)
    // ================================
    window.addEventListener('load', function() {
        const loadTime = performance.now();
        console.log(`%c⚡ Page loaded in ${Math.round(loadTime)}ms`, 'color: #10b981;');
    });
    
});
