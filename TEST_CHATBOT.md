# 🤖 How to Test the Chatbot

## Quick Test Guide

### 1. Start the Server
```bash
cd /workspace
npm run dev
```

### 2. Open Browser
Go to: **http://localhost:3000**

---

## 🎯 Test Scenarios

### Scenario 1: Homepage Chatbot Button
1. Look at **bottom-right corner** of homepage
2. You should see a **purple gradient circular button** with a chat icon
3. The button should have a **subtle pulse animation**
4. **Hover** over it - it should scale up
5. **Click** it - should take you to `/chat` page

---

### Scenario 2: Product Recommendations
**In Chat Page, try these:**

```
"Recommend a smartwatch under ₹3000"
```
**Expected**: KAI suggests Fire-Boltt Phoenix (₹1,999), Noise ColorFit Pro 3 (₹2,499), Mi Smart Band 6 (₹2,999)

```
"Show me products from Flipkart"
```
**Expected**: KAI lists products available on Flipkart with prices in ₹

```
"I need wireless headphones"
```
**Expected**: KAI suggests boAt Rockerz 450 (₹1,499) with details

---

### Scenario 3: Indian Platform Context

```
"What's available on Amazon India?"
```
**Expected**: KAI lists products from Amazon India

```
"Show me Myntra products"
```
**Expected**: KAI suggests fashion items from Myntra (bags, shoes, backpacks)

```
"Any Meesho products?"
```
**Expected**: KAI mentions FabSeasons tote bag or similar items

---

### Scenario 4: Create Mock Order

```
"I want to buy the boAt Rockerz 450 headphones"
```
**Expected**: KAI creates an order with:
- Order ID (ORD-xxxxxxxxxx)
- Product name
- Price: ₹1,499
- Quantity: 1
- Total: ₹1,499
- Estimated delivery date (5-7 days from now)

```
"Order 2 Fire-Boltt Phoenix smartwatches"
```
**Expected**: KAI creates order for 2 units (Total: ₹3,998)

---

### Scenario 5: Product Comparison

```
"Compare Fire-Boltt Phoenix and Noise ColorFit Pro 3"
```
**Expected**: KAI compares:
- Prices (₹1,999 vs ₹2,499)
- Display sizes
- Battery life
- Features

---

### Scenario 6: Price Range Queries

```
"Show me products under ₹1000"
```
**Expected**: Lists items like:
- Zebronics Webcam (₹899)
- Campus Shoes (₹999)
- WildHorn Wallet (₹599)
- Cosmic Byte Mouse (₹449)
- Zebronics Keyboard Combo (₹699)
- FabSeasons Tote Bag (₹349)

```
"What can I get for around ₹1500?"
```
**Expected**: Shows products in ₹1,299 - ₹1,799 range

---

## 🔍 What to Check

### Visual Elements:
- ✅ Floating button visible on homepage
- ✅ Button has purple gradient
- ✅ Pulse animation works
- ✅ All prices show ₹ symbol
- ✅ Product cards show platform tags

### Chatbot Responses:
- ✅ Mentions Indian platforms (Amazon India, Flipkart, Myntra, Meesho)
- ✅ Shows prices in ₹
- ✅ Creates orders with ₹ amounts
- ✅ Suggests relevant Indian products
- ✅ Conversational and friendly tone

### Functionality:
- ✅ Chat history saves locally
- ✅ Quick action buttons work
- ✅ Sidebar shows products with ₹ prices
- ✅ Typing indicator appears while AI responds
- ✅ Can clear chat history

---

## 🐛 Troubleshooting

### "Chatbot not responding"
**Check:**
1. Console for errors (F12 → Console tab)
2. `.env.local` has OpenRouter API key
3. Internet connection active
4. Server is running (`npm run dev`)

**Solution:**
```bash
# Restart server
Ctrl+C
npm run dev
```

### "Prices showing $"
**This means:** Old cached version

**Solution:**
```bash
# Hard refresh browser
Cmd + Shift + R (Mac)
Ctrl + Shift + R (Windows)
```

### "Floating button not visible"
**Check:**
1. You're on homepage (http://localhost:3000)
2. Scroll to see bottom-right corner
3. Check browser zoom (should be 100%)

---

## 📸 Expected Screenshots

### Homepage:
- Purple floating button bottom-right
- Featured products with ₹ prices
- "Chat with KAI" on hover

### Chat Page:
- WhatsApp-like interface
- Messages in bubbles
- Quick action buttons
- Sidebar with products (₹ prices)

### Products:
- Indian brands (boAt, Fire-Boltt, etc.)
- ₹ pricing
- Platform tags visible

---

## ✅ Success Criteria

Your chatbot is working correctly if:

1. ✅ Floating button appears on homepage
2. ✅ Clicking button opens chat page
3. ✅ AI responds to messages within 3-5 seconds
4. ✅ All prices shown in ₹
5. ✅ AI mentions Indian platforms
6. ✅ Can create mock orders
7. ✅ Orders page shows ₹ amounts
8. ✅ Products from Indian brands

---

## 🎉 Sample Conversation

```
You: Hi KAI!

KAI: 👋 Hi! I'm KAI, your smart shopping assistant! I can help you find products from Amazon India, Flipkart, Myntra, and Meesho. What can I help you with today?

You: I need a smartwatch under ₹2500

KAI: Great choice! Here are some excellent smartwatches under ₹2,500:

1. **Fire-Boltt Phoenix** - ₹1,999 ⭐
   - 1.3" display, Bluetooth calling, 120+ sports modes
   - Available on: Amazon, Flipkart, Myntra
   
2. **Noise ColorFit Pro 3** - ₹2,499
   - 1.55" HD display, 10-day battery, 100+ watch faces
   - Available on: Amazon, Flipkart

The Fire-Boltt Phoenix is particularly popular and offers great value! Would you like more details or help placing an order? 😊

You: I'll take the Fire-Boltt Phoenix

KAI: Excellent choice! 🎉

Here's your mock order confirmation:

📦 **Order Details:**
- Order ID: ORD-1702031234
- Product: Fire-Boltt Phoenix Smart Watch
- Price: ₹1,999
- Quantity: 1
- Total: ₹1,999
- Estimated Delivery: 5-7 days from now

You can view your order in the Orders page. Happy shopping! 😊
```

---

**Ready to test? Start the server and try it out!** 🚀

```bash
npm run dev
```
