import React from 'react';
import { cn } from '@/lib/utils';
import logo from '@/assets/logo.png';

interface HeaderProps {
  className?: string;
}

export const Header: React.FC<HeaderProps> = ({ className }) => {
  return (
    <header className={cn(
      'flex items-center justify-center py-4 px-6 bg-white border-b border-border shadow-sm',
      className
    )}>
      <div className="flex items-center gap-3">
        <img 
          src={logo} 
          alt="TalkTileBuddy Logo" 
          className="w-10 h-10 object-contain"
        />
        <h1 className="text-2xl font-bold text-primary">
          TalkTileBuddy
        </h1>
      </div>
    </header>
  );
};