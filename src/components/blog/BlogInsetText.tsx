import { cn } from '@/lib/utils';

interface BlogInsetTextProps {
  children: React.ReactNode;
  className?: string;
}

export const BlogInsetText = ({ children, className }: BlogInsetTextProps) => {
  return (
    <div 
      className={cn(
        'border-l-[10px] border-border bg-muted p-6 my-6',
        className
      )}
      role="note"
    >
      <div className="lr-body">{children}</div>
    </div>
  );
};
