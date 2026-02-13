import { Link } from 'react-router-dom';
import { Clock } from 'lucide-react';

interface RelatedPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  readingTime: number;
  featuredImage?: {
    url: string;
    alt: string;
  };
}

interface BlogRelatedPostsProps {
  posts: RelatedPost[];
}

export const BlogRelatedPosts = ({ posts }: BlogRelatedPostsProps) => {
  if (posts.length === 0) return null;

  return (
    <section className="mt-12 pt-8 border-t-2 border-black" aria-labelledby="related-articles">
      <h2 id="related-articles" className="lr-heading-l mb-6">Related Articles</h2>
      <div className="grid md:grid-cols-3 gap-6">
        {posts.map((post) => (
          <article 
            key={post.id} 
            className="relative overflow-hidden border-2 border-black bg-white transition-all duration-200 hover:-translate-y-1 hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] min-h-[220px] group"
          >
            {post.featuredImage && (
              <div 
                className="absolute inset-0 bg-cover bg-center grayscale opacity-30 group-hover:opacity-45 transition-opacity"
                style={{ backgroundImage: `url(${post.featuredImage.url})` }}
              />
            )}
            {!post.featuredImage && (
              <div className="absolute inset-0 bg-gray-50 opacity-30" />
            )}
            <div className="relative z-10 p-5 flex flex-col h-full bg-white/50 backdrop-blur-[1px]">
              <Link to={`/insights/${post.slug}`}>
                <h3 className="text-base font-bold text-black group-hover:text-primary transition-colors mb-2 line-clamp-2">
                  {post.title}
                </h3>
              </Link>
              <p className="text-sm text-black/70 font-medium mb-4 flex-grow line-clamp-2">
                {post.excerpt.substring(0, 100)}...
              </p>
              <div className="flex items-center justify-between mt-auto">
                <div className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-black/60">
                  <Clock className="h-3 w-3 stroke-[2px]" aria-hidden="true" />
                  <span>{post.readingTime} MIN READ</span>
                </div>
                <Link 
                  to={`/insights/${post.slug}`} 
                  className="text-primary hover:underline text-sm font-bold"
                >
                  Read more →
                </Link>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};
