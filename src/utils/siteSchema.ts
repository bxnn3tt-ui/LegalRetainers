/**
 * Comprehensive Schema.org structured data for the entire site
 * Optimized for Google Search and LLM understanding
 */

const BASE_URL = 'https://legalretainers.com';

export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${BASE_URL}/#organization`,
  "name": "LegalRetainers",
  "legalName": "LegalRetainers LLC",
  "url": BASE_URL,
  "logo": {
    "@type": "ImageObject",
    "url": `${BASE_URL}/og-image.png`,
    "width": 1200,
    "height": 630
  },
  "description": "LegalRetainers delivers pre-qualified, signed cases to plaintiff law firms nationwide. Skip intake and start working immediately with clients who have already signed representation agreements.",
  "foundingDate": "2020",
  "contactPoint": [
    {
      "@type": "ContactPoint",
      "telephone": "+1-305-900-5954",
      "contactType": "sales",
      "areaServed": "US",
      "availableLanguage": "English",
      "hoursAvailable": {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        "opens": "09:00",
        "closes": "18:00"
      }
    },
    {
      "@type": "ContactPoint",
      "email": "help@legalretainers.com",
      "contactType": "customer service",
      "areaServed": "US",
      "availableLanguage": "English"
    }
  ],
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "2345 E Thomas Rd Ste 100 #498",
    "addressLocality": "Phoenix",
    "addressRegion": "AZ",
    "postalCode": "85016",
    "addressCountry": "US"
  },
  "areaServed": {
    "@type": "Country",
    "name": "United States"
  },
  "serviceType": [
    "Signed Case Delivery",
    "Pre-Qualified Legal Case Acquisition",
    "Law Firm Case Fulfillment",
    "Retainer Agreement Services"
  ],
  "knowsAbout": [
    "Personal Injury Cases",
    "Mass Tort Litigation",
    "Institutional Abuse Claims",
    "Medical Malpractice Cases",
    "Product Liability",
    "Employment Law Cases",
    "Legal Lead Generation",
    "Case Acquisition for Law Firms",
    "Pre-Signed Retainer Agreements"
  ],
  "slogan": "Signed Cases on Demand",
  "sameAs": [
    "https://linkedin.com/company/legalretainers",
    "https://x.com/legalretainers",
    "https://facebook.com/legalretainers"
  ],
  "hasCredential": {
    "@type": "EducationalOccupationalCredential",
    "credentialCategory": "Professional License",
    "name": "Licensed Legal Services Provider"
  }
};

export const professionalServiceSchema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "@id": `${BASE_URL}/#service`,
  "name": "LegalRetainers Case Acquisition Service",
  "description": "Delivers pre-signed retainer agreements to plaintiff law firms. Each case includes a client who has already executed a representation agreement, complete intake documentation, and HIPAA authorizations. Cases are delivered within 24-48 hours.",
  "provider": {
    "@type": "Organization",
    "@id": `${BASE_URL}/#organization`
  },
  "serviceType": "Legal Case Acquisition",
  "areaServed": {
    "@type": "Country",
    "name": "United States"
  },
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Case Types Available",
    "itemListElement": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Personal Injury Cases",
          "description": "Motor vehicle accidents, slip and falls, workplace injuries"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Mass Tort Cases",
          "description": "Product liability, defective drugs, environmental contamination"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Institutional Abuse Cases",
          "description": "Clergy abuse, institutional negligence, survivor claims"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Employment Cases",
          "description": "Workplace disputes, benefits denial, employment violations"
        }
      }
    ]
  },
  "availableChannel": {
    "@type": "ServiceChannel",
    "serviceUrl": `${BASE_URL}/cases`,
    "servicePhone": "+1-305-900-5954",
    "serviceSmsNumber": "+1-305-900-5954"
  },
  "termsOfService": `${BASE_URL}/terms`,
  "audience": {
    "@type": "Audience",
    "audienceType": "Plaintiff Law Firms",
    "geographicArea": {
      "@type": "Country",
      "name": "United States"
    }
  }
};

