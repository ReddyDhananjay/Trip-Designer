# 🏃 Quick Start - Run Locally (5 Minutes)

## For Complete Beginners - Step by Step

---

## 📋 What You Need

1. **A Computer** (Mac, Windows, or Linux)
2. **Internet Connection**
3. **10 minutes of your time**

---

## 🚀 Let's Start!

### Step 1: Install Node.js (5 minutes)

**What is Node.js?** It's a program that lets you run the website on your computer.

#### On Mac:
1. Go to: https://nodejs.org/
2. Click the big green button that says **"Download Node.js (LTS)"**
3. Open the downloaded file (e.g., `node-v20.x.x.pkg`)
4. Click "Continue" → "Continue" → "Install"
5. Enter your Mac password
6. Click "Close" when done

#### On Windows:
1. Go to: https://nodejs.org/
2. Click the big green button that says **"Download Node.js (LTS)"**
3. Open the downloaded file (e.g., `node-v20.x.x.msi`)
4. Click "Next" → "Next" → "Install"
5. Click "Finish" when done

#### Verify Installation:
Open Terminal (Mac) or Command Prompt (Windows):

**Mac:** Press `Cmd + Space`, type "Terminal", press Enter

**Windows:** Press `Win + R`, type "cmd", press Enter

Then type:
```bash
node --version
```

You should see something like: `v20.x.x`

---

### Step 2: Get the Project Files

#### If you have the ZIP file:

**On Mac:**
```bash
# Open Terminal
cd ~/Desktop

# Unzip (replace with your actual zip filename)
unzip kai-website-updated.zip

# Enter the folder
cd kai-website
```

**On Windows:**
```bash
# Open Command Prompt
cd %USERPROFILE%\Desktop

# Right-click the ZIP → "Extract All"
# Then:
cd kai-website
```

#### If you already have the folder:
```bash
# Navigate to wherever you saved it
cd /path/to/kai-website
```

---

### Step 3: Install Dependencies (2 minutes)

**What are dependencies?** They're extra code libraries the website needs to run.

