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

  // Only show text in caregiver mode or when explicitly requested
  const shouldShowText = showText && preferences.caregiverMode;

  const isEmoji = tile.imageUri && !tile.imageUri.startsWith('http') && !tile.imageUri.startsWith('/');
  const isImageUrl = tile.imageUri && (tile.imageUri.startsWith('http') || tile.imageUri.startsWith('/'));

  const handleClick = () => {
    onClick(tile);
    
    // Announce the tile content for accessibility with proper language
    const displayText = getTileText(tile, preferences.language);
    
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel(); // Cancel any existing speech
      
      const utterance = new SpeechSynthesisUtterance(displayText);
      
      // Map language to proper locale for TTS
      const languageMap: Record<string, string> = {
        'en': 'en-US',
        'ru': 'ru-RU', 
        'he': 'he-IL'
      };
      
      const targetLanguage = languageMap[preferences.language] || 'en-US';
      utterance.lang = targetLanguage;
      
      // Find best voice for the language
      const voices = window.speechSynthesis.getVoices();
      let selectedVoice = voices.find(voice => 
        voice.lang.toLowerCase().startsWith(preferences.language.toLowerCase())
      );
      
      // If no specific language voice, try locale variants
      if (!selectedVoice && preferences.language === 'ru') {
        selectedVoice = voices.find(voice => 
          voice.lang.toLowerCase().includes('ru')
        );
      } else if (!selectedVoice && preferences.language === 'he') {
        selectedVoice = voices.find(voice => 
          voice.lang.toLowerCase().includes('he') || voice.lang.toLowerCase().includes('iw')
        );
      }
      
      // Fallback to default system voice
      if (!selectedVoice) {
        selectedVoice = voices.find(voice => voice.default) || voices[0];
      }
      
      if (selectedVoice) {
        utterance.voice = selectedVoice;
      }
      
      utterance.rate = 0.85;
      utterance.volume = 0.9;
      utterance.pitch = 1.0;
      
      console.log(`TTS: Speaking "${displayText}" in ${preferences.language} (${utterance.lang})`);
      
      try {
        window.speechSynthesis.speak(utterance);
      } catch (error) {
        console.warn('TTS not available:', error);
      }
    }
    
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
        'focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2',
        className
      )}
      aria-label={`${displayText} tile. Press to select and hear.`}
      aria-describedby={shouldShowText ? undefined : `tile-${tile.id}-desc`}
      tabIndex={0}
      role="button"
      style={
        isImageUrl ? {
          backgroundImage: `url(${tile.imageUri})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        } : undefined
      }
    >
      {/* Screen reader description for non-caregiver mode */}
      {!shouldShowText && (
        <span id={`tile-${tile.id}-desc`} className="sr-only">
          {displayText}
        </span>
      )}

      {/* Background overlay for text readability - only for image backgrounds */}
      {isImageUrl && shouldShowText && (
        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
      )}

      {/* Emoji display for large visual impact */}
      {isEmoji && (
        <div className="absolute inset-0 flex items-center justify-center">
          <span className={cn(
            "filter drop-shadow-lg",
            shouldShowText ? "text-4xl sm:text-5xl" : "text-5xl sm:text-6xl"
          )}>
            {tile.imageUri}
          </span>
        </div>
      )}

      {/* Image display */}
      {isImageUrl && (
        <div className="absolute inset-0 flex items-center justify-center">
          <img 
            src={tile.imageUri}
            alt={displayText}
            className="w-full h-full object-cover"
          />
        </div>
      )}
      
      {/* Text Label - only shown in caregiver mode */}
      {shouldShowText && (
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