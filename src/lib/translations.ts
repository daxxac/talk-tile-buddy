import { Language, Tile, Category } from '@/types';

/**
 * Get the translated text for a tile based on the current language
 */
export function getTileText(tile: Tile, language: Language): string {
  if (!tile.translations) {
    return tile.label; // Fallback to original label
  }
  
  return tile.translations[language] || tile.label;
}

/**
 * Get the translated category name based on the current language
 */
export function getCategoryName(category: Category, language: Language): string {
  if (!category.nameTranslations) {
    return category.name; // Fallback to original name
  }
  
  return category.nameTranslations[language] || category.name;
}

/**
 * Language display names
 */
export const LANGUAGE_NAMES = {
  en: 'English',
  ru: 'Русский',
  he: 'עברית'
};

/**
 * Language flags/emojis
 */
export const LANGUAGE_FLAGS = {
  en: '🇺🇸',
  ru: '🇷🇺',
  he: '🇮🇱'
};

/**
 * Get text direction for language (for Hebrew RTL support)
 */
export function getTextDirection(language: Language): 'ltr' | 'rtl' {
  return language === 'he' ? 'rtl' : 'ltr';
}