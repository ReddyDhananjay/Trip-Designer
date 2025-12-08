# 🛍️ KAI - Your Smart Shopping Assistant

## 🌟 Overview

**KAI** is a comprehensive AI-powered shopping assistant website built with Next.js, TypeScript, and Tailwind CSS. It features a fully functional chatbot powered by OpenRouter API, product catalog management, mock order system, and an admin panel - all optimized for the Indian e-commerce market.

## ✨ Features

### 🏠 Landing Page
- **Hero Banner** with engaging call-to-action
- **Featured Products** showcase with Indian pricing (₹)
- **How KAI Helps** section highlighting key features
- **CTA Section** driving users to chat with KAI
- **Floating Chatbot Button** for quick access

### 💬 Live AI Chatbot
- **Real-time AI responses** powered by OpenRouter (Claude 3.5 Sonnet)
- **WhatsApp-like bubble UI** with typing indicators
- **Quick Action Buttons** for common queries
- **Local chat history** saved in browser
- **Product recommendation sidebar**
- **Context-aware responses** about products, orders, and Indian e-commerce

### 🛒 Product Catalog
- **15+ Sample Products** with Indian brands and pricing
- **Category Filtering** (Electronics, Wearables, Bags, Accessories, Shoes)
- **Search Functionality** with real-time filtering
- **"Ask KAI" Integration** on every product card
- **Detailed Product Pages** with:
  - High-quality images
  - Technical specifications
  - Stock availability
  - Platform availability (Amazon, Flipkart, Myntra, Meesho)
  - Quantity selector
  - Mock ordering capability

### 📦 Orders Management
- **Order History** with detailed tracking
- **Order Status** (Processing, Shipped, Delivered, Cancelled)
- **Visual Timeline** for order tracking
- **Order Statistics** dashboard
- **Cancel Order** functionality
- **Mock Order IDs** (ORD-XXXXXXXXX format)
- **Estimated Delivery Dates**

### 🔧 Admin Panel
- **Product Management**:
  - Add new products
  - Edit existing products
  - Delete products
  - Mark products as featured
- **Order Management**:
  - View all orders
  - Update order status
  - Track order details
