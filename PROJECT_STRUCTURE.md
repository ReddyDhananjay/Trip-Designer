# KAI Website - Complete Project Structure

## 📁 Directory Tree

```
/workspace
│
├── 📄 Configuration Files
│   ├── package.json                    # Dependencies and scripts
│   ├── package-lock.json               # Locked dependency versions
│   ├── tsconfig.json                   # TypeScript configuration
│   ├── tailwind.config.js              # Tailwind CSS configuration
│   ├── postcss.config.js               # PostCSS configuration
│   ├── next.config.js                  # Next.js configuration
│   ├── .gitignore                      # Git ignore rules
│   ├── .env.example                    # Environment variables template
│   └── .env.local                      # Your API key (create this!)
│
├── 📚 Documentation
│   ├── README.md                       # Main project documentation
│   ├── SETUP.md                        # Complete setup guide
│   ├── FEATURES.md                     # Detailed feature documentation
│   ├── IMPLEMENTATION_COMPLETE.md      # Implementation status
│   ├── PROJECT_STRUCTURE.md            # This file
│   ├── QUICK_REFERENCE.md              # Quick reference guide
│   ├── QUICKSTART.md                   # Quick start guide
│   ├── RUN_LOCALLY.md                  # Local development guide
│   ├── DEPLOYMENT_GUIDE.md             # Deployment instructions
│   ├── TEST_CHATBOT.md                 # Chatbot testing guide
│   ├── START_HERE.txt                  # Getting started file
│   └── START.sh                        # Startup script
│
├── 📱 Frontend - App Directory (Next.js 14 App Router)
│   ├── app/
│   │   ├── layout.tsx                  # Root layout with Navigation
│   │   ├── page.tsx                    # Homepage (Landing Page)
│   │   ├── globals.css                 # Global styles + animations
│   │   │
│   │   ├── chat/
│   │   │   └── page.tsx                # Live AI Chatbot Page
│   │   │
│   │   ├── products/
│   │   │   ├── page.tsx                # Products Catalog Page
│   │   │   └── [id]/
│   │   │       └── page.tsx            # Product Details Page
│   │   │
│   │   ├── orders/
│   │   │   └── page.tsx                # Orders Management Page
│   │   │
│   │   └── admin/
│   │       └── page.tsx                # Admin Panel Page
│   │
│   └── components/
│       └── Navigation.tsx              # Main navigation component
│
├── 🔧 Backend - API Routes (Next.js API)
│   └── pages/api/
│       ├── chat.ts                     # POST /api/chat - AI chatbot
│       │
│       ├── products/
│       │   ├── index.ts                # GET/POST /api/products
│       │   └── [id].ts                 # GET/PUT/DELETE /api/products/:id
│       │
│       └── orders/
│           ├── index.ts                # GET/POST /api/orders
│           └── [id].ts                 # GET/PUT/DELETE /api/orders/:id
│
├── 📊 Data Storage (JSON Database)
│   └── data/
│       ├── products.json               # Product catalog (15 products)
│       └── orders.json                 # Orders database (empty initially)
│
├── 🎨 Types (TypeScript)
│   └── types/
│       └── index.ts                    # Shared type definitions
│
└── 📦 Dependencies
    └── node_modules/                   # Installed packages (created after npm install)
```

---

## 📄 File Descriptions

### Root Configuration Files

#### `package.json`
- Project metadata
- Dependencies (Next.js, React, TypeScript, Tailwind, Axios)
- Scripts (dev, build, start, lint)

#### `tsconfig.json`
- TypeScript compiler options
- Path aliases (@/ → root)
- Module resolution settings

#### `tailwind.config.js`
- Custom colors (primary, secondary)
- Content paths for Tailwind scanning
- Theme extensions

#### `next.config.js`
- Next.js configuration
- Image domains
- Webpack settings

#### `.env.example`
- Template for environment variables
- Shows required OPENROUTER_API_KEY

---

### Frontend Files (App Directory)

#### `app/layout.tsx` (Root Layout)
**Purpose:** Wraps all pages with common structure

**Exports:**
- Metadata (title, description)
- RootLayout component

**Features:**
- Includes Navigation component
- Sets up Inter font
- Wraps children in semantic HTML

---

