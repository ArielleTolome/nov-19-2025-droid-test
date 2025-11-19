# Dumpster Rental Website

A modern, SEO-optimized dumpster rental website built with Next.js 16, featuring 19,550+ location-based landing pages, multi-step quote forms, and a comprehensive lead generation system.

## Overview

This application is a complete dumpster rental business solution designed to generate leads through location-based SEO and user-friendly quote forms. Built with the latest web technologies, it provides a scalable, performant, and maintainable platform for waste management businesses.

## Features

### Lead Generation
- **Multi-Step Quote Form** - 3-step wizard with progress tracking and validation
- **Contact Form** - Simple contact form with email integration ready
- **Quote Management** - Track and manage customer quote requests
- **Email Notifications** - Ready for SendGrid or Resend integration

### Location-Based SEO
- **50 State Pages** - Dedicated landing page for each US state
- **19,495+ City Pages** - Hyper-local pages for major US cities
- **Dynamic URL Structure** - SEO-friendly URLs (`/california/los-angeles`)
- **Automated Content** - Template-based content generation
- **Local Search Optimization** - Optimized for "dumpster rental in [city]" searches

### Content Management
- **Dumpster Sizes** - 10, 20, 30, and 40-yard dumpsters with specifications
- **Service Types** - Residential, commercial, construction, and more
- **Blog System** - Ready-to-use blog with database schema
- **Dynamic Pricing** - Flexible pricing structure by location and size

### Technical Features
- **Next.js 16** - Latest App Router with server components
- **TypeScript** - Full type safety throughout the application
- **Prisma ORM** - Type-safe database queries and migrations
- **Tailwind CSS 4** - Modern, responsive design system
- **Form Validation** - React Hook Form + Zod for robust validation
- **SEO Optimized** - Meta tags, structured data, sitemaps
- **Performance** - Static generation with ISR for fast page loads

## Quick Start

### Prerequisites
- Node.js 18+ and npm
- PostgreSQL 14+
- Git

### Installation

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd app
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up environment variables**:
   ```bash
   cp .env.example .env
   # Edit .env with your database URL and other settings
   ```

4. **Set up the database**:
   ```bash
   # Run migrations
   npx prisma db push

   # Seed the database (50 states + 19,495 cities)
   npx prisma db seed
   ```

5. **Start development server**:
   ```bash
   npm run dev
   ```

