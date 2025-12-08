# 🔌 KAI Website - API Documentation

## Overview

The KAI Website uses Next.js API Routes for backend functionality. All routes are located in `/pages/api/`.

**Base URL (Development):** `http://localhost:3000/api`

---

## 📦 Products API

### 1. Get All Products

**Endpoint:** `GET /api/products`

**Description:** Retrieve list of all products with optional filtering.

**Query Parameters:**
- `category` (optional) - Filter by category (e.g., "Electronics", "Wearables")
- `featured` (optional) - Filter featured products (set to "true")

**Example Requests:**
```bash
# Get all products
curl http://localhost:3000/api/products

# Get electronics only
curl http://localhost:3000/api/products?category=Electronics

# Get featured products
curl http://localhost:3000/api/products?featured=true
```

**Response:**
```json
[
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
]
```

**Status Codes:**
- `200` - Success
- `500` - Server error

---

### 2. Get Single Product

**Endpoint:** `GET /api/products/:id`

**Description:** Get detailed information about a specific product.

**Parameters:**
- `id` (required) - Product ID

**Example Request:**
```bash
curl http://localhost:3000/api/products/1
```

**Response:**
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

**Status Codes:**
- `200` - Success
- `404` - Product not found
- `500` - Server error

---

### 3. Create Product (Admin)

**Endpoint:** `POST /api/products`

**Description:** Add a new product to the catalog.

**Request Body:**
```json
{
  "name": "New Product Name",
  "category": "Electronics",
  "price": 999,
  "image": "https://example.com/image.jpg",
  "description": "Product description here",
  "stock": 50,
  "featured": false,
  "specs": {
    "spec1": "value1",
    "spec2": "value2"
  }
}
```

**Example Request:**
```bash
curl -X POST http://localhost:3000/api/products \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test Product",
    "category": "Electronics",
    "price": 999,
    "image": "https://via.placeholder.com/500",
    "description": "Test description",
    "stock": 10,
    "featured": false,
    "specs": {}
  }'
```

**Response:**
```json
{
  "id": "1702123456789",
  "name": "Test Product",
  ...
}
```

**Status Codes:**
- `201` - Created successfully
- `500` - Server error

---

### 4. Update Product (Admin)

**Endpoint:** `PUT /api/products/:id`

**Description:** Update an existing product.

**Parameters:**
- `id` (required) - Product ID

**Request Body:** Same as Create Product (fields are merged with existing data)

**Example Request:**
```bash
curl -X PUT http://localhost:3000/api/products/1 \
  -H "Content-Type: application/json" \
  -d '{"price": 1299, "stock": 50}'
```

**Status Codes:**
- `200` - Updated successfully
- `404` - Product not found
- `500` - Server error

---

### 5. Delete Product (Admin)

**Endpoint:** `DELETE /api/products/:id`

**Description:** Remove a product from the catalog.

**Parameters:**
- `id` (required) - Product ID

**Example Request:**
```bash
curl -X DELETE http://localhost:3000/api/products/1
```

**Response:**
```json
{
  "message": "Product deleted"
}
```

**Status Codes:**
- `200` - Deleted successfully
- `404` - Product not found
- `500` - Server error

---

## 📋 Orders API

### 1. Get All Orders

**Endpoint:** `GET /api/orders`

**Description:** Retrieve list of all orders.

**Example Request:**
```bash
curl http://localhost:3000/api/orders
```

**Response:**
```json
[
  {
    "id": "ORD-1702123456789",
    "productId": "1",
    "productName": "boAt Rockerz 450 Bluetooth Wireless Headphones",
    "price": 1499,
    "quantity": 2,
    "totalPrice": 2998,
    "status": "Processing",
    "orderDate": "2024-12-08T10:30:00.000Z",
    "estimatedDelivery": "2024-12-15T10:30:00.000Z"
  }
]
```

**Status Codes:**
- `200` - Success
- `500` - Server error

---

### 2. Get Single Order

**Endpoint:** `GET /api/orders/:id`