#### `app/page.tsx` (Homepage)
**Route:** `/`

**Purpose:** Landing page introducing KAI

**Key Features:**
- Hero section with KAI branding
- "Start Chat" and "Browse Products" CTAs
- "How KAI Helps" feature cards (4 cards)
- Featured products grid (4 products)
- Final CTA section
- Floating chat button

**State:**
- `featuredProducts` - Array of featured products
- `loading` - Loading state

**API Calls:**
- `GET /api/products?featured=true`

**Styling:**
- Gradient backgrounds
- Animations (fade-in, pulse)
- Responsive grid layouts
- Hover effects

---

#### `app/chat/page.tsx` (Chatbot)
**Route:** `/chat`

**Purpose:** Live AI chat interface

**Key Features:**
- Chat message display (bubbles)
- User input with send button
- Quick action buttons (4 buttons)
- Right sidebar with products
- Typing indicator
- Chat history (localStorage)

**State:**
- `messages` - Array of ChatMessage objects
- `input` - Current input text
- `loading` - AI response loading
- `products` - Featured products for sidebar

**API Calls:**
- `POST /api/chat` - Send message to AI
- `GET /api/products?featured=true` - Load sidebar products

**localStorage Keys:**
- `kai-chat-history` - Saved messages
- `kai-pending-question` - Question from product page

**Refs:**
- `messagesEndRef` - Auto-scroll reference

**Styling:**
- WhatsApp-style bubbles
- Gradient user messages
- Shadow on AI messages
- Smooth scroll
- Fade-in animations

---

#### `app/products/page.tsx` (Product Catalog)
**Route:** `/products`

**Purpose:** Browse and search products

**Key Features:**
- Search bar (real-time)
- Category filters (6 categories)
- Product cards grid
- "Ask KAI" on each card
- Featured badges
- Results counter

**State:**
- `products` - All products
- `filteredProducts` - Filtered/searched products
- `selectedCategory` - Active category filter
- `loading` - Loading state
- `searchQuery` - Search input

**API Calls:**
- `GET /api/products` - Load all products

**Functions:**
- `handleAskKAI(productName)` - Sends to chat with question

**Filtering:**
- Client-side category filtering
- Client-side search filtering
- Case-insensitive search

**Styling:**
- Responsive grid (1-4 columns)
- Hover zoom on images
- Active filter styling
- Empty state graphics

---

#### `app/products/[id]/page.tsx` (Product Details)
**Route:** `/products/[id]`

**Purpose:** Show full product details

**Key Features:**
- Large product image
- Full description
- Technical specifications grid
- Quantity selector
- "Create Mock Order" button
- "Ask KAI" integration
- Breadcrumb navigation

**State:**
- `product` - Product object or null
- `loading` - Loading state
- `quantity` - Selected quantity (default: 1)
- `orderLoading` - Order creation loading

**Params:**
- `id` - Product ID from URL

**API Calls:**
- `GET /api/products/:id` - Load product
- `POST /api/orders` - Create order

**Functions:**
- `handleAskKAI()` - Navigate to chat with question
- `handleMockOrder()` - Create order and redirect

**Navigation:**
- `useRouter()` - Next.js router for redirects

**Styling:**
- 2-column layout (image | info)
- Gradient buttons
- Specs grid
- Status badges

---

#### `app/orders/page.tsx` (Orders)
**Route:** `/orders`

**Purpose:** View and manage orders

**Key Features:**
- Order cards with full details
- Status badges (colored)
- Order timeline visualization
- Cancel order functionality
- Summary statistics (4 cards)
- Empty state

**State:**
- `orders` - Array of Order objects
- `loading` - Loading state

**API Calls:**
- `GET /api/orders` - Load all orders
- `DELETE /api/orders/:id` - Cancel order

**Functions:**
- `loadOrders()` - Fetch and display orders
- `handleCancelOrder(orderId)` - Cancel with confirmation
- `formatDate(dateString)` - Format display date
- `formatTime(dateString)` - Format display time

**Data Manipulation:**
- Reverses order array (newest first)
- Calculates days remaining
- Filters by status for stats

**Styling:**
- Color-coded status badges
- Timeline progress indicator
- Grid layouts
- Shadow cards

---

