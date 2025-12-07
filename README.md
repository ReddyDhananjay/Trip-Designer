# KAI - Smart Retail Shopping Assistant 🛍️

A modern, full-stack AI-powered shopping assistant built with Next.js, TypeScript, and OpenRouter API (Claude 3.5 Sonnet).

## 🌟 Features

### 1. **Landing Page (Homepage)**
- Beautiful hero section introducing KAI
- Featured products carousel
- Quick navigation to chat and products
- Highlights of KAI's capabilities

### 2. **Live KAI Chatbot** (Main Feature)
- Real-time AI conversation powered by OpenRouter (Claude 3.5 Sonnet)
- WhatsApp-like modern chat UI with typing indicators
- Local chat history saved in browser
- Quick action buttons:
  - Recommend a product
  - Show popular items
  - Find deals
  - Create mock order
- Right sidebar showing popular products
- Click products to ask KAI about them

### 3. **Products Catalog**
- Browse all products with filtering
- Category filters (Electronics, Wearables, Bags, Accessories, Shoes)
- Search functionality
- Beautiful product cards with images
- "Ask KAI" button on each product
- Featured product badges

### 4. **Product Details Page**
- Large product image
- Full description and specifications
- Stock availability
- Quantity selector
- Mock order creation
- "Ask KAI" integration
- Technical specifications display

### 5. **Orders Page**
- View all mock orders
- Order status tracking (Processing → Shipped → Delivered)
- Order timeline visualization
- Cancel orders functionality
- Summary statistics
- Estimated delivery dates

### 6. **Admin Panel**
- Product management (Add/Edit/Delete)
- Order management and status updates
- Product inventory tracking
- Featured product management
- Category organization

## 🚀 Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **AI**: OpenRouter API (Claude 3.5 Sonnet)
- **Data Storage**: JSON files (mock database)
- **State Management**: React Hooks

## 📦 Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd kai-website
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env.local` file (already created with your API key):
```
OPENROUTER_API_KEY=your_api_key_here
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## 🔧 Project Structure

```
/workspace
├── app/                    # Next.js app directory
│   ├── page.tsx           # Landing page
│   ├── chat/              # Chat page
│   ├── products/          # Products catalog & details
│   ├── orders/            # Orders page
│   ├── admin/             # Admin panel
│   ├── layout.tsx         # Root layout with navigation
│   └── globals.css        # Global styles
├── components/            # Reusable components
│   └── Navigation.tsx     # Main navigation bar
├── data/                  # JSON data storage
│   ├── products.json      # Product database
│   └── orders.json        # Orders database
├── pages/api/             # API routes
│   ├── chat.ts           # OpenRouter AI chat endpoint
│   ├── products/         # Product CRUD operations
│   └── orders/           # Order CRUD operations
├── types/                 # TypeScript type definitions
│   └── index.ts          # Shared types
└── package.json          # Dependencies
```

## 🎯 Key Features Explained

### AI Chatbot (KAI)
- Understands natural language queries
- Recommends products from the catalog
- Can create realistic sample products if requested item doesn't exist
- Generates mock orders with:
  - Unique order ID (ORD-xxxxxxxxx)
  - Price and quantity
  - Total amount
  - Estimated delivery date (5-7 days)
- Maintains conversation context
- Provides product comparisons and details

### Mock Order System
- Creates realistic orders for demonstration
- Order statuses: Processing, Shipped, Delivered, Cancelled
- Tracks order dates and estimated delivery
- Allows order cancellation
- Admin can update order statuses

### Product Management
- 12 pre-loaded sample products across 5 categories
- Each product includes:
  - Name, description, price
  - High-quality images (via Unsplash)
  - Technical specifications
  - Stock levels
  - Featured status
- Admin can add/edit/delete products

## 🌐 API Endpoints

### Products
- `GET /api/products` - Get all products (with optional filters)
- `GET /api/products/:id` - Get single product
- `POST /api/products` - Create new product (admin)
- `PUT /api/products/:id` - Update product (admin)
- `DELETE /api/products/:id` - Delete product (admin)

### Orders
- `GET /api/orders` - Get all orders
- `GET /api/orders/:id` - Get single order
- `POST /api/orders` - Create new order
- `PUT /api/orders/:id` - Update order status
- `DELETE /api/orders/:id` - Cancel order

### Chat
- `POST /api/chat` - Send message to KAI and get AI response

## 🎨 Design Features

- **Modern UI**: Clean, gradient-based design with smooth animations
- **Responsive**: Works perfectly on mobile, tablet, and desktop
- **Accessibility**: Semantic HTML and proper ARIA labels
- **Performance**: Optimized images and lazy loading
- **UX**: Intuitive navigation and clear call-to-actions

## 🤖 AI Integration

The chatbot uses OpenRouter's Claude 3.5 Sonnet model with:
- Context-aware responses
- Product catalog knowledge
- Natural conversation flow
- Ability to generate realistic product descriptions
- Mock order creation capabilities

## 📝 Sample Products

Pre-loaded products include:
1. Wireless Noise-Cancelling Headphones ($299.99)
2. Smart Watch Pro ($399.99)
3. Premium Leather Backpack ($149.99)
4. 4K Webcam Pro ($179.99)
5. Wireless Gaming Mouse ($89.99)
6. USB-C Hub 7-in-1 ($49.99)
7. Running Shoes Elite ($129.99)
8. Portable Bluetooth Speaker ($79.99)
9. Minimalist Wallet ($34.99)
10. Ergonomic Wireless Keyboard ($119.99)
11. Fitness Tracker Band ($59.99)
12. Canvas Tote Bag ($29.99)

## 🔐 Environment Variables

```env
OPENROUTER_API_KEY=sk-or-v1-[your-key-here]
```

## 🛠️ Development Commands

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

## 🎯 Usage Guide

### For Users
1. **Browse Products**: Visit the Products page to see all available items
2. **Chat with KAI**: Go to the Chat page and ask anything about products
3. **Create Orders**: Use the chat or product pages to create mock orders
4. **Track Orders**: View your order history on the Orders page

### For Admins
1. **Access Admin Panel**: Navigate to /admin
2. **Manage Products**: Add, edit, or delete products
3. **Manage Orders**: Update order statuses and track fulfillment

## 🌟 Future Enhancements

Potential additions:
- User authentication and profiles
- Real payment integration
- Product reviews and ratings
- Wishlist functionality
- Email notifications
- Advanced search with filters
- Product recommendations based on browsing history
- Multi-language support

## 📄 License

This project is for demonstration purposes.

## 🤝 Contributing

This is a demo project. Feel free to fork and modify as needed.

## 📞 Support

For questions or issues, please refer to the documentation or contact the development team.

---

**Built with ❤️ using Next.js, TypeScript, and AI**
