import { Helmet } from 'react-helmet-async';

const SITE_URL = 'https://legalretainers.com';

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string;
  canonical?: string;
  ogImage?: string;
  ogImageAlt?: string;
  ogType?: string;
  noIndex?: boolean;
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
  authorTwitter?: string;
  section?: string;
  tags?: string[];
}

const ensureAbsoluteUrl = (url: string): string => {
  if (url.startsWith('http://') || url.startsWith('https://')) {
    return url;
  }
  return `${SITE_URL}${url.startsWith('/') ? '' : '/'}${url}`;
};

export const SEOHead = ({
  title = "LegalRetainers | Signed Cases on Demand",
  description = "Get signed cases delivered in 24-48 hours. Every client is pre-qualified, already signed, and ready to work—skip intake, start billing.",
  keywords = "signed legal cases, ready-to-work clients, instant case acquisition, skip intake cases, pre-signed personal injury cases, mass tort leads signed, exclusive law firm cases, fast case delivery, 24 hour case delivery",
  canonical,
  ogImage = "/og-image.png",
  ogImageAlt,
  ogType = "website",
  noIndex = false,
  publishedTime,
  modifiedTime,
  author,
  authorTwitter,
  section,
  tags = []
}: SEOHeadProps) => {
  const currentUrl = canonical || (typeof window !== 'undefined' ? window.location.href : SITE_URL);
  const absoluteOgImage = ensureAbsoluteUrl(ogImage);
  const imageAlt = ogImageAlt || title;
  
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      {noIndex && <meta name="robots" content="noindex,nofollow" />}
      
      {/* Canonical URL */}
      <link rel="canonical" href={currentUrl} />
      
      {/* Open Graph - Core Tags */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={currentUrl} />
      <meta property="og:type" content={ogType} />
      <meta property="og:site_name" content="LegalRetainers" />
      <meta property="og:locale" content="en_US" />
      
      {/* Open Graph - Image Tags (2026 compliant) */}
      <meta property="og:image" content={absoluteOgImage} />
      <meta property="og:image:url" content={absoluteOgImage} />
      <meta property="og:image:secure_url" content={absoluteOgImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:type" content="image/png" />
      <meta property="og:image:alt" content={imageAlt} />
      
      {/* Open Graph - Article Tags */}
      {publishedTime && <meta property="article:published_time" content={publishedTime} />}
      {modifiedTime && <meta property="article:modified_time" content={modifiedTime} />}
      {author && <meta property="article:author" content={author} />}
      {section && <meta property="article:section" content={section} />}
      {tags.map((tag, index) => (
        <meta key={`article-tag-${index}`} property="article:tag" content={tag} />
      ))}
      
      {/* Twitter/X Card Tags (2026 compliant) */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={absoluteOgImage} />
      <meta name="twitter:image:alt" content={imageAlt} />
      <meta name="twitter:site" content="@legalretainers" />
      {authorTwitter && <meta name="twitter:creator" content={authorTwitter} />}
      
      {/* Additional SEO meta tags */}
      <meta name="author" content={author || "LegalRetainers"} />
      <meta name="publisher" content="LegalRetainers" />
      <meta name="theme-color" content="#002966" />
      
      {/* GEO (Generative Engine Optimization) meta tags */}
      <meta name="robots" content="max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
      
      {/* AI/LLM specific tags */}
      <meta name="referrer" content="always" />
      <meta name="format-detection" content="telephone=no" />
      {author && <meta name="citation_author" content={author} />}
      {publishedTime && <meta name="citation_publication_date" content={publishedTime} />}
      <meta name="citation_title" content={title} />
      <meta name="citation_journal_title" content="LegalRetainers" />
      
      {/* Geographic targeting */}
      <meta name="geo.region" content="US-AZ" />
      <meta name="geo.placename" content="Phoenix" />
      <meta name="geo.position" content="33.4792;-112.0305" />
      
      {/* Language alternatives */}
      <link rel="alternate" hrefLang="en-US" href={currentUrl} />
      <link rel="alternate" hrefLang="x-default" href={SITE_URL} />
      
      {/* Revisit frequency */}
      <meta name="revisit-after" content="7 days" />
      
      {/* Content rating */}
      <meta name="rating" content="general" />
      
      {/* Mobile optimization */}
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
    </Helmet>
  );
};
