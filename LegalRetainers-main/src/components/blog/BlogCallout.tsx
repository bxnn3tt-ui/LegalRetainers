import { AlertCircle, CheckCircle, Info, AlertTriangle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface BlogCalloutProps {
  type?: 'info' | 'warning' | 'success' | 'important';
  title?: string;
  children: React.ReactNode;
  className?: string;
}

export const BlogCallout = ({ 
  type = 'info', 
  title, 
  children,
  className 
}: BlogCalloutProps) => {
  const icons = {
    info: Info,
    warning: AlertTriangle,
    success: CheckCircle,
    important: AlertCircle,
  };

  const styles = {
    info: 'bg-blue-50 border-blue-500',
    warning: 'bg-yellow-50 border-yellow-600',
    success: 'bg-green-50 border-green-600',
    important: 'bg-red-50 border-red-600',
  };

  const Icon = icons[type];

  return (
    <aside 
      className={cn(
        'border-l-4 p-6 my-6',
        styles[type],
        className
      )}
      role="note"
      aria-label={title || `${type} callout`}
    >
      <div className="flex gap-3">
        <Icon className="h-6 w-6 flex-shrink-0 mt-1" aria-hidden="true" />
        <div className="flex-1">
          {title && <h3 className="lr-heading-s mb-2">{title}</h3>}
          <div className="lr-body">{children}</div>
        </div>
      </div>
    </aside>
  );
};
