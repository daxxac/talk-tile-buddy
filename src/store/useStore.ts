import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { AppState, Category, Tile, Preference, SentenceItem, TileType } from '@/types';
import { seedData } from '@/data/seedData';
import { generateId } from '@/lib/utils';

interface StoreActions {
  // Categories
  addCategory: (category: Omit<Category, 'id' | 'order'>) => void;
  updateCategory: (id: string, updates: Partial<Category>) => void;
  deleteCategory: (id: string) => void;
  reorderCategories: (categoryIds: string[]) => void;

  // Tiles  
  addTile: (tile: Omit<Tile, 'id' | 'order'>) => void;
  updateTile: (id: string, updates: Partial<Tile>) => void;
  deleteTile: (id: string) => void;
  reorderTiles: (categoryId: string, tileIds: string[]) => void;
  toggleFavorite: (tileId: string) => void;

  // Sentence building
  addToSentence: (tile: Tile) => void;
  removeFromSentence: (index: number) => void;
  clearSentence: () => void;
  reorderSentence: (fromIndex: number, toIndex: number) => void;

  // Preferences
  updatePreferences: (updates: Partial<Preference>) => void;
  toggleCaregiverMode: () => void;
  setHighContrast: (enabled: boolean) => void;

  // Data management
  exportData: () => string;
  importData: (jsonData: string) => Promise<void>;
  resetToSeedData: () => void;
  forceReloadWithTranslations: () => void;
  
  // UI state
  setLoading: (loading: boolean) => void;
  setError: (error: string | undefined) => void;
}

type Store = AppState & StoreActions;

const defaultPreferences: Preference = {
  language: 'en',
  gridCols: 3,
  highContrast: false,
  showText: true,
  vibration: true,
  caregiverMode: false,
};

export const useStore = create<Store>()(
  persist(
    (set, get) => ({
      // Initial state
      categories: [],
      tiles: [],
      preferences: defaultPreferences,
      sentence: [],
      isLoading: false,
      error: undefined,

      // Category actions
      addCategory: (categoryData) => {
        const categories = get().categories;
        const newCategory: Category = {
          ...categoryData,
          id: generateId(),
          order: categories.length,
        };
        set({ categories: [...categories, newCategory] });
      },

      updateCategory: (id, updates) => {
        set({
          categories: get().categories.map(cat =>
            cat.id === id ? { ...cat, ...updates } : cat
          )
        });
      },

      deleteCategory: (id) => {
        set({
          categories: get().categories.filter(cat => cat.id !== id),
          tiles: get().tiles.filter(tile => tile.categoryId !== id)
        });
      },

      reorderCategories: (categoryIds) => {
        const categories = get().categories;
        const reordered = categoryIds.map((id, index) => {
          const category = categories.find(c => c.id === id);
          return category ? { ...category, order: index } : null;
        }).filter(Boolean) as Category[];
        set({ categories: reordered });
      },

      // Tile actions
      addTile: (tileData) => {
        const tiles = get().tiles.filter(t => t.categoryId === tileData.categoryId);
        const newTile: Tile = {
          ...tileData,
          id: generateId(),
          order: tiles.length,
        };
        set({ tiles: [...get().tiles, newTile] });
      },

      updateTile: (id, updates) => {
        set({
          tiles: get().tiles.map(tile =>
            tile.id === id ? { ...tile, ...updates } : tile
          )
        });
      },

      deleteTile: (id) => {
        set({
          tiles: get().tiles.filter(tile => tile.id !== id),
          sentence: get().sentence.filter(item => item.tileId !== id)
        });
      },

      reorderTiles: (categoryId, tileIds) => {
        const allTiles = get().tiles;
        const categoryTiles = allTiles.filter(t => t.categoryId === categoryId);
        const otherTiles = allTiles.filter(t => t.categoryId !== categoryId);
        
        const reordered = tileIds.map((id, index) => {
          const tile = categoryTiles.find(t => t.id === id);
          return tile ? { ...tile, order: index } : null;
        }).filter(Boolean) as Tile[];

        set({ tiles: [...otherTiles, ...reordered] });
      },

      toggleFavorite: (tileId) => {
        set({
          tiles: get().tiles.map(tile =>
            tile.id === tileId ? { ...tile, isFavorite: !tile.isFavorite } : tile
          )
        });
      },

      // Sentence building
      addToSentence: (tile) => {
        const sentenceItem: SentenceItem = {
          tileId: tile.id,
          label: tile.label,
          type: tile.type,
          imageUri: tile.imageUri,
          ttsOverride: tile.ttsOverride,
        };
        set({ sentence: [...get().sentence, sentenceItem] });
      },

      removeFromSentence: (index) => {
        const sentence = get().sentence;
        set({ sentence: sentence.filter((_, i) => i !== index) });
      },

      clearSentence: () => {
        set({ sentence: [] });
      },

      reorderSentence: (fromIndex, toIndex) => {
        const sentence = [...get().sentence];
        const [movedItem] = sentence.splice(fromIndex, 1);
        sentence.splice(toIndex, 0, movedItem);
        set({ sentence });
      },

      // Preferences
      updatePreferences: (updates) => {
        set({
          preferences: { ...get().preferences, ...updates }
        });
      },

      toggleCaregiverMode: () => {
        set({
          preferences: {
            ...get().preferences,
            caregiverMode: !get().preferences.caregiverMode
          }
        });
      },

      setHighContrast: (enabled) => {
        set({
          preferences: { ...get().preferences, highContrast: enabled }
        });
        
        // Apply high contrast class to document
        if (enabled) {
          document.documentElement.classList.add('high-contrast');
        } else {
          document.documentElement.classList.remove('high-contrast');
        }
      },

      // Data management
      exportData: () => {
        const { categories, tiles, preferences } = get();
        const exportData = {
          categories,
          tiles,
          preferences,
          version: '1.0.0',
          timestamp: Date.now(),
        };
        return JSON.stringify(exportData, null, 2);
      },

      importData: async (jsonData) => {
        try {
          set({ isLoading: true, error: undefined });
          const data = JSON.parse(jsonData);
          
          // Validate data structure
          if (!data.categories || !data.tiles || !data.preferences) {
            throw new Error('Invalid data format');
          }

          set({
            categories: data.categories,
            tiles: data.tiles,
            preferences: { ...defaultPreferences, ...data.preferences },
            sentence: [],
            isLoading: false,
          });
        } catch (error) {
          set({
            error: error instanceof Error ? error.message : 'Failed to import data',
            isLoading: false,
          });
        }
      },

      resetToSeedData: () => {
        const currentPreferences = get().preferences; // Preserve current preferences
        set({
          categories: seedData.categories,
          tiles: seedData.tiles,
          preferences: currentPreferences, // Keep user preferences
          sentence: [],
        });
      },

      // Force reload seed data with translations (for fixing existing installs)
      forceReloadWithTranslations: () => {
        const currentPreferences = get().preferences;
        const currentSentence = get().sentence;
        
        // Force reload tiles with translations
        set({
          categories: seedData.categories,
          tiles: seedData.tiles,
          preferences: currentPreferences,
          sentence: currentSentence,
        });
        
        console.log('Forced reload with translations. First tile:', seedData.tiles[0]);
        console.log('Translations in first tile:', seedData.tiles[0]?.translations);
      },

      // UI state
      setLoading: (loading) => set({ isLoading: loading }),
      setError: (error) => set({ error }),
    }),
    {
      name: 'pecs-aac-storage',
      partialize: (state) => ({
        categories: state.categories,
        tiles: state.tiles,
        preferences: state.preferences,
      }),
    }
  )
);