#### `app/admin/page.tsx` (Admin Panel)
**Route:** `/admin`

**Purpose:** Manage products and orders

**Key Features:**
- Tab navigation (Products | Orders)
- Product CRUD operations
- Order status management
- Product form (add/edit)
- Data tables

**State:**
- `activeTab` - 'products' or 'orders'
- `products` - Array of products
- `orders` - Array of orders
- `loading` - Loading state
- `showAddProduct` - Form visibility toggle
- `editingProduct` - Product being edited or null
- `formData` - Form input state

**API Calls:**
- `GET /api/products` - Load products
- `GET /api/orders` - Load orders
- `POST /api/products` - Create product
- `PUT /api/products/:id` - Update product
- `DELETE /api/products/:id` - Delete product
- `PUT /api/orders/:id` - Update order status

**Functions:**
- `loadData()` - Fetch all data
- `handleAddProduct()` - Create new product
- `handleUpdateProduct()` - Update existing product
- `handleDeleteProduct(id)` - Delete with confirmation
- `handleUpdateOrderStatus(orderId, status)` - Update status
- `startEdit(product)` - Open edit form
- `resetForm()` - Clear form state

**Form Handling:**
- Controlled inputs
- State management for form fields
- Validation (basic)

**Styling:**
- Table layouts
- Tab interface
- Form grids
- Action buttons

---

### Component Files

#### `components/Navigation.tsx`
**Purpose:** Main site navigation bar

**Key Features:**
- Logo with gradient
- Navigation links (5 links)
- Active page highlighting
- Responsive layout
- Sticky positioning

**Links:**
- Home (/)
- Chat with KAI (/chat)
- Products (/products)
- Orders (/orders)
- Admin (/admin)

**Hooks:**
- `usePathname()` - Get current route for active styling

**Functions:**
- `isActive(path)` - Check if path matches current route

**Styling:**
- Sticky header
- Shadow on scroll
- Active link highlighting
- Responsive spacing

---

### API Files (Backend)

#### `pages/api/chat.ts`
**Method:** POST

**Purpose:** AI chat endpoint using OpenRouter

**Request Body:**
```json
{
  "messages": [
    { "role": "user", "content": "..." },
    { "role": "assistant", "content": "..." }
  ]
}
```

**Response:**
```json
{
  "message": "AI response here"
}
```

**Processing:**
1. Validates messages array
2. Loads products from `data/products.json`
3. Creates product summary for AI context
4. Builds system prompt with:
   - KAI personality
   - Product catalog knowledge
   - Indian e-commerce context
   - Order creation capabilities
5. Sends to OpenRouter API (Claude 3.5 Sonnet)
6. Returns AI response

**Environment Variables:**
- `OPENROUTER_API_KEY` - Required

**Error Handling:**
- 400 - Invalid request
- 405 - Method not allowed
- 500 - Server error
- Returns error details

---

#### `pages/api/products/index.ts`
**Methods:** GET, POST

**GET /api/products**
- Returns all products or filtered products

**Query Parameters:**
- `category` - Filter by category
- `featured` - Filter featured (true/false)

**POST /api/products**
- Creates new product
- Generates ID from timestamp
- Saves to `data/products.json`

**Request Body (POST):**
```json
{
  "name": "Product Name",
  "category": "Electronics",
  "price": 1499,
  "image": "https://...",
  "description": "...",
  "specs": {},
  "stock": 50,
  "featured": false
}
```

**Error Handling:**
- 405 - Method not allowed
- 500 - File system errors

---

#### `pages/api/products/[id].ts`
**Methods:** GET, PUT, DELETE

**GET /api/products/:id**
- Returns single product by ID
- 404 if not found

**PUT /api/products/:id**
- Updates product fields
- Preserves ID
- Saves to file

**DELETE /api/products/:id**
- Removes product from array
- Saves updated array
- 404 if not found

**Error Handling:**
- 404 - Product not found
- 405 - Method not allowed
- 500 - File system errors

---

#### `pages/api/orders/index.ts`
**Methods:** GET, POST

**GET /api/orders**
- Returns all orders

**POST /api/orders**
- Creates new order
- Generates order ID (ORD-timestamp)
- Sets status to "Processing"
- Calculates total price
- Sets estimated delivery (+7 days)
- Saves to `data/orders.json`

