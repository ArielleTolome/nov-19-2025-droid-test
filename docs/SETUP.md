# Setup Guide

## Prerequisites

- Node.js 18+ and npm
- PostgreSQL database (local or cloud)
- Git

## Installation Steps

### 1. Clone the Repository

```bash
git clone <repository-url>
cd dumpster-rental-pro
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Environment Variables

Copy `.env.example` to `.env` and fill in your values:

```bash
cp .env.example .env
```

Required environment variables:
- `DATABASE_URL`: PostgreSQL connection string
- `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`: Email configuration (optional)
- `NEXT_PUBLIC_SITE_URL`: Your site URL (e.g., http://localhost:3000)

### 4. Generate Location Data

```bash
npm run generate:locations
```

This creates `data/locations.json` with 500+ cities across all US states.

### 5. Set Up Database

```bash
# Generate Prisma client
npm run db:generate

# Push schema to database
npm run db:push

# Or run migrations
npm run db:migrate
```

### 6. Seed Database

```bash
npm run db:seed
```

This populates the database with:
- All 50 US states
- 500+ cities
- Dumpster sizes (10, 20, 30, 40 yard)
- Service types

### 7. Run Development Server

```bash
npm run dev
```

Visit http://localhost:3000

## Building for Production

```bash
npm run build
npm start
```

## Troubleshooting

### Database Connection Issues

- Verify your `DATABASE_URL` is correct
- Ensure PostgreSQL is running
- Check database permissions

### Build Errors

- Clear `.next` folder: `rm -rf .next`
- Reinstall dependencies: `rm -rf node_modules && npm install`
- Regenerate Prisma client: `npm run db:generate`
