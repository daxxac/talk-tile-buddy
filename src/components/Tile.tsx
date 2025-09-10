import React from 'react';
import { cn } from '@/lib/utils';
import { Tile as TileType } from '@/types';
import { useStore } from '@/store/useStore';
import { getTileText, getTextDirection } from '@/lib/translations';

interface TileProps {
  tile: TileType;
  onClick: (tile: TileType) => void;
  showText?: boolean;
  className?: string;
  size?: 'small' | 'medium' | 'large';
}

export const Tile: React.FC<TileProps> = ({ 
  tile, 
  onClick, 
  showText = true, 
  className,
  size = 'medium'
}) => {
  const { preferences } = useStore();
  
  const displayText = getTileText(tile, preferences.language);
  const textDirection = getTextDirection(preferences.language);

  const isEmoji = tile.imageUri && !tile.imageUri.startsWith('http') && !tile.imageUri.startsWith('/');
  const isImageUrl = tile.imageUri && (tile.imageUri.startsWith('http') || tile.imageUri.startsWith('/'));

  const handleClick = () => {
    onClick(tile);
    
    // Vibration feedback
    if (navigator.vibrate) {
      navigator.vibrate(50);
    }
  };

  const sizeClasses = {
    small: 'min-h-[64px] min-w-[64px] text-sm',
    medium: 'min-h-[88px] min-w-[88px] text-tile',
    large: 'min-h-[120px] min-w-[120px] text-lg'
  };

  return (
    <button
      onClick={handleClick}
      className={cn(
        'tile-base',
        `tile-${tile.type}`,
        sizeClasses[size],
        'group relative overflow-hidden',
        className
      )}
      aria-label={`${tile.label} tile`}
      style={
        isImageUrl ? {
          backgroundImage: `url(${tile.imageUri})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        } : undefined
      }
    >
      {/* Background overlay for text readability - only for image backgrounds */}
      {isImageUrl && (
        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
      )}

      {/* Emoji display for large visual impact */}
      {isEmoji && (
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-4xl sm:text-5xl filter drop-shadow-lg">
            {tile.imageUri}
          </span>
        </div>
      )}
      
      {/* Text Label with better contrast */}
      {showText && (
        <span 
          className={cn(
            "font-semibold text-center leading-tight break-words relative z-10",
            isImageUrl ? "text-white drop-shadow-lg" : "text-foreground",
            isEmoji ? "text-xs sm:text-sm" : "text-sm sm:text-base"
          )}
          dir={textDirection}
        >
          {displayText}
        </span>
      )}
      
      {/* Favorite indicator */}
      {tile.isFavorite && (
        <div className="absolute top-1 right-1 z-20">
          <span className="text-yellow-300 text-sm drop-shadow-lg">⭐</span>
        </div>
      )}
      
      {/* Variants indicator */}
      {tile.variants && tile.variants.length > 1 && (
        <div className="absolute bottom-1 right-1 z-20">
          <span className={cn(
            "text-xs drop-shadow-lg",
            isImageUrl ? "text-white/90" : "text-muted-foreground"
          )}>•••</span>
        </div>
      )}
      
      {/* Ripple effect */}
      <div className="absolute inset-0 bg-white/20 opacity-0 group-active:opacity-100 transition-opacity duration-fast rounded-xl z-10" />
    </button>
  );
};