# ⚡ Quick Start Guide - KAI Voice of Commerce

Get up and running with KAI in under 5 minutes!

---

## 🚀 5-Minute Setup

### 1. Clone & Install (2 minutes)

```bash
# Clone repository
git clone https://github.com/your-org/kai-voice-of-commerce.git
cd kai-voice-of-commerce

# Install dependencies
npm install
```

### 2. Start Development (1 minute)

Open **two terminal windows**:

**Terminal 1** - Start the dev server:
```bash
npm run dev
```

**Terminal 2** - Start the mock API:
```bash
npm run mock-server
```

### 3. Open Browser (1 minute)

Navigate to:
```
http://localhost:3000
```

### 4. Try It Out! (1 minute)

1. Click the **floating chat button** (bottom right)
2. Type: `"Show me blue cotton shirts in size M"`
3. See AI-powered product recommendations
4. Click **"Reserve Now"** on any product
5. Get a reservation confirmation!

---

## 🎯 What's Next?

### Explore the Website

- **Home Page** - Full feature showcase
- **Demo Page** - Interactive chat demo
- **Dashboard** - Analytics preview
- **Pricing** - Plan comparison
- **Contact** - Working contact form

### Try These Queries in Chat

```
"Show me blue cotton shirts in size M"
"Is this available at my nearest store?"
"Show me items under ₹2000"
"I need jeans in size 32"
"Do you have white sneakers?"
```

### Customize

1. **Edit colors** - `tailwind.config.js`
2. **Add products** - `mock/db.json`
3. **Modify components** - `src/components/`
4. **Update content** - Edit component text

---

## 📚 Learn More

- [Full README](./README.md) - Complete documentation
- [Deployment Guide](./DEPLOYMENT_GUIDE.md) - Deploy to production
- [API Documentation](./API_DOCS.md) - API reference

---

## 🐛 Troubleshooting

### Port Already in Use

```bash
# Kill process on port 3000
npx kill-port 3000

# Or change port in vite.config.ts
```

### Dependencies Error

```bash
# Clear and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Can't See Chat Widget

- Check browser console for errors
- Make sure mock server is running
- Clear browser cache

---

## 💡 Tips

- Use **React DevTools** for debugging
- Check **Network tab** for API calls
- Press **Ctrl+Shift+I** to open DevTools
- Hot reload is enabled - just save files!

---

## 🎉 You're All Set!

Start building amazing conversational commerce experiences with KAI!

Questions? Check the [README](./README.md) or contact us at contact@kai-commerce.ai

---

<div align="center">
  <strong>Happy Coding! 🚀</strong>
</div>
