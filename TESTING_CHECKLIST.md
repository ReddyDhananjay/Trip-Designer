# ✅ KAI Website - Testing Checklist

## Pre-Test Setup

- [ ] Node.js 18+ installed
- [ ] Dependencies installed (`npm install`)
- [ ] `.env.local` configured with OpenRouter API key
- [ ] Development server running (`npm run dev`)
- [ ] Browser opened at `http://localhost:3000`

---

## 🏠 Landing Page Tests

### Visual Tests
- [ ] Hero banner displays with "Meet KAI" heading
- [ ] KAI logo appears (purple/indigo gradient circle with "K")
- [ ] "Start Chat with KAI" button visible and styled correctly
- [ ] "Browse Products" button visible
- [ ] Featured products section loads with 4 products
- [ ] All product images load correctly
- [ ] Prices display in ₹ (Indian Rupees)
- [ ] "How KAI Helps" section shows 4 feature cards
- [ ] Footer CTA section visible
- [ ] Floating chatbot button appears (bottom-right)
- [ ] Floating button has pulse animation

### Functional Tests
- [ ] Click "Start Chat with KAI" → navigates to `/chat`
- [ ] Click "Browse Products" → navigates to `/products`
- [ ] Click featured product card → navigates to product detail page
- [ ] Click "View All Products" → navigates to `/products`
- [ ] Click floating chat button → navigates to `/chat`
- [ ] All navigation links work (Home, Chat, Products, Orders, Admin)

### Responsive Tests
- [ ] Page looks good on desktop (1920x1080)
- [ ] Page looks good on tablet (768px width)
- [ ] Page looks good on mobile (375px width)
- [ ] Images scale properly
- [ ] Text remains readable on all sizes

---

## 💬 Chat Page Tests

### Visual Tests
- [ ] Chat header shows "KAI Assistant" with avatar
- [ ] Welcome message displays automatically
- [ ] Input field visible at bottom
- [ ] Send button appears (paper plane icon)
- [ ] Quick action buttons visible (4 buttons)
- [ ] Right sidebar shows "Popular Products" (desktop only)
- [ ] Chat messages have proper styling (user = purple, assistant = white)
- [ ] Timestamps show on messages

### Functional Tests - Basic
- [ ] Type "Hello" and press Enter → AI responds
- [ ] Click Send button → message sends
- [ ] Response appears within 5 seconds
- [ ] Typing indicator shows (3 bouncing dots) while waiting
- [ ] Messages auto-scroll to bottom
- [ ] Chat history saves (refresh page, messages persist)
- [ ] Click "Clear Chat" → messages clear except welcome

### Functional Tests - Quick Actions
- [ ] Click "💡 Recommend a product" → sends message and gets response
- [ ] Click "🔥 Popular items" → gets product list
- [ ] Click "🎯 Find deals" → gets deal information
- [ ] Click "🛒 Create mock order" → gets order creation help

### Functional Tests - AI Responses
Test these prompts:

#### Test 1: Greeting
**Send:** "Hello KAI"
- [ ] Response is friendly and welcoming
- [ ] Mentions KAI's capabilities
- [ ] Uses emojis appropriately

#### Test 2: Product Recommendation
**Send:** "I need a smartwatch under ₹2500"
- [ ] Recommends relevant products (Fire-Boltt, Noise)
- [ ] Mentions prices in ₹
- [ ] Provides brief product details
- [ ] Mentions platform availability

#### Test 3: Product Query
**Send:** "Tell me about boAt Rockerz 450"
- [ ] Provides accurate product information
- [ ] Mentions price (₹1,499)
- [ ] Describes features (battery, connectivity, etc.)
- [ ] References platforms (Amazon, Flipkart)

#### Test 4: Product Comparison
**Send:** "Compare Fire-Boltt Phoenix and Noise ColorFit Pro 3"
- [ ] Compares both smartwatches
- [ ] Lists key differences
- [ ] Mentions prices for both
- [ ] Helps user decide

#### Test 5: Non-existent Product
**Send:** "Tell me about iPhone 15 Pro Max"
- [ ] Handles gracefully (not in catalog)
- [ ] Suggests similar products or creates realistic mock
- [ ] Remains helpful

