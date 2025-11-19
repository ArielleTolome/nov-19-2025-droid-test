/** @type {import('next-sitemap').IConfig} */

// Import data for dynamic routes
const states = require('./data/states.json');
const cities = require('./data/cities.json');

module.exports = {
  siteUrl: process.env.SITE_URL || 'https://dumpsterrental.com',
  generateRobotsTxt: true,
  generateIndexSitemap: true,
  sitemapSize: 7000,
  changefreq: 'weekly',
  priority: 0.7,
  exclude: [
    '/api/*',
    '/404',
    '/500',
    '/_next/*',
    '/admin/*'
  ],

  // Robots.txt configuration
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/admin/']
      },
      {
        userAgent: 'Googlebot',
        allow: '/',
        crawlDelay: 0
      }
    ],
    additionalSitemaps: [
      `${process.env.SITE_URL || 'https://dumpsterrental.com'}/sitemap.xml`,
    ],
  },

  // Additional paths to include in sitemap
  additionalPaths: async (config) => {
    const paths = [];

    // Static service pages
    const servicePages = [
      '/services/residential-dumpster-rental',
      '/services/commercial-dumpster-rental',
      '/services/construction-dumpster-rental',
      '/services/roll-off-dumpster-rental'
    ];

    servicePages.forEach(path => {
      paths.push({
        loc: path,
        changefreq: 'monthly',
        priority: 0.9,
        lastmod: new Date().toISOString(),
      });
    });

    // Dumpster size pages
    const sizePages = [
      '/sizes/10-yard-dumpster',
      '/sizes/20-yard-dumpster',
      '/sizes/30-yard-dumpster',
      '/sizes/40-yard-dumpster'
    ];

    sizePages.forEach(path => {
      paths.push({
        loc: path,
        changefreq: 'monthly',
        priority: 0.9,
        lastmod: new Date().toISOString(),
      });
    });

    // State pages
    states.forEach(state => {
      paths.push({
        loc: `/${state.slug}`,
        changefreq: 'weekly',
        priority: 0.8,
        lastmod: new Date().toISOString(),
      });
    });

    // City pages (filtered by state)
    cities.forEach(city => {
      const state = states.find(s => s.abbreviation === city.state);
      if (state) {
        paths.push({
          loc: `/${state.slug}/${city.slug}`,
          changefreq: 'weekly',
          priority: 0.7,
          lastmod: new Date().toISOString(),
        });
      }
    });

    return paths;
  },

  // Transform function to customize sitemap entries
  transform: async (config, path) => {
    // Custom priorities for different page types
    let priority = 0.7;
    let changefreq = 'weekly';

    // Homepage gets highest priority
    if (path === '/') {
      priority = 1.0;
      changefreq = 'daily';
    }
    // Main category pages
    else if (path === '/services' || path === '/sizes') {
      priority = 0.9;
      changefreq = 'weekly';
    }
    // Quote and contact pages
    else if (path === '/quote' || path === '/contact') {
      priority = 0.9;
      changefreq = 'monthly';
    }
    // Service-specific pages
    else if (path.includes('/services/')) {
      priority = 0.9;
      changefreq = 'monthly';
    }
    // Size-specific pages
    else if (path.includes('/sizes/') && path !== '/sizes') {
      priority = 0.9;
      changefreq = 'monthly';
    }
    // State pages
    else if (path.match(/^\/[a-z-]+$/) && !['services', 'sizes', 'quote', 'contact'].includes(path.slice(1))) {
      priority = 0.8;
      changefreq = 'weekly';
    }
    // City pages
    else if (path.match(/^\/[a-z-]+\/[a-z-]+$/)) {
      priority = 0.7;
      changefreq = 'weekly';
    }

    return {
      loc: path,
      changefreq,
      priority,
      lastmod: new Date().toISOString(),
      alternateRefs: [],
    };
  },
};
