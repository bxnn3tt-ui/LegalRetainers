import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';

interface RelatedPost {
  id: string;
  slug: string;
  title: string;
  category: string;
  readingTime: number;
}

const getArticleBadge = (slug: string) => {
  if (slug === 'what-is-legal-retainer-agreement') {
    return { text: 'Pillar Article', variant: 'default' as const };
  }
  if (slug === 'do-personal-injury-lawyers-require-retainer') {
    return { text: 'Deep Dive', variant: 'secondary' as const };
  }
  return null;
}

interface BlogSidebarProps {
  relatedPosts?: RelatedPost[];
}

export const BlogSidebar = ({ relatedPosts = [] }: BlogSidebarProps) => {
  if (relatedPosts.length === 0) return null;

  return (
    <aside className="space-y-6">
      {/* Related Articles */}
      <Card className="p-6 border-2 rounded-none sticky top-24">
        <h3 className="lr-heading-m mb-4">Related Articles</h3>
        <div className="space-y-4">
          {relatedPosts.slice(0, 3).map((post) => {
            const badge = getArticleBadge(post.slug);
            return (
              <Link
                key={post.id}
                to={`/insights/${post.slug}`}
                className="block group"
              >
                <div className="flex items-center gap-2 mb-1">
                  <div className="text-sm font-semibold text-primary">{post.category}</div>
                  {badge && (
                    <Badge variant={badge.variant} className="text-xs">
                      {badge.text}
                    </Badge>
                  )}
                </div>
                <div className="text-base group-hover:text-primary transition-colors line-clamp-2">
                  {post.title}
                </div>
                <div className="text-xs text-muted-foreground mt-1">{post.readingTime} min read</div>
              </Link>
            );
          })}
        </div>
      </Card>
    </aside>
  );
};
