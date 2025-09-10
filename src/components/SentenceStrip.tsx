import React from 'react';
import { Play, RotateCcw, Trash2, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SentenceItem } from '@/types';
import { cn } from '@/lib/utils';
import { speak, stopSpeaking } from '@/lib/tts';
import { useStore } from '@/store/useStore';
import { getTileText } from '@/lib/translations';

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
      
      await speak(text, {
        language: preferences.language,
        rate: 1.0,
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
          My Sentence
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
              {isSpeaking ? 'Stop' : 'Play'}
            </span>
          </Button>
        </div>
      </div>

      {/* Sentence Items */}
      <div className="flex flex-wrap gap-2 min-h-[60px] p-2 bg-background/50 rounded-lg border-2 border-dashed border-border">
        {sentence.length === 0 ? (
          <div className="flex items-center justify-center w-full text-muted-foreground text-sm">
            Tap tiles to build your sentence
          </div>
        ) : (
          sentence.map((item, index) => (
            <div
              key={`${item.tileId}-${index}`}
              className={cn(
                'relative flex items-center gap-2 px-3 py-2 rounded-lg border-2',
                'bg-card text-card-foreground shadow-sm',
                `border-tile-${item.type}/50`,
                'group hover:shadow-md transition-shadow'
              )}
            >
              {/* Image */}
              {item.imageUri && (
                <img
                  src={item.imageUri}
                  alt={item.label}
                  className="w-6 h-6 object-cover rounded"
                />
              )}
              
              {/* Text */}
              <span className="text-sm font-medium">
                {(() => {
                  const fullTile = tiles.find(t => t.id === item.tileId);
                  return fullTile ? getTileText(fullTile, preferences.language) : item.label;
                })()}
              </span>
              
              {/* Remove button */}
              <button
                onClick={() => handleRemoveItem(index)}
                className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-destructive/20 rounded"
                aria-label={`Remove ${item.label}`}
              >
                <X className="w-3 h-3 text-destructive" />
              </button>
            </div>
          ))
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