**Request Body (POST):**
```json
{
  "productId": "1",
  "productName": "Product Name",
  "price": 1499,
  "quantity": 2
}
```

**Generated Fields:**
- `id` - ORD-timestamp
- `totalPrice` - price × quantity
- `status` - "Processing"
- `orderDate` - Current timestamp
- `estimatedDelivery` - +7 days from now

**Error Handling:**
- 405 - Method not allowed
- 500 - File system errors

---

#### `pages/api/orders/[id].ts`
**Methods:** GET, PUT, DELETE

**GET /api/orders/:id**
- Returns single order by ID
- 404 if not found

**PUT /api/orders/:id**
- Updates order fields (typically status)
- Used by admin to change status

**DELETE /api/orders/:id**
- Sets status to "Cancelled"
- Doesn't actually delete (for history)

**Error Handling:**
- 404 - Order not found
- 405 - Method not allowed
- 500 - File system errors

---

### Type Definitions

#### `types/index.ts`

**Product Interface:**
```typescript
interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  image: string;
  description: string;
  specs: Record<string, string>;
  stock: number;
  featured: boolean;
}
```

**Order Interface:**
```typescript
interface Order {
  id: string;
  productId: string;
  productName: string;
  price: number;
  quantity: number;
  totalPrice: number;
  status: 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';
  orderDate: string;
  estimatedDelivery: string;
}
```

**ChatMessage Interface:**
```typescript
interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp?: number;
}
```

---

### Data Files

#### `data/products.json`
**Format:** JSON array of Product objects

**Content:**
- 15 pre-loaded products
- Categories: Electronics, Wearables, Bags, Accessories, Shoes
- Indian pricing (₹)
- Platform availability (Amazon, Flipkart, Myntra, Meesho)
- High-quality Unsplash images
- Full specifications for each

**Sample Product:**
```json
{
  "id": "1",
  "name": "boAt Rockerz 450 Bluetooth Wireless Headphones",
  "category": "Electronics",
  "price": 1499,
  "image": "https://images.unsplash.com/...",
  "description": "Premium wireless headphones...",
  "specs": {
    "battery": "15 hours",
    "connectivity": "Bluetooth 4.2",
    "weight": "220g",
    "warranty": "1 year"
  },
  "stock": 45,
  "featured": true,
  "platform": "Amazon, Flipkart"
}
```

---

#### `data/orders.json`
**Format:** JSON array of Order objects

**Initial State:** Empty array `[]`

**After Orders Created:**
```json
[
  {
    "id": "ORD-1702345678901",
    "productId": "1",
    "productName": "boAt Rockerz 450 Bluetooth Wireless Headphones",
    "price": 1499,
    "quantity": 2,
    "totalPrice": 2998,
    "status": "Processing",
    "orderDate": "2025-12-09T10:30:00.000Z",
    "estimatedDelivery": "2025-12-16T10:30:00.000Z"
  }
]
```

---

### Style Files

#### `app/globals.css`
**Purpose:** Global styles and custom animations

**Contents:**
1. **Tailwind Directives:**
   - @tailwind base
   - @tailwind components
   - @tailwind utilities

2. **CSS Variables:**
   - Foreground/background colors

3. **Custom Scrollbar:**
   - Styled scrollbar (8px width)
   - Custom track and thumb colors

4. **Animations:**
   - `@keyframes fadeIn` - Message fade-in
   - `@keyframes typing` - Typing indicator dots
   - `@keyframes pulse-ring` - Floating button pulse

5. **Animation Classes:**
   - `.message-fade-in` - 0.3s fade-in
   - `.typing-dot` - Bouncing dots with delays
   - `.chatbot-float-btn` - 2s infinite pulse

---

## 🔄 Data Flow Diagrams

### User Creates Order Flow
```
1. User (Browser)
   ↓
2. Product Details Page
   ↓ (click "Create Mock Order")
3. POST /api/orders
   ↓
4. orders/index.ts (API)
   ↓ (generate order ID, calculate total)
5. data/orders.json (Save)
   ↓
6. Return order object
   ↓
7. Show success alert
   ↓
8. Redirect to /orders
   ↓
9. Orders Page (Display)
```

