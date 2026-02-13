import { Calendar, Clock, User } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { SocialShare } from './SocialShare';
import type { BlogAuthor } from '@/data/blog';

interface BlogArticleHeaderProps {
  category: string;
  title: string;
  excerpt: string;
  publishedDate: string;
  readingTime: number;
  slug: string;
  author?: BlogAuthor;
}

export const BlogArticleHeader = ({
  category,
  title,
  excerpt,
  publishedDate,
  readingTime,
  slug,
  author
}: BlogArticleHeaderProps) => {
  const formattedDate = new Date(publishedDate).toLocaleDateString('en-GB', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <header>
      <Badge className="bg-primary text-primary-foreground mb-4 text-sm font-bold px-3 py-1">
        {category}
      </Badge>
      <h1 className="lr-heading-xl mb-4 text-primary">{title}</h1>
      <p className="lr-body-l text-muted-foreground mb-6 max-w-3xl">{excerpt}</p>
      
      <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted-foreground mb-6">
        {author && (
          <div className="flex items-center gap-2">
            <User className="h-4 w-4" aria-hidden="true" />
            <span className="font-medium text-foreground">{author.name}</span>
            {author.credentials && (
              <span className="text-muted-foreground">· {author.credentials}</span>
            )}
          </div>
        )}
        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4" aria-hidden="true" />
          <time dateTime={publishedDate}>{formattedDate}</time>
        </div>
        <div className="flex items-center gap-2">
          <Clock className="h-4 w-4" aria-hidden="true" />
          <span>{readingTime} min read</span>
        </div>
      </div>

      <SocialShare 
        url={`/insights/${slug}`}
        title={title}
        description={excerpt}
      />
    </header>
  );
};