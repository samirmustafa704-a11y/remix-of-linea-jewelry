# 🚀 Deployment

Production deployment guide for Linea Jewelry. Choose your platform and follow the steps.

---

## 📋 Pre-Deployment Checklist

Before deploying to production, verify:

- [ ] All tests pass: `npm run lint`
- [ ] TypeScript checks pass: `npx tsc --noEmit`
- [ ] Build succeeds: `npm run build`
- [ ] No console errors in dev: `npm run dev`
- [ ] Environment variables set correctly
- [ ] All images optimized
- [ ] SEO metadata added
- [ ] Security headers configured
- [ ] Analytics configured (if needed)

---

## 🏗️ Build Process

### 1. Create Production Build

```bash
npm run build
```

**What happens:**
- ✅ TypeScript compiled to JavaScript
- ✅ Code minified and optimized
- ✅ CSS minified
- ✅ Images optimized
- ✅ Output to `dist/` folder

**Output structure:**
```
dist/
├── index.html          # Entry point
├── assets/
│   ├── index-xyz.js    # Main bundle
│   ├── vendor-xyz.js   # Dependencies
│   └── styles-xyz.css  # All CSS
└── images/             # Optimized images
```

**File sizes (typical):**
- index.html: ~2KB
- Total JS: ~150KB (gzipped)
- Total CSS: ~30KB (gzipped)

### 2. Preview Production Build Locally

```bash
npm run preview
```

Opens production build on `http://localhost:4173`

**Test in preview:**
- ✅ All routes work
- ✅ Shopping cart functions
- ✅ Images load correctly
- ✅ No console errors

---

## 🌐 Platform-Specific Guides

### ✅ Option 1: Vercel (Recommended)

**Best for:** Fastest setup, best performance, free tier available

#### 1. Connect Repository

