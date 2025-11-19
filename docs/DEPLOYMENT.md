# Deployment Guide

## Vercel Deployment (Recommended)

### 1. Prepare for Deployment

1. Ensure all environment variables are set in `.env`
2. Run build locally to verify: `npm run build`
3. Commit all changes to git

### 2. Deploy to Vercel

1. Push to GitHub/GitLab/Bitbucket
2. Import project in Vercel dashboard
3. Add environment variables in Vercel dashboard:
   - `DATABASE_URL`
   - `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`
   - `NEXT_PUBLIC_SITE_URL`

### 3. Database Setup

For production, use a managed PostgreSQL service:
- **Vercel Postgres**: Integrated with Vercel
- **Supabase**: Free tier available
- **Railway**: Easy setup
- **Neon**: Serverless PostgreSQL

After setting up database:
```bash
npm run db:push
npm run db:seed
```

### 4. Build Settings

Vercel will automatically detect Next.js. Ensure:
- Build Command: `npm run build`
- Output Directory: `.next`
- Install Command: `npm install`

### 5. Post-Deployment

1. Verify sitemap: `https://yourdomain.com/sitemap.xml`
2. Submit sitemap to Google Search Console
3. Test quote form submission
4. Verify all pages load correctly

## Alternative Platforms

### Netlify

1. Connect repository
2. Build command: `npm run build`
3. Publish directory: `.next`
4. Add environment variables

### Railway

1. Connect repository
2. Add PostgreSQL service
3. Set environment variables
4. Deploy automatically

## Environment Variables

Required for production:
- `DATABASE_URL`: Production database URL
- `NEXT_PUBLIC_SITE_URL`: Your production domain
- `SMTP_*`: Email configuration for quote notifications

## Monitoring

After deployment:
- Set up error tracking (Sentry, etc.)
- Configure analytics (Google Analytics, etc.)
- Monitor database performance
- Set up uptime monitoring
