# 🚀 KAI Website - Deployment & Running Guide

## Table of Contents
1. [Local Development Setup](#local-development-setup)
2. [Production Build](#production-build)
3. [Deploy to Vercel (Recommended)](#deploy-to-vercel)
4. [Deploy to Netlify](#deploy-to-netlify)
5. [Deploy to Other Platforms](#other-deployment-options)
6. [Environment Variables](#environment-variables)
7. [Troubleshooting](#troubleshooting)

---

## 🖥️ Local Development Setup

### Prerequisites

1. **Install Node.js** (Required)
   - Download from: https://nodejs.org/
   - Get LTS version (v18 or v20)
   - Check installation: `node --version` and `npm --version`

2. **Install Git** (Optional but recommended)
   - Download from: https://git-scm.com/

---

### Step 1: Get the Code

#### Option A: If you have the ZIP file
```bash
# Navigate to where you downloaded the ZIP
cd ~/Downloads

# Unzip the file
unzip kai-website-updated.zip -d kai-website

# Enter the directory
cd kai-website
```

#### Option B: If you have the project folder
```bash
# Navigate to the project
cd /workspace
# or wherever your project is located
```

---

### Step 2: Install Dependencies

```bash
# Make sure you're in the project directory
pwd
# Should show: /workspace or your project path

# Install all required packages
npm install
```

**Expected output:**
```
added 127 packages, and audited 128 packages in 8s
✓ Done
```

---

### Step 3: Set Up Environment Variables

The `.env.local` file should already exist with the OpenRouter API key.

**Verify it exists:**
```bash
cat .env.local
```

**Expected output:**
```
OPENROUTER_API_KEY=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
```

**If the file doesn't exist, create it:**
```bash
echo "OPENROUTER_API_KEY=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" > .env.local
```

---

### Step 4: Run Development Server

```bash
npm run dev
```

**Expected output:**
```
▲ Next.js 14.2.33
- Local:        http://localhost:3000
- Network:      http://192.168.x.x:3000

✓ Ready in 2.5s
```

---

### Step 5: Open in Browser

1. **Open your web browser** (Chrome, Safari, Firefox, Edge)
2. **Go to:** `http://localhost:3000`
3. **You should see:** The KAI website homepage with floating chatbot button

---

### 🎯 Quick Test After Starting

1. ✅ Homepage loads with purple floating button (bottom-right)
2. ✅ Click floating button → goes to chat page
3. ✅ All prices show ₹ (Indian Rupees)
4. ✅ Click Chat and type: "Show me smartwatches"
5. ✅ AI should respond with Indian products

---

### 🛑 To Stop the Server

Press `Ctrl + C` in the terminal

---

## 🏗️ Production Build

Before deploying, test the production build locally:

```bash
# Build the production version
npm run build
```

**Expected output:**
```
✓ Compiled successfully
✓ Generating static pages (8/8)
✓ Finalizing page optimization

Route (app)                               Size     First Load JS
┌ ○ /                                     2.42 kB        98.4 kB
├ ○ /chat                                 2.48 kB        89.7 kB
└ ○ /products                             2.12 kB        98.1 kB
...
```

**Run production build locally:**
```bash
npm start
```

Then open: `http://localhost:3000`

---

## ☁️ Deploy to Vercel (Recommended - Easiest)

Vercel is the best platform for Next.js apps (made by the Next.js creators).

### Method 1: Deploy via Vercel CLI (5 minutes)

#### Step 1: Install Vercel CLI
```bash
npm install -g vercel
```

#### Step 2: Login to Vercel
```bash
vercel login
```
Follow the prompts to authenticate via email or GitHub.

#### Step 3: Deploy
```bash
# From your project directory
cd /workspace  # or your project path

# Deploy to Vercel
vercel
```

**Follow the prompts:**
```
? Set up and deploy "~/workspace"? [Y/n] Y
? Which scope do you want to deploy to? Your Name
? Link to existing project? [y/N] N
? What's your project's name? kai-website
? In which directory is your code located? ./
Auto-detected Project Settings (Next.js):
- Build Command: next build
- Development Command: next dev --port 3000
- Install Command: npm install
- Output Directory: .next
? Want to modify these settings? [y/N] N
```

#### Step 4: Add Environment Variable
```bash
# Add the OpenRouter API key
vercel env add OPENROUTER_API_KEY

# When prompted, paste:
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

# Select: Production, Preview, Development (select all)
```

#### Step 5: Redeploy with Environment Variable
```bash
vercel --prod
```

**🎉 Done!** You'll get a URL like: `https://kai-website-xxxx.vercel.app`

---

### Method 2: Deploy via Vercel Dashboard (10 minutes)

#### Step 1: Create Vercel Account
1. Go to: https://vercel.com/signup
2. Sign up with GitHub, GitLab, or Email

#### Step 2: Push Code to GitHub
```bash
# Initialize git (if not already)
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit - KAI website"

# Create a new repository on GitHub.com
# Then push:
git remote add origin https://github.com/yourusername/kai-website.git
git branch -M main
git push -u origin main
```

#### Step 3: Import Project to Vercel
1. Go to: https://vercel.com/dashboard
2. Click **"Add New..."** → **"Project"**
3. Click **"Import"** next to your GitHub repository
4. Click **"Import"**

#### Step 4: Configure Project
- **Framework Preset:** Next.js (auto-detected)
- **Root Directory:** ./
- **Build Command:** `npm run build` (auto-filled)
- **Output Directory:** `.next` (auto-filled)
- **Install Command:** `npm install` (auto-filled)

#### Step 5: Add Environment Variables
1. Click **"Environment Variables"**
2. Add:
   - **Name:** `OPENROUTER_API_KEY`
   - **Value:** `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`
3. Select: Production, Preview, Development

#### Step 6: Deploy
1. Click **"Deploy"**
2. Wait 2-3 minutes
3. **🎉 Done!** You'll get a URL like: `https://kai-website.vercel.app`

---

## 🌐 Deploy to Netlify

### Method 1: Netlify CLI

#### Step 1: Install Netlify CLI
```bash
npm install -g netlify-cli
```

#### Step 2: Login
```bash
netlify login
```

#### Step 3: Initialize and Deploy
```bash
# From your project directory
cd /workspace

# Initialize
netlify init

# Build and deploy
netlify deploy --prod
```

#### Step 4: Set Environment Variables
```bash
netlify env:set OPENROUTER_API_KEY "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"
```

---

### Method 2: Netlify Dashboard

#### Step 1: Build Configuration
Create `netlify.toml` in your project root:
```bash
cat > netlify.toml << 'EOF'
[build]
  command = "npm run build"
  publish = ".next"

[[plugins]]
  package = "@netlify/plugin-nextjs"
EOF
```

#### Step 2: Deploy
1. Go to: https://app.netlify.com/
2. Drag and drop your project folder
3. Or connect via GitHub (like Vercel method)
4. Add environment variable in Site Settings → Environment Variables

---

## 🐳 Other Deployment Options

### Railway

1. Go to: https://railway.app/
2. Click "New Project" → "Deploy from GitHub"
3. Select your repository
4. Add environment variable: `OPENROUTER_API_KEY`
5. Railway auto-detects Next.js and deploys

### Render

1. Go to: https://render.com/
2. Click "New" → "Web Service"
3. Connect your GitHub repository
4. **Build Command:** `npm install && npm run build`
5. **Start Command:** `npm start`
6. Add environment variable: `OPENROUTER_API_KEY`

### DigitalOcean App Platform

1. Go to: https://cloud.digitalocean.com/apps
2. Click "Create App"
3. Connect GitHub repository
4. Auto-detects Next.js
5. Add environment variable

### AWS (Advanced)

Use AWS Amplify:
1. Go to: https://console.aws.amazon.com/amplify/
2. Click "Get Started" under "Amplify Hosting"
3. Connect repository
4. Add environment variable

---

## 🔐 Environment Variables

### Required Variable

```bash
OPENROUTER_API_KEY=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
```

### How to Add in Different Platforms

**Vercel:**
```bash
vercel env add OPENROUTER_API_KEY
```
Or: Dashboard → Project Settings → Environment Variables

**Netlify:**
```bash
netlify env:set OPENROUTER_API_KEY "your-key"
```
Or: Site Settings → Environment Variables

**Render:**
Environment → Add Environment Variable

**Railway:**
Variables tab → Add Variable

---

## 🔧 Custom Domain (Optional)

### On Vercel:
1. Go to: Project Settings → Domains
2. Add your domain: `www.yoursite.com`
3. Update DNS records as instructed

### On Netlify:
1. Go to: Domain Settings → Add custom domain
2. Follow DNS configuration steps

---

## 🧪 Test Your Deployment

After deploying, test these:

1. **Homepage:**
   - ✅ Loads correctly
   - ✅ Floating chatbot button visible
   - ✅ Featured products show ₹ prices

2. **Chat Page:**
   - ✅ Type: "Show me smartwatches"
   - ✅ AI responds (if not, check environment variable)
   - ✅ Prices in ₹

3. **Products Page:**
   - ✅ All products load
   - ✅ Search works
   - ✅ Filters work

4. **Orders Page:**
   - ✅ Create an order
   - ✅ View order history

---

## 🐛 Troubleshooting

### Problem: "npm: command not found"
**Solution:** Install Node.js from https://nodejs.org/

### Problem: "Port 3000 already in use"
**Solution:**
```bash
# On Mac/Linux:
lsof -ti:3000 | xargs kill -9

# On Windows:
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Then run again:
npm run dev
```

### Problem: "Module not found" errors
**Solution:**
```bash
# Delete node_modules and reinstall
rm -rf node_modules
rm package-lock.json
npm install
```

### Problem: Chatbot not responding in production
**Solution:**
1. Check environment variable is set correctly
2. Check browser console for errors (F12 → Console)
3. Verify OpenRouter API key is valid
4. Check API route is working: `https://yoursite.com/api/chat`

### Problem: Build fails
**Solution:**
```bash
# Check for TypeScript errors
npm run build

# If errors, fix them in the code
# Then rebuild
```

### Problem: Images not loading
**Solution:**
- Images use Unsplash URLs (requires internet)
- Check if Unsplash is accessible
- Or replace with local images

### Problem: .env.local not working in production
**Solution:**
- `.env.local` only works in development
- In production, set environment variables in your hosting platform
- Vercel: Project Settings → Environment Variables
- Netlify: Site Settings → Environment Variables

---

## 📊 Performance Optimization (Optional)

### 1. Enable Caching
Already configured in Next.js automatically.

### 2. Image Optimization
Replace Unsplash URLs with Next.js Image component:
```tsx
import Image from 'next/image';

<Image src="/images/product.jpg" width={500} height={500} alt="Product" />
```

### 3. Analytics (Optional)
Add Google Analytics or Vercel Analytics in `app/layout.tsx`

---

## 🔄 Update Deployment

### Vercel:
```bash
# Just push to GitHub (if connected)
git add .
git commit -m "Update"
git push

# Or use CLI:
vercel --prod
```

### Netlify:
```bash
git push  # If connected to GitHub
# Or:
netlify deploy --prod
```

---

## 📝 Quick Command Reference

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm start            # Start production server
npm run lint         # Run linter

# Deployment
vercel               # Deploy to Vercel (preview)
vercel --prod        # Deploy to Vercel (production)
netlify deploy       # Deploy to Netlify (preview)
netlify deploy --prod # Deploy to Netlify (production)

# Troubleshooting
rm -rf node_modules  # Delete dependencies
npm install          # Reinstall dependencies
npm run build        # Test build
```

---

## ✅ Deployment Checklist

Before deploying:
- [ ] Test locally with `npm run dev`
- [ ] Test production build with `npm run build`
- [ ] Verify `.env.local` has API key
- [ ] Test chatbot functionality
- [ ] Test all pages load correctly
- [ ] Check mobile responsiveness

After deploying:
- [ ] Test deployed URL
- [ ] Verify environment variable set in hosting platform
- [ ] Test chatbot on production
- [ ] Test order creation
- [ ] Check all pages accessible
- [ ] Test on mobile device

---

## 🎉 You're Done!

Your KAI website should now be:
- ✅ Running locally OR
- ✅ Deployed to production

**Need help?** Check the troubleshooting section above!

---

## 📞 Support Resources

- **Next.js Docs:** https://nextjs.org/docs
- **Vercel Docs:** https://vercel.com/docs
- **Netlify Docs:** https://docs.netlify.com/
- **OpenRouter Docs:** https://openrouter.ai/docs

---

**Happy Deploying! 🚀**
