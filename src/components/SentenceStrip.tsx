import React from 'react';
import { Play, RotateCcw, Trash2, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SentenceItem } from '@/types';
import { cn } from '@/lib/utils';
import { speak, stopSpeaking } from '@/lib/tts';
import { useStore } from '@/store/useStore';
import { getTileText, getUIText } from '@/lib/translations';

interface SentenceStripProps {
  className?: string;
}

export const SentenceStrip: React.FC<SentenceStripProps> = ({ className }) => {
  const { sentence, removeFromSentence, clearSentence, preferences, tiles } = useStore();
  const [isSpeaking, setIsSpeaking] = React.useState(false);

  const handleSpeak = async () => {
    if (sentence.length === 0) return;
    
    setIsSpeaking(true);
    
    try {
      // Build sentence using translations
      const text = sentence
        .map(item => {
          // Find the full tile to get translations
          const fullTile = tiles.find(t => t.id === item.tileId);
          if (fullTile) {
            return item.ttsOverride || getTileText(fullTile, preferences.language);
          }
          return item.ttsOverride || item.label;
        })
        .join(' ');
      
      // Use the enhanced TTS system with proper language configuration
      await speak(text, {
        language: preferences.language,
        rate: 0.85,
        pitch: 1.0,
        volume: 1.0
      });
    } catch (error) {
      console.error('TTS error:', error);
    } finally {
      setIsSpeaking(false);
    }
  };

  const handleStop = () => {
    stopSpeaking();
    setIsSpeaking(false);
  };

  const handleClear = () => {
    clearSentence();
    if (isSpeaking) {
      handleStop();
    }
  };

  const handleRemoveItem = (index: number) => {
    removeFromSentence(index);
  };

  return (
    <div className={cn('sentence-strip', className)}>
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-lg font-semibold text-foreground">
          {getUIText('mySentence', preferences.language)}
        </h2>
        
        <div className="flex gap-2">
          {/* Undo/Clear */}
          <Button
            variant="outline"
            size="sm"
            onClick={handleClear}
            disabled={sentence.length === 0}
            className="btn-touch"
            aria-label="Clear sentence"
          >
            <Trash2 className="w-4 h-4" />
          </Button>
          
          {/* Play/Stop */}
          <Button
            onClick={isSpeaking ? handleStop : handleSpeak}
            disabled={sentence.length === 0}
            className="btn-touch bg-success text-success-foreground hover:bg-success/90"
            aria-label={isSpeaking ? 'Stop speaking' : 'Speak sentence'}
          >
            {isSpeaking ? (
              <RotateCcw className="w-4 h-4 animate-spin" />
            ) : (
              <Play className="w-4 h-4" />
            )}
            <span className="ml-2">
              {isSpeaking ? getUIText('stop', preferences.language) : getUIText('play', preferences.language)}
            </span>
          </Button>
        </div>
      </div>

      {/* Sentence Items */}
      <div className="flex flex-wrap gap-2 min-h-[60px] p-2 bg-background/50 rounded-lg border-2 border-dashed border-border">
        {sentence.length === 0 ? (
          <div className="flex items-center justify-center w-full text-muted-foreground text-sm">
            {getUIText('tapTilesToBuild', preferences.language)}
          </div>
        ) : (
          sentence.map((item, index) => {
            const fullTile = tiles.find(t => t.id === item.tileId);
            if (!fullTile) return null;
            
            return (
              <div
                key={`${item.tileId}-${index}`}
                className={cn(
                  'relative group',
                  'tile-base',
                  `tile-${item.type}`,
                  'min-h-[64px] min-w-[64px]',
                  'flex flex-col items-center justify-center gap-1 p-2'
                )}
              >
                {/* Image */}
                {fullTile.imageUri && (
                  <>
                    {/* Check if it's an emoji or image URL */}
                    {!fullTile.imageUri.startsWith('http') && !fullTile.imageUri.startsWith('/') ? (
                      <span className="text-2xl filter drop-shadow-sm">
                        {fullTile.imageUri}
                      </span>
                    ) : (
                      <img
                        src={fullTile.imageUri}
                        alt={fullTile.label}
                        className="w-8 h-8 object-cover rounded"
                      />
                    )}
                  </>
                )}
                
                {/* Text - only shown in caregiver mode */}
                {preferences.caregiverMode && (
                  <span className="text-xs font-medium text-center leading-tight">
                    {getTileText(fullTile, preferences.language)}
                  </span>
                )}
                
                {/* Remove button */}
                <button
                  onClick={() => handleRemoveItem(index)}
                  className="absolute -top-1 -right-1 opacity-0 group-hover:opacity-100 transition-opacity p-1 bg-destructive text-destructive-foreground rounded-full text-xs w-5 h-5 flex items-center justify-center hover:scale-110"
                  aria-label={`Remove ${fullTile.label}`}
                >
                  <X className="w-2 h-2" />
                </button>
                
                {/* Ripple effect */}
                <div className="absolute inset-0 bg-white/20 opacity-0 group-active:opacity-100 transition-opacity duration-fast rounded-xl" />
              </div>
            );
          })
        )}
      </div>
      
      {/* Sentence preview text */}
      {sentence.length > 0 && (
        <div className="mt-2 p-2 bg-muted/50 rounded text-sm text-muted-foreground">
          "{sentence.map(item => {
            const fullTile = tiles.find(t => t.id === item.tileId);
            return fullTile 
              ? (item.ttsOverride || getTileText(fullTile, preferences.language))
              : (item.ttsOverride || item.label);
          }).join(' ')}"
        </div>
      )}
    </div>
  );
};