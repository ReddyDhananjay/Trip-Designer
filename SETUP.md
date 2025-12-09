# KAI Website - Setup Guide

## 🎯 Complete Setup Instructions

This guide will help you set up and run the KAI Smart Shopping Assistant website from scratch.

---

## ✅ Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher) - [Download here](https://nodejs.org/)
- **npm** (comes with Node.js) or **yarn**
- **Git** (optional, for cloning)
- **OpenRouter API Key** - [Get one here](https://openrouter.ai/keys)

---

## 📥 Installation Steps

### Step 1: Get the Code

If you have the project as a zip:
```bash
# Extract the zip file
# Navigate to the project folder
cd kai-website
```

Or clone from repository:
```bash
git clone <repository-url>
cd kai-website
```

### Step 2: Install Dependencies

```bash
npm install
```

This will install all required packages:
- Next.js 14
- React 18
- TypeScript
- Tailwind CSS
- Axios
- And other dependencies

### Step 3: Set Up Environment Variables

1. Copy the example environment file:
```bash
cp .env.example .env.local
```

2. Edit `.env.local` and add your OpenRouter API key:
```
OPENROUTER_API_KEY=sk-or-v1-your-actual-api-key-here
```

**How to get OpenRouter API Key:**
1. Visit https://openrouter.ai/
2. Sign up for a free account
3. Go to https://openrouter.ai/keys
4. Click "Create Key"
5. Copy your API key
6. Paste it in `.env.local`

### Step 4: Verify Data Files

Make sure these files exist with the correct structure:

- `data/products.json` - Contains product catalog (already populated)
- `data/orders.json` - Contains orders (starts empty: `[]`)

Both files should already be in place!

### Step 5: Run the Development Server

```bash
npm run dev
```

The application will start on: **http://localhost:3000**

You should see output like:
```
- ready started server on 0.0.0.0:3000, url: http://localhost:3000
- info Loaded env from /workspace/.env.local
```

### Step 6: Open in Browser

Open your browser and navigate to:
```
http://localhost:3000
```

You should see the KAI homepage with the hero section!

---

## 🧪 Testing the Features

### 1. Test the Homepage
- Visit http://localhost:3000
- You should see the KAI hero section
- Featured products should load
- All navigation links should work

### 2. Test the Chatbot
- Click "Start Chat with KAI" or go to `/chat`
- Try sending a message: "Show me headphones"
- KAI should respond with product recommendations
- Try quick action buttons
- Check if products appear in the right sidebar

### 3. Test Products Page
- Navigate to `/products`
- Use category filters
- Try the search bar
- Click on a product to view details
- Click "Ask KAI" button on any product

### 4. Test Product Details
- Click any product
- View full details and specs
- Adjust quantity
- Click "Create Mock Order"
- Order should be created and you'll be redirected to Orders page

### 5. Test Orders Page
- Navigate to `/orders`
- You should see any orders you created
- Try cancelling an order
- Check order status timeline

### 6. Test Admin Panel
- Navigate to `/admin`
- Try adding a new product
- Edit an existing product
- Update order statuses
- Delete a product (be careful!)

---

## 🐛 Troubleshooting

### Issue: "Module not found" errors
**Solution:**
```bash
# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Issue: Chat not working / AI responses failing
**Possible causes:**
1. Missing or invalid OPENROUTER_API_KEY
2. No API credits remaining
3. Network issues

**Solution:**
- Verify your API key in `.env.local`
- Check your OpenRouter dashboard for credits
- Make sure the key starts with `sk-or-v1-`
- Restart the dev server after changing .env.local

### Issue: Products or Orders not loading
**Solution:**
- Check that `data/products.json` exists and is valid JSON
- Check that `data/orders.json` exists (can be empty array `[]`)
- Verify file permissions

### Issue: Port 3000 already in use
**Solution:**
```bash
# Kill the process using port 3000
lsof -ti:3000 | xargs kill -9

# Or use a different port
npm run dev -- -p 3001
```

### Issue: API route not found (404)
**Solution:**
- Make sure you're using Next.js 14
- Check that files exist in `pages/api/` directory
- Restart the development server

### Issue: Styling not working
**Solution:**
```bash
# Rebuild Tailwind CSS
npm run dev
```

---

## 📁 Project Structure Overview

```
kai-website/
├── app/                      # Next.js App Router pages
│   ├── page.tsx             # Homepage (/)
│   ├── chat/                # Chat page (/chat)
│   │   └── page.tsx
│   ├── products/            # Products pages
│   │   ├── page.tsx         # Product list (/products)
│   │   └── [id]/            
│   │       └── page.tsx     # Product details (/products/:id)
│   ├── orders/              # Orders page (/orders)
│   │   └── page.tsx
│   ├── admin/               # Admin panel (/admin)
│   │   └── page.tsx
│   ├── layout.tsx           # Root layout with navigation
│   └── globals.css          # Global styles + animations
│
├── components/              # React components
│   └── Navigation.tsx       # Main navigation bar
│
├── data/                    # JSON database files
│   ├── products.json        # Products catalog
│   └── orders.json          # Orders history
│
├── pages/api/               # API routes (Next.js API)
│   ├── chat.ts             # POST /api/chat - AI chatbot
│   ├── products/
│   │   ├── index.ts        # GET/POST /api/products
│   │   └── [id].ts         # GET/PUT/DELETE /api/products/:id
│   └── orders/
│       ├── index.ts        # GET/POST /api/orders
│       └── [id].ts         # GET/PUT/DELETE /api/orders/:id
│
├── types/                   # TypeScript types
│   └── index.ts            # Shared type definitions
│
├── .env.local              # Environment variables (create this!)
├── .env.example            # Example env file
├── package.json            # Dependencies
├── tailwind.config.js      # Tailwind configuration
├── tsconfig.json           # TypeScript configuration
└── next.config.js          # Next.js configuration
```

---

## 🚀 Building for Production

### Step 1: Build the project
```bash
npm run build
```

### Step 2: Start production server
```bash
npm run start
```

The production build will be optimized and run on http://localhost:3000

---

## 🌐 Deployment Options

### Option 1: Vercel (Recommended)
1. Push your code to GitHub
2. Visit https://vercel.com
3. Import your repository
4. Add environment variable: `OPENROUTER_API_KEY`
5. Deploy!

### Option 2: Netlify
1. Push your code to GitHub
2. Visit https://netlify.com
3. Import your repository
4. Build command: `npm run build`
5. Publish directory: `.next`
6. Add environment variable: `OPENROUTER_API_KEY`

### Option 3: Docker
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

---

## 📊 Features Checklist

After setup, verify all features work:

- [ ] Homepage loads with hero section
- [ ] Featured products display correctly
- [ ] Navigation bar works (all links)
- [ ] Chat page loads
- [ ] Can send messages to KAI
- [ ] KAI responds with product recommendations
- [ ] Quick action buttons work
- [ ] Products sidebar shows items
- [ ] Products page shows all products
- [ ] Category filters work
- [ ] Search functionality works
- [ ] Product detail page loads
- [ ] Can create mock orders
- [ ] Orders page displays orders
- [ ] Can cancel orders
- [ ] Admin panel loads
- [ ] Can add/edit/delete products
- [ ] Can update order statuses

---

## 🎨 Customization Guide

### Changing Colors
Edit `tailwind.config.js`:
```javascript
theme: {
  extend: {
    colors: {
      primary: '#6366f1',    // Change this
      secondary: '#8b5cf6',  // And this
    },
  },
}
```

### Changing Products
Edit `data/products.json` or use the Admin Panel at `/admin`

### Changing AI Model
Edit `pages/api/chat.ts`:
```typescript
model: 'anthropic/claude-3.5-sonnet',  // Change to any OpenRouter model
```

Available models: https://openrouter.ai/models

### Changing AI System Prompt
Edit the `systemPrompt` in `pages/api/chat.ts` to customize KAI's behavior.

---

## 💡 Tips & Best Practices

1. **Keep API Key Secret**: Never commit `.env.local` to Git
2. **Monitor API Usage**: Check OpenRouter dashboard regularly
3. **Backup Data**: Regularly backup `data/products.json` and `data/orders.json`
4. **Use Admin Panel**: Manage products through the UI instead of editing JSON
5. **Test Locally**: Always test changes locally before deploying

---

## 📞 Getting Help

If you encounter issues:

1. Check the troubleshooting section above
2. Review the error message in the browser console
3. Check the terminal for server errors
4. Verify all dependencies are installed
5. Ensure environment variables are set correctly

---

## 🎉 You're Ready!

Your KAI website should now be up and running! Enjoy exploring the features and demonstrating the AI-powered shopping assistant.

**Next Steps:**
- Customize the products in the catalog
- Test all features thoroughly
- Deploy to production when ready
- Share the demo with others!

---

**Happy Shopping with KAI! 🛍️✨**
