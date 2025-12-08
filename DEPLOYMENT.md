# 🚀 KAI Website - Deployment Guide

## Quick Deployment Options

### Option 1: Vercel (Recommended - Free Tier Available)

Vercel is the creators of Next.js and provides the best deployment experience.

#### Steps:

1. **Install Vercel CLI:**
```bash
npm i -g vercel
```

2. **Login to Vercel:**
```bash
vercel login
```

3. **Deploy:**
```bash
vercel
```

4. **Set Environment Variables:**
   - Go to your project dashboard on vercel.com
   - Navigate to **Settings** → **Environment Variables**
   - Add: `OPENROUTER_API_KEY` with your API key
   - Redeploy: `vercel --prod`

5. **Done!** Your site is live at `https://your-project.vercel.app`

**Pros:**
- ✅ Free tier with generous limits
- ✅ Automatic HTTPS
- ✅ Global CDN
- ✅ Automatic deployments from Git
- ✅ Built-in analytics
- ✅ Zero configuration needed

**Cons:**
- ⚠️ File-based storage needs migration for production

---

### Option 2: Netlify

Another excellent platform for Next.js apps.

#### Steps:

1. **Install Netlify CLI:**
```bash
npm install netlify-cli -g
```

2. **Login:**
```bash
netlify login
```

3. **Initialize:**
```bash
netlify init
```

4. **Deploy:**
```bash
netlify deploy --prod
```

5. **Set Environment Variables:**
   - Go to Site Settings → Environment Variables
   - Add `OPENROUTER_API_KEY`

**Build Settings:**
- Build command: `npm run build`
- Publish directory: `.next`

---

### Option 3: Railway

Great for full-stack apps with database needs.

#### Steps:

