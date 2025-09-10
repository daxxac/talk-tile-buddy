import React from 'react';
import { SentenceStrip } from '@/components/SentenceStrip';
import { CategoryGrid } from '@/components/CategoryGrid';
import { TileGrid } from '@/components/TileGrid';
import { AppInitializer } from '@/components/AppInitializer';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Category, Tile } from '@/types';
import { useStore } from '@/store/useStore';
import { cn } from '@/lib/utils';

const Index = () => {
  const { addToSentence, preferences } = useStore();
  const [selectedCategory, setSelectedCategory] = React.useState<Category | null>(null);

  const handleCategorySelect = (category: Category) => {
    setSelectedCategory(category);
  };

  const handleBack = () => {
    setSelectedCategory(null);
  };

  const handleTileClick = (tile: Tile) => {
    addToSentence(tile);
    
    // Haptic feedback
    if (preferences.vibration && navigator.vibrate) {
      navigator.vibrate(50);
    }
  };

  return (
    <AppInitializer>
      <div className={cn(
        'flex flex-col h-screen bg-background text-foreground',
        preferences.highContrast && 'high-contrast'
      )}>
        {/* Header */}
        <Header />

        {/* Sentence Strip - Always visible at top */}
        <div className="flex-shrink-0 p-4 border-b border-border">
          <SentenceStrip />
        </div>

        {/* Main Content Area */}
        <div className="flex-1 overflow-hidden">
          {selectedCategory ? (
            <TileGrid
              category={selectedCategory}
              onBack={handleBack}
              onTileClick={handleTileClick}
            />
          ) : (
            <CategoryGrid onCategorySelect={handleCategorySelect} />
          )}
        </div>

        {/* Footer */}
        <Footer />
      </div>
    </AppInitializer>
  );
};

export default Index;
