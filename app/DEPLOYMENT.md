# Deployment Guide - Dumpster Rental Website

This guide covers deploying the dumpster rental website to production, including database setup, environment configuration, and post-deployment steps.

## Table of Contents
- [Overview](#overview)
- [Pre-Deployment Checklist](#pre-deployment-checklist)
- [Deploying to Vercel](#deploying-to-vercel)
- [Database Configuration](#database-configuration)
- [Environment Variables](#environment-variables)
- [Build Configuration](#build-configuration)
- [Post-Deployment Steps](#post-deployment-steps)
- [Monitoring and Analytics](#monitoring-and-analytics)
- [Troubleshooting](#troubleshooting)

## Overview

This application is optimized for deployment on **Vercel** with a PostgreSQL database hosted on **Railway**, **Supabase**, or **Neon**. The stack includes:

- **Frontend/Backend**: Next.js 16 (App Router) on Vercel
- **Database**: PostgreSQL (Railway/Supabase/Neon)
- **ORM**: Prisma
- **Styling**: Tailwind CSS 4
- **Forms**: React Hook Form + Zod validation

## Pre-Deployment Checklist

Before deploying, ensure you have:

- [ ] Completed local development and testing
- [ ] All environment variables documented
- [ ] Database schema finalized
- [ ] Seed data prepared
- [ ] Production domain ready (optional)
- [ ] Email service configured (optional)
- [ ] Analytics setup (optional)
- [ ] Error monitoring configured (optional)

## Deploying to Vercel

Vercel is the recommended platform for deploying Next.js applications.

### Method 1: Deploy via Vercel Dashboard (Recommended)

1. **Create Vercel Account**:
   - Visit [vercel.com](https://vercel.com)
   - Sign up with GitHub, GitLab, or Bitbucket

2. **Import Project**:
   - Click "Add New..." → "Project"
   - Select your Git repository
   - Vercel auto-detects Next.js configuration

3. **Configure Build Settings**:
   ```
   Framework Preset: Next.js
   Build Command: npm run build
   Output Directory: .next
   Install Command: npm install
   ```

4. **Add Environment Variables** (see section below)

5. **Deploy**:
   - Click "Deploy"
   - Wait 2-5 minutes for build to complete
   - Your site will be live at `https://your-project.vercel.app`

### Method 2: Deploy via Vercel CLI

1. **Install Vercel CLI**:
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel**:
   ```bash
   vercel login
   ```

3. **Deploy**:
   ```bash
   # First deployment
   vercel

   # Production deployment
   vercel --prod
   ```

4. **Set environment variables**:
   ```bash
   vercel env add DATABASE_URL production
   # Paste your database URL when prompted
   ```

### Vercel Configuration File

Create `vercel.json` in your project root for advanced configuration:

```json
{
  "buildCommand": "npm run build",
  "devCommand": "npm run dev",
  "installCommand": "npm install",
  "framework": "nextjs",
  "regions": ["iad1"],
  "env": {
    "NEXT_PUBLIC_APP_URL": "https://yourdomain.com"
  }
}
```

## Database Configuration

Choose one of the following PostgreSQL hosting providers:

### Option 1: Railway (Recommended)

**Pros**: Easy setup, generous free tier, automatic backups

1. **Create Railway Account**:
   - Visit [railway.app](https://railway.app)
   - Sign up with GitHub

2. **Create New Project**:
   - Click "New Project" → "Provision PostgreSQL"
   - Database will be provisioned in ~30 seconds

3. **Get Database URL**:
   - Click on PostgreSQL service
   - Go to "Connect" tab
   - Copy "PostgreSQL Connection URL"

4. **Configure Database**:
   ```
   Postgres Version: 14+
   Storage: 1GB (free tier) to 100GB
   Shared CPU (free) or Dedicated (paid)
   ```

5. **Add to Vercel**:
   - In Vercel dashboard, go to Settings → Environment Variables
   - Add `DATABASE_URL` with Railway connection string

**Railway Connection String Format**:
```
postgresql://postgres:PASSWORD@containers-us-west-XXX.railway.app:PORT/railway
```

### Option 2: Supabase

**Pros**: Generous free tier, includes auth and storage, great dashboard

1. **Create Supabase Account**:
   - Visit [supabase.com](https://supabase.com)
   - Sign up with GitHub

2. **Create New Project**:
   - Click "New project"
   - Choose organization
   - Enter project details
   - Select region (choose closest to users)
   - Set database password (save it securely!)

3. **Get Database URL**:
   - Go to Settings → Database
   - Copy "Connection string" under "Connection pooling"
   - Replace `[YOUR-PASSWORD]` with your database password

4. **Enable Connection Pooling** (Important for serverless):
   - Use the "Session mode" connection string for Prisma
   - Format: `postgresql://postgres:[YOUR-PASSWORD]@db.[PROJECT-REF].supabase.co:5432/postgres`

**Supabase Connection String**:
```
# Direct connection (for migrations)
postgresql://postgres:[PASSWORD]@db.[PROJECT-REF].supabase.co:5432/postgres

# Connection pooling (for production)
postgresql://postgres:[PASSWORD]@db.[PROJECT-REF].supabase.co:6543/postgres?pgbouncer=true
```

### Option 3: Neon

**Pros**: Serverless Postgres, branching for dev/staging, excellent free tier

1. **Create Neon Account**:
   - Visit [neon.tech](https://neon.tech)
   - Sign up with GitHub or email

2. **Create New Project**:
   - Click "Create Project"
   - Choose region
   - Set project name

3. **Get Database URL**:
   - Connection string is shown immediately
   - Also available in project dashboard
   - Use the "Pooled connection" string for serverless

4. **Configure Prisma** for Neon:
   ```env
   # Add to connection string
   DATABASE_URL="postgresql://user:pass@ep-xxx.region.aws.neon.tech/neondb?sslmode=require&pgbouncer=true&connect_timeout=15"
   ```

**Neon Connection String**:
```
postgresql://[user]:[password]@[endpoint].region.aws.neon.tech/neondb?sslmode=require
```

### Database Setup Steps (All Providers)

1. **Add DATABASE_URL to Vercel**:
   - Vercel Dashboard → Settings → Environment Variables
   - Add `DATABASE_URL` with your connection string
   - Add to "Production", "Preview", and "Development" environments

2. **Run Migrations**:
   ```bash
   # Install Vercel CLI if not already
   npm install -g vercel

   # Pull environment variables
   vercel env pull .env.local

   # Run Prisma migration
   npx prisma db push
   ```

3. **Seed Database**:
   ```bash
   # Ensure .env.local has production DATABASE_URL
   npx prisma db seed
   ```

   Or seed directly in production:
   ```bash
   # Use Vercel CLI
   vercel env pull .env.production
   DATABASE_URL=$(grep DATABASE_URL .env.production | cut -d '=' -f2) npx prisma db seed
   ```

## Environment Variables

### Required Environment Variables

Add these to your Vercel project:

```env
# Database (Required)
DATABASE_URL="postgresql://user:password@host:port/database"

# Application URL (Required)
NEXT_PUBLIC_APP_URL="https://yourdomain.com"

# Node Environment (Auto-set by Vercel)
NODE_ENV="production"
```

### Optional Environment Variables

```env
# Email Service (Choose one)
# SendGrid
SENDGRID_API_KEY="SG.xxxxxxxxxxxxxxxxxxxxxxxx"
SENDGRID_FROM_EMAIL="noreply@yourdomain.com"

# OR Resend (Alternative)
RESEND_API_KEY="re_xxxxxxxxxxxxxxxxxxxxxxxx"

# Admin Email
ADMIN_EMAIL="admin@yourdomain.com"

# Payment Integration (Optional)
STRIPE_SECRET_KEY="your_stripe_secret_key_here"
STRIPE_PUBLISHABLE_KEY="your_stripe_publishable_key_here"

# Maps Integration (Optional)
GOOGLE_MAPS_API_KEY="AIzaxxxxxxxxxxxxxxxxxxxxxxxx"

# Analytics (Optional)
NEXT_PUBLIC_GA_MEASUREMENT_ID="G-XXXXXXXXXX"
NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION="xxxxxxxxxxxxxx"

# Error Monitoring (Optional)
SENTRY_DSN="https://xxxxxx@sentry.io/xxxxxx"
```

### Setting Environment Variables in Vercel

**Via Dashboard**:
1. Go to Project Settings → Environment Variables
2. Add each variable with its value
3. Select environments (Production, Preview, Development)
4. Click "Save"

**Via CLI**:
```bash
# Production
vercel env add DATABASE_URL production

# Preview (for pull request deployments)
vercel env add DATABASE_URL preview

# Development (for local development)
vercel env add DATABASE_URL development
```

**Via Vercel Configuration**:
```bash
# Pull production environment variables
vercel env pull .env.local
```

## Build Configuration

### Build Commands

Vercel automatically detects Next.js projects. Default configuration:

```json
{
  "buildCommand": "npm run build",
  "devCommand": "npm run dev",
  "installCommand": "npm install"
}
```

### Custom Build Script

If you need custom build steps, update `package.json`:

```json
{
  "scripts": {
    "build": "prisma generate && next build",
    "postbuild": "next-sitemap"
  }
}
```

### Build Settings in Vercel

1. **Framework**: Next.js (auto-detected)
2. **Root Directory**: `./` (or specify if in subdirectory)
3. **Build Command**: `npm run build`
4. **Output Directory**: `.next` (auto-detected)
5. **Install Command**: `npm install`

### Environment-Specific Builds

For different build configurations per environment:

```javascript
// next.config.ts
const nextConfig = {
  // Only in production
  ...(process.env.NODE_ENV === 'production' && {
    compiler: {
      removeConsole: true,
    },
  }),
};
```

## Post-Deployment Steps

### 1. Verify Deployment

- [ ] Visit your deployed site
- [ ] Test all major pages (home, state pages, city pages)
- [ ] Test quote form submission
- [ ] Test contact form submission
- [ ] Verify database connectivity
- [ ] Check browser console for errors

### 2. Set Up Custom Domain

**In Vercel Dashboard**:
1. Go to Settings → Domains
2. Add your custom domain
3. Follow DNS configuration instructions
4. Wait for DNS propagation (5-60 minutes)

**DNS Records**:
```
Type: A
Name: @
Value: 76.76.21.21

Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

### 3. Enable HTTPS

- Vercel automatically provides SSL certificates
- HTTPS is enabled by default
- Certificates auto-renew

### 4. Set Up Email Service

**SendGrid Setup**:
```bash
npm install @sendgrid/mail
```

Create `lib/email.ts`:
```typescript
import sgMail from '@sendgrid/mail';

sgMail.setApiKey(process.env.SENDGRID_API_KEY!);

export async function sendQuoteEmail(data: any) {
  await sgMail.send({
    to: process.env.ADMIN_EMAIL,
    from: process.env.SENDGRID_FROM_EMAIL!,
    subject: 'New Quote Request',
    text: `Name: ${data.name}\nEmail: ${data.email}...`,
  });
}
```

**Resend Setup** (Alternative):
```bash
npm install resend
```

```typescript
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendQuoteEmail(data: any) {
  await resend.emails.send({
    from: 'noreply@yourdomain.com',
    to: process.env.ADMIN_EMAIL!,
    subject: 'New Quote Request',
    html: `<p>Name: ${data.name}</p>...`,
  });
}
```

### 5. Configure Sitemap

Install next-sitemap:
```bash
npm install next-sitemap
```

Create `next-sitemap.config.js`:
```javascript
module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_APP_URL || 'https://yourdomain.com',
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  exclude: ['/api/*'],
};
```

Add to `package.json`:
```json
{
  "scripts": {
    "postbuild": "next-sitemap"
  }
}
```

### 6. Set Up Error Monitoring

**Sentry Integration**:
```bash
npm install @sentry/nextjs
npx @sentry/wizard@latest -i nextjs
```

Follow the wizard to configure Sentry.

## Monitoring and Analytics

### Google Analytics

1. **Create GA4 Property**:
   - Visit [analytics.google.com](https://analytics.google.com)
   - Create new property
   - Get Measurement ID (G-XXXXXXXXXX)

2. **Add to environment variables**:
   ```env
   NEXT_PUBLIC_GA_MEASUREMENT_ID="G-XXXXXXXXXX"
   ```

3. **Add Google Analytics to layout**:
   ```tsx
   // app/layout.tsx
   import Script from 'next/script';

   export default function RootLayout({ children }) {
     return (
       <html>
         <head>
           <Script
             src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}`}
             strategy="afterInteractive"
           />
           <Script id="google-analytics" strategy="afterInteractive">
             {`
               window.dataLayer = window.dataLayer || [];
               function gtag(){dataLayer.push(arguments);}
               gtag('js', new Date());
               gtag('config', '${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}');
             `}
           </Script>
         </head>
         <body>{children}</body>
       </html>
     );
   }
   ```

### Vercel Analytics

Enable in Vercel Dashboard:
1. Go to Analytics tab
2. Enable Web Analytics
3. Install package:
   ```bash
   npm install @vercel/analytics
   ```

4. Add to root layout:
   ```tsx
   import { Analytics } from '@vercel/analytics/react';

   export default function RootLayout({ children }) {
     return (
       <html>
         <body>
           {children}
           <Analytics />
         </body>
       </html>
     );
   }
   ```

### Performance Monitoring

**Vercel Speed Insights**:
```bash
npm install @vercel/speed-insights
```

```tsx
import { SpeedInsights } from '@vercel/speed-insights/next';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <SpeedInsights />
      </body>
    </html>
  );
}
```

### Uptime Monitoring

**Free Options**:
- UptimeRobot: [uptimerobot.com](https://uptimerobot.com)
- Better Uptime: [betteruptime.com](https://betteruptime.com)
- Vercel built-in monitoring

Configure to ping your homepage every 5 minutes.

## Troubleshooting

### Build Failures

**Issue**: Build fails on Vercel

**Solutions**:
```bash
# Check build logs in Vercel dashboard
# Common fixes:

# 1. TypeScript errors
npm run build  # Test locally first

# 2. Missing dependencies
npm install --save-dev @types/node @types/react

# 3. Environment variables
# Ensure all required env vars are set in Vercel

# 4. Prisma issues
# Add to package.json scripts:
"build": "prisma generate && next build"
```

### Database Connection Issues

**Issue**: Can't connect to database from Vercel

**Solutions**:
- Verify DATABASE_URL is correct
- Check database allows connections from Vercel IPs
- Use connection pooling (pgbouncer)
- Increase connection timeout:
  ```env
  DATABASE_URL="postgresql://...?connect_timeout=15"
  ```

### Slow Page Loads

**Issue**: Pages load slowly

**Solutions**:
- Enable edge caching
- Optimize database queries (add indexes)
- Use connection pooling
- Enable Next.js Image Optimization
- Check database is in same region as Vercel

### Form Submissions Not Working

**Issue**: Forms submit but data not saved

**Solutions**:
- Check API route logs in Vercel dashboard
- Verify DATABASE_URL in production
- Check CORS settings
- Review Vercel function logs

### 404 Errors on Dynamic Routes

**Issue**: State/city pages return 404

**Solutions**:
- Ensure database is seeded
- Check `generateStaticParams` in page files
- Verify database connection during build
- Check Vercel build logs

## Continuous Deployment

Vercel automatically deploys on every push to your repository:

- **Push to `main`**: Deploys to production
- **Push to other branches**: Creates preview deployment
- **Pull requests**: Creates preview deployment with unique URL

### Manual Deployment

```bash
# Deploy to production
vercel --prod

# Deploy to preview
vercel
```

### Rollback

In Vercel Dashboard:
1. Go to Deployments
2. Find previous successful deployment
3. Click "..." → "Promote to Production"

## Performance Optimization

1. **Enable Edge Caching**:
   ```tsx
   export const revalidate = 3600; // Revalidate every hour
   ```

2. **Optimize Images**:
   ```tsx
   import Image from 'next/image';

   <Image src="/image.jpg" width={800} height={600} alt="..." />
   ```

3. **Use ISR for dynamic pages**:
   ```tsx
   export const revalidate = 86400; // 24 hours
   ```

4. **Database Optimization**:
   - Use connection pooling
   - Add database indexes (already configured)
   - Enable query caching in Prisma

## Security Checklist

- [ ] Use HTTPS (automatic with Vercel)
- [ ] Secure environment variables (never commit .env)
- [ ] Enable CORS only for your domain
- [ ] Use secure headers (configure in next.config.ts)
- [ ] Sanitize user inputs (Zod validation)
- [ ] Rate limit API endpoints
- [ ] Keep dependencies updated
- [ ] Enable Vercel DDoS protection (automatic)

## Next Steps

After deployment:

1. Monitor performance with Vercel Analytics
2. Set up error tracking with Sentry
3. Configure uptime monitoring
4. Test all features thoroughly
5. Submit sitemap to Google Search Console
6. Set up email notifications for quotes
7. Review [CONTENT.md](./CONTENT.md) for managing content
