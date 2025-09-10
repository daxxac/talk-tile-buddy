import React from 'react';
import { useStore } from '@/store/useStore';
import { seedData } from '@/data/seedData';

interface AppInitializerProps {
  children: React.ReactNode;
}

export const AppInitializer: React.FC<AppInitializerProps> = ({ children }) => {
  const { categories, tiles, resetToSeedData, setHighContrast, preferences, updatePreferences } = useStore();
  const [isInitialized, setIsInitialized] = React.useState(false);

  React.useEffect(() => {
    // Initialize with seed data if no data exists, but preserve preferences
    if (categories.length === 0 && tiles.length === 0) {
      const currentPreferences = preferences; // Save current preferences
      resetToSeedData();
      // Restore the saved preferences after reset
      setTimeout(() => {
        useStore.getState().updatePreferences(currentPreferences);
      }, 0);
    }
    
    // Apply high contrast setting
    if (preferences.highContrast) {
      document.documentElement.classList.add('high-contrast');
    }
    
    setIsInitialized(true);
  }, [categories.length, tiles.length, resetToSeedData, preferences]);

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