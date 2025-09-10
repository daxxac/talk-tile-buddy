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
 * UI Text translations
 */
export const UI_TRANSLATIONS = {
  // Sentence building
  mySentence: { en: 'My Sentence', ru: 'Моё предложение', he: 'המשפט שלי' },
  tapTilesToBuild: { en: 'Tap tiles to build your sentence', ru: 'Нажимайте на карточки, чтобы составить предложение', he: 'הקש על כרטיסים כדי לבנות את המשפט שלך' },
  chooseCategory: { en: 'Choose a Category', ru: 'Выберите категорию', he: 'בחר קטגוריה' },
  add: { en: 'Add', ru: 'Добавить', he: 'הוסף' },
  cancel: { en: 'Cancel', ru: 'Отмена', he: 'בטל' },
  clear: { en: 'Clear', ru: 'Очистить', he: 'נקה' },
  play: { en: 'Play', ru: 'Играть', he: 'נגן' },
  stop: { en: 'Stop', ru: 'Стоп', he: 'עצור' },
  search: { en: 'Search', ru: 'Поиск', he: 'חיפוש' },
  save: { en: 'Save', ru: 'Сохранить', he: 'שמור' },
  
  // Buttons and actions
  addTile: { en: 'Add Tile', ru: 'Добавить карточку', he: 'הוסף כרטיס' },
  addFirstTile: { en: 'Add First Tile', ru: 'Добавить первую карточку', he: 'הוסף כרטיס ראשון' },
  clearSearch: { en: 'Clear search', ru: 'Очистить поиск', he: 'נקה חיפוש' },
  clearSentence: { en: 'Clear sentence', ru: 'Очистить предложение', he: 'נקה משפט' },
  speakSentence: { en: 'Speak sentence', ru: 'Произнести предложение', he: 'הקריא משפט' },
  stopSpeaking: { en: 'Stop speaking', ru: 'Остановить воспроизведение', he: 'הפסק הקראה' },
  
  // Placeholders
  searchTiles: { en: 'Search tiles...', ru: 'Поиск карточек...', he: 'חפש כרטיסים...' },
  tileLabel: { en: 'Tile Label', ru: 'Название карточки', he: 'תווית כרטיס' },
  
  // Messages
  noTilesFound: { en: 'No tiles found', ru: 'Карточки не найдены', he: 'לא נמצאו כרטיסים' },
  noTilesInCategory: { en: 'No tiles in this category', ru: 'В этой категории нет карточек', he: 'אין כרטיסים בקטגוריה זו' },
  tilesWillAppear: { en: 'Tiles will appear here once they\'re added.', ru: 'Карточки появятся здесь после добавления.', he: 'כרטיסים יופיעו כאן לאחר הוספתם.' },
  enableCaregiverMode: { en: 'Enable caregiver mode to add tiles', ru: 'Включите режим опекуна для добавления карточек', he: 'הפעל מצב מטפל כדי להוסיף כרטיסים' },
  tryAdjustingSearch: { en: 'Try adjusting your search term', ru: 'Попробуйте изменить поисковый запрос', he: 'נסה להתאים את מונח החיפוש' },
  
  // Caregiver mode
  caregiverModeOn: { en: 'Caregiver Mode On', ru: 'Режим опекуна включен', he: 'מצב מטפל מופעל' },
  caregiverModeOff: { en: 'Caregiver Mode Off', ru: 'Режим опекуна выключен', he: 'מצב מטפל כבוי' },
  editingEnabled: { en: 'You can now add and edit tiles', ru: 'Теперь вы можете добавлять и редактировать карточки', he: 'כעת תוכל להוסיף ולערוך כרטיסים' },
  editingDisabled: { en: 'Editing features are now disabled', ru: 'Функции редактирования отключены', he: 'תכונות העריכה כעת מושבתות' },
  on: { en: 'ON', ru: 'ВКЛ', he: 'פעיל' },
  
  // Language
  languageChanged: { en: 'Language Changed', ru: 'Язык изменен', he: 'השפה שונתה' },
  interfaceChangedTo: { en: 'Interface changed to', ru: 'Интерфейс изменен на', he: 'ממשק שונה ל' },
  
  // Form labels
  tileType: { en: 'Tile Type', ru: 'Тип карточки', he: 'סוג כרטיס' },
  uploadPhoto: { en: 'Upload Photo', ru: 'Загрузить фото', he: 'העלה תמונה' },
  chooseFile: { en: 'Choose File', ru: 'Выбрать файл', he: 'בחר קובץ' },
  takePhoto: { en: 'Take Photo', ru: 'Сделать фото', he: 'צלם תמונה' },
  dragDropImage: { en: 'or drag and drop an image here', ru: 'или перетащите изображение сюда', he: 'או גרור ושחרר תמונה כאן' },
  
  // Form validation and processing
  adding: { en: 'Adding...', ru: 'Добавление...', he: 'מוסיף...' },
  tileAdded: { en: 'Tile Added!', ru: 'Карточка добавлена!', he: 'כרטיס נוסף!' },
  tileAddedDescription: { en: 'has been added to', ru: 'была добавлена в', he: 'נוסף ל' },
  failedToAdd: { en: 'Failed to Add Tile', ru: 'Не удалось добавить карточку', he: 'נכשל בהוספת כרטיס' },
  errorAddingTile: { en: 'There was an error adding the tile. Please try again.', ru: 'Произошла ошибка при добавлении карточки. Попробуйте еще раз.', he: 'אירעה שגיאה בהוספת הכרטיס. נסה שוב.' },
  labelRequired: { en: 'Label Required', ru: 'Требуется название', he: 'נדרשת תווית' },
  enterLabel: { en: 'Please enter a label for the tile', ru: 'Пожалуйста, введите название для карточки', he: 'אנא הזן תווית לכרטיס' },
  translationRequired: { en: 'Translation Required', ru: 'Требуется перевод', he: 'נדרש תרגום' },
  provideTranslation: { en: 'Please provide at least one translation', ru: 'Пожалуйста, укажите хотя бы один перевод', he: 'אנא ספק לפחות תרגום אחד' },
  invalidFile: { en: 'Invalid File', ru: 'Неверный файл', he: 'קובץ לא תקין' },
  selectValidImage: { en: 'Please select a valid image file (JPEG, PNG, WebP, max 10MB)', ru: 'Выберите корректный файл изображения (JPEG, PNG, WebP, макс. 10МБ)', he: 'אנא בחר קובץ תמונה תקין (JPEG, PNG, WebP, מקס. 10MB)' },
  imageProcessingFailed: { en: 'Image Processing Failed', ru: 'Ошибка обработки изображения', he: 'עיבוד התמונה נכשל' },
  imageProcessingError: { en: 'Failed to process the image. Please try another file.', ru: 'Не удалось обработать изображение. Попробуйте другой файл.', he: 'נכשל בעיבוד התמונה. נסה קובץ אחר.' }
};

/**
 * Get translated UI text based on the current language
 */
export function getUIText(key: keyof typeof UI_TRANSLATIONS, language: Language): string {
  return UI_TRANSLATIONS[key][language] || UI_TRANSLATIONS[key].en;
}

/**
 * Get text direction for language (for Hebrew RTL support)
 */
export function getTextDirection(language: Language): 'ltr' | 'rtl' {
  return language === 'he' ? 'rtl' : 'ltr';
}