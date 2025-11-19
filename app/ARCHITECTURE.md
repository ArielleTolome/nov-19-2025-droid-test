# Architecture Documentation - Dumpster Rental Website

This document provides a comprehensive overview of the technical architecture, project structure, and implementation details of the dumpster rental website.

## Table of Contents
- [Technology Stack](#technology-stack)
- [Project Structure](#project-structure)
- [Data Flow](#data-flow)
- [Component Hierarchy](#component-hierarchy)
- [Database Schema](#database-schema)
- [API Routes](#api-routes)
- [Static Site Generation Strategy](#static-site-generation-strategy)
- [Performance Optimizations](#performance-optimizations)
- [Security Considerations](#security-considerations)

## Technology Stack

### Core Framework
- **Next.js 16.0.3**: React framework with App Router
  - Server-side rendering (SSR)
  - Static site generation (SSG)
  - API routes
  - Built-in optimization

### Frontend
- **React 19.2.0**: UI library
- **TypeScript 5**: Type-safe JavaScript
- **Tailwind CSS 4**: Utility-first CSS framework
- **React Hook Form 7.66.1**: Form state management
- **Zod 4.1.12**: Schema validation

### Backend & Database
- **Prisma 6.19.0**: Next-generation ORM
- **PostgreSQL**: Relational database
- **Node.js 20+**: Runtime environment

### Development Tools
- **ESLint 9**: Code linting
- **PostCSS**: CSS processing
- **tsx**: TypeScript execution

## Project Structure

```
/app
├── app/                          # Next.js App Router
│   ├── layout.tsx                # Root layout with Header/Footer
│   ├── page.tsx                  # Homepage
│   ├── globals.css               # Global styles
│   ├── api/                      # API routes
│   │   ├── quote/
│   │   │   └── route.ts          # Quote submission endpoint
│   │   └── contact/
│   │       └── route.ts          # Contact form endpoint
│   ├── [state]/                  # Dynamic state pages
│   │   ├── page.tsx              # State landing page
│   │   └── [city]/
│   │       └── page.tsx          # City landing page
│   ├── sizes/
│   │   └── page.tsx              # Dumpster sizes page
│   ├── services/
│   │   └── page.tsx              # Services overview page
│   ├── contact/
│   │   └── page.tsx              # Contact page
│   └── quote/
│       └── page.tsx              # Quote request page
│
├── components/                   # React components
│   ├── dumpster/                 # Dumpster-specific components
│   │   ├── DumpsterCard.tsx
│   │   └── DumpsterFeatures.tsx
│   ├── forms/                    # Form components
│   │   ├── QuoteForm.tsx         # Multi-step quote form
│   │   ├── ContactForm.tsx       # Contact form
│   │   └── index.ts
│   ├── layout/                   # Layout components
│   │   ├── Header.tsx            # Site header
│   │   ├── Footer.tsx            # Site footer
│   │   └── Navigation.tsx        # Navigation menu
│   ├── location/                 # Location components
│   │   ├── StateGrid.tsx         # State listing grid
│   │   ├── CityList.tsx          # City listing
│   │   └── LocationSearch.tsx    # Search functionality
│   ├── sections/                 # Page sections
│   │   ├── Hero.tsx              # Hero section
│   │   ├── CallToAction.tsx      # CTA sections
│   │   ├── DumpsterSizeCard.tsx  # Size cards
│   │   ├── ServiceGrid.tsx       # Service grid
│   │   └── FAQ.tsx               # FAQ section
│   └── ui/                       # UI primitives
│       ├── Button.tsx
│       ├── Card.tsx
│       ├── Badge.tsx
│       └── Container.tsx
│
├── lib/                          # Utility libraries
│   ├── prisma.ts                 # Prisma client singleton
│   ├── location.ts               # Location utilities
│   └── validations/              # Validation schemas
│       └── quote.ts              # Form validation schemas
│
├── prisma/                       # Database
│   ├── schema.prisma             # Database schema
│   ├── seed.ts                   # Database seeding script
│   └── SEED_README.md            # Seeding documentation
│
├── data/                         # Static data
│   ├── states.json               # US states data (50 states)
│   └── cities.json               # US cities data (19,495+ cities)
│
├── scripts/                      # Build scripts
│   └── generate-locations.ts    # Generate location data
│
├── public/                       # Static assets
│   └── images/                   # Image assets
│
└── Configuration files
    ├── package.json              # Dependencies and scripts
    ├── tsconfig.json             # TypeScript configuration
    ├── next.config.ts            # Next.js configuration
    ├── tailwind.config.js        # Tailwind CSS configuration
    ├── postcss.config.mjs        # PostCSS configuration
    ├── eslint.config.mjs         # ESLint configuration
    └── .env.example              # Environment variables template
```

## Data Flow

### Page Rendering Flow

```
User Request
    ↓
Next.js Router
    ↓
Server Component (page.tsx)
    ↓
Database Query (Prisma)
    ↓
Data Fetching
    ↓
Component Rendering
    ↓
HTML Response
    ↓
Client Hydration
```

### Form Submission Flow

```
User Input
    ↓
Client-side Validation (Zod)
    ↓
React Hook Form
    ↓
API Route (/api/quote or /api/contact)
    ↓
Server-side Validation (Zod)
    ↓
Database Write (Prisma)
    ↓
Email Notification (Optional)
    ↓
Success Response
    ↓
UI Feedback
```

### State/City Page Generation

```
Build Time:
  ↓
  Database Query (get all states/cities)
  ↓
  Generate Static Params
  ↓
  Pre-render Pages (ISR)
  ↓
  Static HTML Files

Runtime:
  ↓
  User Request
  ↓
  Serve Static Page (if exists)
  ↓
  OR Render on-demand (if new)
  ↓
  Cache for future requests
```

## Component Hierarchy

### Layout Components

```
RootLayout (app/layout.tsx)
├── Header
│   └── Navigation
│       ├── Logo
│       ├── NavLinks
│       └── CTAButton
├── Main (children)
│   └── Page Components
└── Footer
    ├── FooterLinks
    ├── SocialLinks
    └── Copyright
```

### Homepage Component Tree

```
HomePage (app/page.tsx)
├── Hero
│   ├── Headline
│   ├── Subheadline
│   ├── QuoteButton
│   └── BackgroundImage
├── DumpsterSizes
│   └── DumpsterSizeCard[] (4 sizes)
│       ├── SizeTitle
│       ├── Dimensions
│       ├── Features
│       └── CTAButton
├── Services
│   └── ServiceGrid
│       └── ServiceCard[] (4-6 services)
├── Locations
│   └── StateGrid
│       └── StateCard[] (50 states)
├── FAQ
│   └── FAQItem[] (8-10 questions)
└── CallToAction
    ├── Headline
    ├── Description
    └── QuoteButton
```

### Form Component Tree

```
QuoteForm
├── ProgressIndicator
│   └── Step[] (3 steps)
├── Step1: Location
│   ├── ZipCodeInput
│   ├── CitySelect
│   └── AddressInput
├── Step2: ProjectDetails
│   ├── DumpsterSizeSelect
│   ├── ServiceTypeSelect
│   ├── ProjectTypeSelect
│   ├── RentalDurationSelect
│   └── DeliveryDatePicker
├── Step3: ContactInfo
│   ├── NameInput
│   ├── EmailInput
│   ├── PhoneInput
│   └── MessageTextarea
└── FormActions
    ├── BackButton
    └── NextButton / SubmitButton
```

## Database Schema

### Entity Relationship Diagram

```
State (1) ────────< (Many) City
                              │
                              │
                              │ (Many)
                              └────────> (1) Quote

DumpsterSize (Independent)
ServiceType (Independent)
BlogPost (Independent)
```

### Detailed Schema

#### State Model
```prisma
model State {
  id           String   @id @default(cuid())
  name         String   // "California"
  slug         String   @unique // "california"
  abbreviation String   @unique // "CA"
  cities       City[]   // Relationship to cities
  population   Int?     // Optional population data
  content      String?  @db.Text // SEO content
  metaTitle    String?  // SEO title
  metaDesc     String?  @db.Text // SEO description
  createdAt    DateTime @default(now())
  updatedAt    DateTime @updatedAt

  @@index([slug])
}
```

**Purpose**: Store US state information for location-based landing pages

**Indexes**:
- `slug`: Fast lookup for URL routing
- `abbreviation`: Quick state code queries

**Count**: 50 records (all US states)

#### City Model
```prisma
model City {
  id         String   @id @default(cuid())
  name       String   // "Los Angeles"
  slug       String   // "los-angeles"
  state      State    @relation(fields: [stateId], references: [id])
  stateId    String   // Foreign key
  population Int?     // Optional population
  zipCodes   String[] // Array of zip codes
  latitude   Float?   // Geo coordinates
  longitude  Float?   // Geo coordinates
  content    String?  @db.Text // SEO content
  metaTitle  String?  // SEO title
  metaDesc   String?  @db.Text // SEO description
  quotes     Quote[]  // Related quotes
  createdAt  DateTime @default(now())
  updatedAt  DateTime @updatedAt

  @@unique([stateId, slug]) // City slug unique per state
  @@index([stateId])
  @@index([slug])
}
```

**Purpose**: Store city information for hyper-local SEO pages

**Indexes**:
- `stateId`: Fast state-city relationships
- `slug`: URL routing
- Composite unique: Prevent duplicate cities per state

**Count**: 19,495+ records (major US cities)

#### DumpsterSize Model
```prisma
model DumpsterSize {
  id          String   @id @default(cuid())
  size        Int      // 10, 20, 30, 40
  name        String   // "10 Yard Dumpster"
  slug        String   @unique // "10-yard"
  dimensions  String   // "14' L x 8' W x 4' H"
  capacity    String   // "3-4 pickup truck loads"
  basePrice   Float    // Starting price
  description String   @db.Text
  idealFor    String[] // Use cases
  weight      String   // Weight limit
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt

  @@index([slug])
}
```

**Purpose**: Store dumpster size specifications

**Count**: 4 records (10, 20, 30, 40 yard sizes)

#### ServiceType Model
```prisma
model ServiceType {
  id          String   @id @default(cuid())
  name        String   // "Residential Dumpster Rental"
  slug        String   @unique // "residential"
  description String   @db.Text
  icon        String?  // Icon identifier
  metaTitle   String?
  metaDesc    String?  @db.Text
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt

  @@index([slug])
}
```

**Purpose**: Define service categories

**Count**: 4-6 records (Residential, Commercial, Construction, etc.)

#### Quote Model
```prisma
model Quote {
  id             String    @id @default(cuid())
  name           String
  email          String
  phone          String
  city           City?     @relation(fields: [cityId], references: [id])
  cityId         String?
  dumpsterSize   String
  serviceType    String
  projectType    String
  rentalDuration String
  deliveryDate   DateTime?
  address        String?
  zipCode        String
  message        String?   @db.Text
  status         String    @default("pending")
  createdAt      DateTime  @default(now())
  updatedAt      DateTime  @updatedAt

  @@index([status])
  @@index([createdAt])
  @@index([cityId])
}
```

**Purpose**: Store customer quote requests

**Indexes**:
- `status`: Filter by quote status
- `createdAt`: Sort by date
- `cityId`: Location-based queries

**Status Values**: "pending", "contacted", "quoted", "won", "lost"

#### BlogPost Model
```prisma
model BlogPost {
  id          String    @id @default(cuid())
  title       String
  slug        String    @unique
  content     String    @db.Text
  excerpt     String
  author      String    @default("DumpsterRentalPro Team")
  published   Boolean   @default(false)
  publishedAt DateTime?
  metaTitle   String?
  metaDesc    String?   @db.Text
  createdAt   DateTime  @default(now())
  updatedAt   DateTime  @updatedAt

  @@index([published])
  @@index([slug])
}
```

**Purpose**: SEO blog content (future feature)

## API Routes

### Quote API (`/api/quote`)

**Endpoint**: `POST /api/quote`

**Request Body**:
```typescript
{
  // Location (Step 1)
  zipCode: string;
  city?: string;
  address?: string;

  // Project Details (Step 2)
  dumpsterSize: string;
  serviceType: string;
  projectType: string;
  rentalDuration: string;
  deliveryDate?: Date;

  // Contact Info (Step 3)
  name: string;
  email: string;
  phone: string;
  message?: string;
}
```

**Response**:
```typescript
{
  success: boolean;
  message: string;
  quoteId?: string;
  error?: string;
}
```

**Process Flow**:
1. Validate request body with Zod schema
2. Extract city information if provided
3. Create quote record in database
4. Send email notification (optional)
5. Return success response with quote ID

**Error Handling**:
- 400: Validation errors
- 500: Server/database errors

### Contact API (`/api/contact`)

**Endpoint**: `POST /api/contact`

**Request Body**:
```typescript
{
  name: string;
  email: string;
  phone: string;
  message: string;
}
```

**Response**:
```typescript
{
  success: boolean;
  message: string;
  error?: string;
}
```

**Process Flow**:
1. Validate request body
2. Send email to admin (optional)
3. Return success response

### Future API Routes

Potential endpoints for expansion:
- `GET /api/pricing` - Get pricing information
- `GET /api/availability` - Check service availability
- `GET /api/blog` - Fetch blog posts
- `POST /api/newsletter` - Newsletter signup

## Static Site Generation Strategy

### Incremental Static Regeneration (ISR)

The application uses Next.js ISR for optimal performance:

```typescript
// State pages
export const revalidate = 86400; // 24 hours

export async function generateStaticParams() {
  const states = await prisma.state.findMany();
  return states.map((state) => ({
    state: state.slug,
  }));
}
```

**Benefits**:
- Fast page loads (pre-rendered HTML)
- SEO-friendly (full HTML on first paint)
- Automatic updates (revalidate every 24 hours)
- Reduced database load

### Build-Time Generation

**Pages Generated at Build**:
1. Homepage (`/`)
2. Static pages (`/sizes`, `/services`, `/contact`, `/quote`)
3. All state pages (`/[state]`) - 50 pages
4. Top 1,000 city pages (most populous cities)

**On-Demand Generation**:
- Remaining city pages (generated on first request)
- New blog posts (when published)

### Caching Strategy

```
Browser Cache (1 hour)
    ↓
CDN Cache (Vercel Edge) (1 hour)
    ↓
Server Cache (24 hours)
    ↓
Database Query
```

## Performance Optimizations

### 1. Database Optimizations

**Indexes**:
- All foreign keys indexed
- Slug fields indexed for URL lookups
- Date fields indexed for sorting
- Status fields indexed for filtering

**Connection Pooling**:
```typescript
// lib/prisma.ts
import { PrismaClient } from '@prisma/client';

const prismaClientSingleton = () => {
  return new PrismaClient();
};

declare global {
  var prisma: undefined | ReturnType<typeof prismaClientSingleton>;
}

const prisma = globalThis.prisma ?? prismaClientSingleton();

export default prisma;

if (process.env.NODE_ENV !== 'production') globalThis.prisma = prisma;
```

**Query Optimization**:
- Select only needed fields
- Use includes for relationships
- Batch queries when possible

### 2. Image Optimization

Using Next.js Image component:
```tsx
import Image from 'next/image';

<Image
  src="/dumpster.jpg"
  width={800}
  height={600}
  alt="Dumpster"
  loading="lazy"
  placeholder="blur"
/>
```

### 3. Code Splitting

- Automatic route-based code splitting
- Dynamic imports for heavy components
- Lazy loading for below-the-fold content

### 4. CSS Optimization

- Tailwind CSS purges unused styles
- Critical CSS inlined
- Non-critical CSS loaded asynchronously

### 5. Font Optimization

Using Next.js Font optimization:
```typescript
import { Inter } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});
```

## Security Considerations

### 1. Input Validation

**Client-side**: React Hook Form + Zod
**Server-side**: Zod validation in API routes

```typescript
import { z } from 'zod';

const quoteSchema = z.object({
  email: z.string().email(),
  phone: z.string().regex(/^\+?1?\d{10,14}$/),
  zipCode: z.string().regex(/^\d{5}(-\d{4})?$/),
});
```

### 2. SQL Injection Prevention

Prisma ORM prevents SQL injection:
```typescript
// Safe - Prisma parameterizes queries
const city = await prisma.city.findUnique({
  where: { slug: userInput }
});
```

### 3. XSS Protection

React automatically escapes output:
```tsx
// Safe - React escapes HTML
<p>{userInput}</p>
```

### 4. CSRF Protection

API routes use Next.js built-in CSRF protection for form submissions.

### 5. Rate Limiting

Consider adding rate limiting for API routes:
```typescript
import rateLimit from 'express-rate-limit';

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // 5 requests per window
});
```

### 6. Environment Variables

- Never commit `.env` files
- Use `.env.example` for documentation
- Sensitive keys only in production

### 7. CORS Configuration

API routes restrict origins:
```typescript
const headers = {
  'Access-Control-Allow-Origin': process.env.NEXT_PUBLIC_APP_URL,
  'Access-Control-Allow-Methods': 'POST',
};
```

## Development Patterns

### 1. Component Patterns

**Server Components** (default):
- Fetch data directly
- No client-side JavaScript
- SEO-friendly

**Client Components**:
- Interactive features
- Forms and user input
- Browser APIs

### 2. Data Fetching

**Server-side**:
```typescript
async function getData() {
  const data = await prisma.state.findMany();
  return data;
}

export default async function Page() {
  const data = await getData();
  return <div>{/* render */}</div>;
}
```

### 3. Error Handling

```typescript
try {
  const result = await prisma.quote.create({ data });
  return { success: true, quoteId: result.id };
} catch (error) {
  console.error('Quote creation failed:', error);
  return { success: false, error: 'Failed to create quote' };
}
```

### 4. Type Safety

Full TypeScript coverage:
- Prisma generates types from schema
- Zod schemas generate TypeScript types
- Component props fully typed

## Deployment Architecture

```
User Request
    ↓
DNS (Vercel)
    ↓
CDN/Edge Network
    ↓
Next.js Server (Vercel)
    ↓
Database (PostgreSQL - Railway/Supabase/Neon)
```

**Infrastructure**:
- **Hosting**: Vercel (Serverless)
- **Database**: PostgreSQL (managed service)
- **CDN**: Vercel Edge Network
- **SSL**: Automatic (Vercel)

## Scalability Considerations

### Current Scale
- 50 state pages
- 19,495+ city pages
- Unlimited quote submissions
- Handle 10,000+ requests/day

### Future Scaling
- Add read replicas for database
- Implement Redis caching
- Use connection pooling (already configured)
- Optimize database queries with query analysis
- Consider moving to edge functions for API routes

## Monitoring & Observability

**Recommended Tools**:
- Vercel Analytics: Page views and performance
- Sentry: Error tracking
- Prisma Studio: Database inspection
- Vercel Logs: Function execution logs

## Next Steps for Architecture

1. Implement caching layer (Redis)
2. Add full-text search (PostgreSQL FTS or Algolia)
3. Create admin dashboard
4. Add real-time notifications (WebSocket or Server-Sent Events)
5. Implement payment processing (Stripe)
6. Add automated testing (Jest, Playwright)
7. Set up CI/CD pipeline (GitHub Actions)
