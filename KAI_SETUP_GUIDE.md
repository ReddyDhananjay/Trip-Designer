# 🤖 KAI - Smart Shopping Assistant

## Overview
KAI is a vibrant, AI-powered shopping assistant website that uses Google's Gemini API to provide intelligent product recommendations, comparisons, and mock order functionality.

## 📁 Files Created
1. **index.html** - Main HTML structure with all sections
2. **style.css** - Vibrant styling with 3D animations
3. **script.js** - JavaScript functionality with Google Gemini AI integration

## 🚀 How to Run

### Method 1: Open Directly
1. Simply double-click `index.html` to open in your browser
2. Or right-click → Open with → Your preferred browser

### Method 2: Using Live Server (Recommended)
```bash
# If you have Python installed:
python -m http.server 8000

# Or with Node.js:
npx http-server
```
Then open: `http://localhost:8000`

## ✨ Features

### 🏠 Landing Page
- Beautiful hero section with floating 3D animations
- Feature cards showcasing KAI's capabilities
- Quick navigation to Chat, Products, and Orders
- Vibrant gradient colors throughout

### 💬 Live AI Chatbot
- **Powered by Google Gemini API** using your provided key
- Natural conversation about any products
- Quick action buttons for common queries
- Real-time typing indicators
- Chat history saved locally

### 🛍️ Smart Product Search
- AI searches and recommends products based on your queries
- Shows 2-3 similar product suggestions
- Provides detailed comparisons
- Recommends the BEST product to buy
- All prices displayed in Indian Rupees (₹)

### 📦 Mock Orders System
- Create orders through chat
- Auto-generated Order IDs
- Delivery date estimation
- Order tracking interface
- Persistent storage

### 🎨 Design Features
- **Vibrant Colors**: Purple, pink, cyan, yellow gradients
- **3D Animations**: 
  - Floating shapes in background
  - Pulsing AI avatar
  - Card hover effects
  - Smooth transitions
- **Responsive Design**: Works on all devices
- **Modern UI**: WhatsApp-style chat bubbles

## 🔧 API Configuration

The website uses Google Gemini API with your provided key:
```javascript
API Key: AIzaSyAHDnHtiGyJTgU3hCXFPZKx3gS9wqLtZ-U
```

## 💡 How to Use

### Chatting with KAI
1. Click "Start Chat" on the homepage
2. Type your product query (e.g., "smartphone under ₹30,000")
3. KAI will provide recommendations with:
   - Product names
   - Prices in ₹ INR
   - Key features
   - Ratings
   - Best buy recommendation

### Example Queries
- "Recommend a smartphone under ₹30,000"
- "Best laptop for programming"
- "Compare wireless headphones"
- "Show me smartwatches"
- "I want to buy [product name]"

### Creating Orders
1. Chat with KAI about a product
2. Say "I want to buy this" or "Create an order"
3. KAI generates a mock order with:
   - Order ID
   - Price in ₹
   - Estimated delivery date
4. View orders in the Orders section

## 🎯 Key Sections

### 1. Home
- Hero banner with animated robot avatar
- Feature cards
- Call-to-action buttons

### 2. Chat
- Full-screen chat interface
- AI-powered responses
- Quick action buttons
- Product cards in chat

### 3. Products
- Dynamic product grid
- Search-based product display
- Ask KAI buttons

### 4. Orders
- Order history
- Order tracking
- Status updates

## 🎨 Color Scheme
- **Primary**: #FF6B6B (Vibrant Red)
- **Secondary**: #4ECDC4 (Cyan)
- **Accent**: #FFE66D (Yellow)
- **Purple**: #A37BFF
- **Background**: Dark gradient (Purple to Blue)

## 🌟 Animations
1. **Floating Shapes**: Background orbs floating around
2. **Pulse Rings**: Around AI avatar
3. **Bounce**: Logo animation
4. **Slide In**: Hero text animations
5. **Fade In Up**: Cards appearing on scroll
6. **Typing Indicator**: Animated dots while AI thinks
7. **Hover Effects**: 3D transforms on cards

## 💾 Data Storage
- Chat history saved in browser's localStorage
- Orders persisted across sessions
- No backend required - purely client-side

## 🔒 Security Note
The API key is embedded in the JavaScript file for demo purposes. For production:
1. Use environment variables
2. Implement a backend proxy
3. Add rate limiting
4. Use API key restrictions in Google Cloud Console

## 🐛 Troubleshooting

### API Not Working
- Check internet connection
- Verify API key is valid
- Check browser console for errors
- Ensure API key has Gemini API enabled in Google Cloud

### Fallback System
If the API fails, KAI has built-in fallback responses for:
- Smartphones
- Laptops
- Headphones
- General queries

### Clear Data
To reset everything:
```javascript
localStorage.clear();
```
Then refresh the page.

## 📱 Mobile Responsive
The website automatically adapts to:
- Mobile phones (320px+)
- Tablets (768px+)
- Desktops (1024px+)
- Large screens (1440px+)

## 🚀 Performance
- No external dependencies (except Google Fonts)
- Pure vanilla JavaScript
- Optimized CSS animations
- Lazy loading ready
- Fast initial load

## 📄 Browser Support
- Chrome (recommended)
- Firefox
- Safari
- Edge
- Opera

## 🎓 Technical Stack
- **HTML5**: Semantic markup
- **CSS3**: Custom properties, animations, grid, flexbox
- **JavaScript ES6+**: Async/await, fetch API, modules
- **Google Gemini API**: AI-powered responses

## 📞 Support
For issues or questions:
1. Check browser console for errors
2. Verify API key is active
3. Test with fallback responses
4. Check network tab for API calls

## 🎉 Enjoy Shopping with KAI!

Open `index.html` and start exploring the vibrant, AI-powered shopping experience!