In your terminal (make sure you're in the `kai-website` folder):

```bash
npm install
```

**Wait 1-2 minutes.** You'll see a lot of text scrolling. That's normal!

When done, you'll see:
```
added 127 packages, and audited 128 packages in 8s
```

---

### Step 4: Start the Website (10 seconds)

```bash
npm run dev
```

**You should see:**
```
▲ Next.js 14.2.33
- Local:        http://localhost:3000

✓ Ready in 2.5s
```

**🎉 Success! The website is now running!**

---

### Step 5: Open the Website

1. **Open your web browser** (Chrome, Safari, Firefox, Edge)
2. **Type in the address bar:** `localhost:3000`
3. **Press Enter**

**You should see:** The KAI website homepage with a purple floating button in the bottom-right corner!

---

## 🎯 What to Test

### 1. Click the Floating Button
- Look at the **bottom-right corner** of the homepage
- See a **purple circular button** with a chat icon?
- **Click it!** It should take you to the chat page

### 2. Try the Chatbot
In the chat page, type:
```
Show me smartwatches under ₹3000
```

The AI should respond with product suggestions!

### 3. Browse Products
- Click **"Products"** in the navigation bar
- You should see 15 Indian products with ₹ prices
- Click any product to see details

### 4. Create a Mock Order
- From chat, type: "I want to buy Fire-Boltt Phoenix"
- Or from a product page, click "Create Mock Order"
- Then go to **"Orders"** page to see your order

---

## 🛑 How to Stop the Website

In your terminal, press:
```
Ctrl + C
```

The website will stop running.

To start it again:
```bash
npm run dev
```

---

## 🐛 Common Problems & Solutions

### Problem 1: "npm: command not found"
**What it means:** Node.js isn't installed correctly.

**Solution:**
- Re-install Node.js from https://nodejs.org/
- Restart your terminal
- Try `node --version` again

---

### Problem 2: "Port 3000 already in use"
**What it means:** Something else is using port 3000.

**Solution on Mac:**
```bash
lsof -ti:3000 | xargs kill -9
npm run dev
```

**Solution on Windows:**
```bash
netstat -ano | findstr :3000
# Note the PID number, then:
taskkill /PID <PID_NUMBER> /F
npm run dev
```

---

### Problem 3: "Cannot find module"
**What it means:** Dependencies didn't install correctly.

**Solution:**
```bash
# Delete and reinstall
rm -rf node_modules
npm install
npm run dev
```

---

### Problem 4: Website loads but chatbot doesn't respond
**What it means:** The API key might be missing.

**Solution:**
Check if `.env.local` file exists in your project folder.

**Create it if missing:**

**On Mac:**
```bash
echo "OPENROUTER_API_KEY=<your_openrouter_api_key>" > .env.local
```

**On Windows:**
```bash
echo OPENROUTER_API_KEY=<your_openrouter_api_key> > .env.local
```

Then restart the server:
```bash
# Stop with Ctrl+C
npm run dev
```

---

### Problem 5: "Cannot GET /" or blank page
**What it means:** Build might have failed.

**Solution:**
```bash
# Stop server (Ctrl+C)
npm run build
npm run dev
```

---

### Problem 6: Prices showing $ instead of ₹
**What it means:** Browser cached old version.

**Solution:**
**Hard refresh:**
- **Mac:** `Cmd + Shift + R`
- **Windows:** `Ctrl + Shift + R`

---

## 📱 Access from Your Phone (Same WiFi)

Want to test on your phone?

### Step 1: Find Your Computer's IP Address

**On Mac:**
```bash
ipconfig getifaddr en0
```

**On Windows:**
```bash
ipconfig
```
Look for "IPv4 Address" (e.g., 192.168.1.100)

### Step 2: On Your Phone
Make sure phone is on the **same WiFi network**.

Open browser on phone and go to:
```
http://192.168.1.100:3000
```
(Replace with your actual IP address)

---

## 🎓 Understanding the Commands

```bash
npm install        # Downloads all required code libraries
npm run dev        # Starts the website in development mode
npm run build      # Prepares website for production
npm start          # Runs the production version
npm run lint       # Checks code for errors
```

---

## 📂 Project Structure (What's What)

```
kai-website/
├── app/              # Website pages
│   ├── page.tsx      # Homepage
│   ├── chat/         # Chat page
│   ├── products/     # Products pages
│   ├── orders/       # Orders page
│   └── admin/        # Admin panel
├── data/             # Product and order data
├── pages/api/        # Backend API (chatbot)
├── components/       # Reusable UI parts
├── .env.local        # API key (SECRET - don't share!)
└── package.json      # Project configuration
```

---

## 🔄 Making Changes

Want to modify the website?

1. **Edit files** in your code editor (VS Code recommended)
2. **Save the file**
3. **Browser auto-refreshes** - see changes instantly!

**Example:** Try changing the homepage title:
- Open `app/page.tsx`
- Find the line with "Meet KAI"
- Change it to "Welcome to KAI"
- Save
- Browser refreshes automatically!

---

## 💾 Recommended Code Editor

**VS Code** (Free and excellent):
1. Download: https://code.visualstudio.com/
2. Install
3. Open VS Code
4. File → Open Folder → Select `kai-website`
5. Now you can edit files easily!

---

## ✅ You're All Set!

**To run the website anytime:**
```bash
cd /path/to/kai-website
npm run dev
```

**To stop:**
```
Ctrl + C
```

---

## 🎯 Next Steps

1. ✅ Get it running locally (You just did this!)
2. 📝 Try making small changes
3. 🧪 Test all features
4. 🚀 Deploy to internet (See DEPLOYMENT_GUIDE.md)

---

## 💡 Quick Tips

1. **Terminal Shortcuts:**
   - `Ctrl + C` - Stop server
   - `Ctrl + L` - Clear terminal
   - `↑ arrow` - Previous command

2. **Browser Shortcuts:**
   - `Cmd/Ctrl + R` - Refresh page
   - `Cmd/Ctrl + Shift + R` - Hard refresh (clears cache)
   - `F12` - Open developer tools (see errors)

3. **Always in project folder:**
   Before running commands, make sure you're in the right folder:
   ```bash
   pwd  # Shows current folder
   ```

---

## 🆘 Still Having Issues?

### Check These:
1. ✅ Node.js installed? `node --version`
2. ✅ In correct folder? `pwd` should show path to kai-website
3. ✅ Dependencies installed? Look for `node_modules` folder
4. ✅ Server running? Should see "Ready in X.Xs"
5. ✅ Correct URL? Should be `localhost:3000`

### Common Beginner Mistakes:
❌ Forgetting to run `npm install`
❌ Being in wrong folder
❌ Not stopping old server before starting new one
❌ Typing wrong URL (it's `localhost:3000` not `localhost`)

---

## 🎉 Congratulations!

You've successfully:
- ✅ Installed Node.js
- ✅ Set up the project
- ✅ Started the website
- ✅ Tested it in your browser

**You're now a local developer!** 🎊

---

## 📖 Learn More

Want to understand how it works?
- **Next.js Tutorial:** https://nextjs.org/learn
- **React Basics:** https://react.dev/learn
- **TypeScript:** https://www.typescriptlang.org/docs/

---

**Need more help? Check DEPLOYMENT_GUIDE.md for deploying to the internet!**