6. **Open your browser**:
   Navigate to [http://localhost:3000](http://localhost:3000)

## Documentation

Comprehensive documentation is available:

- **[SETUP.md](./SETUP.md)** - Complete setup and installation guide
  - Prerequisites and installation
  - Environment variables
  - Database setup and seeding
  - Running locally
  - Troubleshooting

- **[DEPLOYMENT.md](./DEPLOYMENT.md)** - Production deployment guide
  - Deploying to Vercel
  - Database configuration (Railway, Supabase, Neon)
  - Environment variables for production
  - Post-deployment steps
  - Monitoring and analytics

- **[ARCHITECTURE.md](./ARCHITECTURE.md)** - Technical architecture
  - Project structure
  - Technology stack details
  - Data flow and component hierarchy
  - Database schema and relationships
  - API routes
  - Performance optimizations

- **[PROGRESS.md](./PROGRESS.md)** - Project status and roadmap
  - Features implemented
  - What's working
  - What's pending
  - Next steps and recommendations
  - Performance metrics

- **[CONTENT.md](./CONTENT.md)** - Content management guide
  - Managing states and cities
  - Updating pricing
  - Managing dumpster sizes
  - Adding blog posts
  - SEO best practices

- **[FORMS_USAGE.md](./FORMS_USAGE.md)** - Form system documentation
  - QuoteForm component usage
  - ContactForm component usage
  - API integration
  - Validation schemas

## Tech Stack

### Frontend
- **[Next.js 16](https://nextjs.org/)** - React framework with App Router
- **[React 19](https://react.dev/)** - UI library
- **[TypeScript 5](https://www.typescriptlang.org/)** - Type-safe JavaScript
- **[Tailwind CSS 4](https://tailwindcss.com/)** - Utility-first CSS

### Backend & Database
- **[Prisma 6](https://www.prisma.io/)** - Next-generation ORM
- **[PostgreSQL](https://www.postgresql.org/)** - Relational database
- **Node.js 20+** - Runtime environment

### Forms & Validation
- **[React Hook Form](https://react-hook-form.com/)** - Form state management
- **[Zod](https://zod.dev/)** - TypeScript-first schema validation

### Development Tools
- **[ESLint 9](https://eslint.org/)** - Code linting
- **[tsx](https://github.com/esbuild-kit/tsx)** - TypeScript execution

## Project Structure

```
/app
├── app/                      # Next.js App Router
│   ├── [state]/              # Dynamic state pages (50 pages)
│   │   └── [city]/           # Dynamic city pages (19,495+ pages)
│   ├── api/                  # API routes
│   │   ├── quote/            # Quote submission endpoint
│   │   └── contact/          # Contact form endpoint
│   ├── sizes/                # Dumpster sizes page
│   ├── services/             # Services page
│   ├── contact/              # Contact page
│   ├── quote/                # Quote request page
│   └── page.tsx              # Homepage
│
├── components/               # React components
│   ├── forms/                # QuoteForm, ContactForm
│   ├── layout/               # Header, Footer, Navigation
│   ├── sections/             # Hero, CTA, FAQ, etc.
│   ├── location/             # StateGrid, CityList
│   ├── dumpster/             # Dumpster-specific components
│   └── ui/                   # Button, Card, Badge, etc.
│
├── lib/                      # Utilities
│   ├── prisma.ts             # Prisma client
│   ├── location.ts           # Location utilities
│   └── validations/          # Zod schemas
│
├── prisma/                   # Database
│   ├── schema.prisma         # Database schema
│   └── seed.ts               # Seeding script
│
├── data/                     # Static data
│   ├── states.json           # 50 US states
│   └── cities.json           # 19,495+ cities
│
├── scripts/                  # Build scripts
└── public/                   # Static assets
```

## Key Features Detail

### Multi-Step Quote Form

A sophisticated 3-step wizard that guides users through:
1. **Location** - Zip code, city, and address
2. **Project Details** - Dumpster size, service type, project type, rental duration
3. **Contact Info** - Name, email, phone, and message

Features:
- Progress indicator
- Step-by-step validation
- Save and resume (future feature)
- Mobile-responsive design

### Location Pages

The application generates SEO-optimized pages for:
- All 50 US states
- 19,495+ major US cities
- Each with unique content and meta tags
- Automatic breadcrumb navigation
- Internal linking for SEO

### Database Schema

Six main models:
- **State** - US states with SEO content
- **City** - US cities with location data
- **DumpsterSize** - 10, 20, 30, 40-yard specifications
- **ServiceType** - Service categories
- **Quote** - Customer quote requests
- **BlogPost** - SEO blog content

## API Routes

### POST /api/quote
Submit a quote request with validation and database storage.

**Request Body**:
```json
{
  "zipCode": "90210",
  "city": "Beverly Hills",
  "address": "123 Main St",
  "dumpsterSize": "20 Yard",
  "serviceType": "Residential",
  "projectType": "Home Renovation",
  "rentalDuration": "7 Days",
  "deliveryDate": "2024-01-15",
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "(555) 123-4567",
  "message": "Optional message"
}
```

### POST /api/contact
Submit a contact form.

**Request Body**:
```json
{
  "name": "Jane Doe",
  "email": "jane@example.com",
  "phone": "(555) 987-6543",
  "message": "I have a question about pricing"
}
```

## Environment Variables

Required:
```env
DATABASE_URL="postgresql://user:pass@host:5432/dbname"
NEXT_PUBLIC_APP_URL="http://localhost:3000"
NODE_ENV="development"
```

Optional:
```env
# Email (choose one)
SENDGRID_API_KEY="sg_xxx"
RESEND_API_KEY="re_xxx"

# Admin
ADMIN_EMAIL="admin@example.com"

# Payment (optional)
STRIPE_SECRET_KEY="sk_xxx"
STRIPE_PUBLISHABLE_KEY="pk_xxx"

# Analytics (optional)
NEXT_PUBLIC_GA_MEASUREMENT_ID="G-XXXXXXXXXX"
```

## Development

### Available Scripts

```bash
# Development server
npm run dev

# Production build
npm run build

# Start production server
npm start

# Lint code
npm run lint

# Database commands
npx prisma studio          # Visual database editor
npx prisma db push         # Push schema changes
npx prisma db seed         # Seed database
npx prisma generate        # Generate Prisma client
```

### Database Management

**Prisma Studio** - Visual database editor:
```bash
npx prisma studio
# Opens at http://localhost:5555
```

**Database Migrations**:
```bash
# Push schema changes to database
npx prisma db push

# Reset database (WARNING: deletes all data)
npx prisma db push --force-reset

# Re-seed database
npx prisma db seed
```

## Deployment

### Deploy to Vercel (Recommended)

1. Push your code to GitHub/GitLab/Bitbucket
2. Import project in [Vercel Dashboard](https://vercel.com)
3. Configure environment variables
4. Deploy

**Or use Vercel CLI**:
```bash
npm install -g vercel
vercel login
vercel --prod
```

See [DEPLOYMENT.md](./DEPLOYMENT.md) for complete deployment instructions.

## Performance

### Expected Metrics

- **Lighthouse Score**: 90+ performance, 100 SEO
- **Page Load Time**: < 2 seconds
- **Build Time**: 2-5 minutes
- **Pages Generated**: 19,550+ static/ISR pages

### Optimizations

- Static site generation (SSG)
- Incremental static regeneration (ISR)
- Image optimization (Next.js Image)
- Code splitting (automatic)
- Database indexes
- Connection pooling ready

## SEO

### On-Page SEO
- Unique title and meta description per page
- Structured data (JSON-LD)
- Open Graph tags
- Semantic HTML
- Optimized headings hierarchy

### Technical SEO
- XML sitemap (next-sitemap ready)
- Clean URL structure
- Mobile-responsive
- Fast loading times
- 19,550+ indexable pages

### Local SEO
- Location-specific pages
- Local business schema
- City and state targeting
- Zip code coverage

## Contributing

This project follows standard Git workflow:

1. Create a feature branch
2. Make your changes
3. Test thoroughly
4. Submit a pull request

## Support

For issues or questions:
1. Check the documentation files
2. Review [SETUP.md](./SETUP.md) for common issues
3. Check browser console for errors
4. Review server logs
5. Open an issue in the repository

## Roadmap

See [PROGRESS.md](./PROGRESS.md) for detailed roadmap.

### Immediate
- [ ] Email integration (SendGrid/Resend)
- [ ] Google Analytics setup
- [ ] Production deployment
- [ ] Domain configuration

### Short-Term
- [ ] Blog listing and detail pages
- [ ] Customer testimonials
- [ ] Search functionality
- [ ] Admin dashboard

### Long-Term
- [ ] Payment integration (Stripe)
- [ ] Customer portal
- [ ] Mobile app
- [ ] Advanced analytics

## License

This project is proprietary. All rights reserved.

## Credits

Built with:
- [Next.js](https://nextjs.org/)
- [React](https://react.dev/)
- [Prisma](https://www.prisma.io/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Vercel](https://vercel.com/)

## Project Status

**Status**: ✅ Production Ready

Core features are complete and tested. The application is ready for deployment with email integration being the only critical remaining item before launch.

**Version**: 1.0.0

**Last Updated**: November 19, 2025

---

For detailed information, see the documentation files in this directory.
