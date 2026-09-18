import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { marked } from 'marked';
import SEO from '@/components/SEO';
import { BLOG_META } from '@/seo/blogMeta';
import { blogs } from '@/data/blogIndex';
import { createBlogSchema, createBreadcrumbSchema } from '@/seo/schema';
import { formatBlogDate, isoDate } from '@/lib/blogDate';

marked.setOptions({
  gfm: true,
  breaks: true,
});

export default function BlogPost() {
  const { id } = useParams();
  const blog = blogs.find(b => b.id === id);

  // The body is fetched, not bundled. Article text is 5.2 MB across 233 posts;
  // shipping it in JavaScript meant every page on the site paid for it.
  const [body, setBody] = useState<string | null>(null);
  useEffect(() => {
    if (!id) return;
    let live = true;
    setBody(null);
    fetch(`/blog-data/${id}.json`)
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error(String(r.status)))))
      .then((d) => { if (live) setBody(typeof d.content === 'string' ? d.content : ''); })
      .catch(() => { if (live) setBody(''); });
    return () => { live = false; };
  }, [id]);

  if (!blog) {
    return (
      <div className="min-h-screen bg-[#060b13] text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Article Not Found</h1>
          <p className="text-gray-400 mb-6">The article you're looking for doesn't exist.</p>
          <Link to="/blog" className="px-6 py-3 bg-yellow-500 text-black rounded-full font-medium hover:bg-yellow-400 transition">
            Browse All Articles
          </Link>
        </div>
      </div>
    );
  }

  const relatedBlogs = blogs
    .filter(b => b.category === blog.category && b.id !== blog.id)
    // Newest first, or .slice() would always surface the four oldest
    // articles in the category and never show anything recent.
    .sort((a, b) => b.date.localeCompare(a.date))
    .slice(0, 4);

  const blogSchema = createBlogSchema({
    title: blog.title,
    description: blog.excerpt,
    url: `https://govindaniit.com/blog/${blog.id}`,
    datePublished: blog.date,
  });

  const breadcrumbSchema = createBreadcrumbSchema([
    { name: 'Home', url: 'https://govindaniit.com' },
    { name: 'Blog', url: 'https://govindaniit.com/blog' },
    { name: blog.title, url: `https://govindaniit.com/blog/${blog.id}` },
  ]);

  const htmlContent = body ? (marked.parse(body) as string) : '';

  return (
    <>
      {/* seoTitle, not title: an article headline reads well on the page but is
          routinely 90+ characters, and SEO.tsx appends " | Govindani Infotech"
          on top of that. Search results cut it off around 60. */}
      <SEO
        title={BLOG_META[blog.id]?.seoTitle ?? blog.title}
        description={BLOG_META[blog.id]?.description ?? blog.excerpt}
        canonical={`https://govindaniit.com/blog/${blog.id}`}
        keywords={blog.tags.join(', ')}
        schema={[blogSchema, breadcrumbSchema]}
      />

      <div className="min-h-screen bg-[#060b13] text-white" style={{ paddingTop: "clamp(100px, 8vw, 120px)", paddingBottom: "clamp(48px, 5vw, 80px)" }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-gray-500 mb-8">
            <Link to="/" className="hover:text-yellow-400 transition">Home</Link>
            <span>/</span>
            <Link to="/blog" className="hover:text-yellow-400 transition">Blog</Link>
            <span>/</span>
            <span className="text-gray-400 line-clamp-1">{blog.title}</span>
          </nav>

          {/* Article Header */}
          <header className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 bg-yellow-500/10 text-yellow-400 text-xs font-medium rounded-full">
                {blog.category}
              </span>
              <span className="text-gray-500 text-sm">{blog.readTime} min read</span>
              <span className="text-gray-500 text-sm">•</span>
              <time className="text-gray-500 text-sm" dateTime={isoDate(blog.date)}>
                Published {formatBlogDate(blog.date)}
              </time>
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
              {blog.title}
            </h1>
            <p className="text-gray-400 text-lg">{blog.excerpt}</p>
          </header>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-10">
            {blog.tags.map(tag => (
              <span key={tag} className="px-3 py-1 bg-white/5 text-gray-400 text-sm rounded-full">
                #{tag}
              </span>
            ))}
          </div>

          {/* Article Content */}
          <article
            className="prose prose-invert prose-lg max-w-none mb-16
              prose-headings:text-white prose-headings:font-bold
              prose-h2:text-2xl prose-h2:mt-12 prose-h2:mb-4
              prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3
              prose-p:text-gray-300 prose-p:leading-relaxed
              prose-li:text-gray-300
              prose-strong:text-white
              prose-a:text-yellow-400 prose-a:no-underline hover:prose-a:underline
              prose-table:border-collapse
              prose-th:bg-white/5 prose-th:text-white prose-th:px-4 prose-th:py-2 prose-th:border prose-th:border-white/10
              prose-td:text-gray-300 prose-td:px-4 prose-td:py-2 prose-td:border prose-td:border-white/10
              prose-code:text-yellow-400 prose-code:bg-white/5 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded
              prose-pre:bg-white/5 prose-pre:border prose-pre:border-white/10"
            dangerouslySetInnerHTML={{ __html: htmlContent }}
          />

          {/* CTA Section */}
          <div className="bg-gradient-to-r from-yellow-500/10 to-yellow-500/5 border border-yellow-500/20 rounded-xl p-8 mb-16 text-center">
            <h3 className="text-2xl font-bold text-white mb-3">Need Help With Your Digital Strategy?</h3>
            <p className="text-gray-400 mb-6">
              Govindani Infotech helps Indian businesses and NGOs build websites, run ads, and grow online. 
              Contact us for a free consultation.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/contact-us" className="px-8 py-3 bg-yellow-500 text-black rounded-full font-bold hover:bg-yellow-400 transition">
                Get Free Consultation
              </Link>
              <a href="https://wa.me/919201958278?text=Hi!%20I%20need%20help%20with%20digital%20solutions" target="_blank" rel="noopener noreferrer" className="px-8 py-3 bg-green-600 text-white rounded-full font-bold hover:bg-green-500 transition">
                WhatsApp Us
              </a>
            </div>
          </div>

          {/* Related Articles */}
          {relatedBlogs.length > 0 && (
            <div className="mb-16">
              <h3 className="text-2xl font-bold text-white mb-6">Related Articles</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {relatedBlogs.map(related => (
                  <Link
                    key={related.id}
                    to={`/blog/${related.id}`}
                    className="group bg-white/5 border border-white/10 rounded-xl p-6 hover:border-yellow-500/30 transition-all"
                  >
                    <span className="px-3 py-1 bg-yellow-500/10 text-yellow-400 text-xs font-medium rounded-full">
                      {related.category}
                    </span>
                    <h4 className="text-lg font-semibold text-white mt-3 mb-2 group-hover:text-yellow-400 transition-colors line-clamp-2">
                      {related.title}
                    </h4>
                    <p className="text-gray-400 text-sm line-clamp-2">{related.excerpt}</p>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Back to Blog */}
          <div className="text-center">
            <Link to="/blog" className="inline-flex items-center gap-2 px-6 py-3 bg-white/5 text-white rounded-full hover:bg-white/10 transition">
              ← Back to All Articles
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
