import React from 'react';
import { useStore } from '@/store/useStore';
import { seedData } from '@/data/seedData';

interface AppInitializerProps {
  children: React.ReactNode;
}

export const AppInitializer: React.FC<AppInitializerProps> = ({ children }) => {
  const { categories, tiles, resetToSeedData, forceReloadWithTranslations, setHighContrast, preferences } = useStore();
  const [isInitialized, setIsInitialized] = React.useState(false);

  React.useEffect(() => {
    // Initialize with seed data if no data exists
    if (categories.length === 0 && tiles.length === 0) {
      resetToSeedData();
    } else {
      // Check if existing tiles have translations, if not, force reload
      const firstTile = tiles[0];
      if (firstTile && !firstTile.translations) {
        console.log('Existing tiles missing translations, forcing reload...');
        forceReloadWithTranslations();
      }
    }
    
    // Apply high contrast setting
    if (preferences.highContrast) {
      document.documentElement.classList.add('high-contrast');
    }
    
    setIsInitialized(true);
  }, [categories.length, tiles.length, resetToSeedData, forceReloadWithTranslations, preferences.highContrast]);

  if (!isInitialized) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading PECS AAC...</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};