export const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LegalService",
  "@id": `${BASE_URL}/#localbusiness`,
  "name": "LegalRetainers",
  "description": "Signed case delivery service for plaintiff law firms. Pre-qualified clients with signed representation agreements delivered in 24-48 hours.",
  "url": BASE_URL,
  "telephone": "+1-305-900-5954",
  "email": "help@legalretainers.com",
  "priceRange": "$$",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "2345 E Thomas Rd Ste 100 #498",
    "addressLocality": "Phoenix",
    "addressRegion": "AZ",
    "postalCode": "85016",
    "addressCountry": "US"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 25.7742,
    "longitude": -80.1936
  },
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      "opens": "09:00",
      "closes": "18:00"
    }
  ],
  "areaServed": {
    "@type": "Country",
    "name": "United States"
  }
};

export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${BASE_URL}/#website`,
  "name": "LegalRetainers",
  "url": BASE_URL,
  "description": "Platform delivering pre-qualified, signed cases to plaintiff law firms nationwide",
  "publisher": {
    "@type": "Organization",
    "@id": `${BASE_URL}/#organization`
  },
  "potentialAction": {
    "@type": "SearchAction",
    "target": {
      "@type": "EntryPoint",
      "urlTemplate": `${BASE_URL}/cases?search={search_term_string}`
    },
    "query-input": "required name=search_term_string"
  },
  "inLanguage": "en-US"
};

export const generateBreadcrumbSchema = (items: Array<{ name: string; url: string }>) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": BASE_URL
    },
    ...items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 2,
      "name": item.name,
      "item": item.url.startsWith('http') ? item.url : `${BASE_URL}${item.url}`
    }))
  ]
});

export const generateFAQSchema = (faqs: Array<{ question: string; answer: string }>) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": faqs.map(faq => ({
    "@type": "Question",
    "name": faq.question,
    "acceptedAnswer": {
      "@type": "Answer",
      "text": faq.answer
    }
  }))
});

export const generateHowToSchema = (
  name: string,
  description: string,
  steps: Array<{ name: string; text: string; url?: string }>
) => ({
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": name,
  "description": description,
  "step": steps.map((step, index) => ({
    "@type": "HowToStep",
    "position": index + 1,
    "name": step.name,
    "text": step.text,
    ...(step.url && { "url": step.url })
  }))
});

export const generateServiceSchema = (
  name: string,
  description: string,
  slug: string,
  geography: string[],
  priceRange?: string
) => ({
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": `${BASE_URL}/cases/${slug}`,
  "name": name,
  "description": description,
  "provider": {
    "@type": "Organization",
    "@id": `${BASE_URL}/#organization`
  },
  "areaServed": geography.map(state => ({
    "@type": "State",
    "name": state
  })),
  ...(priceRange && {
    "offers": {
      "@type": "Offer",
      "priceSpecification": {
        "@type": "PriceSpecification",
        "priceCurrency": "USD"
      }
    }
  }),
  "availableChannel": {
    "@type": "ServiceChannel",
    "serviceUrl": `${BASE_URL}/request-clients`,
    "servicePhone": "+1-305-900-5954"
  }
});

export const generateArticleSchema = (
  title: string,
  description: string,
  slug: string,
  authorName: string,
  authorTitle: string,
  publishedDate: string,
  modifiedDate: string,
  imageUrl: string,
  keywords: string[],
  wordCount: number,
  readingTime: number
) => ({
  "@context": "https://schema.org",
  "@type": "Article",
  "@id": `${BASE_URL}/insights/${slug}#article`,
  "headline": title,
  "description": description,
  "image": {
    "@type": "ImageObject",
    "url": imageUrl.startsWith('http') ? imageUrl : `${BASE_URL}${imageUrl}`,
    "width": 1200,
    "height": 630
  },
  "datePublished": publishedDate,
  "dateModified": modifiedDate,
  "author": {
    "@type": "Person",
    "name": authorName,
    "jobTitle": authorTitle,
    "worksFor": {
      "@type": "Organization",
      "@id": `${BASE_URL}/#organization`
    }
  },
  "publisher": {
    "@type": "Organization",
    "@id": `${BASE_URL}/#organization`,
    "name": "LegalRetainers",
    "logo": {
      "@type": "ImageObject",
      "url": `${BASE_URL}/og-image.png`,
      "width": 1200,
      "height": 630
    }
  },
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": `${BASE_URL}/insights/${slug}`
  },
  "keywords": keywords,
  "wordCount": wordCount,
  "timeRequired": `PT${readingTime}M`,
  "inLanguage": "en-US",
  "isAccessibleForFree": true
});

