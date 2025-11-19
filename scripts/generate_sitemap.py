#!/usr/bin/env python3
"""
Generate sitemap.xml for all dumpster rental pages
Includes all static pages, product pages, state pages, and city pages
"""

import os
from pathlib import Path
from datetime import datetime

PROJECT_ROOT = Path(__file__).parent.parent
BASE_URL = "https://dumpsters.com"

def get_all_html_files():
    """Find all HTML files in the project"""
    html_files = []
    
    # Root pages
    for file in PROJECT_ROOT.glob("*.html"):
        if file.name not in ['index-old.html']:  # Skip old files
            html_files.append(('/', file.name, '1.0', 'daily'))
    
    # Product pages
    products_dir = PROJECT_ROOT / "products"
    if products_dir.exists():
        for file in products_dir.glob("*.html"):
            html_files.append(('/products/', file.name, '0.9', 'weekly'))
    
    # Location pages (states and cities)
    locations_dir = PROJECT_ROOT / "locations"
    if locations_dir.exists():
        for state_dir in locations_dir.iterdir():
            if state_dir.is_dir():
                state_slug = state_dir.name
                # State index page
                if (state_dir / "index.html").exists():
                    html_files.append((f'/locations/{state_slug}/', 'index.html', '0.8', 'monthly'))
                
                # City pages
                for city_file in state_dir.glob("*.html"):
                    if city_file.name != "index.html":
                        html_files.append((f'/locations/{state_slug}/', city_file.name, '0.7', 'monthly'))
    
    # Blog pages
    blog_dir = PROJECT_ROOT / "blog"
    if blog_dir.exists():
        for file in blog_dir.glob("*.html"):
            html_files.append(('/blog/', file.name, '0.6', 'monthly'))
    
    return html_files


def generate_sitemap():
    """Generate sitemap.xml file"""
    
    print("=" * 60)
    print("SITEMAP GENERATOR")
    print("=" * 60)
    print()
    
    html_files = get_all_html_files()
    today = datetime.now().strftime('%Y-%m-%d')
    
    # Start sitemap XML
    sitemap_content = [
        '<?xml version="1.0" encoding="UTF-8"?>',
        '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
        ''
    ]
    
    # Add each URL
    for path, filename, priority, changefreq in html_files:
        url = f"{BASE_URL}{path}{filename}"
        if filename == 'index.html':
            url = url.replace('/index.html', '/')
        
        sitemap_content.extend([
            '  <url>',
            f'    <loc>{url}</loc>',
            f'    <lastmod>{today}</lastmod>',
            f'    <changefreq>{changefreq}</changefreq>',
            f'    <priority>{priority}</priority>',
            '  </url>',
            ''
        ])
    
    sitemap_content.append('</urlset>')
    
    # Write sitemap
    sitemap_path = PROJECT_ROOT / "sitemap.xml"
    with open(sitemap_path, 'w') as f:
        f.write('\n'.join(sitemap_content))
    
    print(f"✓ Generated sitemap with {len(html_files)} URLs")
    print(f"✓ Saved to: {sitemap_path}")
    print()
    print("=" * 60)
    print("SITEMAP BREAKDOWN")
    print("=" * 60)
    
    # Count pages by type
    root_pages = sum(1 for p, _, _, _ in html_files if p == '/')
    product_pages = sum(1 for p, _, _, _ in html_files if '/products/' in p)
    state_pages = sum(1 for p, f, _, _ in html_files if '/locations/' in p and f == 'index.html')
    city_pages = sum(1 for p, f, _, _ in html_files if '/locations/' in p and f != 'index.html')
    blog_pages = sum(1 for p, _, _, _ in html_files if '/blog/' in p)
    
    print(f"Root pages:      {root_pages}")
    print(f"Product pages:   {product_pages}")
    print(f"State pages:     {state_pages}")
    print(f"City pages:      {city_pages}")
    print(f"Blog pages:      {blog_pages}")
    print(f"{'─' * 30}")
    print(f"TOTAL:           {len(html_files)} pages")
    print("=" * 60)
    print()
    print("Next step: Upload sitemap.xml to your web server root")
    print("Then submit to Google Search Console")
    print()


def generate_robots_txt():
    """Generate robots.txt file"""
    
    robots_content = f"""# Dumpsters.com Robots.txt
User-agent: *
Allow: /
Disallow: /admin/
Disallow: /templates/
Disallow: /scripts/

Sitemap: {BASE_URL}/sitemap.xml
"""
    
    robots_path = PROJECT_ROOT / "robots.txt"
    with open(robots_path, 'w') as f:
        f.write(robots_content)
    
    print(f"✓ Generated robots.txt")
    print()


if __name__ == "__main__":
    generate_sitemap()
    generate_robots_txt()
