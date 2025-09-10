// Core data types for PECS AAC app

export type TileType = "core" | "noun" | "verb" | "adjective" | "pronoun" | "phrase";

export type Language = "en" | "ru" | "he";

export interface Category {
  id: string;
  name: string;
  icon?: string;
  order: number;
  color?: string;
  // Multilingual support
  nameTranslations: {
    en: string;
    ru: string;
    he: string;
  };
}

export interface Tile {
  id: string;
  label: string;
  categoryId: string;
  imageUri?: string;
  type: TileType;
  variants?: string[];
  ttsOverride?: string;
  order: number;
  isFavorite?: boolean;
  // Multilingual support
  translations: {
    en: string;
    ru: string;
    he: string;
  };
  variantTranslations?: {
    en?: string[];
    ru?: string[];
    he?: string[];
  };
}

export interface Preference {
  language: Language;
  ttsVoice?: string;
  gridCols: number;
  highContrast: boolean;
  showText: boolean;
  vibration: boolean;
  pinHash?: string;
  caregiverMode: boolean;
}

export interface SentenceItem {
  tileId: string;
  label: string;
  type: TileType;
  imageUri?: string;
  ttsOverride?: string;
}

export interface AppState {
  categories: Category[];
  tiles: Tile[];
  preferences: Preference;
  sentence: SentenceItem[];
  isLoading: boolean;
  error?: string;
}

// Export/Import data structure
export interface ExportData {
  categories: Category[];
  tiles: Tile[];
  preferences: Preference;
  version: string;
  timestamp: number;
}

// Search and filtering
export interface SearchFilters {
  query: string;
  type?: TileType;
  categoryId?: string;
  favoritesOnly: boolean;
}

// TTS Configuration
export interface TTSConfig {
  voice?: SpeechSynthesisVoice;
  rate: number;
  pitch: number;
  volume: number;
}