**Description:** Get details of a specific order.

**Parameters:**
- `id` (required) - Order ID (e.g., "ORD-1702123456789")

**Example Request:**
```bash
curl http://localhost:3000/api/orders/ORD-1702123456789
```

**Response:**
```json
{
  "id": "ORD-1702123456789",
  "productId": "1",
  "productName": "boAt Rockerz 450 Bluetooth Wireless Headphones",
  "price": 1499,
  "quantity": 2,
  "totalPrice": 2998,
  "status": "Processing",
  "orderDate": "2024-12-08T10:30:00.000Z",
  "estimatedDelivery": "2024-12-15T10:30:00.000Z"
}
```

**Status Codes:**
- `200` - Success
- `404` - Order not found
- `500` - Server error

---

### 3. Create Order

**Endpoint:** `POST /api/orders`

**Description:** Create a new mock order.

**Request Body:**
```json
{
  "productId": "1",
  "productName": "Product Name",
  "price": 1499,
  "quantity": 2
}
```

**Example Request:**
```bash
curl -X POST http://localhost:3000/api/orders \
  -H "Content-Type: application/json" \
  -d '{
    "productId": "1",
    "productName": "boAt Rockerz 450",
    "price": 1499,
    "quantity": 2
  }'
```

**Response:**
```json
{
  "id": "ORD-1702123456789",
  "productId": "1",
  "productName": "boAt Rockerz 450",
  "price": 1499,
  "quantity": 2,
  "totalPrice": 2998,
  "status": "Processing",
  "orderDate": "2024-12-08T10:30:00.000Z",
  "estimatedDelivery": "2024-12-15T10:30:00.000Z"
}
```

**Notes:**
- Order ID is auto-generated: `ORD-{timestamp}`
- `totalPrice` is calculated: `price * quantity`
- `status` defaults to "Processing"
- `orderDate` is set to current date
- `estimatedDelivery` is set to 7 days from order date

**Status Codes:**
- `201` - Created successfully
- `500` - Server error

---

### 4. Update Order (Admin)

**Endpoint:** `PUT /api/orders/:id`

**Description:** Update order details (typically status changes).

**Parameters:**
- `id` (required) - Order ID

**Request Body:**
```json
{
  "status": "Shipped"
}
```

**Example Request:**
```bash
curl -X PUT http://localhost:3000/api/orders/ORD-1702123456789 \
  -H "Content-Type: application/json" \
  -d '{"status": "Shipped"}'
```

**Valid Status Values:**
- `Processing`
- `Shipped`
- `Delivered`
- `Cancelled`

**Status Codes:**
- `200` - Updated successfully
- `404` - Order not found
- `500` - Server error

---

### 5. Cancel Order

**Endpoint:** `DELETE /api/orders/:id`

**Description:** Cancel an order (sets status to "Cancelled").

**Parameters:**
- `id` (required) - Order ID

**Example Request:**
```bash
curl -X DELETE http://localhost:3000/api/orders/ORD-1702123456789
```

**Response:**
```json
{
  "id": "ORD-1702123456789",
  "status": "Cancelled",
  ...
}
```

**Status Codes:**
- `200` - Cancelled successfully
- `404` - Order not found
- `500` - Server error

---

## 💬 Chat API

### Send Message to KAI

**Endpoint:** `POST /api/chat`

**Description:** Send a message to KAI AI assistant and get a response.

**Request Body:**
```json
{
  "messages": [
    {
      "role": "user",
      "content": "Hello KAI! Can you recommend a smartwatch?"
    }
  ]
}
```

**Full Conversation Example:**
```json
{
  "messages": [
    {
      "role": "user",
      "content": "Hello"
    },
    {
      "role": "assistant",
      "content": "Hi! I'm KAI..."
    },
    {
      "role": "user",
      "content": "Show me smartwatches under ₹2500"
    }
  ]
}
```

**Example Request:**
```bash
curl -X POST http://localhost:3000/api/chat \
  -H "Content-Type: application/json" \
  -d '{
    "messages": [
      {
        "role": "user",
        "content": "Recommend a product"
      }
    ]
  }'
```

