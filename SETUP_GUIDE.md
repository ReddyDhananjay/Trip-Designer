# KAI Website - Setup Guide

## 🚀 Quick Start

This is a simple HTML, CSS, and JavaScript website for KAI - Your Smart Shopping Assistant.

### Files Structure:
```
/workspace/
├── index.html          (Main HTML file)
├── style.css           (All styling)
├── script.js           (All functionality)
└── SETUP_GUIDE.md      (This file)
```

## 📋 Setup Instructions

### 1. Get Your OpenRouter API Key

1. Visit [OpenRouter.ai](https://openrouter.ai/)
2. Sign up for a free account
3. Go to [Keys Page](https://openrouter.ai/keys)
4. Create a new API key
5. Copy your API key

### 2. Configure the API Key

Open `script.js` and find this line (around line 230):

```javascript
const OPENROUTER_API_KEY = 'sk-or-v1-f55e93c03c81a7b5d5f98c8a7e3b4f2e1d6c9a8b7c5d4e3f2a1b0c9d8e7f6a5b4c3';
```

Replace the placeholder with your actual OpenRouter API key:

```javascript
const OPENROUTER_API_KEY = 'YOUR_ACTUAL_API_KEY_HERE';
```

### 3. Run the Website

#### Option A: Open Directly in Browser
Simply double-click on `index.html` or right-click and choose "Open with Browser"

#### Option B: Use a Local Server (Recommended)

**Using Python:**
```bash
# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000
```

**Using Node.js (npx):**
```bash
npx serve
```

**Using PHP:**
```bash
php -S localhost:8000
```

Then open your browser and go to: `http://localhost:8000`

## ✨ Features

### 1️⃣ Landing Page (Home Section)
- Hero banner with animated floating cards
- "Start Chat with KAI" button
- Featured products showcase
- How KAI helps you section

### 2️⃣ Live KAI Chatbot
- Real-time AI conversation powered by OpenRouter (Claude 3.5 Sonnet)
- Modern WhatsApp-like chat interface
- Quick action buttons for common queries
- Typing indicator animation
- Chat history saved in browser localStorage
- Right sidebar with popular products and offers

### 3️⃣ Products Catalog
- 15 pre-loaded products from various categories
- Category filters (Electronics, Wearables, Accessories, Bags, Shoes)
- Search functionality
- Beautiful product cards with hover effects
- Click any product to view details

### 4️⃣ Product Detail Modal
- Full product information
- Specifications display
- "Ask KAI" button - redirects to chat with product context
- "Mock Buy Now" button - creates instant order

### 5️⃣ Orders Page
- View all mock orders created via chatbot
- Order status tracking (Processing, Shipped, Delivered, Cancelled)
- Order details with product image
- Cancel order functionality
- Persistent storage in localStorage

### 6️⃣ Admin Panel
- **Products Tab**: View all products with edit/delete options
- **Orders Tab**: Manage all orders with status updates
- Add new products via modal form
- Change order status dropdown

## 🎨 UI/UX Features

- ✅ Beautiful gradient hero section
- ✅ Smooth scroll navigation
- ✅ Responsive design (mobile, tablet, desktop)
- ✅ Modern color scheme (Purple/Indigo primary)
- ✅ Smooth animations and transitions
- ✅ Custom scrollbar styling
- ✅ Interactive hover effects
- ✅ Loading indicators
- ✅ Empty states with helpful messages

## 🤖 Chatbot Capabilities

KAI can:
- Recommend products from the catalog
- Answer questions about pricing and specifications
- Compare different products
- Create mock orders with order IDs
- Suggest alternatives if a product isn't in the catalog
- Provide delivery estimates
- Be conversational and friendly with emojis

## 📱 Responsive Design

The website is fully responsive and works on:
- 📱 Mobile phones (320px+)
- 📱 Tablets (768px+)
- 💻 Laptops (1024px+)
- 🖥️ Desktops (1280px+)

## 🔧 Customization

### Change Colors
Edit the CSS variables in `style.css`:
```css
:root {
    --primary-color: #6366f1;  /* Change this */
    --secondary-color: #8b5cf6; /* And this */
}
```

### Add More Products
Edit the `products` array in `script.js` (starts at line 1):
```javascript
const products = [
    {
        id: "16",
        name: "Your Product Name",
        category: "Electronics",
        price: 1999,
        image: "https://your-image-url.com",
        description: "Product description...",
        specs: {
            feature1: "value1",
            feature2: "value2"
        },
        stock: 50,
        featured: false,
        platform: "Amazon, Flipkart"
    }
];
```

### Customize AI Behavior
Edit the `systemPrompt` in the `callKAI()` function in `script.js` (around line 285)

## 🚨 Troubleshooting

### Chat not working?
1. Check if you've added your OpenRouter API key
2. Open browser console (F12) to see any error messages
3. Make sure you have internet connection
4. Verify your API key is valid

### Images not loading?
- The website uses Unsplash images which require internet connection
- If Unsplash is blocked, replace image URLs with local images or different CDN

### Orders not saving?
- Make sure your browser allows localStorage
- Check browser privacy settings
- Try a different browser

### Styling issues?
- Clear browser cache (Ctrl+Shift+Del)
- Make sure `style.css` is in the same folder as `index.html`
- Check browser console for CSS loading errors

## 📝 Browser Support

- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+

## 🔒 Data Storage

- All data is stored locally in your browser using localStorage
- No backend server required
- Data persists between sessions
- Clear browser data to reset

## 💡 Tips

1. **Test the chatbot**: Ask KAI to recommend products, compare items, or create orders
2. **Try filters**: Use category filters and search on the products page
3. **View details**: Click any product card to see full specifications
4. **Create orders**: Use "Mock Buy Now" or ask KAI to create an order
5. **Admin panel**: Experiment with changing order statuses

## 📚 Technologies Used

- **HTML5**: Semantic markup
- **CSS3**: Modern styling with Flexbox & Grid
- **JavaScript (ES6+)**: Vanilla JS, no frameworks
- **OpenRouter API**: AI chatbot integration
- **Google Fonts**: Inter font family
- **Unsplash**: Product images

## 🎯 Future Enhancements

Ideas for extending this project:
- Add backend API with Node.js/Express
- Connect to real e-commerce APIs
- User authentication system
- Payment gateway integration
- Real-time inventory management
- Email notifications for orders
- Product reviews and ratings
- Wishlist functionality
- Multiple language support

## 📞 Support

If you encounter any issues:
1. Check this guide first
2. Review the browser console for errors
3. Verify your API key configuration
4. Test with different browsers

## 🎉 Enjoy!

You now have a fully functional AI-powered shopping assistant website!

Start by clicking "Start Chat with KAI" on the homepage and ask about products.

---

**Made with ❤️ for KAI Website Project**
