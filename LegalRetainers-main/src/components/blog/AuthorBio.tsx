import { Linkedin } from 'lucide-react';
import type { BlogAuthor } from '@/data/blog';

interface AuthorBioProps {
  author: BlogAuthor;
  variant?: 'compact' | 'full';
}

export const AuthorBio = ({ author, variant = 'full' }: AuthorBioProps) => {
  if (variant === 'compact') {
    return (
      <div className="flex items-center gap-3">
        <img 
          src={author.image} 
          alt={author.name}
          className="w-10 h-10 rounded-full object-cover border-2 border-muted"
        />
        <div>
          <div className="flex items-center gap-2">
            <span className="font-semibold text-foreground">{author.name}</span>
            {author.linkedin && (
              <a 
                href={author.linkedin} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary"
                aria-label={`${author.name} on LinkedIn`}
              >
                <Linkedin className="h-4 w-4" />
              </a>
            )}
          </div>
          <p className="text-sm text-muted-foreground">{author.title}</p>
        </div>
      </div>
    );
  }

  return (
    <section className="border-t border-b border-border py-8 my-8" aria-labelledby="author-heading">
      <h2 id="author-heading" className="lr-heading-m mb-6">About the Author</h2>
      <div className="flex flex-col sm:flex-row gap-6">
        <img 
          src={author.image} 
          alt={author.name}
          className="w-24 h-24 rounded-full object-cover border-4 border-muted flex-shrink-0"
        />
        <div className="flex-1">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mb-2">
            <h3 className="lr-heading-s mb-0">{author.name}</h3>
            {author.linkedin && (
              <a 
                href={author.linkedin} 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-sm text-primary hover:underline"
              >
                <Linkedin className="h-4 w-4" />
                <span>LinkedIn</span>
              </a>
            )}
          </div>
          <p className="lr-body-s text-primary font-medium mb-3">
            {author.credentials || author.title}
          </p>
          <p className="lr-body text-muted-foreground">{author.bio}</p>
        </div>
      </div>
    </section>
  );
};