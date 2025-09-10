import React from 'react';
import { cn } from '@/lib/utils';
import logo from '@/assets/logo.svg';
import signature from '@/assets/daxxac-signature.webp';

interface HeaderProps {
  className?: string;
}

export const Header: React.FC<HeaderProps> = ({ className }) => {
  return (
    <header className={cn(
      'flex items-end justify-center py-6 px-6 bg-background/80 backdrop-blur-sm border-b border-border/50',
      className
    )}>
      <div className="flex items-center gap-4">
        <img 
          src={logo} 
          alt="TalkTileBuddy Logo" 
          className="w-8 h-8 object-contain"
        />
        <div className="flex items-end gap-2">
          <h1 className="text-xl font-comfortaa font-semibold text-primary">
            TalkTileBuddy
          </h1>
          <img 
            src={signature} 
            alt="by DAXXAC" 
            className="h-4 object-contain opacity-60 mix-blend-multiply dark:mix-blend-screen"
          />
        </div>
      </div>
    </header>
  );
};