export const generateItemListSchema = (
  name: string,
  description: string,
  items: Array<{ name: string; description: string; url: string }>
) => ({
  "@context": "https://schema.org",
  "@type": "ItemList",
  "name": name,
  "description": description,
  "numberOfItems": items.length,
  "itemListElement": items.map((item, index) => ({
    "@type": "ListItem",
    "position": index + 1,
    "item": {
      "@type": "Service",
      "name": item.name,
      "description": item.description,
      "url": item.url.startsWith('http') ? item.url : `${BASE_URL}${item.url}`
    }
  }))
});

export const siteNavigationSchema = {
  "@context": "https://schema.org",
  "@type": "SiteNavigationElement",
  "@id": `${BASE_URL}/#navigation`,
  "name": "Main Navigation",
  "hasPart": [
    {
      "@type": "SiteNavigationElement",
      "name": "Home",
      "url": BASE_URL
    },
    {
      "@type": "SiteNavigationElement",
      "name": "Cases",
      "url": `${BASE_URL}/cases`,
      "description": "Browse available signed legal cases across all practice areas"
    },
    {
      "@type": "SiteNavigationElement",
      "name": "Blog",
      "url": `${BASE_URL}/insights`,
      "description": "Legal industry insights and case acquisition strategies"
    },
    {
      "@type": "SiteNavigationElement",
      "name": "About",
      "url": `${BASE_URL}/about`,
      "description": "Learn about LegalRetainers and our mission"
    },
    {
      "@type": "SiteNavigationElement",
      "name": "Contact",
      "url": `${BASE_URL}/contact`,
      "description": "Get in touch with our team"
    }
  ]
};

export const generateWebPageSchema = (
  name: string,
  description: string,
  url: string,
  options?: {
    speakable?: boolean;
    speakableSelectors?: string[];
    lastReviewed?: string;
    primaryImageUrl?: string;
    breadcrumb?: Array<{ name: string; url: string }>;
  }
) => {
  const schema: any = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": url.startsWith('http') ? url : `${BASE_URL}${url}`,
    "name": name,
    "description": description,
    "url": url.startsWith('http') ? url : `${BASE_URL}${url}`,
    "isPartOf": {
      "@type": "WebSite",
      "@id": `${BASE_URL}/#website`
    },
    "about": {
      "@type": "Organization",
      "@id": `${BASE_URL}/#organization`
    },
    "inLanguage": "en-US"
  };

  if (options?.speakable) {
    schema.speakable = {
      "@type": "SpeakableSpecification",
      "cssSelector": options.speakableSelectors || [".lr-heading-xl", ".lr-heading-l", ".lr-body-l", "[data-speakable]"]
    };
  }

  if (options?.lastReviewed) {
    schema.lastReviewed = options.lastReviewed;
  }

  if (options?.primaryImageUrl) {
    schema.primaryImageOfPage = {
      "@type": "ImageObject",
      "url": options.primaryImageUrl.startsWith('http') ? options.primaryImageUrl : `${BASE_URL}${options.primaryImageUrl}`
    };
  }

  if (options?.breadcrumb) {
    schema.breadcrumb = generateBreadcrumbSchema(options.breadcrumb);
  }

  return schema;
};

export const generateContactPageSchema = () => ({
  "@context": "https://schema.org",
  "@type": "ContactPage",
  "@id": `${BASE_URL}/contact`,
  "name": "Contact LegalRetainers",
  "description": "Contact LegalRetainers to discuss signed case acquisition for your law firm",
  "url": `${BASE_URL}/contact`,
  "mainEntity": {
    "@type": "Organization",
    "@id": `${BASE_URL}/#organization`
  },
  "speakable": {
    "@type": "SpeakableSpecification",
    "cssSelector": [".lr-heading-xl", ".lr-heading-l", ".lr-body-l", "[data-speakable]"]
  }
});