**Response:**
```json
{
  "message": "I'd be happy to recommend some products! Here are some great options:\n\n1. **Fire-Boltt Phoenix Smart Watch** (₹1,999) - Great features with Bluetooth calling and 120+ sports modes. Perfect if you want a smartwatch with excellent battery life!\n\n2. **boAt Rockerz 450 Bluetooth Headphones** (₹1,499) - Excellent audio quality with 15 hours battery. Ideal for music lovers!\n\nWhat type of product are you most interested in? 😊"
}
```

**Status Codes:**
- `200` - Success
- `400` - Invalid request (missing messages array)
- `500` - AI service error or server error

**Error Response:**
```json
{
  "error": "AI service error",
  "details": "Error details here"
}
```

**Notes:**
- Powered by OpenRouter API (Claude 3.5 Sonnet)
- Includes product catalog context
- Optimized for Indian e-commerce
- Supports multi-turn conversations
- Average response time: 2-5 seconds

---

## 🔐 Authentication

**Current Status:** No authentication implemented

**Recommendations for Production:**
- Implement JWT or session-based auth
- Protect admin routes (POST, PUT, DELETE)
- Add API key authentication for external access
- Implement rate limiting

---

## ⚠️ Error Handling

All API routes return consistent error formats:

```json
{
  "error": "Error message description"
}
```

**Common HTTP Status Codes:**
- `200` - OK (Success)
- `201` - Created
- `400` - Bad Request
- `404` - Not Found
- `405` - Method Not Allowed
- `500` - Internal Server Error

---

## 🚀 Rate Limiting

**Current Status:** No rate limiting implemented

**Recommendations for Production:**
- Implement rate limiting using `express-rate-limit` or similar
- Suggested limits:
  - Products API: 100 requests/minute
  - Orders API: 50 requests/minute
  - Chat API: 20 requests/minute (due to AI costs)

---

## 📊 Data Storage

**Current Implementation:**
- File-based storage using JSON files
- Located in `/data/` directory
- Not suitable for production at scale

**Files:**
- `/data/products.json` - Product catalog
- `/data/orders.json` - Order history

**Production Recommendations:**
- Migrate to PostgreSQL, MongoDB, or Firebase
- Implement proper database schemas
- Add indexes for performance
- Set up backups

---

## 🔄 CORS

**Current Status:** No CORS restrictions (same-origin only)

**For Production:**
```javascript
// Add CORS middleware in API routes
res.setHeader('Access-Control-Allow-Origin', 'your-domain.com');
res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
```

---

## 🧪 Testing APIs

### Using cURL:

```bash
# Test products endpoint
curl http://localhost:3000/api/products

# Test chat endpoint
curl -X POST http://localhost:3000/api/chat \
  -H "Content-Type: application/json" \
  -d '{"messages":[{"role":"user","content":"Hello"}]}'
```

### Using Postman:

1. Import collection or create requests manually
2. Set base URL: `http://localhost:3000/api`
3. Add appropriate headers and body

### Using JavaScript Fetch:

```javascript
// Get products
fetch('/api/products')
  .then(res => res.json())
  .then(data => console.log(data));

// Create order
fetch('/api/orders', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    productId: '1',
    productName: 'Product Name',
    price: 1499,
    quantity: 2
  })
})
  .then(res => res.json())
  .then(data => console.log(data));

// Chat with KAI
fetch('/api/chat', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    messages: [
      { role: 'user', content: 'Hello KAI' }
    ]
  })
})
  .then(res => res.json())
  .then(data => console.log(data.message));
```

---

## 📝 Changelog

### Version 1.0.0
- Initial API implementation
- Products CRUD operations
- Orders management
- AI chat integration with OpenRouter

---

## 🆘 Support

For API-related issues:
1. Check this documentation
2. Review API route files in `/pages/api/`
3. Check server logs in terminal
4. Verify request format matches examples

---

**Happy Coding! 🚀**
