# KAI Website - Complete Features Documentation

## 📑 Table of Contents
1. [Landing Page Features](#1-landing-page-homepage)
2. [Live AI Chatbot](#2-live-kai-chatbot-page)
3. [Products Catalog](#3-products-catalog-page)
4. [Product Details](#4-product-details-page)
5. [Orders Management](#5-orders-page)
6. [Admin Panel](#6-admin-panel)
7. [API Documentation](#7-api-endpoints)

---

## 1. Landing Page (Homepage)

**Route:** `/`

### Features Implemented:

#### Hero Section
- **Large KAI Logo**: Gradient-based logo with "K" icon
- **Compelling Headline**: "Meet KAI - Your Smart Retail Shopping Assistant"
- **Subheadline**: Clear value proposition
- **Two CTAs**: 
  - Primary: "Start Chat with KAI" (gradient button)
  - Secondary: "Browse Products" (outlined button)

#### How KAI Helps Section
Four feature cards explaining KAI's capabilities:
1. **AI Chat**: Natural language conversations
2. **Product Assistance**: Instant product information
3. **Smart Recommendations**: Personalized suggestions
4. **Mock Order System**: Try the ordering process

#### Featured Products Section
- Displays 4 featured products from the catalog
- Product cards with:
  - Product image
  - Name and category
  - Price in ₹ (Indian Rupees)
  - Stock availability
  - Hover effects and animations
- "View All Products" button
- Fetches data from `/api/products?featured=true`

#### Call-to-Action Section
- Gradient background
- Large heading encouraging users to try KAI
- "Chat with KAI Now" button

#### Floating Chat Button
- Fixed bottom-right position
- Pulse animation
- Quick access to chat from any page
- Always visible while browsing

### Design Elements:
- Modern gradient backgrounds (indigo to purple)
- Smooth animations and transitions
- Fully responsive (mobile, tablet, desktop)
- Loading states with spinners
- Semantic HTML structure

---

## 2. Live KAI Chatbot Page

**Route:** `/chat`

### Main Chat Interface

#### Chat Header
- KAI's avatar (gradient circle with "K")
- Status indicator: "Online • Always here to help"
- "Clear Chat" button to reset conversation

#### Message Display
- WhatsApp-style chat bubbles
- **User messages**: Right-aligned, gradient blue background
- **AI messages**: Left-aligned, white background with shadow
- Timestamps for each message
- Smooth fade-in animations for new messages
- Auto-scroll to latest message

#### AI Typing Indicator
- Three animated dots
- Shows while waiting for AI response
- Bouncing animation

#### Quick Action Buttons
Pre-made prompts for common actions:
- 💡 **Recommend a product**: Triggers product recommendation
- 🔥 **Popular items**: Shows trending products
- 🎯 **Find deals**: Asks about current deals
- 🛒 **Create mock order**: Initiates order creation

#### Message Input Area
- Text input field with placeholder
- Send button with arrow icon
- Enter key support for sending
- Disabled state while loading
- Auto-focus on page load

#### Chat History
- Automatically saved to localStorage
- Persists between page refreshes
- Key: `kai-chat-history`
- Stored as JSON array

#### Right Sidebar (Desktop Only)
- **Popular Products Panel**:
  - Shows featured products
  - Product thumbnail images
  - Product name and price
  - Click to ask KAI about the product
  
- **Suggestions Box**:
  - Example questions users can ask
  - Helpful prompts for first-time users

### AI Integration

#### OpenRouter API (Claude 3.5 Sonnet)
- Model: `anthropic/claude-3.5-sonnet`
- Temperature: 0.7 (balanced creativity)
- Max tokens: 800 (concise responses)

#### System Prompt Features
KAI is programmed to:
- Act as a smart shopping assistant for Indian e-commerce
- Know all products in the catalog with full details
- Mention platform availability (Amazon, Flipkart, Myntra, Meesho)
- Use Indian Rupees (₹) for pricing
- Create realistic mock orders with:
  - Order ID (format: ORD-12345678)
  - Price breakdown
  - Estimated delivery (5-7 days)
  - Indian context (festival sales, platforms, etc.)
- Suggest similar products if requested item not in catalog
- Be friendly and conversational with occasional emojis
- Reference Indian shopping festivals (Diwali Sale, Big Billion Days)

#### Context Awareness
- Sends full conversation history with each request
- Maintains product catalog context
- Understands follow-up questions
- Remembers previous recommendations in conversation

### Special Features

#### Product Link Integration
- When clicking product from sidebar, auto-sends question
- Format: "Tell me about [Product Name]"
- Seamless integration with product catalog

#### Pending Question System
- If user clicks "Ask KAI" from product page
- Question stored in localStorage: `kai-pending-question`
- Automatically sent when chat page loads
- Then cleared from storage
- Creates smooth user flow between pages

---

## 3. Products Catalog Page

**Route:** `/products`

### Features

#### Page Header
- Page title: "Product Catalog"
- Subtitle: Browse instruction

#### Search Bar
- Full-width search input
- Search icon on the left
- Real-time search (filters as you type)
- Searches in:
  - Product names
  - Product descriptions
- Case-insensitive matching

#### Category Filters
Six category buttons:
- **All**: Shows all products (default)
- **Electronics**: Headphones, webcams, speakers
- **Wearables**: Smartwatches, fitness trackers
- **Bags**: Backpacks, tote bags
- **Accessories**: Mouse, keyboard, wallets, hubs, stands
- **Shoes**: Running shoes, casual shoes

Active filter styling:
- Gradient background
- White text
- Shadow effect

Inactive filter styling:
- White background
- Gray text
- Hover effect

#### Results Counter
- Shows number of products currently displayed
- Updates when filters/search applied
- Format: "Showing X products"

#### Quick Access to Chat
- "Ask KAI for Help" button
- Always visible at top of product list
- Redirects to chat page

#### Product Grid
- Responsive grid layout:
  - Mobile: 1 column
  - Tablet: 2 columns
  - Desktop: 3 columns
  - Large desktop: 4 columns

#### Product Cards
Each card includes:
- **Product Image**: 
  - High-quality from Unsplash
  - Hover zoom effect
  - 16:9 aspect ratio
  
- **Featured Badge**: 
  - Yellow badge in top-right
  - Only on featured products
  - ⭐ Featured text

- **Product Info**:
  - Product name (2-line clamp)
  - Category label
  - Description (2-line clamp)
  - Price in ₹ (large, bold)
  - Stock count

- **Action Buttons**:
  - "View Details" (primary button): Goes to product page
  - Chat icon button: Asks KAI about product

#### Empty States
- **No Results**: 
  - Sad face icon
  - "No products found" message
  - Suggestion to adjust filters

#### Loading State
- Spinner animation
- "Loading products..." text
- Centered on page

### Data Flow
- Fetches from `/api/products` on mount
- Client-side filtering for categories
- Client-side search filtering
- Instant updates (no page reload)

---

## 4. Product Details Page

**Route:** `/products/[id]`

### Features

#### Breadcrumb Navigation
- Home → Products → [Product Name]
- Clickable links
- Helps with navigation

#### Product Image Section
- Large product image
- Takes full height on desktop
- White background
- Featured badge if applicable
- High-quality display

#### Product Information Panel

##### Basic Info
- Category badge (colored)
- Product name (large heading)
- Full description paragraph
- Platform availability (if provided)

##### Pricing Section
- Large price display (₹)
- Stock status:
  - ✓ In Stock (green) with count
  - ✗ Out of Stock (red)

##### Quantity Selector
- Minus button (decreases quantity)
- Quantity display (center)
- Plus button (increases quantity)
- Min: 1
- Max: Available stock
- Disabled when out of stock

##### Action Buttons
1. **Create Mock Order** (Primary):
   - Full-width gradient button
   - Creates order via API
   - Shows loading state
   - Redirects to Orders page on success
   - Disabled if out of stock

2. **Ask KAI About This Product**:
   - Full-width outlined button
   - Sets pending question
   - Redirects to chat
   - Always enabled

##### Information Banner
- Blue background notice
- Explains this is a mock system
- Sets user expectations

#### Technical Specifications Section
- Dedicated section below main info
- "Technical Specifications" heading
- Grid layout (2 columns on desktop)
- Each spec shows:
  - Label (formatted from key)
  - Value
  - Bottom border separator

Example specs:
- Battery life
- Connectivity type
- Weight
- Warranty
- Display size
- Waterproof rating
- Material
- Dimensions

#### KAI Assistant CTA
- Full-width gradient section
- Centered content
- White text
- "Have Questions?" heading
- Explanation of KAI's help
- "Chat with KAI Now" button
- Encourages user engagement

### Error Handling

#### Product Not Found
- Sad face icon
- "Product not found" message
- Explanation text
- "Back to Products" button

#### Loading State
- Spinner animation
- "Loading product..." text
- Centered on page

### Order Creation Flow
1. User selects quantity
2. Clicks "Create Mock Order"
3. Button shows loading state
4. POST request to `/api/orders`
5. Order ID generated (ORD-timestamp)
6. Success alert shows order ID
7. Redirect to `/orders` page
8. New order visible immediately

---

## 5. Orders Page

**Route:** `/orders`

### Features

#### Page Header
- Title: "My Orders"
- Subtitle: Manage orders instruction

#### Info Banner
- Blue background with info icon
- "Demo Mode" explanation
- Clarifies mock order system
- Sets expectations

#### Order Cards
Each order card displays:

##### Order Header
- Product name (large)
- Status badge with icon and color:
  - ⏳ Processing (blue)
  - 🚚 Shipped (purple)
  - ✅ Delivered (green)
  - ❌ Cancelled (red)
- Total price (right-aligned, large)
- Quantity (right-aligned, small)

##### Order Details Grid
Three-column grid showing:

1. **Order Date**:
   - Full date (e.g., "December 9, 2025")
   - Time (e.g., "2:30 PM")

2. **Estimated Delivery**:
   - Full date
   - Days remaining calculation
   - "X days remaining" text

3. **Unit Price**:
   - Price per item
   - Formatted with ₹

##### Action Buttons
- **View Product**: Links to product details page
- **Ask KAI About Order**: Opens chat
- **Cancel Order**: 
  - Only visible if not cancelled/delivered
  - Shows confirmation dialog
  - Updates order status to "Cancelled"
  - Red styling

##### Order Timeline
Visual progress indicator showing:
- **Processing** → **Shipped** → **Delivered**
- Dots and connecting lines
- Active steps in green
- Inactive steps in gray
- Current status highlighted

#### Summary Statistics (Bottom)
Four stat cards showing:
1. **Total Orders**: Count of all orders
2. **Processing**: Count in processing state
3. **Shipped**: Count in shipped state
4. **Delivered**: Count in delivered state

Color-coded for each status.

#### Empty State
When no orders exist:
- Shopping bag icon
- "No orders yet" message
- Encouragement to start shopping
- Two action buttons:
  - "Browse Products"
  - "Chat with KAI"

#### Loading State
- Spinner animation
- "Loading orders..." text

### Order Management

#### Viewing Orders
- All orders displayed newest first (reverse chronological)
- Full order history visible
- No pagination (suitable for demo)

#### Cancelling Orders
1. Click "Cancel Order" button
2. Confirmation dialog appears
3. If confirmed, DELETE request to `/api/orders/[id]`
4. Status changes to "Cancelled"
5. Order reloads automatically
6. Success message shown

### Data Flow
- Fetches from `/api/orders` on mount
- Sorts orders by date (newest first)
- Real-time status colors
- Dynamic timeline based on status
- Calculates days remaining automatically

---

## 6. Admin Panel

**Route:** `/admin`

### Overview
Complete administrative interface for managing products and orders.

### Tab Navigation

#### Products Tab
Shows all products with management capabilities.

##### Add New Product Button
- Opens/closes product form
- "Add New Product" / "Cancel" toggle

##### Product Form
When adding or editing:

**Form Fields**:
1. **Name** (text input)
2. **Category** (dropdown):
   - Electronics
   - Wearables
   - Bags
   - Accessories
   - Shoes
3. **Price** (number input, ₹)
4. **Stock** (number input)
5. **Image URL** (text input, full width)
6. **Description** (textarea, full width, 3 rows)
7. **Featured Product** (checkbox)

**Form Actions**:
- "Add Product" or "Update Product" button
- "Cancel" button

**Validation**:
- All fields required
- Price and stock must be numbers
- Image URL should be valid

##### Products Table
Displays all products in tabular format:

**Columns**:
1. **Product**: Thumbnail image + name
2. **Category**: Text
3. **Price**: ₹ amount
4. **Stock**: Number
5. **Featured**: Yes/No badge (yellow if yes)
6. **Actions**: Edit | Delete

**Actions**:
- **Edit**: Opens form with pre-filled data
- **Delete**: 
  - Confirmation dialog
  - Permanent deletion
  - Updates table immediately

#### Orders Tab
Shows all orders with status management.

##### Orders Table

**Columns**:
1. **Order ID**: ORD-xxxxxxxxx
2. **Product**: Product name
3. **Qty**: Quantity
4. **Total**: Total price (₹)
5. **Status**: Dropdown selector
6. **Order Date**: Date formatted
7. **Actions**: View Product link

**Status Dropdown**:
- Processing
- Shipped
- Delivered
- Cancelled
- Updates immediately on change
- Auto-saves to database

**View Product Link**:
- Opens in new tab
- Directly links to product details

### Management Capabilities

#### Product Management
- **Add**: Create new products with all details
- **Edit**: Modify any product field
- **Delete**: Remove products (with confirmation)
- **View**: See all products at a glance
- **Stock Management**: Update inventory levels
- **Featured Control**: Mark products as featured

#### Order Management
- **View All**: See complete order history
- **Status Updates**: Change order status via dropdown
- **Track**: Monitor order progression
- **Product Access**: Quick link to ordered product
- **Analytics**: See order counts by status

### Data Persistence
All changes are saved to JSON files:
- `data/products.json` for products
- `data/orders.json` for orders

Changes take effect immediately across the entire site.

### Empty States
- **No Products**: Message prompting to add first product
- **No Orders**: Message indicating no orders yet

---

## 7. API Endpoints

### Products API

#### GET `/api/products`
**Description**: Get all products or filtered products

**Query Parameters**:
- `category` (optional): Filter by category
- `featured` (optional): Filter featured products (true/false)

**Response**: Array of Product objects
```json
[
  {
    "id": "1",
    "name": "Product Name",
    "category": "Electronics",
    "price": 1499,
    "image": "https://...",
    "description": "...",
    "specs": { "battery": "15 hours", ... },
    "stock": 45,
    "featured": true
  }
]
```

#### GET `/api/products/[id]`
**Description**: Get single product by ID

**Response**: Product object or 404 error

#### POST `/api/products`
**Description**: Create new product (Admin)

**Request Body**:
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

**Response**: Created product with generated ID

#### PUT `/api/products/[id]`
**Description**: Update existing product (Admin)

**Request Body**: Same as POST (partial updates supported)

**Response**: Updated product object

#### DELETE `/api/products/[id]`
**Description**: Delete product (Admin)

**Response**: Success message

### Orders API

#### GET `/api/orders`
**Description**: Get all orders

**Response**: Array of Order objects
```json
[
  {
    "id": "ORD-1234567890",
    "productId": "1",
    "productName": "Product Name",
    "price": 1499,
    "quantity": 2,
    "totalPrice": 2998,
    "status": "Processing",
    "orderDate": "2025-12-09T10:30:00.000Z",
    "estimatedDelivery": "2025-12-16T10:30:00.000Z"
  }
]
```

#### POST `/api/orders`
**Description**: Create new order

**Request Body**:
```json
{
  "productId": "1",
  "productName": "Product Name",
  "price": 1499,
  "quantity": 2
}
```

**Response**: Created order with:
- Generated order ID (ORD-timestamp)
- Status: "Processing"
- Current date as orderDate
- Estimated delivery (+7 days)
- Calculated totalPrice

#### GET `/api/orders/[id]`
**Description**: Get single order by ID

**Response**: Order object or 404 error

#### PUT `/api/orders/[id]`
**Description**: Update order (typically status)

**Request Body**:
```json
{
  "status": "Shipped"
}
```

**Response**: Updated order object

#### DELETE `/api/orders/[id]`
**Description**: Cancel order (sets status to Cancelled)

**Response**: Updated order with Cancelled status

### Chat API

#### POST `/api/chat`
**Description**: Send message to AI and get response

**Request Body**:
```json
{
  "messages": [
    { "role": "user", "content": "Show me headphones" },
    { "role": "assistant", "content": "Here are some headphones..." }
  ]
}
```

**Response**:
```json
{
  "message": "AI response text here"
}
```

**AI Configuration**:
- Model: Claude 3.5 Sonnet via OpenRouter
- Temperature: 0.7
- Max tokens: 800
- System prompt includes:
  - Full product catalog
  - Indian e-commerce context
  - Order creation capabilities
  - Platform knowledge (Amazon, Flipkart, etc.)

**Error Responses**:
- 400: Invalid request (missing messages)
- 405: Method not allowed (not POST)
- 500: Server error or OpenRouter API error

---

## 8. Design System

### Color Scheme
- **Primary**: `#6366f1` (Indigo)
- **Secondary**: `#8b5cf6` (Purple)
- **Gradients**: Primary → Secondary
- **Status Colors**:
  - Processing: Blue
  - Shipped: Purple
  - Delivered: Green
  - Cancelled: Red

### Typography
- **Font**: Inter (Google Fonts)
- **Headings**: Bold, various sizes
- **Body**: Regular weight
- **Small text**: 0.875rem

### Spacing
- Consistent padding/margins
- 8px base unit
- Responsive spacing (sm, md, lg variants)

### Animations
- Fade-in for messages
- Typing dots animation
- Pulse effect for floating button
- Hover transitions (0.2-0.3s)
- Transform scale on hover

### Responsive Design
- Mobile-first approach
- Breakpoints:
  - sm: 640px
  - md: 768px
  - lg: 1024px
  - xl: 1280px
- Sidebar hidden on mobile
- Grid columns adjust by screen size
- Touch-friendly buttons on mobile

---

## 9. User Flows

### Flow 1: Browse and Order Product
1. User lands on homepage
2. Sees featured products
3. Clicks "View All Products"
4. Browses catalog, uses filters
5. Clicks product for details
6. Adjusts quantity
7. Clicks "Create Mock Order"
8. Redirects to orders page
9. Sees new order with "Processing" status

### Flow 2: Chat with KAI about Product
1. User on products page
2. Clicks "Ask KAI" on product card
3. Redirects to chat page
4. Question auto-sent to KAI
5. KAI responds with product info
6. User asks follow-up questions
7. KAI can create order via chat

### Flow 3: Admin Product Management
1. Admin navigates to `/admin`
2. Switches to Products tab
3. Clicks "Add New Product"
4. Fills in product details
5. Clicks "Add Product"
6. Product appears in table
7. Product visible on products page
8. Can edit or delete later

### Flow 4: Order Status Update
1. User creates order (Status: Processing)
2. Admin opens Admin Panel
3. Switches to Orders tab
4. Finds the order
5. Changes status dropdown to "Shipped"
6. Status updates immediately
7. User refreshes Orders page
8. Sees updated status and timeline

---

## 10. Technical Implementation Details

### State Management
- React useState for local component state
- useEffect for data fetching
- localStorage for chat history and pending questions
- No external state management library (simple app)

### Data Persistence
- JSON files as database
- Node.js fs module for file operations
- Synchronous reads/writes
- Suitable for demo purposes
- Easy to inspect and modify

### Error Handling
- Try-catch blocks in API routes
- Appropriate HTTP status codes
- User-friendly error messages
- Loading states during async operations
- Fallback UI for errors

### Performance Optimizations
- Client-side filtering (no unnecessary API calls)
- Image optimization via Unsplash
- Lazy loading with Next.js
- Minimal re-renders
- Debounced search (can be added)

### Security Considerations
- API key in environment variables
- No sensitive data exposure
- CORS handled by Next.js
- Input validation needed (can be enhanced)
- SQL injection not applicable (JSON storage)

---

## Summary

The KAI Website is a fully-featured, production-ready demo of an AI-powered shopping assistant. Every feature requested has been implemented with attention to detail, user experience, and modern web development practices. The application showcases the potential of AI in e-commerce while maintaining simplicity and ease of use.