#### Test 6: Order Creation
**Send:** "I want to order the Mi Smart Band 6"
- [ ] Confirms product recognition
- [ ] Mentions price (₹2,999)
- [ ] Asks about quantity or confirms order
- [ ] Provides order details (Order ID, delivery date)

#### Test 7: Indian Context
**Send:** "What deals are available for Diwali?"
- [ ] Mentions Indian festivals/sales
- [ ] References Indian platforms
- [ ] Provides relevant offers

#### Test 8: Category Query
**Send:** "Show me all electronics"
- [ ] Lists electronics from catalog
- [ ] Mentions prices
- [ ] Provides brief descriptions

### Functional Tests - Sidebar
- [ ] Popular products display in right sidebar (desktop)
- [ ] Click product in sidebar → auto-sends question about product
- [ ] Product images load
- [ ] Prices show correctly

### Error Handling
- [ ] Send empty message → button disabled, nothing happens
- [ ] API error → friendly error message displays
- [ ] Network offline → error message appears

---

## 🛒 Products Page Tests

### Visual Tests
- [ ] Page header shows "Product Catalog"
- [ ] Search bar visible and styled
- [ ] Category filter buttons visible (All, Electronics, Wearables, etc.)
- [ ] Product count shows (e.g., "Showing 15 products")
- [ ] "Ask KAI for Help" button visible
- [ ] Products display in grid (4 columns on desktop)
- [ ] Each product card shows:
  - [ ] Image
  - [ ] Name
  - [ ] Category
  - [ ] Description (truncated)
  - [ ] Price in ₹
  - [ ] Stock count
  - [ ] "View Details" button
  - [ ] "Ask KAI" button (chat icon)
- [ ] Featured products show "⭐ Featured" badge

### Functional Tests - Filtering
- [ ] Click "Electronics" → shows only electronics
- [ ] Click "Wearables" → shows only wearables
- [ ] Click "Bags" → shows only bags
- [ ] Click "Accessories" → shows only accessories
- [ ] Click "Shoes" → shows only shoes
- [ ] Click "All" → shows all products
- [ ] Product count updates correctly

### Functional Tests - Search
- [ ] Type "boAt" → filters to boAt products
- [ ] Type "smart" → shows smartwatches and smart bands
- [ ] Type "₹1499" → shows products with that price
- [ ] Search is case-insensitive
- [ ] Clear search → shows all products again

### Functional Tests - Product Cards
- [ ] Click product image → opens product detail page
- [ ] Click product name → opens product detail page
- [ ] Click "View Details" → opens product detail page
- [ ] Click "Ask KAI" icon → navigates to chat with pre-filled question
- [ ] Hover effect works (shadow increases, image zooms slightly)

### Responsive Tests
- [ ] Grid shows 4 columns on desktop (1200px+)
- [ ] Grid shows 3 columns on tablet (768px-1199px)
- [ ] Grid shows 2 columns on mobile landscape (480px-767px)
- [ ] Grid shows 1 column on mobile portrait (<480px)

---

## 📱 Product Detail Page Tests

### Visual Tests
- [ ] Breadcrumb navigation shows (Home / Products / Product Name)
- [ ] Large product image displays (square aspect ratio)
- [ ] Product name in large heading
- [ ] Category shown
- [ ] Current price in large text (₹)
- [ ] Strikethrough original price shown
- [ ] Discount percentage badge ("X% OFF")
- [ ] "Inclusive of all taxes" text
- [ ] Description section
- [ ] Availability section (In Stock / Out of Stock)
- [ ] Platform availability shown
- [ ] Quantity selector (-, number, + buttons)
- [ ] Total price displays and updates
- [ ] "Buy Now" button (primary style)
- [ ] "Order via KAI Chat" button
- [ ] "Ask KAI About This Product" button
- [ ] Delivery info box (green background)
- [ ] Technical specifications table
- [ ] "Why Buy This Product" section (3 benefits)
- [ ] Customer support section at bottom

### Functional Tests - Quantity Selector
- [ ] Initial quantity is 1
- [ ] Click + button → quantity increases
- [ ] Click - button → quantity decreases
- [ ] Cannot go below 1
- [ ] Cannot exceed stock limit
- [ ] Total price updates automatically
- [ ] + button disabled when at max stock
- [ ] - button disabled when at 1

