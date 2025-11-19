# Content Management Guide - Dumpster Rental Website

This guide explains how to add, update, and manage content for the dumpster rental website.

## Table of Contents
- [Overview](#overview)
- [Managing States and Cities](#managing-states-and-cities)
- [Managing Dumpster Sizes](#managing-dumpster-sizes)
- [Managing Service Types](#managing-service-types)
- [Updating Pricing](#updating-pricing)
- [Adding Blog Posts](#adding-blog-posts)
- [Managing Quotes](#managing-quotes)
- [SEO Best Practices](#seo-best-practices)
- [Content Strategy](#content-strategy)

## Overview

Content in this application is managed through:
1. **Database**: Primary content storage (Prisma + PostgreSQL)
2. **Static Files**: Data files for initial seeding
3. **Components**: Template-based content rendering
4. **API Routes**: Dynamic content delivery

### Tools You'll Need
- **Prisma Studio**: Visual database editor (recommended for beginners)
- **Database Client**: psql, pgAdmin, or cloud provider dashboard
- **Code Editor**: VS Code or similar (for static content)

## Managing States and Cities

### Viewing Existing States and Cities

**Using Prisma Studio** (Easiest):
```bash
npx prisma studio
```
This opens a browser interface at http://localhost:5555 where you can:
- View all states
- View all cities
- Edit records
- Delete records
- Create new records

**Using Database Query**:
```bash
# Connect to database
psql $DATABASE_URL

# View states
SELECT id, name, slug, abbreviation FROM "State" LIMIT 10;

# View cities by state
SELECT c.name, c.slug, s.name as state_name
FROM "City" c
JOIN "State" s ON c."stateId" = s.id
WHERE s.slug = 'california'
LIMIT 20;
```

### Adding a New State

While all 50 US states are already included, here's how to add one:

**Method 1: Using Prisma Studio**
1. Run `npx prisma studio`
2. Click on "State" model
3. Click "Add record"
4. Fill in fields:
   - name: "California"
   - slug: "california"
   - abbreviation: "CA"
   - population: 39538223
   - content: "SEO content here..."
   - metaTitle: "Dumpster Rental in California | Affordable Prices"
   - metaDesc: "Professional dumpster rental services..."
5. Click "Save 1 change"

**Method 2: Using Code**

Create a script `scripts/add-state.ts`:
```typescript
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const state = await prisma.state.create({
    data: {
      name: 'California',
      slug: 'california',
      abbreviation: 'CA',
      population: 39538223,
      content: `
        Looking for reliable dumpster rental in California?
        We provide professional waste management services across the state.
      `.trim(),
      metaTitle: 'Dumpster Rental in California | Affordable Prices',
      metaDesc: 'Professional dumpster rental services throughout California. Same-day delivery, flexible rental periods, competitive pricing.',
    },
  });

  console.log('Created state:', state);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
```

Run it:
```bash
npx tsx scripts/add-state.ts
```

### Adding a New City

**Method 1: Using Prisma Studio**
1. Run `npx prisma studio`
2. Click on "City" model
3. Click "Add record"
4. Fill in fields:
   - name: "Los Angeles"
   - slug: "los-angeles"
   - stateId: [Select California from dropdown]
   - population: 3979576
   - zipCodes: ["90001", "90002", "90003"]
   - latitude: 34.0522
   - longitude: -118.2437
   - content: "SEO content..."
   - metaTitle: "Dumpster Rental in Los Angeles, CA"
   - metaDesc: "Affordable dumpster rental..."
5. Click "Save 1 change"

**Method 2: Using Code**

```typescript
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function addCity() {
  // First, get the state
  const state = await prisma.state.findUnique({
    where: { slug: 'california' }
  });

  if (!state) {
    throw new Error('State not found');
  }

  // Create the city
  const city = await prisma.city.create({
    data: {
      name: 'Los Angeles',
      slug: 'los-angeles',
      stateId: state.id,
      population: 3979576,
      zipCodes: ['90001', '90002', '90003', '90004', '90005'],
      latitude: 34.0522,
      longitude: -118.2437,
      content: `
        Professional dumpster rental services in Los Angeles, California.
        We serve all zip codes in the greater Los Angeles area with
        same-day delivery available.
      `.trim(),
      metaTitle: 'Dumpster Rental in Los Angeles, CA | Best Prices',
      metaDesc: 'Rent a dumpster in Los Angeles, CA. 10-40 yard dumpsters available. Same-day delivery, competitive pricing, excellent service.',
    },
  });

  console.log('Created city:', city);
}

addCity()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
```

### Bulk Adding Cities

To add multiple cities at once:

```typescript
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function bulkAddCities() {
  const state = await prisma.state.findUnique({
    where: { slug: 'california' }
  });

  if (!state) throw new Error('State not found');

  const cities = [
    {
      name: 'Los Angeles',
      slug: 'los-angeles',
      population: 3979576,
      zipCodes: ['90001', '90002'],
    },
    {
      name: 'San Diego',
      slug: 'san-diego',
      population: 1423851,
      zipCodes: ['92101', '92102'],
    },
    // Add more cities...
  ];

  for (const cityData of cities) {
    await prisma.city.create({
      data: {
        ...cityData,
        stateId: state.id,
        metaTitle: `Dumpster Rental in ${cityData.name}, CA`,
        metaDesc: `Professional dumpster rental in ${cityData.name}. Affordable prices, same-day delivery.`,
      },
    });
    console.log(`Created: ${cityData.name}`);
  }
}

bulkAddCities()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
```

### Updating State/City Content

**Update SEO content for better ranking**:

```typescript
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function updateCityContent() {
  await prisma.city.update({
    where: {
      stateId_slug: {
        stateId: 'clxxxxx', // Get from database
        slug: 'los-angeles',
      },
    },
    data: {
      content: `
        # Dumpster Rental in Los Angeles

        Looking for a reliable dumpster rental service in Los Angeles?
        We provide professional waste management solutions for residential,
        commercial, and construction projects throughout the LA area.

        ## Our Services in Los Angeles

        - Residential dumpster rental
        - Commercial waste management
        - Construction debris removal
        - Same-day delivery available
        - Flexible rental periods (3, 7, 14, 30 days)

        ## Service Areas

        We serve all Los Angeles neighborhoods including Downtown LA,
        Hollywood, Santa Monica, Venice, and surrounding areas.

        ## Dumpster Sizes Available

        - 10 Yard: Small projects
        - 20 Yard: Medium renovations
        - 30 Yard: Large cleanouts
        - 40 Yard: Major construction

        Call us today for a free quote!
      `.trim(),
      metaTitle: 'Dumpster Rental Los Angeles | Same-Day Delivery | Best Prices',
      metaDesc: 'Professional dumpster rental in Los Angeles, CA. 10-40 yard dumpsters. Same-day delivery. Serving all LA neighborhoods. Get a free quote today!',
    },
  });
}

updateCityContent();
```

## Managing Dumpster Sizes

### Viewing Current Sizes

```bash
npx prisma studio
# Navigate to DumpsterSize model
```

Or query directly:
```sql
SELECT * FROM "DumpsterSize" ORDER BY size;
```

### Adding a New Dumpster Size

**Using Prisma Studio**:
1. Open Prisma Studio
2. Select "DumpsterSize"
3. Click "Add record"
4. Fill in:
   - size: 15
   - name: "15 Yard Dumpster"
   - slug: "15-yard"
   - dimensions: "14' L x 8' W x 4.5' H"
   - capacity: "4-5 pickup truck loads"
   - basePrice: 375.00
   - description: "Perfect for medium-sized projects..."
   - idealFor: ["Medium renovations", "Roof repairs"]
   - weight: "2.5 tons weight limit"

**Using Code**:

```typescript
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function addDumpsterSize() {
  const size = await prisma.dumpsterSize.create({
    data: {
      size: 15,
      name: '15 Yard Dumpster',
      slug: '15-yard',
      dimensions: "14' L x 8' W x 4.5' H",
      capacity: '4-5 pickup truck loads',
      basePrice: 375.00,
      description: `
        Our 15-yard dumpster is perfect for medium-sized projects.
        It offers more capacity than a 10-yard but is more economical
        than a 20-yard for moderate amounts of waste.
      `.trim(),
      idealFor: [
        'Medium renovations',
        'Roof repairs',
        'Deck removal',
        'Large cleanouts',
      ],
      weight: '2.5 tons weight limit',
    },
  });

  console.log('Created dumpster size:', size);
}

addDumpsterSize();
```

### Updating Dumpster Size Information

**Update pricing**:
```typescript
await prisma.dumpsterSize.update({
  where: { slug: '10-yard' },
  data: { basePrice: 325.00 }
});
```

**Update description**:
```typescript
await prisma.dumpsterSize.update({
  where: { slug: '20-yard' },
  data: {
    description: 'Updated description here...',
    idealFor: ['Updated use case 1', 'Updated use case 2'],
  }
});
```

## Managing Service Types

### Adding a New Service Type

```typescript
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function addServiceType() {
  const service = await prisma.serviceType.create({
    data: {
      name: 'Industrial Dumpster Rental',
      slug: 'industrial',
      description: `
        Heavy-duty dumpster rental for industrial facilities.
        We provide specialized waste management solutions for
        manufacturing plants, warehouses, and industrial sites.
      `.trim(),
      icon: 'factory', // Icon identifier
      metaTitle: 'Industrial Dumpster Rental | Heavy-Duty Waste Management',
      metaDesc: 'Professional industrial dumpster rental services. Heavy-duty containers for manufacturing, warehouses, and industrial facilities.',
    },
  });

  console.log('Created service type:', service);
}

addServiceType();
```

### Updating Service Type

```typescript
await prisma.serviceType.update({
  where: { slug: 'residential' },
  data: {
    description: 'Updated residential service description...',
    metaDesc: 'Updated SEO description...',
  }
});
```

## Updating Pricing

Pricing is managed through the `DumpsterSize` model's `basePrice` field. You can update pricing in several ways:

### Update Single Size Pricing

**Using Prisma Studio**:
1. Open Prisma Studio
2. Find "DumpsterSize" model
3. Find the size (e.g., "10-yard")
4. Edit `basePrice` field
5. Save changes

**Using Code**:
```typescript
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function updatePricing() {
  await prisma.dumpsterSize.update({
    where: { slug: '10-yard' },
    data: { basePrice: 299.00 }
  });

  console.log('Updated 10-yard pricing to $299');
}

updatePricing();
```

### Update All Pricing (Bulk)

```typescript
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function updateAllPricing() {
  const updates = [
    { slug: '10-yard', price: 299.00 },
    { slug: '20-yard', price: 399.00 },
    { slug: '30-yard', price: 499.00 },
    { slug: '40-yard', price: 599.00 },
  ];

  for (const update of updates) {
    await prisma.dumpsterSize.update({
      where: { slug: update.slug },
      data: { basePrice: update.price }
    });
    console.log(`Updated ${update.slug} to $${update.price}`);
  }
}

updateAllPricing();
```

### Dynamic Pricing by Location (Advanced)

For location-based pricing, you could add pricing modifiers to cities:

```typescript
// Add a new field to City model in schema.prisma:
// priceModifier Float @default(1.0)

// Then calculate pricing:
const cityData = await prisma.city.findUnique({
  where: { slug: 'los-angeles' }
});

const baseSize = await prisma.dumpsterSize.findUnique({
  where: { slug: '20-yard' }
});

const finalPrice = baseSize.basePrice * (cityData?.priceModifier || 1.0);
```

## Adding Blog Posts

### Creating a Blog Post

**Method 1: Prisma Studio**
1. Open Prisma Studio
2. Select "BlogPost" model
3. Click "Add record"
4. Fill in fields:
   - title: "How to Choose the Right Dumpster Size"
   - slug: "how-to-choose-dumpster-size"
   - excerpt: "Learn how to select..."
   - content: "Full blog content in markdown..."
   - author: "DumpsterRentalPro Team"
   - published: true
   - publishedAt: [Current date]
   - metaTitle: "How to Choose..."
   - metaDesc: "Expert guide..."

**Method 2: Using Code**

```typescript
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function createBlogPost() {
  const post = await prisma.blogPost.create({
    data: {
      title: 'How to Choose the Right Dumpster Size for Your Project',
      slug: 'how-to-choose-dumpster-size',
      excerpt: 'Choosing the right dumpster size can save you money and hassle. Learn how to pick the perfect size for your project.',
      content: `
# How to Choose the Right Dumpster Size

Selecting the correct dumpster size is crucial for your project's success...

## Factors to Consider

1. **Project Type**: Different projects generate different amounts of waste
2. **Space Available**: Make sure you have room for delivery
3. **Weight Limits**: Consider the weight of your debris
4. **Budget**: Larger isn't always better

## Our Recommendations

### 10 Yard Dumpster
Perfect for small cleanouts and minor renovations...

### 20 Yard Dumpster
Ideal for medium-sized projects...

[Continue content...]
      `.trim(),
      author: 'DumpsterRentalPro Team',
      published: true,
      publishedAt: new Date(),
      metaTitle: 'How to Choose the Right Dumpster Size | Complete Guide',
      metaDesc: 'Expert guide to selecting the perfect dumpster size for your project. Compare 10, 20, 30, and 40-yard dumpsters. Make the right choice.',
    },
  });

  console.log('Created blog post:', post.slug);
}

createBlogPost();
```

### Publishing/Unpublishing Posts

```typescript
// Publish a post
await prisma.blogPost.update({
  where: { slug: 'how-to-choose-dumpster-size' },
  data: {
    published: true,
    publishedAt: new Date(),
  }
});

// Unpublish a post
await prisma.blogPost.update({
  where: { slug: 'old-post' },
  data: { published: false }
});
```

### Creating a Blog Listing Page

Create `app/blog/page.tsx`:

```typescript
import { prisma } from '@/lib/prisma';
import Link from 'next/link';

export default async function BlogPage() {
  const posts = await prisma.blogPost.findMany({
    where: { published: true },
    orderBy: { publishedAt: 'desc' },
    take: 20,
  });

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8">Blog</h1>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map((post) => (
          <article key={post.id} className="bg-white rounded-lg shadow p-6">
            <h2 className="text-2xl font-bold mb-2">
              <Link href={`/blog/${post.slug}`}>
                {post.title}
              </Link>
            </h2>
            <p className="text-gray-600 mb-4">{post.excerpt}</p>
            <Link
              href={`/blog/${post.slug}`}
              className="text-blue-600 hover:underline"
            >
              Read more →
            </Link>
          </article>
        ))}
      </div>
    </div>
  );
}
```

Create `app/blog/[slug]/page.tsx`:

```typescript
import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
  const posts = await prisma.blogPost.findMany({
    where: { published: true },
  });

  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function BlogPostPage({
  params,
}: {
  params: { slug: string };
}) {
  const post = await prisma.blogPost.findUnique({
    where: { slug: params.slug },
  });

  if (!post || !post.published) {
    notFound();
  }

  return (
    <article className="container mx-auto px-4 py-12 max-w-4xl">
      <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
      <div className="text-gray-600 mb-8">
        By {post.author} • {post.publishedAt?.toLocaleDateString()}
      </div>
      <div className="prose lg:prose-xl">
        {/* Render markdown content */}
        {post.content}
      </div>
    </article>
  );
}
```

## Managing Quotes

### Viewing Quote Submissions

**Using Prisma Studio**:
```bash
npx prisma studio
# Navigate to Quote model
```

**Using Database Query**:
```sql
SELECT
  name,
  email,
  phone,
  "dumpsterSize",
  "createdAt",
  status
FROM "Quote"
ORDER BY "createdAt" DESC
LIMIT 50;
```

**Using Code**:
```typescript
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function getRecentQuotes() {
  const quotes = await prisma.quote.findMany({
    include: {
      city: {
        include: {
          state: true,
        },
      },
    },
    orderBy: { createdAt: 'desc' },
    take: 50,
  });

  quotes.forEach(quote => {
    console.log(`
      Name: ${quote.name}
      Email: ${quote.email}
      Phone: ${quote.phone}
      Location: ${quote.city?.name}, ${quote.city?.state.abbreviation}
      Dumpster: ${quote.dumpsterSize}
      Date: ${quote.createdAt}
      Status: ${quote.status}
      ---
    `);
  });
}

getRecentQuotes();
```

### Updating Quote Status

```typescript
await prisma.quote.update({
  where: { id: 'quote_id_here' },
  data: { status: 'contacted' }
});

// Possible status values:
// - "pending" (default)
// - "contacted"
// - "quoted"
// - "won"
// - "lost"
```

### Exporting Quotes to CSV

```typescript
import { PrismaClient } from '@prisma/client';
import fs from 'fs';

const prisma = new PrismaClient();

async function exportQuotesToCSV() {
  const quotes = await prisma.quote.findMany({
    include: {
      city: {
        include: { state: true },
      },
    },
    orderBy: { createdAt: 'desc' },
  });

  const csv = [
    'Date,Name,Email,Phone,City,State,Dumpster Size,Service Type,Status',
    ...quotes.map(q =>
      `${q.createdAt},${q.name},${q.email},${q.phone},${q.city?.name},${q.city?.state.abbreviation},${q.dumpsterSize},${q.serviceType},${q.status}`
    ),
  ].join('\n');

  fs.writeFileSync('quotes.csv', csv);
  console.log('Exported to quotes.csv');
}

exportQuotesToCSV();
```

## SEO Best Practices

### State Page SEO

**Optimizing State Pages**:

```typescript
await prisma.state.update({
  where: { slug: 'california' },
  data: {
    metaTitle: 'Dumpster Rental in California | Statewide Service | Best Prices',
    metaDesc: 'Professional dumpster rental throughout California. Serving all major cities. 10-40 yard dumpsters. Same-day delivery. Get your free quote today!',
    content: `
# Dumpster Rental in California

Looking for reliable dumpster rental in California? We provide
professional waste management services throughout the Golden State.

## Cities We Serve in California

[List of cities will be automatically displayed]

## Dumpster Sizes Available

- 10 Yard Dumpsters - $299
- 20 Yard Dumpsters - $399
- 30 Yard Dumpsters - $499
- 40 Yard Dumpsters - $599

## Why Choose Us?

1. **Same-Day Delivery**: Available in most California cities
2. **Competitive Pricing**: Best rates guaranteed
3. **Flexible Rental Periods**: 3, 7, 14, or 30 days
4. **Professional Service**: Licensed and insured

## Popular Projects in California

- Home renovations
- Construction projects
- Roofing projects
- Landscaping
- Estate cleanouts
- Commercial waste

Call us today for a free quote!
    `.trim(),
  }
});
```

### City Page SEO

**Template for City Content**:

```typescript
const cityContent = `
# Dumpster Rental in ${cityName}, ${stateAbbr}

Professional dumpster rental services in ${cityName}, ${stateName}.
We provide affordable, reliable waste management for residential,
commercial, and construction projects.

## Service Areas in ${cityName}

We serve all neighborhoods in ${cityName} including:
[List neighborhoods if available]

Zip codes: ${zipCodes.join(', ')}

## Dumpster Sizes in ${cityName}

All dumpster sizes available for delivery in ${cityName}:

- **10 Yard Dumpster**: Perfect for small cleanouts ($${price10})
- **20 Yard Dumpster**: Ideal for renovations ($${price20})
- **30 Yard Dumpster**: Great for large projects ($${price30})
- **40 Yard Dumpster**: Best for major construction ($${price40})

## Same-Day Delivery in ${cityName}

Need a dumpster today? We offer same-day delivery in ${cityName}
when you order before noon.

## Why Choose Us for ${cityName} Dumpster Rental?

1. Local service with fast delivery
2. Transparent pricing - no hidden fees
3. Flexible rental periods
4. Professional and courteous team
5. Licensed and insured

## Common Projects in ${cityName}

- Kitchen and bathroom renovations
- Deck and patio removal
- Roofing projects
- Garage cleanouts
- Moving and estate cleanouts
- Yard waste and landscaping

## Get Your Free Quote

Ready to rent a dumpster in ${cityName}? Get your free quote today!

Call: 1-555-DUMPSTER
Or fill out our online quote form.
`;
```

### SEO Checklist for Each Page

- ✅ Unique title tag (under 60 characters)
- ✅ Unique meta description (under 160 characters)
- ✅ H1 tag with target keyword
- ✅ H2/H3 subheadings for structure
- ✅ Internal links to related pages
- ✅ Call-to-action (phone number, quote form)
- ✅ Location-specific content
- ✅ Service information
- ✅ Pricing information

## Content Strategy

### Blog Post Ideas

**How-To Guides**:
1. "How to Choose the Right Dumpster Size"
2. "What Can You Put in a Dumpster? Complete Guide"
3. "How to Prepare for Dumpster Delivery"
4. "Dumpster Rental Cost Guide [Current Year]"

**Location-Specific**:
5. "Dumpster Rental Cost in [City Name]"
6. "Best Dumpster Rental Companies in [City]"
7. "[City] Dumpster Rental Regulations"

**Project-Specific**:
8. "Roofing Project? Here's the Dumpster You Need"
9. "Complete Guide to Construction Dumpster Rental"
10. "Estate Cleanout: Dumpster Rental Guide"

### Content Update Schedule

**Weekly**:
- Check and respond to quote submissions
- Review top-performing pages
- Add one new blog post

**Monthly**:
- Update pricing if needed
- Review and optimize meta descriptions
- Add seasonal content
- Check for broken links

**Quarterly**:
- Major content refresh for top pages
- Add new cities if expanding service
- Update service descriptions
- Review and improve SEO

### Content Maintenance

**Regular Tasks**:
1. Monitor quote submissions daily
2. Update blog weekly
3. Refresh homepage seasonally
4. Update pricing as needed
5. Add customer testimonials monthly
6. Check Google Search Console weekly
7. Update FAQ based on customer questions

By following this content management guide, you can effectively maintain and grow your dumpster rental website's content, improve SEO rankings, and generate more leads.
