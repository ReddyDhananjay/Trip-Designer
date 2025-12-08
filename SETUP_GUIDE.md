# 🚀 KAI Website - Complete Setup Guide

## Step-by-Step Setup Instructions

### 1️⃣ Prerequisites Check

Before you begin, ensure you have:

- ✅ **Node.js 18+** installed ([Download here](https://nodejs.org/))
  ```bash
  node --version  # Should show v18.x or higher
  ```

- ✅ **npm** (comes with Node.js)
  ```bash
  npm --version   # Should show 9.x or higher
  ```

- ✅ **Git** (optional, for cloning)
  ```bash
  git --version
  ```

### 2️⃣ Get OpenRouter API Key

1. **Visit OpenRouter:**
   - Go to [https://openrouter.ai](https://openrouter.ai)

2. **Sign Up / Log In:**
   - Create a free account or log in

3. **Get API Key:**
   - Navigate to **Keys** section
   - Click **Create Key**
   - Copy your API key (starts with `sk-or-v1-...`)
   - Keep it safe!

4. **Add Credits (Optional):**
   - OpenRouter offers free credits for testing
   - Add more credits if needed for production use

### 3️⃣ Project Setup

#### Option A: Using Git Clone

```bash
# Clone the repository
git clone <repository-url>
cd kai-website

# Install dependencies
npm install
```

#### Option B: Manual Download

1. Download and extract the project ZIP
2. Open terminal in the project folder
3. Run:
```bash
npm install
```

### 4️⃣ Configure Environment Variables

1. **Locate the `.env.local` file:**
   - Already created in the project root

2. **Open `.env.local` and update:**
```env
OPENROUTER_API_KEY=sk-or-v1-YOUR_ACTUAL_KEY_HERE
```

3. **Save the file**

### 5️⃣ Verify Installation

Run these checks:

```bash
# Check if dependencies are installed
npm list next react react-dom axios

# Check if data files exist
ls -la data/
```

You should see:
- ✅ `products.json` - Product catalog
- ✅ `orders.json` - Orders database

### 6️⃣ Start Development Server

```bash
npm run dev
```

You should see:
```
> kai-website@1.0.0 dev
> next dev

- ready started server on 0.0.0.0:3000, url: http://localhost:3000
- event compiled client and server successfully
```

### 7️⃣ Open in Browser

1. **Navigate to:** [http://localhost:3000](http://localhost:3000)

2. **You should see:**
   - 🏠 Beautiful landing page with KAI branding
   - 🎨 Gradient hero section
   - 📦 Featured products with Indian pricing (₹)
   - 🔗 Navigation menu

### 8️⃣ Test All Features

#### ✅ Test Landing Page
- [ ] Hero section displays correctly
- [ ] "Start Chat with KAI" button works
- [ ] Featured products load with images
- [ ] All prices show in ₹ (Rupees)
- [ ] Floating chatbot button appears (bottom-right)

#### ✅ Test Live Chatbot
1. Click **"Chat with KAI"** or floating button
2. Send a message: "Hello KAI"
3. Check:
   - [ ] AI responds within 3-5 seconds
   - [ ] Response is relevant and helpful
   - [ ] Typing indicator appears
   - [ ] Messages have timestamps
   - [ ] Popular products sidebar shows

4. Try quick actions:
   - [ ] "Recommend a product"
   - [ ] "Show me popular items"
   - [ ] "What are today's deals?"
   - [ ] "Create mock order"

5. Test product queries:
   - "Tell me about boAt headphones"
   - "Compare smartwatches"
   - "Show me electronics under ₹2000"

#### ✅ Test Products Page
1. Navigate to **Products**
2. Check:
   - [ ] All 15+ products display
   - [ ] Category filters work
   - [ ] Search bar filters results
   - [ ] Product images load
   - [ ] Prices in ₹
   - [ ] Stock information shows

3. Click a product card:
   - [ ] Opens product details page
   - [ ] All information displays
   - [ ] "Ask KAI" button works

#### ✅ Test Product Details Page
1. Click any product
2. Verify:
   - [ ] Large product image
   - [ ] Product name and category
   - [ ] Price with discount calculation
   - [ ] Stock status
   - [ ] Platform availability
   - [ ] Technical specifications table
   - [ ] Quantity selector (+/- buttons)
   - [ ] Total price updates with quantity

3. Test actions:
   - [ ] **Buy Now** creates mock order
   - [ ] **Order via KAI Chat** opens chat with pre-filled message
   - [ ] **Ask KAI** opens chat

4. Place a mock order:
   - Select quantity
   - Click "Buy Now"
   - Check alert with order details
   - Verify redirect to Orders page

#### ✅ Test Orders Page
1. Navigate to **Orders**
2. Check:
   - [ ] Previously created orders display
   - [ ] Order cards show all details
   - [ ] Status badges (Processing, Shipped, Delivered)
   - [ ] Timeline visualization
   - [ ] Order statistics at bottom

3. Test actions:
   - [ ] "View Product" link works
   - [ ] "Ask KAI About Order" opens chat
   - [ ] "Cancel Order" updates status

#### ✅ Test Admin Panel
1. Navigate to **Admin**
2. Test **Products Tab:**
   - [ ] All products listed in table
   - [ ] Click "Add New Product"
   - [ ] Fill form and submit
   - [ ] New product appears in table
   - [ ] Edit existing product
   - [ ] Delete product (with confirmation)

3. Test **Orders Tab:**
   - [ ] All orders listed
   - [ ] Change order status dropdown
   - [ ] Status updates successfully
   - [ ] View product link works

### 9️⃣ Test AI Responses

Send these test messages to KAI:

1. **General Greeting:**
   ```
   "Hello! What can you do?"
   ```
   Expected: Friendly intro with capabilities

2. **Product Recommendation:**
   ```
   "I need a good smartwatch under ₹2500"
   ```
   Expected: Suggests Fire-Boltt or Noise watches

3. **Product Comparison:**
   ```
   "Compare boAt headphones with speakers"
   ```
   Expected: Lists differences, prices, features

4. **Order Creation:**
   ```
   "I want to order the Mi Smart Band 6"
   ```
   Expected: Confirms product, price, asks for quantity

5. **Indian Context:**
   ```
   "What deals are available for Diwali?"
   ```
   Expected: Mentions festival sales, Indian platforms

6. **Non-existent Product:**
   ```
   "Tell me about iPhone 15 Pro Max"
   ```
   Expected: Suggests similar products from catalog or creates realistic mock

### 🔟 Troubleshooting Common Issues

#### Issue: "Module not found" error
**Solution:**
```bash
rm -rf node_modules package-lock.json
npm install
```

#### Issue: "API Key Error" in chat
**Solution:**
1. Check `.env.local` has correct API key
2. Restart dev server:
   ```bash
   # Ctrl+C to stop
   npm run dev
   ```

#### Issue: Products/Orders not loading
**Solution:**
1. Check `data/products.json` exists and has valid JSON
2. Check `data/orders.json` exists (can be empty array `[]`)

#### Issue: Port 3000 already in use
**Solution:**
```bash
# Kill process on port 3000
npx kill-port 3000

# Or run on different port
PORT=3001 npm run dev
```

#### Issue: Chat responses are slow
**Possible causes:**
- OpenRouter API server delay (normal: 2-5 seconds)
- Check your internet connection
- Verify API key has credits

#### Issue: TypeScript errors
**Solution:**
```bash
npm run build
# Fix any errors shown
```

### 1️⃣1️⃣ Production Deployment

#### Build for Production:
```bash
npm run build
```

#### Start Production Server:
```bash
npm start
```

#### Deploy to Vercel (Recommended):
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

**Important for Vercel:**
1. Add `OPENROUTER_API_KEY` to environment variables in Vercel dashboard
2. Set Node.js version to 18.x
3. Build command: `npm run build`
4. Output directory: `.next`

### 1️⃣2️⃣ Performance Optimization

For production, consider:

1. **Database Migration:**
   - Replace JSON files with PostgreSQL/MongoDB
   - Use Prisma or MongoDB Atlas

2. **Image Optimization:**
   - Use Next.js Image component
   - Host images on CDN (Cloudinary, AWS S3)

3. **Caching:**
   - Implement Redis for chat sessions
   - Cache product data

4. **Authentication:**
   - Add NextAuth.js
   - Protect admin routes

5. **Rate Limiting:**
   - Add rate limiting to API routes
   - Prevent API abuse

### 1️⃣3️⃣ Maintenance

#### Update Products:
1. Method 1: Use Admin Panel (recommended)
2. Method 2: Edit `data/products.json` directly

#### View Logs:
```bash
# Development logs in terminal
npm run dev

# Production logs
npm start
```

#### Backup Data:
```bash
# Backup product and order data
cp data/products.json data/products.backup.json
cp data/orders.json data/orders.backup.json
```

### 1️⃣4️⃣ Getting Help

If you encounter issues:

1. **Check this guide** - Most common issues covered
2. **Review README.md** - Comprehensive documentation
3. **Check console errors** - Browser DevTools (F12)
4. **Check terminal logs** - Server-side errors
5. **Verify API key** - Test at [openrouter.ai](https://openrouter.ai)

### ✅ Setup Checklist

- [ ] Node.js 18+ installed
- [ ] Project dependencies installed (`npm install`)
- [ ] OpenRouter API key obtained
- [ ] `.env.local` configured with API key
- [ ] Development server starts (`npm run dev`)
- [ ] Website loads at localhost:3000
- [ ] Landing page displays correctly
- [ ] Chat responds to messages
- [ ] Products load with images
- [ ] Orders can be created
- [ ] Admin panel accessible

### 🎉 Success!

If all checks pass, your KAI website is fully functional! 

**Next Steps:**
1. Customize products in Admin Panel
2. Test all features thoroughly
3. Customize branding/colors if needed
4. Deploy to production when ready

---

**Need Help?** Check the main README.md or documentation files.

**Happy Shopping with KAI! 🛍️**