1. **Visit:** [railway.app](https://railway.app)

2. **Create New Project:**
   - Click "New Project"
   - Select "Deploy from GitHub repo"
   - Connect your repository

3. **Configure:**
   - Framework: Next.js
   - Build Command: `npm run build`
   - Start Command: `npm start`

4. **Add Environment Variables:**
   - Go to Variables tab
   - Add `OPENROUTER_API_KEY`

5. **Deploy!**

**Pros:**
- ✅ Easy database integration (PostgreSQL, MongoDB)
- ✅ Free tier available
- ✅ Simple scaling
- ✅ Built-in monitoring

---

### Option 4: AWS Amplify

For AWS ecosystem integration.

#### Steps:

1. **Install Amplify CLI:**
```bash
npm install -g @aws-amplify/cli
```

2. **Configure:**
```bash
amplify configure
```

3. **Initialize:**
```bash
amplify init
```

4. **Add hosting:**
```bash
amplify add hosting
```

5. **Publish:**
```bash
amplify publish
```

6. **Set Environment Variables in AWS Console**

---

### Option 5: DigitalOcean App Platform

#### Steps:

1. **Go to:** [digitalocean.com/products/app-platform](https://www.digitalocean.com/products/app-platform)

2. **Create New App:**
   - Connect your GitHub/GitLab repo
   - Choose branch to deploy

3. **Configure:**
   - Build Command: `npm run build`
   - Run Command: `npm start`

4. **Add Environment Variables:**
   - `OPENROUTER_API_KEY`

5. **Launch!**

**Pricing:** Starts at $5/month

---

### Option 6: Heroku

Classic platform, reliable and simple.

#### Steps:

1. **Install Heroku CLI:**
```bash
npm install -g heroku
```

2. **Login:**
```bash
heroku login
```

3. **Create app:**
```bash
heroku create your-app-name
```

4. **Add buildpack:**
```bash
heroku buildpacks:set heroku/nodejs
```

5. **Set environment variables:**
```bash
heroku config:set OPENROUTER_API_KEY=your_key_here
```

6. **Deploy:**
```bash
git push heroku main
```

7. **Open:**
```bash
heroku open
```

---

### Option 7: Self-Hosted (VPS/Cloud)

For complete control (Ubuntu/Linux server).

#### Requirements:
- Ubuntu 20.04+ or similar Linux server
- Node.js 18+
- Nginx (optional, for reverse proxy)
- PM2 (for process management)

#### Steps:

1. **Connect to your server:**
```bash
ssh user@your-server-ip
```

2. **Install Node.js 18:**
```bash
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs
```

3. **Install PM2:**
```bash
sudo npm install -g pm2
```

4. **Upload your code:**
```bash
# On your local machine
scp -r kai-website user@your-server-ip:/home/user/
```

Or use Git:
```bash
git clone your-repo-url
cd kai-website
```

5. **Install dependencies:**
```bash
npm install
```

6. **Create .env.local:**
```bash
nano .env.local
# Add: OPENROUTER_API_KEY=your_key_here
```

7. **Build:**
```bash
npm run build
```

8. **Start with PM2:**
```bash
pm2 start npm --name "kai-website" -- start
pm2 save
pm2 startup
```

9. **Configure Nginx (optional but recommended):**
```bash
sudo nano /etc/nginx/sites-available/kai-website
```

Add:
```nginx
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

Enable site:
```bash
sudo ln -s /etc/nginx/sites-available/kai-website /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

10. **Setup SSL with Let's Encrypt:**
```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d your-domain.com
```

---

## 📊 Pre-Deployment Checklist

Before deploying to production, ensure:

### ✅ Code Quality
- [ ] All TypeScript errors fixed
- [ ] Build completes successfully (`npm run build`)
- [ ] No console errors in browser
- [ ] All pages load correctly

### ✅ Environment Variables
- [ ] `OPENROUTER_API_KEY` is set
- [ ] API key has sufficient credits
- [ ] API key is kept secret (not in Git)

### ✅ Data & Database
- [ ] Consider migrating from JSON to database
- [ ] Backup current data (`data/*.json`)
- [ ] Plan for data persistence

### ✅ Security
- [ ] Add authentication for admin routes
- [ ] Implement rate limiting
- [ ] Sanitize user inputs
- [ ] Add CORS configuration
- [ ] Use HTTPS (SSL certificate)

### ✅ Performance
- [ ] Images optimized
- [ ] Assets compressed
- [ ] Caching configured
- [ ] CDN setup (optional)

### ✅ Monitoring
- [ ] Error tracking (Sentry, LogRocket)
- [ ] Analytics (Google Analytics, Plausible)
- [ ] Uptime monitoring (UptimeRobot)
- [ ] Performance monitoring

### ✅ Testing
- [ ] Test all pages manually
- [ ] Test AI chatbot responses
- [ ] Test order creation
- [ ] Test admin panel functions
- [ ] Test on mobile devices
- [ ] Test different browsers

---

## 🗄️ Database Migration (Recommended)

For production, migrate from JSON files to a real database.

### Option A: PostgreSQL with Prisma

1. **Install Prisma:**
```bash
npm install prisma @prisma/client
npx prisma init
```

2. **Define schema (prisma/schema.prisma):**
```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}

model Product {
  id          String   @id @default(cuid())
  name        String
  category    String
  price       Float
  image       String
  description String
  specs       Json
  stock       Int
  featured    Boolean  @default(false)
  createdAt   DateTime @default(now())
  orders      Order[]
}

model Order {
  id                String   @id @default(cuid())
  productId         String
  product           Product  @relation(fields: [productId], references: [id])
  productName       String
  price             Float
  quantity          Int
  totalPrice        Float
  status            String
  orderDate         DateTime @default(now())
  estimatedDelivery DateTime
}
```

3. **Migrate:**
```bash
npx prisma migrate dev
```

4. **Update API routes to use Prisma:**
```typescript
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

// Example: Get products
const products = await prisma.product.findMany();
```

### Option B: MongoDB with Mongoose

1. **Install:**
```bash
npm install mongoose
```

2. **Create models and connect**

### Option C: Firebase/Firestore

1. **Install:**
```bash
npm install firebase firebase-admin
```

2. **Configure and use Firestore**

---

## 🔐 Security Enhancements

### 1. Add Authentication (NextAuth.js)

```bash
npm install next-auth
```

### 2. Implement Rate Limiting

```bash
npm install express-rate-limit
```

### 3. Add CSRF Protection

```bash
npm install csrf
```

### 4. Sanitize Inputs

```bash
npm install validator
```

---

## 📈 Scaling Considerations

### For High Traffic:

1. **Use CDN** (Cloudflare, AWS CloudFront)
2. **Implement caching** (Redis)
3. **Load balancing** (Multiple server instances)
4. **Database optimization** (Indexes, query optimization)
5. **Image optimization** (Cloudinary, AWS S3 + CloudFront)
6. **Code splitting** (Already done in Next.js)
7. **API rate limiting**
8. **Queue system** for heavy operations (Bull, RabbitMQ)

---

## 🎯 Post-Deployment

### After deployment:

1. **Test everything:**
   - Visit all pages
   - Test chatbot
   - Create test order
   - Test admin functions

2. **Monitor:**
   - Check error logs
   - Monitor API usage
   - Track performance metrics

3. **Set up backups:**
   - Automated database backups
   - Code repository backups

4. **Documentation:**
   - Document deployment process
   - Create runbooks for common issues
   - Document environment variables

---

## 🆘 Troubleshooting

### Build Fails:
```bash
# Clear cache and rebuild
rm -rf .next node_modules
npm install
npm run build
```

### Environment Variables Not Working:
- Ensure `.env.local` exists
- Restart development server
- For production, set in hosting platform dashboard

### API Routes Not Working:
- Check server logs
- Verify API routes are in `/pages/api/`
- Test locally first

### Database Connection Issues:
- Verify connection string
- Check firewall rules
- Ensure IP whitelisting (if applicable)

---

## 📞 Support Resources

- **Next.js Docs:** [nextjs.org/docs](https://nextjs.org/docs)
- **Vercel Docs:** [vercel.com/docs](https://vercel.com/docs)
- **OpenRouter:** [openrouter.ai/docs](https://openrouter.ai/docs)

---

**Good luck with your deployment! 🚀**
