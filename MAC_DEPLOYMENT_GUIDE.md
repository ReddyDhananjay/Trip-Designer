# 🍎 Mac Deployment Guide - KAI Website

Complete step-by-step guide for deploying KAI website to internet from Mac.

**Time Required:** 10-15 minutes
**Difficulty:** Beginner-friendly
**Platform:** macOS (All versions)

---

## Quick Steps Summary

1. Install Node.js from https://nodejs.org/
2. Open Terminal and navigate to project
3. Run: `npm install`
4. Run: `npm install -g vercel`
5. Run: `vercel login`
6. Run: `vercel`
7. Run: `vercel env add OPENROUTER_API_KEY`
8. Run: `vercel --prod`
9. Done! Your website is live!

---

## Detailed Instructions

See DEPLOYMENT_GUIDE.md for complete step-by-step instructions.

For Mac-specific Terminal commands and troubleshooting, all commands use Mac Terminal syntax.

---

## Mac Terminal Shortcuts

- `Cmd + Space` → Open Spotlight (search for Terminal)
- `Cmd + K` → Clear Terminal screen
- `Cmd + C` → Copy
- `Cmd + V` → Paste
- `Control + C` → Stop running command
- `↑` → Previous command
- `Tab` → Auto-complete

---

## Common Mac Commands

```bash
# Navigate to project
cd ~/Desktop/kai-website

# Install dependencies
npm install

# Install Vercel globally
npm install -g vercel

# Login
vercel login

# Deploy
vercel --prod
```

---

## Need Help?

Read the complete guide in DEPLOYMENT_GUIDE.md or RUN_LOCALLY.md for detailed Mac instructions.
