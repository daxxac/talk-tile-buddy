import React from 'react';
import { cn } from '@/lib/utils';
import logo from '@/assets/logo.png';

interface HeaderProps {
  className?: string;
}

export const Header: React.FC<HeaderProps> = ({ className }) => {
  return (
    <header className={cn(
      'flex items-center justify-center py-6 px-6 bg-background/80 backdrop-blur-sm border-b border-border/50',
      className
    )}>
      <div className="flex items-center gap-4">
        <img 
          src={logo} 
          alt="TalkTileBuddy Logo" 
          className="w-8 h-8 object-contain"
        />
        <div className="flex items-baseline gap-2">
          <h1 className="text-xl font-comfortaa font-semibold text-primary">
            TalkTileBuddy
          </h1>
          <span className="text-sm font-caveat text-muted-foreground/70 -mb-1">
            by DAXXAC
          </span>
        </div>
      </div>
    </header>
  );
};