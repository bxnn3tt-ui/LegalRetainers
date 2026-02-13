import { Helmet } from 'react-helmet-async';
import {
  organizationSchema,
  professionalServiceSchema,
  localBusinessSchema,
  websiteSchema,
  siteNavigationSchema,
  homepageSchema,
  generateBreadcrumbSchema,
  generateFAQSchema,
  generateHowToSchema,
  generateServiceSchema,
  generateArticleSchema,
  generateItemListSchema,
  generateWebPageSchema,
  generateContactPageSchema,
  generateAboutPageSchema,
  generateCollectionPageSchema,
  generateProductSchema,
  generateActionSchema,
  aggregateRatingSchema,
  generateReviewSchema,
  generateEventSchema,
  generateSpecialAnnouncementSchema,
  knowledgeGraphSchema,
  generateLLMOptimizedPageSchema,
  generateQASchema,
  generateGlossarySchema
} from '@/utils/siteSchema';

interface StructuredDataProps {
  type: 'organization' | 'legalService' | 'faqPage' | 'localBusiness' | 'breadcrumbList' | 'service' | 'article' | 'webPage' | 'professionalService' | 'product' | 'itemList' | 'website' | 'howTo' | 'siteNavigation' | 'homepage' | 'contactPage' | 'aboutPage' | 'collectionPage' | 'action' | 'aggregateRating' | 'review' | 'event' | 'specialAnnouncement' | 'knowledgeGraph' | 'llmOptimizedPage' | 'qaPage' | 'glossary' | 'blog';
  data?: any;
}

export const StructuredData = ({ type, data }: StructuredDataProps) => {
  const getStructuredData = () => {
    switch (type) {
      case 'organization':
        return data || organizationSchema;
      
      case 'legalService':
      case 'professionalService':
        return data || professionalServiceSchema;
      
      case 'localBusiness':
        return data || localBusinessSchema;
      
      case 'website':
        return data || websiteSchema;
      
      case 'product':
        return data;
      
      case 'faqPage':
        if (data?.faqs) {
          return generateFAQSchema(data.faqs);
        }
        return data;
      
      case 'breadcrumbList':
        if (data?.items) {
          return generateBreadcrumbSchema(data.items);
        }
        return data;
      
      case 'howTo':
        if (data?.name && data?.steps) {
          return generateHowToSchema(data.name, data.description, data.steps);
        }
        return data;
      
      case 'service':
        return data;
      
      case 'article':
        return data;
      
      case 'webPage':
        if (data?.name && data?.description && data?.url) {
          return generateWebPageSchema(data.name, data.description, data.url, data.options);
        }
        return data;
      
      case 'itemList':
        return data;
      
      case 'blog':
        return data;
      
      case 'siteNavigation':
        return data || siteNavigationSchema;
      
      case 'homepage':
        return data || homepageSchema;
      
      case 'contactPage':
        return data || generateContactPageSchema();
      
      case 'aboutPage':
        return data || generateAboutPageSchema();
      
      case 'collectionPage':
        if (data?.name && data?.description && data?.url && data?.items) {
          return generateCollectionPageSchema(data.name, data.description, data.url, data.items);
        }
        return data;
      
      case 'action':
        if (data?.actionType && data?.name && data?.description && data?.targetUrl) {
          return generateActionSchema(data.actionType, data.name, data.description, data.targetUrl);
        }
        return data;
      
      case 'aggregateRating':
        return data || aggregateRatingSchema;
      
      case 'review':
        if (data?.authorName && data?.reviewBody && data?.ratingValue) {
          return generateReviewSchema(
            data.authorName,
            data.authorTitle || '',
            data.reviewBody,
            data.ratingValue,
            data.datePublished || new Date().toISOString()
          );
        }
        return data;
      
      case 'event':
        if (data?.["@context"] && data?.["@type"]) {
          return data;
        }
        if (data?.name && data?.description && data?.startDate) {
          return generateEventSchema(
            data.name,
            data.description,
            data.startDate,
            data.endDate,
            data.eventType,
            data.relatedCaseSlug
          );
        }
        return data;
      
      case 'specialAnnouncement':
        if (data?.["@context"] && data?.["@type"]) {
          return data;
        }
        if (data?.name && data?.text && data?.datePosted) {
          return generateSpecialAnnouncementSchema(
            data.name,
            data.text,
            data.datePosted,
            data.expires,
            data.category,
            data.relatedUrl
          );
        }
        return data;
      
      case 'knowledgeGraph':
        return data || knowledgeGraphSchema;
      
      case 'llmOptimizedPage':
        if (data?.pageName && data?.pageDescription && data?.pageUrl) {
          return generateLLMOptimizedPageSchema(
            data.pageName,
            data.pageDescription,
            data.pageUrl,
            data.pageType,
            data.additionalData
          );
        }
        return data;
      
      case 'qaPage':
        if (data?.questions) {
          return generateQASchema(data.questions);
        }
        return data;
      
      case 'glossary':
        return data || generateGlossarySchema();
      
      default:
        return null;
    }
  };

  const structuredData = getStructuredData();
  
  if (!structuredData) return null;

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>
    </Helmet>
  );
};
