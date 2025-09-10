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
      style={{
        backgroundImage: tile.imageUri ? `url(${tile.imageUri})` : 'none',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      {/* Background overlay for text readability */}
      {tile.imageUri && (
        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
      )}
      
      {/* Text Label with better contrast */}
      {showText && (
        <span 
          className={cn(
            "font-semibold text-center leading-tight break-words relative z-10",
            tile.imageUri ? "text-white drop-shadow-lg" : ""
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
          <span className="text-white/90 text-xs drop-shadow-lg">•••</span>
        </div>
      )}
      
      {/* Ripple effect */}
      <div className="absolute inset-0 bg-white/20 opacity-0 group-active:opacity-100 transition-opacity duration-fast rounded-xl z-10" />
    </button>
  );
};