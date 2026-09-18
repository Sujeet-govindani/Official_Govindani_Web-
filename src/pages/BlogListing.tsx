import { useState, useMemo } from 'react';
import { formatBlogDate, isoDate } from '@/lib/blogDate';
import { Link } from 'react-router-dom';
import SEO from '@/components/SEO';
import { blogs, BlogPost } from '@/data/blogIndex';
import { organizationSchema } from '@/seo/schema';

const categories = [...new Set(blogs.map(b => b.category))];

export default function BlogListing() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);

  const PER_PAGE = 12;

  const filteredBlogs = useMemo(() => {
    return blogs.filter(blog => {
      const matchesCategory = selectedCategory === 'All' || blog.category === selectedCategory;
      const matchesSearch = searchQuery === '' || 
        blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        blog.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        blog.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCategory && matchesSearch;
    })
      // Newest first. Without this the list renders in array order, so newly
      // appended articles sank to the bottom of the page.
      .sort((a, b) => b.date.localeCompare(a.date));
  }, [selectedCategory, searchQuery]);

  const totalPages = Math.max(1, Math.ceil(filteredBlogs.length / PER_PAGE));
  // A filter change can leave you on a page that no longer exists; clamp
  // rather than rendering an empty grid.
  const currentPage = Math.min(page, totalPages);
  const pageBlogs = filteredBlogs.slice(
    (currentPage - 1) * PER_PAGE,
    currentPage * PER_PAGE
  );

  const goToPage = (n: number) => {
    setPage(n);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <SEO
        title="Blog | Digital Marketing, Web Development & NGO Solutions Guide"
        description="Expert insights on NGO website development, WhatsApp marketing, social media strategy, Google Ads, SEO, and digital transformation. Govindani Infotech blog - India's leading digital agency."
        canonical="https://govindaniit.com/blog"
        keywords="digital marketing blog, NGO website guide, WhatsApp marketing tips, SEO India, web development blog, social media marketing guide"
        schema={organizationSchema}
      />

      <div className="min-h-screen bg-[#060b13] text-white pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-yellow-400 via-yellow-200 to-yellow-400 bg-clip-text text-transparent">
              Digital Growth Insights
            </h1>
            <p className="text-gray-400 text-xl max-w-3xl mx-auto">
              Expert guides on NGO digital transformation, WhatsApp marketing, web development, 
              and everything you need to grow your organization online in India.
            </p>
          </div>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-10">
            <input
              type="text"
              placeholder="Search articles... (e.g., NGO website, WhatsApp API, Google Ads)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-8 py-4 bg-white/5 border border-white/10 rounded-full text-white text-lg placeholder-gray-500 focus:outline-none focus:border-yellow-500/50 focus:ring-2 focus:ring-yellow-500/20"
            />
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <button
              onClick={() => { setSelectedCategory('All'); setPage(1); }}
              className={`px-6 py-3 rounded-full text-base font-medium transition-all ${
                selectedCategory === 'All'
                  ? 'bg-yellow-500 text-black'
                  : 'bg-white/5 text-gray-400 hover:bg-white/10'
              }`}
            >
              All ({blogs.length})
            </button>
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => { setSelectedCategory(cat); setPage(1); }}
                className={`px-6 py-3 rounded-full text-base font-medium transition-all ${
                  selectedCategory === cat
                    ? 'bg-yellow-500 text-black'
                    : 'bg-white/5 text-gray-400 hover:bg-white/10'
                }`}
              >
                {cat} ({blogs.filter(b => b.category === cat).length})
              </button>
            ))}
          </div>

          {/* Results Count */}
          <div className="text-gray-500 text-sm mb-6">
            Showing {pageBlogs.length ? (currentPage - 1) * PER_PAGE + 1 : 0}–
            {(currentPage - 1) * PER_PAGE + pageBlogs.length} of {filteredBlogs.length} articles
            {filteredBlogs.length !== blogs.length && ` (filtered from ${blogs.length})`}
          </div>

          {/* Blog Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {pageBlogs.map((blog) => (
              <Link
                key={blog.id}
                to={`/blog/${blog.id}`}
                className="group bg-white/5 border border-white/10 rounded-2xl p-8 hover:border-yellow-500/30 hover:bg-white/10 transition-all duration-300 min-h-[320px] flex flex-col"
              >
                <div className="flex items-center gap-3 mb-4">
                  <span className="px-4 py-1.5 bg-yellow-500/10 text-yellow-400 text-sm font-medium rounded-full">
                    {blog.category}
                  </span>
                  <span className="text-gray-500 text-sm">{blog.readTime} min read</span>
                  <span className="text-gray-500 text-sm">•</span>
                  <time className="text-gray-500 text-sm" dateTime={isoDate(blog.date)}>
                    {formatBlogDate(blog.date)}
                  </time>
                </div>
                <h2 className="text-xl font-bold text-white mb-3 group-hover:text-yellow-400 transition-colors line-clamp-3">
                  {blog.title}
                </h2>
                <p className="text-gray-400 text-base mb-5 line-clamp-3 flex-grow">
                  {blog.excerpt}
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {blog.tags.slice(0, 3).map(tag => (
                    <span key={tag} className="px-3 py-1 bg-white/5 text-gray-500 text-sm rounded-lg">
                      #{tag}
                    </span>
                  ))}
                </div>
                <div className="text-yellow-400 text-base font-medium group-hover:translate-x-1 transition-transform">
                  Read More →
                </div>
              </Link>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <nav
              className="flex flex-wrap items-center justify-center gap-2 mt-12"
              aria-label="Blog pagination"
            >
              <button
                onClick={() => goToPage(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-4 py-2 rounded-full text-sm font-medium bg-white/5 text-gray-400 hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed transition"
                aria-label="Previous page"
              >
                ← Prev
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1)
                // Show first, last, current and its neighbours; ellipsis the rest.
                .filter(n => n === 1 || n === totalPages || Math.abs(n - currentPage) <= 1)
                .map((n, i, arr) => (
                  <span key={n} className="flex items-center gap-2">
                    {i > 0 && n - arr[i - 1] > 1 && (
                      <span className="text-gray-600 px-1">…</span>
                    )}
                    <button
                      onClick={() => goToPage(n)}
                      aria-current={n === currentPage ? 'page' : undefined}
                      className={`w-10 h-10 rounded-full text-sm font-medium transition ${
                        n === currentPage
                          ? 'bg-yellow-500 text-black'
                          : 'bg-white/5 text-gray-400 hover:bg-white/10'
                      }`}
                    >
                      {n}
                    </button>
                  </span>
                ))}

              <button
                onClick={() => goToPage(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-4 py-2 rounded-full text-sm font-medium bg-white/5 text-gray-400 hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed transition"
                aria-label="Next page"
              >
                Next →
              </button>
            </nav>
          )}

          {/* Empty State */}
          {filteredBlogs.length === 0 && (
            <div className="text-center py-16">
              <p className="text-gray-500 text-lg">No articles found matching your search.</p>
              <button
                onClick={() => { setSearchQuery(''); setSelectedCategory('All'); }}
                className="mt-4 px-6 py-2 bg-yellow-500 text-black rounded-full font-medium hover:bg-yellow-400 transition"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
