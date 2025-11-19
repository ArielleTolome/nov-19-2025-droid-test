# Setup Guide - Dumpster Rental Website

This guide will help you set up and run the dumpster rental website locally on your machine.

## Table of Contents
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Database Setup](#database-setup)
- [Seeding Data](#seeding-data)
- [Running the Development Server](#running-the-development-server)
- [Building for Production](#building-for-production)
- [Troubleshooting](#troubleshooting)

## Prerequisites

Before you begin, ensure you have the following installed on your system:

- **Node.js**: Version 18.x or higher
  ```bash
  node --version  # Should be v18.0.0 or higher
  ```

- **npm**: Version 9.x or higher (comes with Node.js)
  ```bash
  npm --version
  ```

- **PostgreSQL**: Version 14 or higher
  - macOS: `brew install postgresql@14`
  - Ubuntu: `sudo apt-get install postgresql-14`
  - Windows: Download from [postgresql.org](https://www.postgresql.org/download/)

- **Git**: For version control
  ```bash
  git --version
  ```

## Installation

1. **Clone the repository** (if you haven't already):
   ```bash
   git clone <repository-url>
   cd app
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

   This will install all required packages including:
   - Next.js 16.0.3 (React framework)
   - React 19.2.0
   - Prisma 6.19.0 (Database ORM)
   - Tailwind CSS 4 (Styling)
   - React Hook Form + Zod (Form validation)
   - TypeScript 5 (Type safety)

## Environment Variables

1. **Copy the example environment file**:
   ```bash
   cp .env.example .env
   ```

2. **Configure the `.env` file**:

   Open `.env` in your text editor and configure the following variables:

   ### Required Variables

   ```env
   # Database Connection
   DATABASE_URL="postgresql://username:password@localhost:5432/dumpster_rental?schema=public"

   # Application Settings
   NODE_ENV=development
   NEXT_PUBLIC_APP_URL=http://localhost:3000
   ```

   ### Optional Variables (for production features)

   ```env
   # Email Service (Choose one)
   # SendGrid
   SENDGRID_API_KEY=your_sendgrid_api_key_here
   SENDGRID_FROM_EMAIL=noreply@yourdomain.com

   # OR Resend
   RESEND_API_KEY=your_resend_api_key_here

   # Admin Email (for contact form notifications)
   ADMIN_EMAIL=admin@yourdomain.com

   # Optional Integrations
   GOOGLE_MAPS_API_KEY=your_google_maps_api_key
   STRIPE_SECRET_KEY=your_stripe_secret_key
   STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
   ```

## Database Setup

### Local PostgreSQL Setup

1. **Create a PostgreSQL database**:

   **Option A: Using psql command-line**
   ```bash
   # Connect to PostgreSQL
   psql -U postgres

   # Create database
   CREATE DATABASE dumpster_rental;

   # Create user (optional)
   CREATE USER dumpster_user WITH PASSWORD 'your_password';

   # Grant privileges
   GRANT ALL PRIVILEGES ON DATABASE dumpster_rental TO dumpster_user;

   # Exit psql
   \q
   ```

   **Option B: Using pgAdmin**
   - Open pgAdmin
   - Right-click on "Databases" → Create → Database
   - Name: `dumpster_rental`
   - Click "Save"

2. **Update DATABASE_URL in `.env`**:
   ```env
   DATABASE_URL="postgresql://postgres:your_password@localhost:5432/dumpster_rental?schema=public"
   ```

3. **Generate Prisma Client**:
   ```bash
   npx prisma generate
   ```

4. **Run database migrations**:
   ```bash
   npx prisma db push
   ```

   This will create all tables defined in `prisma/schema.prisma`:
   - State
   - City
   - DumpsterSize
   - ServiceType
   - Quote
   - BlogPost

5. **Verify the database schema**:
   ```bash
   npx prisma studio
   ```
   This opens a visual database browser at http://localhost:5555

## Seeding Data

The application includes seed data for all 50 US states and 19,495 cities.

1. **Run the seed script**:
   ```bash
   npm run prisma db seed
   ```

   Or manually:
   ```bash
   npx prisma db seed
   ```

   This will populate:
   - 50 US states with metadata
   - 19,495+ cities across all states
   - 4 dumpster sizes (10, 20, 30, 40 yard)
   - Service types
   - Sample blog posts

2. **Verify seeded data**:
   ```bash
   npx prisma studio
   ```

   Check that you have:
   - 50 states in the `State` table
   - 19,495+ cities in the `City` table
   - 4 records in the `DumpsterSize` table

### Alternative: Generate Location Data

If you need to regenerate or update location data:

```bash
npx tsx scripts/generate-locations.ts
```

This script:
- Fetches comprehensive US city data
- Generates optimized JSON files
- Prepares data for database seeding

## Running the Development Server

1. **Start the development server**:
   ```bash
   npm run dev
   ```

2. **Open your browser**:
   Navigate to [http://localhost:3000](http://localhost:3000)

3. **Available pages**:
   - Home: `http://localhost:3000/`
   - Sizes: `http://localhost:3000/sizes`
   - Services: `http://localhost:3000/services`
   - Contact: `http://localhost:3000/contact`
   - Quote: `http://localhost:3000/quote`
   - State pages: `http://localhost:3000/[state-slug]`
   - City pages: `http://localhost:3000/[state-slug]/[city-slug]`

4. **Hot reload**:
   The development server supports hot module replacement (HMR). Changes to files will automatically refresh in the browser.

## Building for Production

1. **Create a production build**:
   ```bash
   npm run build
   ```

   This command:
   - Compiles TypeScript
   - Optimizes React components
   - Generates static pages for dynamic routes
   - Minifies CSS and JavaScript
   - Optimizes images

2. **Test the production build locally**:
   ```bash
   npm run start
   ```

   Visit [http://localhost:3000](http://localhost:3000) to test the production build.

3. **Check build output**:
   ```bash
   ls -la .next/
   ```

   Key directories:
   - `.next/static/` - Static assets
   - `.next/server/` - Server-side code
   - `.next/cache/` - Build cache

## Troubleshooting

### Common Issues

#### 1. Database Connection Errors

**Error**: `Can't reach database server`

**Solutions**:
- Verify PostgreSQL is running: `pg_isready`
- Check DATABASE_URL format in `.env`
- Ensure database exists: `psql -l | grep dumpster_rental`
- Check PostgreSQL logs: `tail -f /usr/local/var/log/postgresql.log`

#### 2. Port Already in Use

**Error**: `Port 3000 is already in use`

**Solutions**:
```bash
# Find process using port 3000
lsof -i :3000

# Kill the process
kill -9 <PID>

# Or use a different port
PORT=3001 npm run dev
```

#### 3. Prisma Client Generation Issues

**Error**: `Cannot find module '@prisma/client'`

**Solution**:
```bash
npx prisma generate
npm install
```

#### 4. Module Not Found Errors

**Error**: `Module not found: Can't resolve '@/components/...'`

**Solution**:
- Clear Next.js cache: `rm -rf .next`
- Reinstall dependencies: `rm -rf node_modules package-lock.json && npm install`
- Check `tsconfig.json` paths configuration

#### 5. TypeScript Errors

**Error**: Type errors during build

**Solutions**:
```bash
# Check for TypeScript errors
npx tsc --noEmit

# Update TypeScript
npm install -D typescript@latest

# Clear TypeScript cache
rm -rf tsconfig.tsbuildinfo
```

#### 6. Seed Script Fails

**Error**: Seed script crashes or times out

**Solutions**:
```bash
# Run with more memory
NODE_OPTIONS="--max-old-space-size=4096" npx prisma db seed

# Seed in smaller batches (modify seed.ts)
# Check database connection
psql -U postgres -d dumpster_rental -c "SELECT 1"
```

#### 7. Styling Issues

**Error**: Tailwind classes not working

**Solutions**:
- Check `tailwind.config.js` exists
- Verify `globals.css` imports Tailwind directives
- Clear Next.js cache: `rm -rf .next`
- Rebuild: `npm run build`

#### 8. Environment Variables Not Loading

**Error**: Environment variables are undefined

**Solutions**:
- Restart development server after changing `.env`
- Use `NEXT_PUBLIC_` prefix for client-side variables
- Check `.env` file is in project root
- Verify no syntax errors in `.env` file

### Getting Help

If you encounter issues not covered here:

1. **Check logs**:
   - Browser console (F12)
   - Terminal output
   - Database logs

2. **Verify configuration**:
   - `.env` file
   - `prisma/schema.prisma`
   - `next.config.ts`

3. **Common commands**:
   ```bash
   # Clear all caches
   rm -rf .next node_modules package-lock.json
   npm install
   npx prisma generate

   # Reset database
   npx prisma db push --force-reset
   npx prisma db seed

   # Check database status
   npx prisma studio
   ```

4. **Documentation resources**:
   - [Next.js Documentation](https://nextjs.org/docs)
   - [Prisma Documentation](https://www.prisma.io/docs)
   - [Tailwind CSS Documentation](https://tailwindcss.com/docs)
   - [React Hook Form Documentation](https://react-hook-form.com)

## Development Workflow

### Recommended Development Flow

1. **Start database** (if not running):
   ```bash
   # macOS/Linux
   brew services start postgresql@14
   # or
   sudo service postgresql start
   ```

2. **Run Prisma Studio** (optional, for database visualization):
   ```bash
   npx prisma studio
   # Runs on http://localhost:5555
   ```

3. **Start development server**:
   ```bash
   npm run dev
   ```

4. **Make changes** to code files

5. **Test changes** in browser at http://localhost:3000

6. **Run linter** before committing:
   ```bash
   npm run lint
   ```

### Database Changes

When modifying the database schema:

1. Update `prisma/schema.prisma`
2. Run migrations:
   ```bash
   npx prisma db push
   ```
3. Regenerate Prisma Client:
   ```bash
   npx prisma generate
   ```
4. Update seed script if needed
5. Re-seed database:
   ```bash
   npx prisma db seed
   ```

## Performance Tips

1. **Development Mode**:
   - Slower than production (includes debugging tools)
   - Hot reload may slow down with many files
   - Use `npm run build && npm start` to test performance

2. **Database Optimization**:
   - Prisma Studio can slow down with large datasets
   - Close Prisma Studio when not needed
   - Use database indexes (already configured in schema)

3. **Memory Usage**:
   - Increase Node.js memory if needed:
     ```bash
     NODE_OPTIONS="--max-old-space-size=4096" npm run dev
     ```

## Next Steps

After successful setup:

1. Read [ARCHITECTURE.md](./ARCHITECTURE.md) to understand the codebase
2. Review [CONTENT.md](./CONTENT.md) for content management
3. Check [DEPLOYMENT.md](./DEPLOYMENT.md) for deployment instructions
4. See [PROGRESS.md](./PROGRESS.md) for project status and roadmap
