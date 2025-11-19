# Content Management Guide

## Adding New Cities

### Manual Addition

1. Add city data to `data/locations.json`:
```json
{
  "name": "City Name",
  "slug": "city-name",
  "state": "State Name",
  "stateSlug": "state-slug",
  "stateAbbr": "ST",
  "population": 100000,
  "zipCodes": ["12345", "12346"],
  "latitude": 40.7128,
  "longitude": -74.0060
}
```

2. Run seed script:
```bash
npm run db:seed
```

### Bulk Import

Use the location generator script:
```bash
npm run generate:locations
```

Then seed:
```bash
npm run db:seed
```

## Updating City Content

City pages automatically generate content. To customize:

1. Update city record in database:
```typescript
await prisma.city.update({
  where: { id: 'city-id' },
  data: {
    content: 'Custom content here...'
  }
});
```

2. Rebuild pages:
```bash
npm run build
```

## Adding Blog Posts

1. Create post in database:
```typescript
await prisma.blogPost.create({
  data: {
    title: 'Post Title',
    slug: 'post-slug',
    content: 'Post content...',
    excerpt: 'Short excerpt',
    author: 'Author Name',
    published: true,
    publishedAt: new Date()
  }
});
```

2. Create page at `/app/blog/[slug]/page.tsx` or use dynamic generation.

## Updating Dumpster Sizes

Update in database:
```typescript
await prisma.dumpsterSize.update({
  where: { slug: '20-yard-dumpster' },
  data: {
    basePrice: 500,
    description: 'Updated description'
  }
});
```

## SEO Content

Each page automatically generates SEO metadata. To customize:

1. Edit page metadata in `generateMetadata` function
2. Add custom content in page component
3. Rebuild for changes to take effect

## Content Generation

The system uses templates to generate unique content for each city page. To modify templates, edit:
- `/app/[state]/[city]/page.tsx`
- `/app/[state]/[city]/[service]/page.tsx`
- `/app/[state]/[city]/[size]/page.tsx`