1. Go to [vercel.com](https://vercel.com)
2. Sign up with GitHub
3. Click "New Project"
4. Select `linea-jewelry` repository
5. Click "Import"

#### 2. Configure Project

**Framework:** Select "Vite"
**Root Directory:** `./` (default)
**Build Command:** `npm run build`
**Output Directory:** `dist`

#### 3. Environment Variables

In Vercel dashboard → Settings → Environment Variables:

```
VITE_API_URL=https://api.linea-jewelry.com
VITE_ANALYTICS_ID=your-analytics-id
```

#### 4. Deploy

Click "Deploy" button

**Deploy time:** 30-60 seconds

**URL:** `https://linea-jewelry.vercel.app` (auto-generated)

#### 5. Custom Domain

Settings → Domains → Add custom domain

```
DNS Records (add to domain registrar):
A     @     104.21.12.34
CNAME www   cname.vercel-dns.com
```

**Live in:** 5-30 minutes

#### Monitor & Rollback

```bash
# View deployment history
# Vercel Dashboard → Deployments

# Automatic rollback
# Click "Rollback" on any previous deployment

# CI/CD integration
# Auto-deploys on: git push to main
```

---

### ✅ Option 2: Netlify

**Best for:** Good free tier, generous build minutes

#### 1. Connect Repository

1. Go to [netlify.com](https://netlify.com)
2. Click "Add new site" → "Import an existing project"
3. Choose GitHub
4. Select `linea-jewelry` repository

#### 2. Build Settings

**Build command:** `npm run build`
**Publish directory:** `dist`

#### 3. Deploy Settings

Click "Deploy site"

**Deploy time:** 1-2 minutes

#### 4. Environment Variables

Site settings → Build & deploy → Environment

```
VITE_API_URL=https://api.linea-jewelry.com
VITE_ANALYTICS_ID=your-analytics-id
```

#### 5. Custom Domain

Domain management → Add custom domain

Same DNS setup as Vercel

---

### ✅ Option 3: Traditional Server (AWS, DigitalOcean, Linode)

**Best for:** Full control, custom backend integration

#### 1. SSH into Server

```bash
ssh root@your-server-ip
```

#### 2. Install Dependencies

```bash
# Update system
apt-get update && apt-get upgrade

# Install Node.js 18+
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
apt-get install -y nodejs

# Install git
apt-get install -y git

# Install nginx
apt-get install -y nginx
```

#### 3. Clone & Setup

```bash
# Clone repo
git clone https://github.com/Mostafa-SAID7/linea-jewelry.git
cd linea-jewelry

# Install & build
npm install
npm run build

# Create .env file
cp .env.example .env
# Edit .env with production values
nano .env
```

#### 4. Configure Nginx

Create `/etc/nginx/sites-available/linea-jewelry`:

```nginx
server {
    listen 80;
    server_name linea-jewelry.com www.linea-jewelry.com;

    # Redirect HTTP to HTTPS
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name linea-jewelry.com www.linea-jewelry.com;

    # SSL certificates (use Let's Encrypt)
    ssl_certificate /etc/letsencrypt/live/linea-jewelry.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/linea-jewelry.com/privkey.pem;

    root /var/www/linea-jewelry/dist;
    index index.html;

    # Cache static assets
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # SPA routing: serve index.html for all routes
    location / {
        try_files $uri $uri/ /index.html;
    }

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header Referrer-Policy "no-referrer-when-downgrade" always;
}
```

Enable site:
```bash
ln -s /etc/nginx/sites-available/linea-jewelry \
      /etc/nginx/sites-enabled/linea-jewelry
nginx -t
systemctl restart nginx
```

#### 5. SSL Certificate (Let's Encrypt)

```bash
# Install Certbot
apt-get install -y certbot python3-certbot-nginx

# Get certificate
certbot certonly --standalone -d linea-jewelry.com -d www.linea-jewelry.com

# Auto-renew
systemctl enable certbot.timer
```

#### 6. Setup Deployment Pipeline

Create `/home/deploy/deploy.sh`:

```bash
#!/bin/bash
set -e

cd /var/www/linea-jewelry

# Pull latest code
git pull origin main

# Install dependencies
npm ci

# Build
npm run build

# Restart app (if using PM2)
pm2 restart linea-jewelry

echo "✅ Deployment complete"
```

Make executable:
```bash
chmod +x /home/deploy/deploy.sh
```

#### 7. Setup Auto-Deployment (GitHub Actions)

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: Deploy to server
        uses: appleboy/ssh-action@master
        with:
          host: ${{ secrets.SERVER_IP }}
          username: root
          key: ${{ secrets.SSH_PRIVATE_KEY }}
          script: /home/deploy/deploy.sh
```

Add secrets to GitHub:
- `SERVER_IP`: Your server's IP address
- `SSH_PRIVATE_KEY`: Private SSH key for authentication

---

## 🔧 Environment Variables

Create `.env.production`:

```bash
# API Configuration
VITE_API_URL=https://api.linea-jewelry.com
VITE_API_TIMEOUT=30000

# Analytics
VITE_ANALYTICS_ID=G-XXXXXXXXXX
VITE_ENABLE_ANALYTICS=true

# Feature Flags
VITE_ENABLE_CHECKOUT=true
VITE_ENABLE_WISHLIST=false

# Payment Gateway
VITE_STRIPE_PUBLIC_KEY=pk_live_XXXXXX
```

**Reference:** [.env.example](../.env.example)

---

## 📊 Performance Optimization

### Enable Gzip Compression

**Vercel/Netlify:** Automatic ✅

**Nginx:**
```nginx
gzip on;
gzip_types text/plain text/css text/xml text/javascript 
           application/x-javascript application/xml+rss 
           application/javascript application/json;
gzip_min_length 1024;
```

### Enable Caching

```nginx
# Cache static assets for 1 year
location ~* \.(js|css|png|jpg)$ {
    expires 1y;
    add_header Cache-Control "public, immutable";
}

# Don't cache HTML
location ~* \.html$ {
    expires -1;
    add_header Cache-Control "no-store, no-cache, must-revalidate, max-age=0";
}
```

### Image Optimization

Before deployment, optimize all product images:

```bash
# Using ImageOptim (macOS)
# Batch optimize: right-click folder → Open with ImageOptim

# Or use ImageMagick
convert image.jpg -quality 85 -resize 1200x image-optimized.jpg

# Or use online tools
# - TinyPNG.com
# - ImageOptim.com
```

---

## ✅ Post-Deployment

### 1. Verify Live Site

```bash
# Test home page
curl https://linea-jewelry.com

# Test API endpoints
curl https://linea-jewelry.com/api/products

# Test with browser
# https://linea-jewelry.com
```

### 2. Monitor Health

**Vercel/Netlify:** Built-in dashboards

**Traditional Server:**
```bash
# Check server status
systemctl status nginx

# Check logs
tail -f /var/log/nginx/access.log
tail -f /var/log/nginx/error.log

# Check disk space
df -h

# Check memory usage
free -h
```

### 3. Setup Monitoring & Alerts

**Option A: Vercel Monitoring**
- Vercel → Project → Analytics
- Monitor real-time metrics

**Option B: External Services**
- [Sentry.io](https://sentry.io) - Error tracking
- [UptimeRobot.com](https://uptimerobot.com) - Uptime monitoring
- [DataDog](https://datadoghq.com) - Full observability

### 4. Setup Error Tracking

Example with Sentry:

```bash
npm install @sentry/react @sentry/tracing
```

In `src/main.tsx`:
```tsx
import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: import.meta.env.VITE_SENTRY_DSN,
  environment: import.meta.env.MODE,
});
```

### 5. Enable Analytics

Example with Google Analytics:

```tsx
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export function useAnalytics() {
  const location = useLocation();
  
  useEffect(() => {
    window.gtag?.('event', 'page_view', {
      page_path: location.pathname,
    });
  }, [location]);
}
```

---

## 🔄 Update & Rollback

### Deploy New Version

**Vercel/Netlify:** Auto-deploys on `git push main`

```bash
# Make changes
git add .
git commit -m "feat: add new feature"
git push origin main