export const generateAboutPageSchema = () => ({
  "@context": "https://schema.org",
  "@type": "AboutPage",
  "@id": `${BASE_URL}/about`,
  "name": "About LegalRetainers",
  "description": "Learn how LegalRetainers delivers pre-signed retainer agreements to plaintiff law firms nationwide",
  "url": `${BASE_URL}/about`,
  "mainEntity": {
    "@type": "Organization",
    "@id": `${BASE_URL}/#organization`
  },
  "speakable": {
    "@type": "SpeakableSpecification",
    "cssSelector": [".lr-heading-xl", ".lr-heading-l", ".lr-body-l", "[data-speakable]"]
  }
});

export const generateCollectionPageSchema = (
  name: string,
  description: string,
  url: string,
  items: Array<{ name: string; description: string; url: string }>
) => ({
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "@id": url.startsWith('http') ? url : `${BASE_URL}${url}`,
  "name": name,
  "description": description,
  "url": url.startsWith('http') ? url : `${BASE_URL}${url}`,
  "isPartOf": {
    "@type": "WebSite",
    "@id": `${BASE_URL}/#website`
  },
  "mainEntity": {
    "@type": "ItemList",
    "numberOfItems": items.length,
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "item": {
        "@type": "Service",
        "name": item.name,
        "description": item.description,
        "url": item.url.startsWith('http') ? item.url : `${BASE_URL}${item.url}`
      }
    }))
  },
  "speakable": {
    "@type": "SpeakableSpecification",
    "cssSelector": [".lr-heading-xl", ".lr-heading-l", ".lr-body-l", "[data-speakable]"]
  }
});

export const generateProductSchema = (
  name: string,
  description: string,
  slug: string,
  category: string,
  geography: string[],
  options?: {
    priceRange?: { min: number; max: number };
    availability?: 'InStock' | 'PreOrder' | 'SoldOut';
    features?: string[];
  }
) => {
  const schema: any = {
    "@context": "https://schema.org",
    "@type": "Product",
    "@id": `${BASE_URL}/cases/${slug}#product`,
    "name": name,
    "description": description,
    "url": `${BASE_URL}/cases/${slug}`,
    "category": category,
    "brand": {
      "@type": "Organization",
      "@id": `${BASE_URL}/#organization`
    },
    "manufacturer": {
      "@type": "Organization",
      "@id": `${BASE_URL}/#organization`
    },
    "areaServed": geography.map(state => ({
      "@type": "State",
      "name": state
    }))
  };

  if (options?.priceRange) {
    schema.offers = {
      "@type": "AggregateOffer",
      "lowPrice": options.priceRange.min,
      "highPrice": options.priceRange.max,
      "priceCurrency": "USD",
      "availability": `https://schema.org/${options.availability || 'InStock'}`,
      "seller": {
        "@type": "Organization",
        "@id": `${BASE_URL}/#organization`
      }
    };
  }

  if (options?.features) {
    schema.additionalProperty = options.features.map(feature => ({
      "@type": "PropertyValue",
      "name": "Feature",
      "value": feature
    }));
  }

  return schema;
};

export const generateActionSchema = (
  actionType: 'OrderAction' | 'RequestAction' | 'InformAction',
  name: string,
  description: string,
  targetUrl: string
) => ({
  "@context": "https://schema.org",
  "@type": actionType,
  "name": name,
  "description": description,
  "target": {
    "@type": "EntryPoint",
    "urlTemplate": targetUrl.startsWith('http') ? targetUrl : `${BASE_URL}${targetUrl}`,
    "actionPlatform": [
      "http://schema.org/DesktopWebPlatform",
      "http://schema.org/MobileWebPlatform"
    ]
  },
  "agent": {
    "@type": "Organization",
    "@id": `${BASE_URL}/#organization`
  }
});

