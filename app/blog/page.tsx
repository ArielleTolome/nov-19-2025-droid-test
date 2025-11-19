import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Blog - DumpsterRentalPro',
  description: 'Tips, guides, and insights about dumpster rentals and waste management.',
};

export default function BlogPage() {
  // In production, fetch from database
  const posts = [
    {
      id: '1',
      title: 'How to Choose the Right Dumpster Size',
      excerpt: 'Learn how to select the perfect dumpster size for your project.',
      slug: 'how-to-choose-right-dumpster-size',
      publishedAt: '2024-01-15',
    },
    {
      id: '2',
      title: 'Dumpster Rental Permits: What You Need to Know',
      excerpt: 'Understanding when and how to get permits for dumpster placement.',
      slug: 'dumpster-rental-permits-guide',
      publishedAt: '2024-01-10',
    },
    {
      id: '3',
      title: 'Top 10 Things You Can\'t Put in a Dumpster',
      excerpt: 'A comprehensive guide to prohibited materials in dumpster rentals.',
      slug: 'things-cant-put-dumpster',
      publishedAt: '2024-01-05',
    },
  ];

  return (
    <div className="min-h-screen">
      <section className="bg-gradient-to-r from-blue-600 to-blue-700 text-white py-20">
        <div className="container">
          <h1 className="text-5xl font-bold mb-4">Blog</h1>
          <p className="text-xl opacity-90">Tips, guides, and insights about dumpster rentals</p>
        </div>
      </section>

      <section className="py-20">
        <div className="container max-w-4xl">
          <div className="space-y-8">
            {posts.map((post) => (
              <article key={post.id} className="bg-white p-8 rounded-lg shadow">
                <h2 className="text-2xl font-bold mb-3">
                  <Link href={`/blog/${post.slug}`} className="hover:text-blue-600">
                    {post.title}
                  </Link>
                </h2>
                <p className="text-gray-600 mb-4">{post.excerpt}</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">
                    {new Date(post.publishedAt).toLocaleDateString()}
                  </span>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="text-blue-600 font-semibold hover:underline"
                  >
                    Read More →
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