### Functional Tests - Ordering
- [ ] Click "Buy Now" → creates order
- [ ] Order confirmation alert shows:
  - [ ] Order ID (format: ORD-XXXXXXXXX)
  - [ ] Total price
  - [ ] Estimated delivery date
- [ ] After confirmation → redirects to Orders page
- [ ] Order appears in Orders list
- [ ] "Buy Now" disabled when out of stock

### Functional Tests - Chat Integration
- [ ] Click "Order via KAI Chat" → opens chat
- [ ] Pre-filled message appears about ordering product
- [ ] Click "Ask KAI About This Product" → opens chat
- [ ] Pre-filled message asks about product details

### Functional Tests - Navigation
- [ ] Click breadcrumb "Home" → goes to home page
- [ ] Click breadcrumb "Products" → goes to products page
- [ ] Click product image → opens in full view (if implemented)

### Data Accuracy
- [ ] Product name matches catalog
- [ ] Price matches catalog
- [ ] Stock count matches catalog
- [ ] Specifications display correctly
- [ ] Category is correct
- [ ] Platform availability is accurate

### Error Handling
- [ ] Invalid product ID → shows "Product Not Found" message
- [ ] "Browse All Products" button shown on error page
- [ ] Network error → graceful error message

---

## 📦 Orders Page Tests

### Visual Tests
- [ ] Page header shows "My Orders"
- [ ] Info banner displays (blue background, explaining demo mode)
- [ ] Order cards display with proper styling
- [ ] Each order card shows:
  - [ ] Product name
  - [ ] Order ID
  - [ ] Status badge (colored by status)
  - [ ] Total price in ₹
  - [ ] Quantity
  - [ ] Order date
  - [ ] Estimated delivery date
  - [ ] Days remaining
  - [ ] Unit price
  - [ ] "View Product" button
  - [ ] "Ask KAI About Order" button
  - [ ] "Cancel Order" button (if applicable)
- [ ] Order timeline visualization at bottom of each card
- [ ] Summary stats show at bottom (Total Orders, Processing, Shipped, Delivered)

### Functional Tests - Display
- [ ] Orders display newest first (most recent at top)
- [ ] Status colors correct:
  - [ ] Processing = Blue
  - [ ] Shipped = Purple
  - [ ] Delivered = Green
  - [ ] Cancelled = Red
- [ ] Timeline correctly shows progress:
  - [ ] Processing orders: 1st dot filled
  - [ ] Shipped orders: 2 dots filled
  - [ ] Delivered orders: all 3 dots filled

### Functional Tests - Actions
- [ ] Click "View Product" → navigates to product detail page
- [ ] Click "Ask KAI About Order" → opens chat
- [ ] Click "Cancel Order" → confirmation dialog appears
- [ ] Confirm cancellation → order status changes to "Cancelled"
- [ ] Cancelled order → "Cancel Order" button hidden
- [ ] Delivered order → "Cancel Order" button hidden

### Functional Tests - Empty State
- [ ] With no orders → shows empty state message
- [ ] Empty state shows helpful text
- [ ] "Browse Products" button present
- [ ] "Chat with KAI" button present

### Functional Tests - Statistics
- [ ] Total Orders count is accurate
- [ ] Processing count matches actual processing orders
- [ ] Shipped count matches actual shipped orders
- [ ] Delivered count matches actual delivered orders
- [ ] Statistics update after order creation/cancellation

### Data Accuracy
- [ ] Order IDs are unique
- [ ] Dates format correctly
- [ ] Times format correctly (12-hour format)
- [ ] Prices calculate correctly (price × quantity)
- [ ] Delivery estimates are reasonable (5-7 days)

---

## 🔧 Admin Panel Tests

### Visual Tests - Products Tab
- [ ] "Products" tab active by default
- [ ] Product count shows in tab label
- [ ] "+ Add New Product" button visible
- [ ] Products table displays with columns:
  - [ ] Product (with thumbnail image)
  - [ ] Category
  - [ ] Price (₹)
  - [ ] Stock
  - [ ] Featured (Yes/No badge)
  - [ ] Actions (Edit/Delete)
- [ ] Table rows alternate colors for readability