export const homepageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": BASE_URL,
  "name": "LegalRetainers - Signed Cases on Demand for Law Firms",
  "description": "LegalRetainers delivers pre-qualified, signed legal cases to plaintiff law firms nationwide. Skip intake and start working with clients who have already signed representation agreements.",
  "url": BASE_URL,
  "isPartOf": {
    "@type": "WebSite",
    "@id": `${BASE_URL}/#website`
  },
  "about": {
    "@type": "Organization",
    "@id": `${BASE_URL}/#organization`
  },
  "speakable": {
    "@type": "SpeakableSpecification",
    "cssSelector": [".lr-heading-xl", ".lr-heading-l", ".lr-body-l", "[data-speakable]"]
  },
  "specialty": [
    "Personal Injury Cases",
    "Mass Tort Litigation",
    "Medical Malpractice",
    "Product Liability",
    "Employment Law"
  ],
  "mainContentOfPage": {
    "@type": "WebPageElement",
    "cssSelector": "main"
  },
  "primaryImageOfPage": {
    "@type": "ImageObject",
    "url": `${BASE_URL}/og-image.png`,
    "width": 1200,
    "height": 630
  }
};

/**
 * AggregateRating schema for organization reputation
 */
export const aggregateRatingSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${BASE_URL}/#organization`,
  "name": "LegalRetainers",
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.9",
    "reviewCount": "127",
    "bestRating": "5",
    "worstRating": "1"
  }
};

/**
 * Generate Review schema for testimonials
 */
export const generateReviewSchema = (
  authorName: string,
  authorTitle: string,
  reviewBody: string,
  ratingValue: number,
  datePublished: string
) => ({
  "@context": "https://schema.org",
  "@type": "Review",
  "author": {
    "@type": "Person",
    "name": authorName,
    "jobTitle": authorTitle
  },
  "reviewBody": reviewBody,
  "reviewRating": {
    "@type": "Rating",
    "ratingValue": ratingValue,
    "bestRating": 5,
    "worstRating": 1
  },
  "datePublished": datePublished,
  "itemReviewed": {
    "@type": "Organization",
    "@id": `${BASE_URL}/#organization`
  },
  "publisher": {
    "@type": "Organization",
    "@id": `${BASE_URL}/#organization`
  }
});

/**
 * Generate Event schema for mass tort filing deadlines
 */
export const generateEventSchema = (
  name: string,
  description: string,
  startDate: string,
  endDate?: string,
  eventType: 'deadline' | 'webinar' | 'announcement' = 'deadline',
  relatedCaseSlug?: string
) => ({
  "@context": "https://schema.org",
  "@type": "Event",
  "@id": `${BASE_URL}/events/${name.toLowerCase().replace(/\s+/g, '-')}`,
  "name": name,
  "description": description,
  "startDate": startDate,
  ...(endDate && { "endDate": endDate }),
  "eventStatus": "https://schema.org/EventScheduled",
  "eventAttendanceMode": "https://schema.org/OnlineEventAttendanceMode",
  "organizer": {
    "@type": "Organization",
    "@id": `${BASE_URL}/#organization`
  },
  "location": {
    "@type": "VirtualLocation",
    "url": relatedCaseSlug ? `${BASE_URL}/cases/${relatedCaseSlug}` : `${BASE_URL}/cases`
  },
  "about": {
    "@type": "Thing",
    "name": eventType === 'deadline' ? "Legal Filing Deadline" : "Legal Industry Event"
  }
});

/**
 * SpecialAnnouncement schema for urgent case availability
 * @deprecated Google deprecated SpecialAnnouncement rich results in June 2025.
 * This schema is retained for backward compatibility but will not generate rich results.
 * Consider removing usage in favor of standard announcement patterns.
 * See: https://developers.google.com/search/blog/2025/06/simplifying-search-results
 */
export const generateSpecialAnnouncementSchema = (
  name: string,
  text: string,
  datePosted: string,
  expires?: string,
  category: 'urgentAvailability' | 'newCaseType' | 'limitedTime' = 'urgentAvailability',
  relatedUrl?: string
) => ({
  "@context": "https://schema.org",
  "@type": "SpecialAnnouncement",
  "@id": `${BASE_URL}/announcements/${name.toLowerCase().replace(/\s+/g, '-')}`,
  "name": name,
  "text": text,
  "datePosted": datePosted,
  ...(expires && { "expires": expires }),
  "category": `https://schema.org/${category}`,
  "announcementLocation": {
    "@type": "Country",
    "name": "United States"
  },
  "spatialCoverage": {
    "@type": "Country",
    "name": "United States"
  },
  "url": relatedUrl || BASE_URL,
  "publisher": {
    "@type": "Organization",
    "@id": `${BASE_URL}/#organization`
  }
});