### Chat with KAI Flow
```
1. User (Browser)
   ↓ (type message)
2. Chat Page
   ↓ (POST with message history)
3. /api/chat
   ↓ (load products)
4. data/products.json
   ↓ (build context)
5. OpenRouter API (Claude)
   ↓ (AI response)
6. Return to Chat Page
   ↓ (display message)
7. Save to localStorage
```

### Admin Updates Product Flow
```
1. Admin (Browser)
   ↓ (click edit)
2. Admin Panel
   ↓ (modify form)
3. PUT /api/products/:id
   ↓
4. products/[id].ts (API)
   ↓ (update product)
5. data/products.json (Save)
   ↓
6. Return updated product
   ↓
7. Refresh table
   ↓
8. Changes visible on Products Page
```

---

## 📊 Component Hierarchy

```
RootLayout (app/layout.tsx)
├── Navigation (components/Navigation.tsx)
└── Page Content
    ├── HomePage (app/page.tsx)
    │   ├── Hero Section
    │   ├── Features Grid
    │   ├── Featured Products
    │   └── CTA Section
    │
    ├── ChatPage (app/chat/page.tsx)
    │   ├── Chat Header
    │   ├── Messages Area
    │   ├── Quick Actions
    │   ├── Input Area
    │   └── Sidebar (Products)
    │
    ├── ProductsPage (app/products/page.tsx)
    │   ├── Search Bar
    │   ├── Category Filters
    │   └── Product Cards Grid
    │
    ├── ProductDetailPage (app/products/[id]/page.tsx)
    │   ├── Breadcrumb
    │   ├── Product Image
    │   ├── Product Info
    │   ├── Specs Grid
    │   └── CTA Section
    │
    ├── OrdersPage (app/orders/page.tsx)
    │   ├── Info Banner
    │   ├── Order Cards
    │   └── Stats Grid
    │
    └── AdminPage (app/admin/page.tsx)
        ├── Tab Navigation
        ├── Products Tab
        │   ├── Add Form
        │   └── Products Table
        └── Orders Tab
            └── Orders Table
```

---

## 🎯 File Purposes Summary

| File | Purpose | Key Features |
|------|---------|--------------|
| `app/page.tsx` | Landing page | Hero, features, CTAs |
| `app/chat/page.tsx` | AI chatbot | Live chat, quick actions |
| `app/products/page.tsx` | Product catalog | Search, filters, grid |
| `app/products/[id]/page.tsx` | Product details | Full info, order button |
| `app/orders/page.tsx` | Order history | Track orders, cancel |
| `app/admin/page.tsx` | Admin panel | CRUD operations |
| `components/Navigation.tsx` | Nav bar | Links, active state |
| `pages/api/chat.ts` | AI endpoint | OpenRouter integration |
| `pages/api/products/*.ts` | Product APIs | CRUD operations |
| `pages/api/orders/*.ts` | Order APIs | CRUD operations |
| `types/index.ts` | TypeScript types | Interfaces |
| `data/products.json` | Product DB | 15 products |
| `data/orders.json` | Orders DB | Empty initially |

---

## 🚀 Quick Navigation

**Want to modify the homepage?**
→ Edit `app/page.tsx`

**Want to change chat behavior?**
→ Edit `app/chat/page.tsx` and `pages/api/chat.ts`

**Want to add new products?**
→ Use Admin Panel at `/admin` or edit `data/products.json`

**Want to change colors?**
→ Edit `tailwind.config.js` (primary/secondary)

**Want to modify navigation?**
→ Edit `components/Navigation.tsx`

**Want to change AI system prompt?**
→ Edit `pages/api/chat.ts` (systemPrompt variable)

**Want to add animations?**
→ Edit `app/globals.css`

---

## 📝 Notes

### File Naming Conventions
- **Page files:** `page.tsx` (Next.js 14 convention)
- **Layout files:** `layout.tsx`
- **Component files:** `PascalCase.tsx`
- **API files:** `kebab-case.ts`
- **Config files:** `lowercase.js`

### Import Aliases
- `@/` → Root directory
- Example: `import { Product } from '@/types'`

### Environment Files
- `.env.local` → Your secrets (not committed)
- `.env.example` → Template (committed)

---

**This structure is complete and ready for development!** 🎉
