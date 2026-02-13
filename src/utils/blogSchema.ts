import { BlogPost } from '@/data/blog';

interface SchemaGenerator {
  article: (post: BlogPost) => object;
  howTo: (post: BlogPost) => object | null;
  faq: (post: BlogPost) => object | null;
  breadcrumb: (post: BlogPost) => object;
}

/**
 * Extracts H2 headings from HTML content to generate HowTo steps
 */
const extractStepsFromContent = (content: string): Array<{ name: string; text: string }> => {
  const h2Regex = /<h2[^>]*id="([^"]*)"[^>]*>(.*?)<\/h2>/g;
  const steps: Array<{ name: string; text: string }> = [];
  let match;

  while ((match = h2Regex.exec(content)) !== null) {
    const heading = match[2].replace(/<[^>]*>/g, ''); // Strip HTML tags
    // Find the text after this heading until the next h2 or end
    const afterHeading = content.slice(match.index + match[0].length);
    const nextH2 = afterHeading.search(/<h2/);
    const sectionText = nextH2 > -1 
      ? afterHeading.slice(0, nextH2) 
      : afterHeading;
    
    // Extract plain text (strip HTML) and limit to ~200 chars
    const plainText = sectionText
      .replace(/<[^>]*>/g, ' ')
      .replace(/\s+/g, ' ')
      .trim()
      .slice(0, 200);

    if (heading && plainText) {
      steps.push({
        name: heading,
        text: plainText
      });
    }
  }

  return steps.slice(0, 8); // Limit to 8 steps for HowTo schema
};

/**
 * Determines if a blog post is a how-to guide based on category and content
 */
const isHowToGuide = (post: BlogPost): boolean => {
  return post.category === 'how-to-guides' || 
         post.title.toLowerCase().includes('how to') ||
         post.title.toLowerCase().includes('what to expect');
};

export const blogSchema: SchemaGenerator = {
  /**
   * Generate comprehensive Article schema with BreadcrumbList
   */
  article: (post: BlogPost) => {
    const baseUrl = 'https://legalretainers.com';
    
    return {
      "@context": "https://schema.org",
      "@type": "Article",
      "@id": `${baseUrl}/insights/${post.slug}#article`,
      "headline": post.title,
      "alternativeHeadline": post.excerpt,
      "description": post.excerpt,
      "image": {
        "@type": "ImageObject",
        "url": `${baseUrl}${post.featuredImage.url}`,
        "width": post.featuredImage.width,
        "height": post.featuredImage.height,
        "caption": post.featuredImage.alt
      },
      "datePublished": post.publishedDate,
      "dateModified": post.modifiedDate || post.publishedDate,
      "author": {
        "@type": "Person",
        "@id": `${baseUrl}/insights/author/${post.author.id}#person`,
        "name": post.author.name,
        "jobTitle": post.author.title,
        "description": post.author.bio,
        "image": `${baseUrl}${post.author.image}`,
        ...(post.author.linkedin && {
          "sameAs": [post.author.linkedin]
        })
      },
      "publisher": {
        "@type": "Organization",
        "@id": `${baseUrl}/#organization`,
        "name": "LegalRetainers",
        "logo": {
          "@type": "ImageObject",
          "url": `${baseUrl}/logo.png`,
          "width": 600,
          "height": 60
        },
        "contactPoint": {
          "@type": "ContactPoint",
          "telephone": "+1-305-900-5954",
          "contactType": "customer service"
        }
      },
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": `${baseUrl}/insights/${post.slug}`
      },
      "articleSection": post.category,
      "keywords": post.seo.keywords,
      "wordCount": post.content.split(/\s+/).length,
      "timeRequired": `PT${post.readingTime}M`,
      "inLanguage": "en-US",
      "isAccessibleForFree": true,
      "thumbnailUrl": `${baseUrl}${post.featuredImage.url}`,
      "about": {
        "@type": "Thing",
        "name": post.title
      },
      "speakable": {
        "@type": "SpeakableSpecification",
        "cssSelector": [".lead", "h2", ".key-takeaways", "[data-speakable]"]
      }
    };
  },

  /**
   * Generate HowTo schema for how-to guides
   */
  howTo: (post: BlogPost) => {
    if (!isHowToGuide(post)) {
      return null;
    }

    const steps = extractStepsFromContent(post.content);
    
    if (steps.length < 2) {
      return null; // Need at least 2 steps for valid HowTo
    }

    const baseUrl = 'https://legalretainers.com';

    return {
      "@context": "https://schema.org",
      "@type": "HowTo",
      "@id": `${baseUrl}/insights/${post.slug}#howto`,
      "name": post.title,
      "description": post.excerpt,
      "image": {
        "@type": "ImageObject",
        "url": `${baseUrl}${post.featuredImage.url}`,
        "width": post.featuredImage.width,
        "height": post.featuredImage.height
      },
      "totalTime": `PT${post.readingTime}M`,
      "estimatedCost": {
        "@type": "MonetaryAmount",
        "currency": "USD",
        "value": "0"
      },
      "step": steps.map((step, index) => ({
        "@type": "HowToStep",
        "position": index + 1,
        "name": step.name,
        "text": step.text,
        "url": `${baseUrl}/insights/${post.slug}#${step.name.toLowerCase().replace(/\s+/g, '-')}`
      }))
    };
  },

  /**
   * Generate FAQ schema for articles with FAQs
   */
  faq: (post: BlogPost) => {
    if (!post.faqs || post.faqs.length === 0) {
      return null;
    }

    const baseUrl = 'https://legalretainers.com';

    return {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "@id": `${baseUrl}/insights/${post.slug}#faqpage`,
      "mainEntity": post.faqs.map(faq => ({
        "@type": "Question",
        "name": faq.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": faq.answer
        }
      }))
    };
  },

  /**
   * Generate BreadcrumbList schema
   */
  breadcrumb: (post: BlogPost) => {
    const baseUrl = 'https://legalretainers.com';

    return {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "@id": `${baseUrl}/insights/${post.slug}#breadcrumb`,
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": baseUrl
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Insights",
          "item": `${baseUrl}/insights`
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": post.title,
          "item": `${baseUrl}/insights/${post.slug}`
        }
      ]
    };
  }
};

/**
 * Generate all applicable schema types for a blog post
 */
export const generateBlogSchemas = (post: BlogPost) => {
  const schemas: object[] = [];

  // Always include Article schema
  schemas.push(blogSchema.article(post));

  // Add HowTo schema if applicable
  const howToSchema = blogSchema.howTo(post);
  if (howToSchema) {
    schemas.push(howToSchema);
  }

  // Add FAQ schema if applicable
  const faqSchema = blogSchema.faq(post);
  if (faqSchema) {
    schemas.push(faqSchema);
  }

  // Add Breadcrumb schema
  schemas.push(blogSchema.breadcrumb(post));

  return schemas;
};