/**
 * Enhanced Organization schema with all entity references
 */
export const enhancedOrganizationSchema = {
  "@context": "https://schema.org",
  "@graph": [
    organizationSchema,
    {
      "@type": "WebSite",
      "@id": `${BASE_URL}/#website`,
      "url": BASE_URL,
      "name": "LegalRetainers",
      "publisher": {
        "@id": `${BASE_URL}/#organization`
      },
      "potentialAction": {
        "@type": "SearchAction",
        "target": {
          "@type": "EntryPoint",
          "urlTemplate": `${BASE_URL}/cases?search={search_term_string}`
        },
        "query-input": "required name=search_term_string"
      }
    },
    professionalServiceSchema,
    localBusinessSchema,
    siteNavigationSchema
  ]
};

/**
 * LLM-optimized page schema with all entity connections
 */
export const generateLLMOptimizedPageSchema = (
  pageName: string,
  pageDescription: string,
  pageUrl: string,
  pageType: 'HomePage' | 'AboutPage' | 'ContactPage' | 'CollectionPage' | 'ItemPage' | 'FAQPage' = 'HomePage',
  additionalData?: {
    mainEntity?: object;
    hasPart?: object[];
    mentions?: string[];
    keywords?: string[];
    lastReviewed?: string;
  }
) => ({
  "@context": "https://schema.org",
  "@type": pageType === 'HomePage' ? 'WebPage' : pageType,
  "@id": pageUrl.startsWith('http') ? pageUrl : `${BASE_URL}${pageUrl}`,
  "name": pageName,
  "description": pageDescription,
  "url": pageUrl.startsWith('http') ? pageUrl : `${BASE_URL}${pageUrl}`,
  "isPartOf": {
    "@id": `${BASE_URL}/#website`
  },
  "about": {
    "@id": `${BASE_URL}/#organization`
  },
  "provider": {
    "@id": `${BASE_URL}/#organization`
  },
  "speakable": {
    "@type": "SpeakableSpecification",
    "cssSelector": [
      ".lr-heading-xl",
      ".lr-heading-l", 
      ".lr-body-l",
      "[data-speakable]",
      "h1",
      "h2",
      ".hero-text"
    ]
  },
  "inLanguage": "en-US",
  "isAccessibleForFree": true,
  "potentialAction": {
    "@type": "ReadAction",
    "target": pageUrl.startsWith('http') ? pageUrl : `${BASE_URL}${pageUrl}`
  },
  ...(additionalData?.mainEntity && { "mainEntity": additionalData.mainEntity }),
  ...(additionalData?.hasPart && { "hasPart": additionalData.hasPart }),
  ...(additionalData?.mentions && { 
    "mentions": additionalData.mentions.map(m => ({ "@type": "Thing", "name": m }))
  }),
  ...(additionalData?.keywords && { "keywords": additionalData.keywords.join(", ") }),
  ...(additionalData?.lastReviewed && { "lastReviewed": additionalData.lastReviewed })
});

/**
 * Question and Answer schema for LLM training
 */
export const generateQASchema = (
  questions: Array<{ question: string; answer: string; category?: string }>
) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "@id": `${BASE_URL}/#faq`,
  "mainEntity": questions.map((q, index) => ({
    "@type": "Question",
    "@id": `${BASE_URL}/#question-${index + 1}`,
    "name": q.question,
    "acceptedAnswer": {
      "@type": "Answer",
      "text": q.answer,
      ...(q.category && { "about": { "@type": "Thing", "name": q.category } })
    }
  }))
});

/**
 * Definitive Knowledge Graph for LLMs
 */
