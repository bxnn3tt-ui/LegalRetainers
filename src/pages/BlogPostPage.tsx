import { useParams, Navigate, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Calendar, Clock, RefreshCw } from 'lucide-react';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { Header } from '@/components/ui/header';
import { Footer } from '@/components/ui/footer';
import { SEOHead } from '@/components/SEOHead';
import { Badge } from '@/components/ui/badge';
import { BlogRelatedPosts } from '@/components/blog/BlogRelatedPosts';
import { BlogSkipLink } from '@/components/blog/BlogSkipLink';
import { TableOfContents } from '@/components/blog/TableOfContents';
import { FAQAccordion } from '@/components/blog/FAQAccordion';
import { SocialShare } from '@/components/blog/SocialShare';
import { AuthorBio } from '@/components/blog/AuthorBio';
import { ArticleCTA } from '@/components/blog/ArticleCTA';
import { KeyTakeaways } from '@/components/blog/KeyTakeaways';
import { blogPosts } from '@/data/blog';
import { generateBlogSchemas } from '@/utils/blogSchema';

const BlogPostPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = blogPosts.find(p => p.slug === slug && p.status === 'published');

  if (!post) {
    return <Navigate to="/404" replace />;
  }

  const relatedPosts = post.relatedPosts
    ?.map(id => blogPosts.find(p => p.id === id && p.status === 'published'))
    .filter(Boolean)
    .slice(0, 3) || [];

  const schemas = generateBlogSchemas(post);

  const formattedPublishDate = new Date(post.publishedDate).toLocaleDateString('en-GB', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const formattedModifiedDate = post.modifiedDate 
    ? new Date(post.modifiedDate).toLocaleDateString('en-GB', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    : null;

  return (
    <>
      <BlogSkipLink />
      <SEOHead
        title={post.seo.metaTitle}
        description={post.seo.metaDescription}
        keywords={post.seo.keywords.join(', ')}
        canonical={`https://legalretainers.com/insights/${post.slug}`}
        ogImage={post.seo.ogImage || post.featuredImage.url}
        ogImageAlt={post.featuredImage.alt}
        ogType="article"
        publishedTime={post.publishedDate}
        modifiedTime={post.modifiedDate || post.publishedDate}
        author={post.author.name}
        section={post.category}
        tags={post.tags}
      />
      
      <Helmet>
        {schemas.map((schema, index) => (
          <script key={index} type="application/ld+json">
            {JSON.stringify(schema)}
          </script>
        ))}
      </Helmet>
      
      <Header />
      
      <main id="main-content" className="bg-background" role="main">
        <article className="py-8 lg:py-12">
          <div className="lr-width-container">
            <div className="max-w-3xl mx-auto">
              <Breadcrumbs 
                items={[
                  { label: 'Insights', href: '/insights' },
                  { label: post.title, href: `/insights/${post.slug}` }
                ]} 
              />
              
              {/* Article Header */}
              <header className="mb-8 p-6 border-2 border-black bg-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                <div className="flex items-center gap-2 mb-4">
                  <span className="inline-flex items-center bg-black text-white px-2 py-0.5 text-[10px] font-bold tracking-wider uppercase">
                    ARTICLE
                  </span>
                  <Link 
                    to={`/insights?category=${post.category}`}
                    className="inline-flex items-center"
                  >
                    <span className="inline-flex items-center bg-[#00703C] text-white px-2 py-0.5 text-[10px] font-bold tracking-wider uppercase">
                      {post.category}
                    </span>
                  </Link>
                </div>
                
                <h1 className="lr-heading-xl text-black mb-4">{post.title}</h1>
                
                <p className="lr-body-l text-black/80 mb-6">{post.excerpt}</p>

                {/* Author & Meta Row */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-6 border-b border-black/10">
                  <AuthorBio author={post.author} variant="compact" />
                  
                  <div className="flex flex-wrap items-center gap-4 text-xs font-bold uppercase tracking-wider text-black/60">
                    <div className="flex items-center gap-1.5">
                      <Calendar className="h-4 w-4 stroke-[2px]" aria-hidden="true" />
                      <time dateTime={post.publishedDate}>{formattedPublishDate}</time>
                    </div>
                    {formattedModifiedDate && formattedModifiedDate !== formattedPublishDate && (
                      <div className="flex items-center gap-1.5">
                        <RefreshCw className="h-4 w-4 stroke-[2px]" aria-hidden="true" />
                        <span>Updated {formattedModifiedDate}</span>
                      </div>
                    )}
                    <div className="flex items-center gap-1.5">
                      <Clock className="h-4 w-4 stroke-[2px]" aria-hidden="true" />
                      <span>{post.readingTime} min read</span>
                    </div>
                  </div>
                </div>

                {/* Featured Image */}
                <div className="pt-6">
                  <div className="relative overflow-hidden border-2 border-black h-[300px] md:h-[400px]">
                    <img
                      src={post.featuredImage.url}
                      alt={post.featuredImage.alt}
                      width={post.featuredImage.width}
                      height={post.featuredImage.height}
                      className="w-full h-full object-cover"
                      loading="eager"
                    />
                  </div>
                </div>

                {/* Share Row */}
                <div className="pt-6">
                  <SocialShare 
                    url={`/insights/${slug}`}
                    title={post.title}
                    description={post.excerpt}
                  />
                </div>
              </header>

              {/* Inline CTA - early conversion touchpoint */}
              <ArticleCTA variant="inline" />

              {/* Table of Contents */}
              <TableOfContents content={post.content} />

              {/* Key Takeaways - LLM-optimized summary */}
              {post.keyTakeaways && post.keyTakeaways.length > 0 && (
                <KeyTakeaways takeaways={post.keyTakeaways} />
              )}

              {/* Article Content */}
              <div 
                className="blog-article-content prose prose-lr max-w-none"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />

              {/* FAQ Section */}
              {post.faqs && post.faqs.length > 0 && (
                <FAQAccordion 
                  title="Frequently Asked Questions"
                  faqs={post.faqs}
                />
              )}

              {/* About the Author - E-E-A-T */}
              <AuthorBio author={post.author} variant="full" />

              {/* Bottom CTA */}
              <ArticleCTA variant="bottom" />

              {/* Related Posts */}
              <BlogRelatedPosts posts={relatedPosts} />

            </div>
          </div>
        </article>
      </main>
      
      <Footer />
    </>
  );
};

export default BlogPostPage;