# KAI - The Voice of Commerce Setup Guide

## 🚀 Quick Start

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn package manager
- OpenRouter API key (for AI chatbot functionality)

### Installation Steps

1. **Clone the repository** (if you haven't already)
   ```bash
   git clone <your-repo-url>
   cd workspace
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   - Copy `.env.example` to `.env.local`:
     ```bash
     cp .env.example .env.local
     ```
   - Get your OpenRouter API key from https://openrouter.ai/keys
   - Update `.env.local` with your actual API key:
     ```
     OPENROUTER_API_KEY=sk-or-v1-your-actual-key-here
     ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
workspace/
├── app/                    # Next.js App Router pages
│   ├── page.tsx           # Home page
│   ├── chat/              # Chatbot page
│   ├── products/          # Products listing & details
│   ├── orders/            # Orders management
│   └── admin/             # Admin panel
├── components/            # React components
│   └── Navigation.tsx     # Main navigation
├── pages/api/             # API routes
│   ├── chat.ts           # AI chatbot API
│   ├── products/         # Products API
│   └── orders/           # Orders API
├── data/                  # JSON data files
│   ├── products.json     # Product catalog
│   └── orders.json       # Orders database
└── types/                 # TypeScript types
    └── index.ts          # Type definitions
```

## 🎨 Features

### 1. **Home Page**
   - Beautiful hero section introducing KAI
   - Feature highlights
   - Featured products showcase
   - Floating chatbot button

### 2. **AI Chatbot**
   - Real-time AI conversation using Claude 3.5 Sonnet
   - Product recommendations
   - Order creation assistance
   - Quick action buttons
   - Chat history persistence

### 3. **Products Page**
   - Complete product catalog
   - Category filtering
   - Search functionality
   - Indian Rupee (₹) pricing
   - Direct integration with chatbot

### 4. **Product Details**
   - High-quality product images
   - Detailed specifications
   - Mock order creation
   - Stock availability
   - Integration with KAI assistant

### 5. **Orders Page**
   - View all orders with product names
   - Order tracking timeline
   - Status indicators
   - Order cancellation
   - Summary statistics

### 6. **Admin Panel**
   - Product management (Add/Edit/Delete)
   - Order status management
   - Inventory tracking
   - Featured products control

## 🔑 API Configuration

### OpenRouter API Setup

1. Visit https://openrouter.ai
2. Sign up or log in
3. Go to https://openrouter.ai/keys
4. Create a new API key
5. Add credits to your account (usually $5 minimum)
6. Copy the key to your `.env.local` file

The chatbot uses the `anthropic/claude-3.5-sonnet` model through OpenRouter for intelligent responses.

## 💰 Currency & Localization

- All prices are displayed in Indian Rupees (₹)
- Products reference popular Indian e-commerce platforms:
  - Amazon India
  - Flipkart
  - Myntra
  - Meesho
- Delivery estimates based on Indian logistics

## 🛠️ Development Commands

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linting
npm run lint
```

## 📝 Adding New Products

### Via Admin Panel
1. Navigate to `/admin`
2. Click "Add New Product"
3. Fill in the form with:
   - Product name
   - Category
   - Price (in ₹)
   - Stock quantity
   - Image URL
   - Description
   - Featured status

### Via JSON File
Edit `data/products.json`:

```json
{
  "id": "16",
  "name": "Product Name",
  "category": "Electronics",
  "price": 2999,
  "image": "https://images.unsplash.com/photo-xxx",
  "description": "Product description",
  "specs": {
    "spec1": "value1",
    "spec2": "value2"
  },
  "stock": 50,
  "featured": false,
  "platform": "Amazon, Flipkart"
}
```

## 🤖 Chatbot Capabilities

KAI can:
- Recommend products based on user needs
- Answer questions about product specifications
- Create mock orders with order IDs
- Compare products
- Provide Indian market context
- Reference platform availability

## 🎯 Testing the Application

1. **Test the Homepage**
   - Visit http://localhost:3000
   - Check featured products load
   - Click on various CTA buttons

2. **Test the Chatbot**
   - Navigate to `/chat`
   - Try queries like:
     - "Recommend a product for me"
     - "Show me electronics"
     - "Create an order for headphones"
     - "What's in stock?"

3. **Test Products**
   - Browse `/products`
   - Use search and filters
   - Click on individual products
   - Create mock orders

4. **Test Orders**
   - View `/orders`
   - Check order details
   - Cancel an order
   - View order timeline

5. **Test Admin Panel**
   - Go to `/admin`
   - Add a new product
   - Edit existing product
   - Update order status

## 🚀 Deployment

### Vercel (Recommended)

1. Push code to GitHub
2. Import project in Vercel
3. Add environment variable:
   - Key: `OPENROUTER_API_KEY`
   - Value: Your OpenRouter API key
4. Deploy!

### Other Platforms

The app works on any platform supporting Next.js:
- Netlify
- AWS Amplify
- Render
- Railway

## 🔒 Security Notes

- Never commit `.env.local` to Git (already in .gitignore)
- Keep your OpenRouter API key private
- Use environment variables for all sensitive data
- The admin panel should be password-protected in production

## 📱 Mobile Responsiveness

The website is fully responsive and works great on:
- Desktop (1920px+)
- Laptop (1024px - 1919px)
- Tablet (768px - 1023px)
- Mobile (320px - 767px)

## 🎨 Customization

### Colors
Edit `tailwind.config.js`:
```javascript
colors: {
  primary: '#6366f1',    // Change primary color
  secondary: '#8b5cf6',  // Change secondary color
}
```

### Fonts
Edit `app/layout.tsx` to change the font family.

## 🐛 Troubleshooting

### Chatbot not working
- Check if `OPENROUTER_API_KEY` is set in `.env.local`
- Verify API key is valid at https://openrouter.ai/keys
- Check if you have credits in your OpenRouter account

### Products not loading
- Ensure `data/products.json` exists and has valid JSON
- Check file permissions

### Build errors
- Delete `node_modules` and `.next` folders
- Run `npm install` again
- Run `npm run build`

## 📄 License

This project is part of the EY Techathon 6.0 submission by Team AIGNITE from SRM University, AP.

## 👥 Support

For issues and questions:
- Check existing documentation
- Review the troubleshooting section
- Contact the development team

---

Made with ❤️ by Team AIGNITE - KAI: The Voice of Commerce
