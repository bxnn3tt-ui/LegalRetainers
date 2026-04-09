import { cases, updates } from '@/data/cases';
import { blogAuthors, blogPosts } from '@/data/blog';

export interface SitemapUrl {
  loc: string;
  lastmod?: string;
  changefreq?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority?: number;
  images?: Array<{
    loc: string;
    title?: string;
  }>;
}

export interface SitemapGenerationOptions {
  lastmods?: Record<string, string>;
}

const getLatestPublishedBlogDate = (): string | undefined => {
  const publishedPosts = blogPosts.filter((post) => post.status === 'published');

  if (publishedPosts.length === 0) {
    return undefined;
  }

  return publishedPosts.reduce((latest, post) => {
    const postDate = post.modifiedDate || post.publishedDate;
    return latest > postDate ? latest : postDate;
  }, publishedPosts[0].modifiedDate || publishedPosts[0].publishedDate);
};

const resolveLastmod = (
  options: SitemapGenerationOptions,
  keys: string[],
  fallback?: string
): string | undefined => {
  for (const key of keys) {
    const lastmod = options.lastmods?.[key];
    if (lastmod) {
      return lastmod;
    }
  }

  return fallback;
};

export const generateSitemapUrls = (options: SitemapGenerationOptions = {}): SitemapUrl[] => {
  const baseUrl = 'https://legalretainers.com';
  const latestBlogDate = getLatestPublishedBlogDate();
  
  const staticUrls: SitemapUrl[] = [
    {
      loc: `${baseUrl}/`,
      changefreq: 'weekly',
      priority: 1.0,
      lastmod: resolveLastmod(options, ['/']),
    },
    {
      loc: `${baseUrl}/cases`,
      changefreq: 'daily',
      priority: 0.9,
      lastmod: resolveLastmod(options, ['/cases']),
    },
    {
      loc: `${baseUrl}/request-clients`,
      changefreq: 'weekly',
      priority: 0.8,
      lastmod: resolveLastmod(options, ['/request-clients']),
    },
    {
      loc: `${baseUrl}/about`,
      changefreq: 'monthly',
      priority: 0.7,
      lastmod: resolveLastmod(options, ['/about']),
    },
    {
      loc: `${baseUrl}/contact`,
      changefreq: 'monthly',
      priority: 0.6,
      lastmod: resolveLastmod(options, ['/contact']),
    },
    {
      loc: `${baseUrl}/editorial`,
      changefreq: 'monthly',
      priority: 0.6,
      lastmod: resolveLastmod(options, ['/editorial']),
    },
    {
      loc: `${baseUrl}/privacy`,
      changefreq: 'yearly',
      priority: 0.3,
      lastmod: resolveLastmod(options, ['/privacy']),
    },
    {
      loc: `${baseUrl}/terms`,
      changefreq: 'yearly',
      priority: 0.3,
      lastmod: resolveLastmod(options, ['/terms']),
    },
    {
      loc: `${baseUrl}/cookies`,
      changefreq: 'yearly',
      priority: 0.3,
      lastmod: resolveLastmod(options, ['/cookies']),
    },
    {
      loc: `${baseUrl}/accessibility`,
      changefreq: 'yearly',
      priority: 0.3,
      lastmod: resolveLastmod(options, ['/accessibility']),
    },
  ];

  // Generate case detail URLs
  const caseUrls: SitemapUrl[] = cases.map((caseItem) => ({
    loc: `${baseUrl}/cases/${caseItem.slug}`,
    changefreq: 'weekly' as const,
    priority: caseItem.priority === 'high' ? 0.9 : caseItem.priority === 'medium' ? 0.8 : 0.7,
    lastmod: resolveLastmod(options, [`/cases/${caseItem.slug}`, '/cases/:slug']),
  }));

  // Note: updates array is currently empty, so no update URLs are generated
  const updateUrls: SitemapUrl[] = [];

  // Generate URLs for blog posts
  const blogUrls: SitemapUrl[] = blogPosts
    .filter(post => post.status === 'published')
    .map((post) => ({
      loc: `${baseUrl}/insights/${post.slug}`,
      changefreq: 'monthly' as const,
      priority: post.featured ? 0.8 : 0.7,
      lastmod: post.modifiedDate || post.publishedDate,
      images: post.featuredImage ? [{
        loc: `${baseUrl}${post.featuredImage.url}`,
        title: post.featuredImage.alt
      }] : undefined
    }));

  // Add blog listing page
  const blogListingUrl: SitemapUrl = {
    loc: `${baseUrl}/insights`,
    changefreq: 'weekly',
    priority: 0.8,
    lastmod: resolveLastmod(options, ['/insights'], latestBlogDate),
  };

  const authorUrls: SitemapUrl[] = blogAuthors.map((author) => ({
    loc: `${baseUrl}${author.url}`,
    changefreq: 'monthly' as const,
    priority: 0.5,
    lastmod: resolveLastmod(options, [author.url, '/insights/author/:authorId'], latestBlogDate),
  }));

  return [...staticUrls, ...caseUrls, ...updateUrls, blogListingUrl, ...blogUrls, ...authorUrls];
};

export const generateSitemapXML = (options: SitemapGenerationOptions = {}): string => {
  const urls = generateSitemapUrls(options);
  
  const urlElements = urls
    .map((url) => {
      const imageElements = url.images
        ? url.images
            .map(
              (image) => `
    <image:image>
      <image:loc>${image.loc}</image:loc>
      ${image.title ? `<image:title>${image.title}</image:title>` : ''}
    </image:image>`
            )
            .join('')
        : '';

      return `  <url>
    <loc>${url.loc}</loc>
    ${url.lastmod ? `<lastmod>${url.lastmod}</lastmod>` : ''}
    ${url.changefreq ? `<changefreq>${url.changefreq}</changefreq>` : ''}
    ${url.priority !== undefined ? `<priority>${url.priority.toFixed(1)}</priority>` : ''}${imageElements}
  </url>`;
    })
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${urlElements}
</urlset>`;
};
