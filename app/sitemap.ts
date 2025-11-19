import { PrismaClient } from '@prisma/client';
import { MetadataRoute } from 'next';

const prisma = new PrismaClient();

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://dumpsterrentalpro.com';

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/services`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/faq`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/how-it-works`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/pricing`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ];

  // State pages
  const states = await prisma.state.findMany();
  const statePages: MetadataRoute.Sitemap = states.map((state) => ({
    url: `${baseUrl}/${state.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  // City pages
  const cities = await prisma.city.findMany({
    include: { state: true },
    take: 500,
  });
  const cityPages: MetadataRoute.Sitemap = cities.map((city) => ({
    url: `${baseUrl}/${city.state.slug}/${city.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.7,
  }));

  // City + Service pages
  const services = ['residential-dumpster-rental', 'commercial-dumpster-rental', 'construction-dumpster-rental', 'roll-off-dumpster-rental'];
  const cityServicePages: MetadataRoute.Sitemap = [];
  for (const city of cities.slice(0, 500)) {
    for (const service of services) {
      cityServicePages.push({
        url: `${baseUrl}/${city.state.slug}/${city.slug}/${service}`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.6,
      });
    }
  }

  // City + Size pages
  const sizes = ['10-yard-dumpster', '20-yard-dumpster', '30-yard-dumpster', '40-yard-dumpster'];
  const citySizePages: MetadataRoute.Sitemap = [];
  for (const city of cities.slice(0, 500)) {
    for (const size of sizes) {
      citySizePages.push({
        url: `${baseUrl}/${city.state.slug}/${city.slug}/${size}`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.6,
      });
    }
  }

  return [
    ...staticPages,
    ...statePages,
    ...cityPages,
    ...cityServicePages,
    ...citySizePages,
  ];
}
