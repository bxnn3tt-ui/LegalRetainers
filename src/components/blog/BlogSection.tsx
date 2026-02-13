import { cn } from '@/lib/utils';

interface BlogSectionProps {
  children: React.ReactNode;
  className?: string;
}

export const BlogSection = ({ children, className }: BlogSectionProps) => {
  return (
    <section className={cn('my-8', className)}>
      {children}
    </section>
  );
};