export const knowledgeGraphSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${BASE_URL}/#organization`,
      "name": "LegalRetainers",
      "alternateName": ["Legal Retainers", "LegalRetainers.com"],
      "description": "LegalRetainers delivers pre-qualified, signed cases to plaintiff law firms nationwide. Each case includes a client who has already signed a representation agreement.",
      "url": BASE_URL,
      "logo": `${BASE_URL}/og-image.png`,
      "foundingDate": "2020",
      "areaServed": "United States",
      "serviceType": "Legal Case Acquisition",
      "knowsAbout": [
        "Personal Injury Law",
        "Mass Tort Litigation", 
        "Medical Malpractice",
        "Product Liability",
        "Employment Law",
        "Institutional Abuse",
        "Legal Lead Generation"
      ],
      "slogan": "Signed Cases on Demand",
      "telephone": "+1-305-900-5954",
      "email": "help@legalretainers.com",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "2345 E Thomas Rd Ste 100 #498",
        "addressLocality": "Phoenix",
        "addressRegion": "AZ",
        "postalCode": "85016",
        "addressCountry": "US"
      }
    },
    {
      "@type": "WebSite",
      "@id": `${BASE_URL}/#website`,
      "url": BASE_URL,
      "name": "LegalRetainers",
      "description": "Platform for law firms to acquire pre-signed legal cases",
      "publisher": { "@id": `${BASE_URL}/#organization` }
    },
    {
      "@type": "Service",
      "@id": `${BASE_URL}/#caseService`,
      "name": "Pre-Signed Case Delivery",
      "description": "Delivers pre-qualified clients with signed retainer agreements to plaintiff law firms within 24-48 hours",
      "provider": { "@id": `${BASE_URL}/#organization` },
      "serviceType": "Legal Case Acquisition",
      "areaServed": "United States",
      "audience": {
        "@type": "Audience",
        "audienceType": "Plaintiff Law Firms"
      }
    }
  ]
};

export const legalGlossaryTerms = [
  {
    term: "Pre-Signed Case",
    definition: "A legal case where the client has already executed a retainer agreement establishing attorney-client representation before being delivered to a law firm."
  },
  {
    term: "Retainer Agreement",
    definition: "A legal contract between an attorney and client that establishes the terms of representation, including fee structure, scope of work, and responsibilities of both parties."
  },
  {
    term: "Qualified Lead",
    definition: "A prospective client who has met basic criteria for a legal case but has not yet committed to representation or signed any agreements."
  },
  {
    term: "Case Acquisition",
    definition: "The process by which law firms obtain new clients and cases, encompassing marketing, lead generation, intake, and retention."
  },
  {
    term: "Intake Process",
    definition: "The procedures used by law firms to evaluate, screen, and onboard new prospective clients, including initial consultation, case evaluation, and retainer signing."
  },
  {
    term: "Contingency Fee",
    definition: "A fee arrangement where the attorney receives a percentage of the client's recovery rather than hourly fees, meaning no payment is due if the case is unsuccessful."
  },
  {
    term: "Mass Tort",
    definition: "Civil litigation involving many plaintiffs against one or a few defendants in cases alleging similar harm from defective products, pharmaceuticals, or environmental hazards."
  },
  {
    term: "TCPA Compliance",
    definition: "Adherence to the Telephone Consumer Protection Act, which regulates telemarketing calls, text messages, and faxes, requiring prior express consent before contacting consumers."
  }
];

export const generateDefinedTermSchema = (
  term: string,
  definition: string
) => ({
  "@context": "https://schema.org",
  "@type": "DefinedTerm",
  "name": term,
  "description": definition,
  "inDefinedTermSet": {
    "@type": "DefinedTermSet",
    "name": "LegalRetainers Legal Glossary",
    "@id": `${BASE_URL}/#glossary`
  }
});

export const generateGlossarySchema = () => ({
  "@context": "https://schema.org",
  "@type": "DefinedTermSet",
  "@id": `${BASE_URL}/#glossary`,
  "name": "Legal Case Acquisition Glossary",
  "description": "Key terminology for understanding pre-signed legal cases and law firm case acquisition",
  "hasDefinedTerm": legalGlossaryTerms.map(({ term, definition }) => ({
    "@type": "DefinedTerm",
    "name": term,
    "description": definition
  }))
});
