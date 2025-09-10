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
    // Always force reload to ensure fresh data with images
    console.log('AppInitializer: Forcing reload of fresh seed data...');
    forceReloadWithTranslations();
    
    // Apply high contrast setting
    if (preferences.highContrast) {
      document.documentElement.classList.add('high-contrast');
    }
    
    setIsInitialized(true);
  }, []); // Empty dependency array to run only once

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