# DumpsterRentalPro - Comprehensive Dumpster Rental Website

A massive, SEO-optimized dumpster rental website built with Next.js 14, featuring 4,500+ pages covering all 50 US states and 500+ cities.

## 🚀 Features

- **4,500+ SEO-Optimized Pages**
  - 10 core pages (home, about, services, etc.)
  - 50 state pages
  - 500+ city pages
  - 2,000+ city + service pages
  - 2,000+ city + size pages

- **Modern Tech Stack**
  - Next.js 14 (App Router)
  - TypeScript
  - Tailwind CSS
  - Prisma ORM
  - PostgreSQL

- **Key Functionality**
  - Quote request system
  - Dynamic page generation
  - SEO optimization (metadata, sitemaps)
  - Responsive design
  - Form handling and validation

## 📋 Prerequisites

- Node.js 18+
- PostgreSQL database
- npm or yarn

## 🛠️ Quick Start

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Set Up Environment Variables**
   ```bash
   cp .env.example .env
   # Edit .env with your database URL and other settings
   ```

3. **Generate Location Data**
   ```bash
   npm run generate:locations
   ```

4. **Set Up Database**
   ```bash
   npm run db:generate
   npm run db:push
   npm run db:seed
   ```

5. **Run Development Server**
   ```bash
   npm run dev
   ```

Visit http://localhost:3000

## 📁 Project Structure

```
├── app/                    # Next.js app directory
│   ├── [state]/           # Dynamic state pages
│   ├── [state]/[city]/    # Dynamic city pages
│   ├── api/               # API routes
│   └── ...                # Core pages
├── components/            # React components
│   ├── layout/           # Header, Footer
│   ├── sections/        # Page sections
│   └── forms/           # Form components
├── prisma/               # Prisma schema and migrations
├── scripts/              # Utility scripts
├── data/                 # Generated location data
└── docs/                 # Documentation
```

## 📚 Documentation

- [Setup Guide](docs/SETUP.md) - Detailed setup instructions
- [Deployment Guide](docs/DEPLOYMENT.md) - Production deployment
- [API Documentation](docs/API.md) - API endpoints
- [Content Management](docs/CONTENT.md) - Managing content
- [Next Steps](NEXT-STEPS.md) - Recommended improvements

## 🎯 Key Pages

- `/` - Homepage
- `/about` - About Us
- `/services` - Services overview
- `/contact` - Quote request form
- `/faq` - Frequently asked questions
- `/[state]` - State-specific pages
- `/[state]/[city]` - City-specific pages
- `/[state]/[city]/[service]` - City + service pages
- `/[state]/[city]/[size]` - City + size pages

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run db:generate` - Generate Prisma client
- `npm run db:push` - Push schema to database
- `npm run db:seed` - Seed database with data
- `npm run generate:locations` - Generate location data

## 🌐 SEO Features

- Dynamic metadata generation for all pages
- Automatic sitemap generation
- robots.txt configuration
- Structured data ready
- Mobile-responsive design

## 📊 Database Schema

- **States**: All 50 US states
- **Cities**: 500+ cities with population, coordinates, zip codes
- **DumpsterSizes**: 10, 20, 30, 40 yard options
- **ServiceTypes**: Residential, Commercial, Construction, etc.
- **Quotes**: Customer quote submissions

## 🚢 Deployment

See [DEPLOYMENT.md](docs/DEPLOYMENT.md) for detailed deployment instructions.

Recommended platforms:
- Vercel (easiest for Next.js)
- Netlify
- Railway
- AWS Amplify

## 📝 License

This project is proprietary software.

## 🤝 Support

For questions or issues, contact: info@dumpsterrentalpro.com

---

Built with ❤️ using Next.js 14
