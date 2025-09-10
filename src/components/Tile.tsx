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
  
  console.log('Tile component render:', {
    tileLabel: tile.label,
    currentLanguage: preferences.language,
    tileId: tile.id
  });
  
  const displayText = getTileText(tile, preferences.language);
  const textDirection = getTextDirection(preferences.language);

  console.log('Tile displayText result:', displayText);

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
    >
      {/* Image */}
      {tile.imageUri && (
        <div className="flex-shrink-0">
          <img
            src={tile.imageUri}
            alt={tile.label}
            className="w-8 h-8 object-cover rounded"
            loading="lazy"
          />
        </div>
      )}
      
      {/* Text Label */}
      {showText && (
        <span 
          className="font-semibold text-center leading-tight break-words"
          dir={textDirection}
        >
          {displayText}
        </span>
      )}
      
      {/* Favorite indicator */}
      {tile.isFavorite && (
        <div className="absolute top-1 right-1">
          <span className="text-yellow-300 text-sm">⭐</span>
        </div>
      )}
      
      {/* Variants indicator */}
      {tile.variants && tile.variants.length > 1 && (
        <div className="absolute bottom-1 right-1">
          <span className="text-white/70 text-xs">•••</span>
        </div>
      )}
      
      {/* Ripple effect */}
      <div className="absolute inset-0 bg-white/20 opacity-0 group-active:opacity-100 transition-opacity duration-fast rounded-xl" />
    </button>
  );
};