### Functional Tests - Add Product
- [ ] Click "+ Add New Product" → form appears
- [ ] Form fields present:
  - [ ] Name (text input)
  - [ ] Category (dropdown)
  - [ ] Price (number input, ₹)
  - [ ] Stock (number input)
  - [ ] Image URL (text input)
  - [ ] Description (textarea)
  - [ ] Featured (checkbox)
- [ ] Fill all fields → click "Add Product"
- [ ] Success alert appears
- [ ] New product appears in table
- [ ] New product visible on Products page
- [ ] Click "Cancel" → form closes without saving

### Functional Tests - Edit Product
- [ ] Click "Edit" on any product → form appears with pre-filled data
- [ ] Modify fields → click "Update Product"
- [ ] Success alert appears
- [ ] Changes reflect in table
- [ ] Changes visible on Products page
- [ ] Changes visible in product detail page

### Functional Tests - Delete Product
- [ ] Click "Delete" on any product → confirmation dialog
- [ ] Click Cancel → product not deleted
- [ ] Click OK → product deleted
- [ ] Success alert appears
- [ ] Product removed from table
- [ ] Product no longer on Products page

### Visual Tests - Orders Tab
- [ ] Click "Orders" tab → switches view
- [ ] Order count shows in tab label
- [ ] Orders table displays with columns:
  - [ ] Order ID
  - [ ] Product
  - [ ] Qty
  - [ ] Total (₹)
  - [ ] Status (dropdown)
  - [ ] Order Date
  - [ ] Actions (View Product link)
- [ ] Orders sorted by date (newest first)

### Functional Tests - Update Order Status
- [ ] Click status dropdown on any order
- [ ] Options available: Processing, Shipped, Delivered, Cancelled
- [ ] Select different status → status updates immediately
- [ ] Success alert appears
- [ ] Updated status visible on Orders page
- [ ] Timeline updates on Orders page

### Functional Tests - View Order Product
- [ ] Click "View Product" link → opens product in new tab
- [ ] Correct product page opens

### Data Validation
- [ ] Cannot submit product form with empty required fields
- [ ] Price must be positive number
- [ ] Stock must be non-negative integer
- [ ] Image URL should be valid URL format

### Error Handling
- [ ] Network error during add → error message shown
- [ ] Network error during edit → error message shown
- [ ] Network error during delete → error message shown
- [ ] Invalid data → appropriate error message

---

## 🎨 UI/UX Tests

### Navigation Bar
- [ ] Logo visible and clickable → goes to home
- [ ] All nav links visible: Home, Chat, Products, Orders, Admin
- [ ] Active page highlighted (different background color)
- [ ] Hover effects work
- [ ] Responsive: collapses on mobile (if implemented)
- [ ] Sticky navigation (stays at top on scroll)

