# 🚀 Quick Start Guide for KAI Website

## Installation & Setup

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Development Server
```bash
npm run dev
```

The application will be available at: **http://localhost:3000**

## 📱 Pages Overview

### 🏠 Homepage (/)
- **URL**: http://localhost:3000/
- **Purpose**: Landing page introducing KAI
- **Features**: Hero section, featured products, navigation to chat

### 💬 Chat with KAI (/chat)
- **URL**: http://localhost:3000/chat
- **Purpose**: Main AI chatbot interface
- **Features**:
  - Real-time AI conversation
  - Quick action buttons
  - Popular products sidebar
  - Local chat history
  
**Try asking:**
- "Recommend a product for me"
- "Show me headphones under $300"
- "I want to buy the Smart Watch Pro"
- "Create an order for wireless headphones"
- "Compare the fitness tracker and smart watch"

### 🛍️ Products Catalog (/products)
- **URL**: http://localhost:3000/products
- **Purpose**: Browse all products
- **Features**:
  - Category filters
  - Search functionality
  - Product cards with images
  - "Ask KAI" button for each product

### 📦 Product Details (/products/:id)
- **URL**: http://localhost:3000/products/1 (example)
- **Purpose**: View individual product details
- **Features**:
  - Large product image
  - Full specifications
  - Quantity selector
  - Create mock order button
  - Ask KAI button

### 📋 Orders (/orders)
- **URL**: http://localhost:3000/orders
- **Purpose**: View order history
- **Features**:
  - Order list with status
  - Order timeline
  - Cancel order functionality
  - Summary statistics

### ⚙️ Admin Panel (/admin)
- **URL**: http://localhost:3000/admin
- **Purpose**: Manage products and orders
- **Features**:
  - Add/Edit/Delete products
  - Update order statuses
  - Product inventory management

## 🎯 Testing the AI Chatbot

### Example Conversations:

**Product Recommendations:**
```
You: "I need a gift for someone who loves fitness"
KAI: [Recommends fitness-related products]
```

**Product Information:**
```
You: "Tell me about the Smart Watch Pro"
KAI: [Provides detailed information about the watch]
```

**Create Mock Order:**
```
You: "I want to buy the wireless headphones"
KAI: [Creates a mock order with order ID, price, and delivery date]
```

**Product Comparison:**
```
You: "Compare the wireless headphones and bluetooth speaker"
KAI: [Provides comparison of both products]
```

## 🔄 Workflow Example

### Complete Purchase Flow:

1. **Browse Products**
   - Go to http://localhost:3000/products
   - Browse or search for a product
   - Click on a product for details

2. **Ask KAI About Product**
   - Click "Ask KAI About This Product"
   - Get detailed information and recommendations

3. **Create Order**
   - Either use "Create Mock Order" on product page
   - Or ask KAI to create an order in chat
   - Example: "I want to order 2 Smart Watch Pro"

4. **View Orders**
   - Go to http://localhost:3000/orders
   - See your mock order with status
   - Track delivery timeline

5. **Admin Management** (Optional)
   - Go to http://localhost:3000/admin
   - Update order status (Processing → Shipped → Delivered)
   - Add/Edit products

## 🤖 AI Features

KAI can:
- ✅ Understand natural language
- ✅ Recommend products from catalog
- ✅ Provide detailed product information
- ✅ Compare multiple products
- ✅ Create mock orders with:
  - Order ID (e.g., ORD-1234567890)
  - Total price and quantity
  - Estimated delivery date
- ✅ Generate realistic sample products if item not in catalog
- ✅ Maintain conversation context

## 📊 Sample Data

### Products (12 items):
- Electronics: Headphones, Webcam, Speaker, Mouse, Keyboard, USB Hub
- Wearables: Smart Watch, Fitness Tracker
- Bags: Leather Backpack, Tote Bag
- Shoes: Running Shoes
- Accessories: Wallet

### Orders:
- Initially empty
- Create orders through chat or product pages
- View in Orders page

## 🛠️ Development Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run TypeScript check
npx tsc --noEmit

# Run linter
npm run lint
```

## 🔑 Environment Variables

Create a `.env.local` file with your OpenRouter API key (do not commit secrets):
```
OPENROUTER_API_KEY=<your_openrouter_api_key>
```

## 📁 Data Storage

Mock data is stored in JSON files:
- `/data/products.json` - Product catalog
- `/data/orders.json` - Order history

Changes made through the app are persisted to these files.

## 🎨 UI/UX Highlights

- **Responsive Design**: Works on mobile, tablet, and desktop
- **Modern Animations**: Smooth transitions and hover effects
- **Gradient Colors**: Beautiful purple/indigo color scheme
- **Loading States**: Spinners and loading indicators
- **Error Handling**: Graceful error messages
- **Typing Indicators**: Shows when KAI is "thinking"

## 🔍 Troubleshooting

### Port Already in Use
```bash
# Kill process on port 3000
kill -9 $(lsof -ti:3000)
# Then start again
npm run dev
```

### Chat Not Responding
- Check console for API errors
- Verify .env.local has the OpenRouter API key
- Check network tab for failed requests

### Products Not Loading
- Ensure /data/products.json exists
- Check API routes at /api/products

### Orders Not Creating
- Check /api/orders endpoint
- Verify /data/orders.json is writable

## 💡 Tips

1. **Clear Chat History**: Use "Clear Chat" button in chat interface
2. **Featured Products**: Check "Featured" checkbox in admin to highlight products
3. **Order Status**: Update in admin panel to simulate shipping progress
4. **Product Images**: Uses Unsplash URLs (requires internet connection)
5. **Local Storage**: Chat history saved in browser localStorage

## 🎓 Learning Resources

This project demonstrates:
- Next.js 14 App Router
- TypeScript with React
- API Routes (Backend)
- Tailwind CSS
- OpenRouter AI Integration
- JSON file storage
- Form handling
- State management
- Responsive design

---

**Ready to Start?**

```bash
npm run dev
```

Then visit: **http://localhost:3000** 🚀
