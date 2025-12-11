# 🚀 Deployment Guide - KAI Voice of Commerce

Complete guide for deploying KAI to various platforms.

---

## 📋 Table of Contents

- [Pre-Deployment Checklist](#pre-deployment-checklist)
- [Deploy to Netlify](#deploy-to-netlify)
- [Deploy to Vercel](#deploy-to-vercel)
- [Deploy to AWS](#deploy-to-aws)
- [Deploy to Custom Server (Nginx)](#deploy-to-custom-server-nginx)
- [Environment Variables](#environment-variables)
- [Post-Deployment](#post-deployment)

---

## ✅ Pre-Deployment Checklist

Before deploying, ensure:

- [ ] All tests pass (`npm test`)
- [ ] Production build works (`npm run build`)
- [ ] Environment variables configured
- [ ] API endpoints updated for production
- [ ] Analytics tracking added (optional)
- [ ] Error monitoring configured (Sentry, etc.)
- [ ] Domain name registered (if applicable)
- [ ] SSL certificate ready (for custom domains)

---

## 🌐 Deploy to Netlify

### Option 1: Netlify CLI

1. **Install Netlify CLI**
   ```bash
   npm install -g netlify-cli
   ```

2. **Build the project**
   ```bash
   npm run build
   ```

3. **Login to Netlify**
   ```bash
   netlify login
   ```

4. **Deploy**
   ```bash
   netlify deploy --prod
   ```

5. **Follow prompts**
   - Choose "Create & configure a new site"
   - Select your team
   - Enter site name (optional)
   - Set publish directory: `dist`

### Option 2: GitHub Integration

1. **Push code to GitHub**
   ```bash
   git push origin main
   ```

2. **Connect to Netlify**
   - Go to [app.netlify.com](https://app.netlify.com)
   - Click "New site from Git"
   - Choose GitHub and select repository
   - Configure build settings:
     - **Build command**: `npm run build`
     - **Publish directory**: `dist`

3. **Set environment variables**
   - Go to Site settings > Environment variables
   - Add `VITE_API_BASE_URL`

4. **Deploy**
   - Click "Deploy site"
   - Netlify will auto-deploy on every push

### netlify.toml Configuration

Create `netlify.toml` in project root:

```toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

[build.environment]
  NODE_VERSION = "18"
```

---

## ▲ Deploy to Vercel

### Option 1: Vercel CLI

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Login**
   ```bash
   vercel login
   ```

3. **Deploy**
   ```bash
   vercel --prod
   ```

### Option 2: GitHub Integration

1. **Push to GitHub**
   ```bash
   git push origin main
   ```

2. **Import to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import GitHub repository
   - Configure:
     - **Framework Preset**: Vite
     - **Build Command**: `npm run build`
     - **Output Directory**: `dist`

3. **Set environment variables**
   - Add `VITE_API_BASE_URL` in project settings

4. **Deploy**
   - Vercel auto-deploys on every push to main

### vercel.json Configuration

Create `vercel.json`:

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "framework": "vite",
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

---

## ☁️ Deploy to AWS

### S3 + CloudFront

1. **Build the project**
   ```bash
   npm run build
   ```

2. **Create S3 bucket**
   ```bash
   aws s3 mb s3://kai-commerce-web
   ```

3. **Enable static website hosting**
   ```bash
   aws s3 website s3://kai-commerce-web \
     --index-document index.html \
     --error-document index.html
   ```

4. **Upload files**
   ```bash
   aws s3 sync dist/ s3://kai-commerce-web \
     --delete \
     --cache-control max-age=31536000,public
   ```

5. **Create CloudFront distribution**
   - Go to AWS Console > CloudFront
   - Create distribution
   - Origin: S3 bucket
   - Enable HTTPS
   - Set custom error response: 404 -> /index.html

6. **Update DNS**
   - Add CNAME record pointing to CloudFront URL

### EC2 (with Nginx)

See [Custom Server section](#deploy-to-custom-server-nginx) below.

---

## 🖥️ Deploy to Custom Server (Nginx)

### Prerequisites

- Ubuntu/Debian server with sudo access
- Domain name pointing to server IP
- SSL certificate (Let's Encrypt)

### Step 1: Prepare Server

```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Nginx
sudo apt install nginx -y

# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install nodejs -y

# Install Certbot (for SSL)
sudo apt install certbot python3-certbot-nginx -y
```

### Step 2: Build & Upload

```bash
# Build locally
npm run build

# Upload to server
scp -r dist/* user@server-ip:/var/www/kai-commerce
```

### Step 3: Configure Nginx

Create `/etc/nginx/sites-available/kai-commerce`:

```nginx
server {
    listen 80;
    listen [::]:80;
    server_name kai-commerce.com www.kai-commerce.com;

    root /var/www/kai-commerce;
    index index.html;

    # Gzip compression
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_types text/plain text/css text/xml text/javascript 
               application/x-javascript application/xml+rss 
               application/javascript application/json;

    # Cache static assets
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # SPA fallback
    location / {
        try_files $uri $uri/ /index.html;
    }

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
}
```

### Step 4: Enable Site

```bash
# Create symlink
sudo ln -s /etc/nginx/sites-available/kai-commerce \
           /etc/nginx/sites-enabled/

# Test configuration
sudo nginx -t

# Restart Nginx
sudo systemctl restart nginx
```

### Step 5: Setup SSL

```bash
# Get SSL certificate
sudo certbot --nginx -d kai-commerce.com -d www.kai-commerce.com

# Auto-renewal (already configured by certbot)
sudo certbot renew --dry-run
```

### Step 6: Setup Auto-Deployment (Optional)

Create deploy script `/home/user/deploy.sh`:

```bash
#!/bin/bash
cd /var/www/kai-commerce
git pull origin main
npm install
npm run build
sudo systemctl reload nginx
```

Make executable:
```bash
chmod +x /home/user/deploy.sh
```

---

## 🔐 Environment Variables

### Development (.env.local)

```bash
VITE_API_BASE_URL=http://localhost:3001/api
VITE_ENABLE_MOCK_API=true
```

### Production (.env.production)

```bash
VITE_API_BASE_URL=https://api.kai-commerce.com
VITE_ENABLE_ANALYTICS=true
VITE_SENTRY_DSN=your-sentry-dsn
```

### Setting Environment Variables

**Netlify/Vercel:**
- Dashboard > Site settings > Environment variables

**AWS:**
- Use Parameter Store or Secrets Manager

**Custom Server:**
- Create `.env.production` file
- Or use system environment variables

---

## 🎯 Post-Deployment

### 1. Verify Deployment

```bash
# Check if site is live
curl -I https://kai-commerce.com

# Test API endpoints
curl https://kai-commerce.com/api/products
```

### 2. Setup Monitoring

**Install monitoring tools:**

- **Google Analytics** - Track user behavior
- **Sentry** - Error monitoring
- **UptimeRobot** - Uptime monitoring
- **Hotjar** - User recordings

### 3. Configure CDN (Optional)

For better performance:

- **CloudFlare** - Free CDN + DDoS protection
- **AWS CloudFront** - Global edge locations
- **Fastly** - Advanced caching

### 4. Setup CI/CD

**GitHub Actions** (`.github/workflows/deploy.yml`):

```yaml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: 18
      - run: npm ci
      - run: npm run build
      - run: npm test
      - name: Deploy to Netlify
        run: npx netlify-cli deploy --prod
        env:
          NETLIFY_AUTH_TOKEN: ${{ secrets.NETLIFY_TOKEN }}
```

### 5. Performance Optimization

- Enable HTTP/2
- Configure browser caching
- Minify assets
- Optimize images (use WebP)
- Implement lazy loading
- Add service worker for PWA

### 6. Security Hardening

- Enable HTTPS only
- Set security headers
- Configure CORS
- Rate limiting
- DDoS protection
- Regular security audits

---

## 🐛 Troubleshooting

### Build Fails

```bash
# Clear cache
rm -rf node_modules package-lock.json
npm install

# Check Node version
node -v  # Should be 18+

# Try building locally
npm run build
```

### 404 Errors on Refresh

**Problem**: SPA routing not configured

**Solution**: Add rewrites/redirects (see platform-specific configs above)

### API Connection Issues

**Check:**
- Environment variables set correctly
- CORS configured on API
- API endpoint accessible
- Network/firewall rules

### Slow Performance

**Optimize:**
- Enable CDN
- Compress assets
- Lazy load components
- Optimize images
- Check bundle size

---

## 📞 Support

Need help deploying?

- **Email**: devops@kai-commerce.ai
- **Slack**: #deployment-help
- **Docs**: [docs.kai-commerce.ai](https://docs.kai-commerce.ai)

---

<div align="center">
  <strong>Happy Deploying! 🚀</strong>
</div>
