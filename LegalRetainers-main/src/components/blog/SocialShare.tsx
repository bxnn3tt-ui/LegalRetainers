import { Facebook, Twitter, Linkedin, Mail, Link as LinkIcon, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

interface SocialShareProps {
  url: string;
  title: string;
  description?: string;
}

export const SocialShare = ({ url, title, description = '' }: SocialShareProps) => {
  const [copied, setCopied] = useState(false);
  
  const fullUrl = `https://legalretainers.com${url}`;
  const encodedUrl = encodeURIComponent(fullUrl);
  const encodedTitle = encodeURIComponent(title);
  const encodedDescription = encodeURIComponent(description);

  const shareLinks = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    x: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}&title=${encodedTitle}&summary=${encodedDescription}`,
    email: `mailto:?subject=${encodedTitle}&body=${encodedDescription}%20${encodedUrl}`
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(fullUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div className="flex items-center gap-2 py-4 border-y border-border my-6">
      <span className="text-sm font-semibold text-muted-foreground mr-2">Share:</span>
      
      <Button
        variant="outline"
        size="icon"
        className="h-9 w-9"
        onClick={() => window.open(shareLinks.facebook, '_blank')}
        aria-label="Share on Facebook"
      >
        <Facebook className="h-4 w-4" />
      </Button>

      <Button
        variant="outline"
        size="icon"
        className="h-9 w-9"
        onClick={() => window.open(shareLinks.x, '_blank')}
        aria-label="Share on X"
      >
        <Twitter className="h-4 w-4" />
      </Button>

      <Button
        variant="outline"
        size="icon"
        className="h-9 w-9"
        onClick={() => window.open(shareLinks.linkedin, '_blank')}
        aria-label="Share on LinkedIn"
      >
        <Linkedin className="h-4 w-4" />
      </Button>

      <Button
        variant="outline"
        size="icon"
        className="h-9 w-9"
        onClick={() => window.location.href = shareLinks.email}
        aria-label="Share via Email"
      >
        <Mail className="h-4 w-4" />
      </Button>

      <Button
        variant="outline"
        size="icon"
        className="h-9 w-9"
        onClick={copyToClipboard}
        aria-label="Copy link"
      >
        {copied ? <Check className="h-4 w-4 text-green-600" /> : <LinkIcon className="h-4 w-4" />}
      </Button>
    </div>
  );
};
