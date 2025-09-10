import React from 'react';
import { cn } from '@/lib/utils';

interface FooterProps {
  className?: string;
}

export const Footer: React.FC<FooterProps> = ({ className }) => {
  return (
    <footer className={cn(
      'flex items-center justify-center py-4 px-6 bg-muted/30 border-t border-border',
      className
    )}>
      <div className="flex items-center gap-4 text-sm text-muted-foreground">
        <span>© 2025 DAXXAC</span>
        <span>•</span>
        <a 
          href="https://daxxac.dev" 
          target="_blank" 
          rel="noopener noreferrer"
          className="hover:text-primary transition-colors underline-offset-4 hover:underline"
        >
          daxxac.dev
        </a>
        <span>•</span>
        <a 
          href="https://github.com/daxxac/talk-tile-buddy" 
          target="_blank" 
          rel="noopener noreferrer"
          className="hover:text-primary transition-colors underline-offset-4 hover:underline"
        >
          GitHub
        </a>
      </div>
    </footer>
  );
};