# Auto-deploys in ~30 seconds
```

**Traditional Server:**
```bash
# SSH to server
ssh root@your-server-ip

# Pull changes
cd /var/www/linea-jewelry
git pull origin main
npm run build

# Restart
systemctl restart nginx
```

### Rollback to Previous Version

**Vercel/Netlify Dashboard:**
1. Deployments → Find previous version
2. Click "Rollback"
3. Confirm
4. Live in 30 seconds

**Traditional Server:**
```bash
# Revert to previous commit
git revert HEAD
git push origin main

# Or manually
git checkout <commit-hash>
git push -f origin main
npm run build
```

---

## 🚨 Troubleshooting

### Issue: Build Fails

```bash
# Clear cache and rebuild
rm -rf node_modules dist
npm install
npm run build
```

### Issue: Blank Page After Deploy

```bash
# Check browser console for errors
# DevTools → Console tab

# Check if dist/ folder has index.html
ls -la dist/

# Check nginx logs
tail -f /var/log/nginx/error.log

# Ensure base URL is correct in vite.config.ts
```

### Issue: Images Not Loading

```bash
# Check image paths in build
ls -la dist/assets/

# Verify CORS headers
curl -I https://linea-jewelry.com/assets/image.jpg

# Check nginx cache headers
```

### Issue: CSS/JS Not Loaded

```bash
# Check MIME types in nginx
# Should be: application/javascript, text/css

# Check cache busting
# File names should have hashes: index-abc123.js
```

---

## 🔐 Security Checklist

- [ ] SSL certificate installed (HTTPS)
- [ ] Security headers configured
- [ ] Environment variables not in code
- [ ] API keys not exposed
- [ ] CORS properly configured
- [ ] CSP headers set
- [ ] No console.log with sensitive data
- [ ] Passwords hashed (backend)
- [ ] SQL injection prevented (backend)
- [ ] XSS protection enabled

---

## 📈 Performance Targets

| Metric | Target | Tool |
|--------|--------|------|
| **Lighthouse Score** | 90+ | Chrome DevTools |
| **Page Load** | < 3s | Web Vitals |
| **First Contentful Paint** | < 1.8s | Web Vitals |
| **Time to Interactive** | < 3.8s | Web Vitals |
| **Bundle Size** | < 200KB gzipped | `npm run build` |

Check with Lighthouse:
1. Open site in Chrome
2. DevTools → Lighthouse
3. Click "Analyze page load"

---

## 💡 Next Steps

1. ✅ Choose a platform (Vercel recommended for simplicity)
2. ✅ Connect GitHub repository
3. ✅ Set environment variables
4. ✅ Deploy
5. ✅ Monitor uptime and performance
6. ✅ Setup error tracking

---

<div align="center">

**Ready to deploy?** Choose your platform above and follow the steps. 🚀

[← Back to README](../README.md) | [Next: API Integration →](API_INTEGRATION.md)

</div>
