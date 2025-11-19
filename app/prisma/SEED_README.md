# Database Seed Script

This document describes the Prisma seed script setup for the dumpster rental website.

## Overview

The seed script (`seed.ts`) populates the database with:
- **50 US States** - All states with population data and SEO metadata
- **500 Cities** - Major cities across all states with coordinates and zip codes
- **4 Dumpster Sizes** - 10, 20, 30, and 40 yard containers with detailed specifications
- **9 Service Types** - Residential, Commercial, Construction, Roll-off, etc.

## Running the Seed Script

```bash
npx prisma db seed
```

Or manually:
```bash
npx tsx prisma/seed.ts
```

## Features

### Idempotent Seeding
The script uses `upsert` operations, so it can be run multiple times without creating duplicates. It will:
- Create new records if they don't exist
- Update existing records if they're already in the database

### Progress Logging
The script provides detailed console output:
- Loading data files
- Seeding progress with counts
- Batch processing updates for cities
- Final summary with totals

### Data Integrity
- Uses proper Prisma transactions
- Validates state relationships before creating cities
- Handles errors gracefully with detailed error messages

### Batch Processing
Cities are processed in batches of 50 to optimize performance and avoid memory issues with large datasets.

## Data Structure

### States
Each state includes:
- Name, slug, abbreviation
- Population
- Auto-generated SEO metadata (metaTitle, metaDesc)

### Cities
Each city includes:
- Name, slug
- State relationship
- Population, latitude, longitude
- Multiple zip codes
- Auto-generated SEO metadata

### Dumpster Sizes

#### 10 Yard Dumpster
- **Dimensions**: 14' L x 8' W x 4' H
- **Capacity**: 3-4 pickup truck loads
- **Base Price**: $299
- **Weight Limit**: 2-3 tons
- **Ideal For**: Small renovations, garage cleanouts, minor landscaping

#### 20 Yard Dumpster
- **Dimensions**: 22' L x 8' W x 4.5' H
- **Capacity**: 6-8 pickup truck loads
- **Base Price**: $399
- **Weight Limit**: 3-4 tons
- **Ideal For**: Kitchen/bathroom remodels, estate cleanouts, roof replacement

#### 30 Yard Dumpster
- **Dimensions**: 22' L x 8' W x 6' H
- **Capacity**: 9-12 pickup truck loads
- **Base Price**: $499
- **Weight Limit**: 4-5 tons
- **Ideal For**: Major renovations, new construction, large demolition

#### 40 Yard Dumpster
- **Dimensions**: 22' L x 8' W x 8' H
- **Capacity**: 12-16 pickup truck loads
- **Base Price**: $599
- **Weight Limit**: 5-6 tons
- **Ideal For**: Commercial construction, large-scale demolition, industrial cleanup

### Service Types

1. **Residential** - Home projects and cleanouts
2. **Commercial** - Business and contractor services
3. **Construction** - Heavy-duty construction debris
4. **Roll-off** - Versatile container solutions
5. **Demolition** - Specialized debris removal
6. **Renovation** - Remodeling projects
7. **Roofing** - Shingle removal and roof tear-offs
8. **Cleanout** - Estate and decluttering services
9. **Landscaping** - Yard waste and tree removal

## Data Files

### `/data/states.json`
Contains all 50 US states with:
```json
{
  "name": "California",
  "abbreviation": "CA",
  "population": 39538223,
  "slug": "california"
}
```

### `/data/cities.json`
Contains 500 cities with:
```json
{
  "name": "Los Angeles",
  "population": 3979576,
  "zipCodes": ["90001", "90012", "90013"],
  "latitude": 34.0522,
  "longitude": -118.2437,
  "slug": "los-angeles",
  "stateAbbr": "CA",
  "stateName": "California",
  "stateSlug": "california"
}
```

## Troubleshooting

### Database Connection Issues
Ensure your `DATABASE_URL` is set in `.env`:
```
DATABASE_URL="postgresql://user:password@localhost:5432/dbname"
```

### Missing Data Files
The script expects data files at:
- `/data/states.json`
- `/data/cities.json`

### TypeScript Errors
Make sure `tsx` is installed:
```bash
npm install tsx --save-dev
```

## Resetting the Database

To reset and reseed the database:
```bash
npx prisma migrate reset
```

This will:
1. Drop the database
2. Recreate it
3. Run migrations
4. Automatically run the seed script
