import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Calendar, Clock } from 'lucide-react';
import { Header } from '@/components/ui/header';
import { Footer } from '@/components/ui/footer';
import { SEOHead } from '@/components/SEOHead';
import { StructuredData } from '@/components/StructuredData';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { BlogSkipLink } from '@/components/blog/BlogSkipLink';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { blogPosts, blogCategories } from '@/data/blog';
import { updates, practiceAreas } from '@/data/cases';
import { Badge } from '@/components/ui/badge';

const BlogPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [contentType, setContentType] = useState<'all' | 'articles' | 'updates'>('all');

  // Combine blog posts and updates into unified content items
  type ContentItem = {
    type: 'blog' | 'update';
    id: string;
    title: string;
    excerpt: string;
    date: string;
    category: string;
    slug?: string;
    readingTime?: number;
    author?: { name: string };
    featuredImage?: { url: string; alt: string };
    caseSlug?: string;
  };

  const allContent: ContentItem[] = [
    ...blogPosts
      .filter(post => post.status === 'published')
      .map(post => ({
        type: 'blog' as const,
        id: post.id,
        title: post.title,
        excerpt: post.excerpt,
        date: post.publishedDate,
        category: post.category,
        slug: post.slug,
        readingTime: post.readingTime,
        author: post.author,
        featuredImage: post.featuredImage,
      })),
    ...updates.map(update => ({
      type: 'update' as const,
      id: update.id,
      title: update.title,
      excerpt: update.summary,
      date: update.date,
      category: practiceAreas.find(a => a.id === update.category)?.name || update.category,
      slug: update.id,
      caseSlug: update.caseSlug,
    }))
  ];

  const filteredContent = allContent.filter((item) => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesType = contentType === 'all' || 
                       (contentType === 'articles' && item.type === 'blog') ||
                       (contentType === 'updates' && item.type === 'update');
    return matchesSearch && matchesCategory && matchesType;
  }).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  
  // All categories from both blog and updates
  const allCategories = [
    ...blogCategories.map(cat => cat.name),
    ...practiceAreas.map(area => area.name)
  ].filter((value, index, self) => self.indexOf(value) === index);

  return (
    <>
      <BlogSkipLink />
      <SEOHead
        title="Legal Insights | Mass Tort & Personal Injury Analysis | LegalRetainers"
        description="Expert analysis on mass tort litigation, personal injury law, and case acquisition strategies for plaintiff law firms. Industry news, settlement updates, and practice insights."
        keywords="legal insights, mass tort analysis, personal injury updates, law firm resources, case acquisition, legal practice management"
        canonical="https://legalretainers.com/insights"
      />
      <StructuredData type="blog" data={{
        "@context": "https://schema.org",
        "@type": "Blog",
        "@id": "https://legalretainers.com/insights",
        "name": "LegalRetainers Legal Insights",
        "description": "Expert analysis and updates on mass tort litigation, personal injury law, and consumer protection",
        "url": "https://legalretainers.com/insights",
        "publisher": {
          "@type": "Organization",
          "@id": "https://legalretainers.com/#organization"
        },
        "inLanguage": "en-US",
        "isAccessibleForFree": true
      }} />
      <StructuredData type="llmOptimizedPage" data={{
        pageName: "Legal Insights & Case Updates for Law Firms",
        pageDescription: "Expert analysis and case updates for plaintiff law firms. Insights on mass torts, personal injury, settlements, and industry trends.",
        pageUrl: "https://legalretainers.com/insights",
        pageType: "CollectionPage",
        additionalData: {
          keywords: ["legal blog", "mass tort news", "personal injury updates", "law firm insights"],
          mentions: ["Mass Tort Litigation", "Personal Injury Law", "Consumer Protection", "Case Settlements"],
          lastReviewed: "2026-01-21"
        }
      }} />
      <StructuredData type="itemList" data={{
        "@context": "https://schema.org",
        "@type": "ItemList",
        "itemListElement": blogPosts
          .filter(post => post.status === 'published')
          .map((post, index) => ({
            "@type": "ListItem",
            "position": index + 1,
            "item": {
              "@type": "Article",
              "@id": `https://legalretainers.com/insights/${post.slug}`,
              "url": `https://legalretainers.com/insights/${post.slug}`,
              "headline": post.title,
              "description": post.excerpt,
              "datePublished": post.publishedDate,
              "author": {
                "@type": "Person",
                "name": post.author.name
              }
            }
          }))
      }} />
      <Header />

      <section className="bg-primary text-primary-foreground py-12 md:py-16">
        <div className="lr-width-container">
          <Breadcrumbs items={[{ label: 'Insights', href: '/insights' }]} variant="light" />
          <h1 className="lr-heading-xl mb-4 text-white">Legal Insights & Updates</h1>
          <p className="lr-body-l text-white/90 max-w-2xl">
            Expert analysis, case updates, settlement news, and comprehensive guides on mass tort litigation and personal injury law.
          </p>
        </div>
      </section>
      
      <main id="main-content" className="bg-muted/30 py-8 md:py-12" role="main">
        <div className="lr-width-container">
          {/* Search and Filter */}
          <section aria-label="Filter content" className="bg-white border-2 border-black p-4 sm:p-6 mb-10">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
              <div className="sm:col-span-2 md:col-span-2 relative">
                <label htmlFor="search-input" className="sr-only">Search articles and updates</label>
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-black/60" aria-hidden="true" />
                <Input
                  id="search-input"
                  type="search"
                  placeholder="Search articles and updates..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 border-2 border-black bg-white"
                  aria-label="Search articles and updates"
                />
              </div>
              <Select value={contentType} onValueChange={(value: any) => setContentType(value)}>
                <SelectTrigger aria-label="Filter by content type" className="border-2 border-black bg-white">
                  <SelectValue placeholder="All Content" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Content</SelectItem>
                  <SelectItem value="articles">Articles Only</SelectItem>
                  <SelectItem value="updates">Updates Only</SelectItem>
                </SelectContent>
              </Select>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger aria-label="Filter by category" className="border-2 border-black bg-white">
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {allCategories.map(cat => (
                    <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </section>

          {/* Content Grid */}
          <section aria-label="Articles and updates">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {filteredContent.map((item) => (
                <article 
                  key={item.id} 
                  className="relative overflow-hidden border-2 border-black bg-white transition-all hover:-translate-y-1 hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] flex flex-col min-h-[320px] group"
                >
                  {item.featuredImage && (
                    <div 
                      className="absolute inset-0 bg-cover bg-center grayscale opacity-40 group-hover:opacity-50 transition-opacity"
                      style={{ backgroundImage: `url(${item.featuredImage.url})` }}
                    />
                  )}
                  {!item.featuredImage && (
                    <div className="absolute inset-0 bg-gray-100 opacity-50" />
                  )}
                  <div className="relative z-10 p-6 flex flex-col h-full bg-white/70">
                    <div className="flex items-center gap-2 mb-4">
                      {item.type === 'blog' ? (
                        <Badge variant="secondary" className="bg-black text-white border border-black rounded-none font-bold text-[10px] tracking-wider px-2 py-0.5">
                          ARTICLE
                        </Badge>
                      ) : (
                        <Badge variant="secondary" className="bg-black text-white border border-black rounded-none font-bold text-[10px] tracking-wider px-2 py-0.5">
                          UPDATE
                        </Badge>
                      )}
                      <span className="inline-block bg-[#00703C] text-white px-2 py-0.5 text-[10px] font-bold tracking-wider">
                        {item.category.toUpperCase()}
                      </span>
                    </div>
                    <Link to={item.type === 'blog' ? `/insights/${item.slug}` : `/updates/${item.slug}`} className="group/title">
                      <h3 className="text-xl font-bold text-black leading-tight mb-3 group-hover/title:text-primary transition-colors">
                        {item.title}
                      </h3>
                    </Link>
                    <p className="text-sm font-medium text-black/80 mb-6 flex-grow line-clamp-3 leading-relaxed">
                      {item.excerpt}
                    </p>
                    <div className="flex items-center justify-between mt-auto">
                      <div className="flex items-center gap-4 text-[10px] font-bold uppercase tracking-wider text-black/60">
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3 w-3 stroke-[2px]" aria-hidden="true" />
                          <time dateTime={item.date}>
                            {new Date(item.date).toLocaleDateString('en-GB', {
                              day: 'numeric',
                              month: 'short',
                              year: 'numeric'
                            })}
                          </time>
                        </span>
                        {item.readingTime && (
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3 stroke-[2px]" aria-hidden="true" />
                            {item.readingTime} MIN READ
                          </span>
                        )}
                      </div>
                      <Link 
                        to={item.type === 'blog' ? `/insights/${item.slug}` : `/updates/${item.slug}`} 
                        className="text-primary hover:underline text-sm font-bold"
                        aria-label={`Read ${item.title}`}
                      >
                        Read more →
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>

          {filteredContent.length === 0 && (
            <div className="bg-white border border-border shadow-sm p-12 text-center" role="status">
              <p className="lr-body-l text-muted-foreground">
                No content found matching your search criteria.
              </p>
              <Button
                onClick={() => {
                  setSearchTerm("");
                  setSelectedCategory("all");
                  setContentType("all");
                }}
                variant="outline"
                className="lr-focus mt-4"
              >
                Clear filters
              </Button>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </>
  );
};

export default BlogPage;