### Color Scheme
- [ ] Primary color: Indigo (#6366f1) used consistently
- [ ] Secondary color: Purple (#8b5cf6) used consistently
- [ ] Gradients look smooth
- [ ] Text readable on all backgrounds
- [ ] Proper contrast ratios

### Typography
- [ ] Headings use proper hierarchy (h1, h2, h3)
- [ ] Body text readable (minimum 16px)
- [ ] Font family consistent (Inter)
- [ ] Line heights appropriate

### Spacing & Layout
- [ ] Consistent padding and margins
- [ ] Proper whitespace between sections
- [ ] Content doesn't touch screen edges
- [ ] Max-width containers for readability

### Animations & Transitions
- [ ] Hover effects smooth (200-300ms)
- [ ] Page transitions smooth
- [ ] Loading animations present
- [ ] No janky animations
- [ ] Floating chat button pulses
- [ ] Typing indicator animates

### Accessibility
- [ ] All buttons have visible focus states
- [ ] Color contrast meets WCAG standards
- [ ] Alt text on images (if implemented)
- [ ] Keyboard navigation works (Tab through elements)
- [ ] Form labels properly associated

---

## 🌐 Cross-Browser Tests

### Desktop Browsers
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)

### Mobile Browsers
- [ ] Chrome Mobile (Android)
- [ ] Safari (iOS)
- [ ] Firefox Mobile

### Test in Each Browser
- [ ] All pages load
- [ ] Images display
- [ ] Chat works
- [ ] Forms submit
- [ ] Navigation works
- [ ] Styling consistent

---

## 📱 Responsive Design Tests

### Desktop (1920x1080)
- [ ] Full layout with sidebar
- [ ] 4-column product grid
- [ ] All features visible

### Laptop (1366x768)
- [ ] Layout adjusts properly
- [ ] Still readable and usable

### Tablet Portrait (768x1024)
- [ ] 2-3 column product grid
- [ ] Chat sidebar hidden (or collapsible)
- [ ] Touch-friendly buttons

### Mobile Landscape (667x375)
- [ ] 2-column product grid
- [ ] Navigation accessible
- [ ] Content readable

### Mobile Portrait (375x667)
- [ ] Single-column layout
- [ ] Touch-friendly (min 44x44px buttons)
- [ ] No horizontal scroll
- [ ] Text readable without zoom

---

## ⚡ Performance Tests

### Page Load Speed
- [ ] Landing page loads in <2 seconds
- [ ] Products page loads in <2 seconds
- [ ] Product detail page loads in <1.5 seconds
- [ ] Chat page loads in <1.5 seconds

### Image Loading
- [ ] Images use lazy loading
- [ ] Images have proper dimensions
- [ ] No layout shift when images load

### AI Response Time
- [ ] Chat response within 5 seconds (typical)
- [ ] Acceptable with slow network

### Optimization
- [ ] No console errors in browser
- [ ] No console warnings (or minimal)
- [ ] Bundle size reasonable (<500KB for main chunks)

---

## 🔒 Security Tests

### Input Validation
- [ ] Chat input sanitized (no XSS)
- [ ] Product form inputs validated
- [ ] Order form inputs validated
- [ ] No SQL injection possible (using JSON files)

### API Security
- [ ] API key not exposed in frontend
- [ ] API routes return appropriate errors
- [ ] Rate limiting considered (not implemented but documented)

### HTTPS
- [ ] Production uses HTTPS (when deployed)
- [ ] No mixed content warnings

---

## 🐛 Edge Cases & Error Scenarios

### Network Issues
- [ ] Offline → friendly error messages
- [ ] Slow network → loading indicators
- [ ] API timeout → error handling

### Data Issues
- [ ] Empty product catalog → handled gracefully
- [ ] Empty orders → empty state shown
- [ ] Missing product image → placeholder or graceful fail

### User Actions
- [ ] Rapid clicking → no duplicate orders
- [ ] Invalid URLs → 404 or redirect
- [ ] Large order quantities → handled properly

---

## ✅ Final Acceptance Criteria

### Must Have (Critical)
- [ ] All pages load without errors
- [ ] AI chatbot responds correctly
- [ ] Products display with images and prices
- [ ] Orders can be created and viewed
- [ ] Admin panel allows CRUD operations
- [ ] Navigation works on all pages
- [ ] Indian currency (₹) displayed everywhere
- [ ] No console errors

### Should Have (Important)
- [ ] Responsive design works well
- [ ] Loading states show appropriately
- [ ] Error messages are user-friendly
- [ ] Chat history persists
- [ ] Form validation works
- [ ] Images load properly

### Nice to Have (Enhancement)
- [ ] Animations smooth and pleasant
- [ ] Excellent mobile experience
- [ ] Fast page load times
- [ ] Comprehensive error handling
- [ ] Helpful empty states

---

## 📊 Test Results Summary

**Date Tested:** ___________________

**Tested By:** ___________________

**Browser:** ___________________

**Device:** ___________________

### Results:
- **Total Tests:** _____
- **Passed:** _____
- **Failed:** _____
- **Not Applicable:** _____

### Critical Issues Found:
1. ________________________________
2. ________________________________
3. ________________________________

### Minor Issues Found:
1. ________________________________
2. ________________________________
3. ________________________________

### Overall Status: ☐ PASS  ☐ FAIL  ☐ NEEDS WORK

**Notes:**
_________________________________________
_________________________________________
_________________________________________

---

**Ready for Production?** ☐ YES  ☐ NO

---

## 🎉 Completion

If all critical tests pass, your KAI website is ready!

**Next Steps:**
1. Fix any failed tests
2. Deploy to production
3. Monitor in production
4. Gather user feedback

**Happy Testing! 🧪**