- **Tabbed Interface** for easy navigation

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18+ and npm
- **OpenRouter API Key** (get one from [openrouter.ai](https://openrouter.ai))

### Installation

1. **Clone the repository:**
```bash
git clone <your-repo-url>
cd kai-website
```

2. **Install dependencies:**
```bash
npm install
```

3. **Set up environment variables:**
   - Copy `.env.example` to `.env.local`
   - Add your OpenRouter API key:
```env
OPENROUTER_API_KEY=your_api_key_here
```

4. **Run the development server:**
```bash
npm run dev
```

5. **Open your browser:**
   - Visit [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
kai-website/
├── app/                      # Next.js App Router
│   ├── page.tsx             # Landing page
│   ├── chat/                # AI Chatbot page
│   ├── products/            # Product catalog & details
│   ├── orders/              # Order management
│   ├── admin/               # Admin panel
│   ├── layout.tsx           # Root layout
│   └── globals.css          # Global styles
├── pages/api/               # API Routes
│   ├── chat.ts             # OpenRouter AI integration
│   ├── products/           # Product CRUD operations
│   └── orders/             # Order management
├── components/              # React components
│   └── Navigation.tsx      # Main navigation bar
├── data/                    # JSON data files
│   ├── products.json       # Product catalog
│   └── orders.json         # Order history
├── types/                   # TypeScript types
│   └── index.ts            # Shared interfaces
└── public/                  # Static assets
```

## 🎨 Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **AI:** OpenRouter API (Claude 3.5 Sonnet)
- **State Management:** React Hooks + LocalStorage
- **API:** Next.js API Routes
- **Data Storage:** JSON files (file-based)

## 🤖 AI Features

### KAI Assistant Capabilities:
- ✅ Product recommendations based on user needs
- ✅ Detailed product information with Indian pricing
- ✅ Product comparisons and suggestions
- ✅ Mock order creation with realistic details
- ✅ Understanding Indian e-commerce context (Amazon India, Flipkart, Myntra, Meesho)
- ✅ Festival sales references (Diwali Sale, Big Billion Days, etc.)
- ✅ Natural conversation with context awareness

### AI Configuration:
- **Model:** `anthropic/claude-3.5-sonnet`
- **Temperature:** 0.7 (balanced creativity)
- **Max Tokens:** 800 (concise responses)
- **System Prompt:** Optimized for Indian e-commerce

## 💰 Indian E-commerce Features

- ✅ **Currency:** All prices in Indian Rupees (₹)
- ✅ **Platforms:** Amazon India, Flipkart, Myntra, Meesho references
- ✅ **Brands:** Indian-popular brands (boAt, Fire-Boltt, Noise, Campus, etc.)
- ✅ **Delivery:** 5-7 days standard delivery
- ✅ **Payment:** Cash on Delivery (COD) available
- ✅ **Returns:** Easy 7-day return policy

## 📦 Sample Products

The catalog includes 15+ products across multiple categories:
- **Electronics:** Headphones, Webcams, Speakers, Hubs
- **Wearables:** Smartwatches, Fitness Bands
- **Bags:** Backpacks, Tote Bags
- **Accessories:** Mouse, Keyboard, Wallets, Laptop Stands
- **Shoes:** Running Shoes

All products include:
- Realistic Indian pricing (₹449 - ₹2999)
- High-quality images from Unsplash
- Detailed descriptions
- Technical specifications
- Stock information
- Platform availability

## 🔧 API Routes

### Products API
- `GET /api/products` - List all products (with filters)
- `GET /api/products/:id` - Get product details
- `POST /api/products` - Add new product (Admin)
- `PUT /api/products/:id` - Update product (Admin)
- `DELETE /api/products/:id` - Delete product (Admin)

### Orders API
- `GET /api/orders` - List all orders
- `GET /api/orders/:id` - Get order details
- `POST /api/orders` - Create new order
- `PUT /api/orders/:id` - Update order status (Admin)
- `DELETE /api/orders/:id` - Cancel order

### Chat API
- `POST /api/chat` - Send message to KAI assistant

## 🎯 Usage Guide

### For Customers:
1. **Browse Products** - Explore the catalog with filters
2. **Ask KAI** - Get AI-powered product recommendations
3. **Place Mock Orders** - Test the ordering flow
4. **Track Orders** - View order status and timeline

### For Admins:
1. Navigate to `/admin`
2. **Manage Products** - Add, edit, or delete products
3. **Manage Orders** - Update order statuses
4. View comprehensive order statistics

## 🚀 Deployment

### Build for Production:
```bash
npm run build
npm start
```

### Environment Variables for Production:
```env
OPENROUTER_API_KEY=your_production_api_key
NODE_ENV=production
```

## 🔒 Security Notes

- ⚠️ The current implementation uses file-based storage (JSON files)
- ⚠️ For production, migrate to a proper database (PostgreSQL, MongoDB, etc.)
- ⚠️ Add authentication for admin routes
- ⚠️ Implement rate limiting for API routes
- ⚠️ Secure API keys using environment variables

## 🐛 Known Limitations

- Mock order system (not connected to real payment gateway)
- File-based storage (not suitable for production at scale)
- No user authentication
- No email notifications
- No real inventory management

## 🎨 Customization

### Change AI Model:
Edit `/pages/api/chat.ts`:
```typescript
model: 'anthropic/claude-3.5-sonnet', // Change to other models
```

### Update Brand Colors:
Edit `/tailwind.config.js`:
```javascript
colors: {
  primary: '#6366f1',  // Change primary color
  secondary: '#8b5cf6', // Change secondary color
}
```

### Add More Products:
Edit `/data/products.json` or use the Admin Panel.

## 📝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is open-source and available under the MIT License.

## 🙏 Credits

- **UI Design:** Inspired by Amazon, Flipkart, and Meesho
- **Images:** Unsplash (free stock photos)
- **AI:** OpenRouter API with Claude 3.5 Sonnet
- **Icons:** Heroicons (embedded SVGs)

## 🆘 Support

For issues or questions:
1. Check the documentation
2. Review existing issues on GitHub
3. Open a new issue with detailed description

## 🎉 Acknowledgments

Built with ❤️ for the Indian e-commerce ecosystem, featuring:
- Modern UI/UX design principles
- AI-powered shopping assistance
- Indian market preferences
- Mobile-first responsive design

---

**Made with Next.js, TypeScript, and AI** 🚀
