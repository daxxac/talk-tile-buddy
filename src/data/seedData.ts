import { Category, Tile } from '@/types';

// Core vocabulary seed data for AAC app
export const seedData = {
  categories: [
    {
      id: 'core-words',
      name: 'Core Words',
      icon: '⭐',
      order: 0,
      color: 'core',
      nameTranslations: {
        en: 'Core Words',
        ru: 'Главные слова',
        he: 'מילים עיקריות'
      }
    },
    {
      id: 'people',
      name: 'People',
      icon: '👥',
      order: 1,
      color: 'noun',
      nameTranslations: {
        en: 'People',
        ru: 'Люди',
        he: 'אנשים'
      }
    },
    {
      id: 'actions',
      name: 'Actions',
      icon: '🏃',
      order: 2,
      color: 'verb',
      nameTranslations: {
        en: 'Actions',
        ru: 'Действия',
        he: 'פעולות'
      }
    },
    {
      id: 'food',
      name: 'Food & Drink',
      icon: '🍎',
      order: 3,
      color: 'noun',
      nameTranslations: {
        en: 'Food & Drink',
        ru: 'Еда и напитки',
        he: 'אוכל ושתייה'
      }
    },
    {
      id: 'feelings',
      name: 'Feelings',
      icon: '😊',
      order: 4,
      color: 'adjective',
      nameTranslations: {
        en: 'Feelings',
        ru: 'Чувства',
        he: 'רגשות'
      }
    },
    {
      id: 'places',
      name: 'Places',
      icon: '🏠',
      order: 5,
      color: 'noun',
      nameTranslations: {
        en: 'Places',
        ru: 'Места',
        he: 'מקומות'
      }
    },
    {
      id: 'time',
      name: 'Time',
      icon: '⏰',
      order: 6,
      color: 'noun',
      nameTranslations: {
        en: 'Time',
        ru: 'Время',
        he: 'זמן'
      }
    },
    {
      id: 'descriptors',
      name: 'Descriptors',
      icon: '✨',
      order: 7,
      color: 'adjective',
      nameTranslations: {
        en: 'Descriptors',
        ru: 'Описания',
        he: 'תיאורים'
      }
    }
  ] as Category[],

  tiles: [
    // Core Words - Most essential for communication
    {
      id: 'tile-i',
      label: 'I',
      categoryId: 'core-words',
      type: 'pronoun',
      order: 0,
      variants: ['me', 'myself'],
      imageUri: '👤',
      translations: {
        en: 'I',
        ru: 'я',
        he: 'אני'
      }
    },
    {
      id: 'tile-you',
      label: 'you',
      categoryId: 'core-words',
      type: 'pronoun',
      order: 1,
      imageUri: '👤',
      translations: {
        en: 'you',
        ru: 'ты',
        he: 'אתה'
      }
    },
    {
      id: 'tile-want',
      label: 'want',
      categoryId: 'core-words',
      type: 'verb',
      order: 2,
      variants: ['want', "don't want", 'need'],
      imageUri: '🙏',
      translations: {
        en: 'want',
        ru: 'хочу',
        he: 'רוצה'
      }
    },
    {
      id: 'tile-have',
      label: 'have',
      categoryId: 'core-words',
      type: 'verb',
      order: 3,
      variants: ['have', "don't have", 'got'],
      imageUri: '✋',
      translations: {
        en: 'have',
        ru: 'есть',
        he: 'יש'
      }
    },
    {
      id: 'tile-go',
      label: 'go',
      categoryId: 'core-words',
      type: 'verb',
      order: 4,
      variants: ['go', 'come', 'leave'],
      imageUri: '➡️',
      translations: {
        en: 'go',
        ru: 'идти',
        he: 'ללכת'
      }
    },
    {
      id: 'tile-more',
      label: 'more',
      categoryId: 'core-words',
      type: 'core',
      order: 5,
      imageUri: '➕',
      translations: {
        en: 'more',
        ru: 'ещё',
        he: 'עוד'
      }
    },
    {
      id: 'tile-stop',
      label: 'stop',
      categoryId: 'core-words',
      type: 'core',
      order: 6,
      variants: ['stop', 'no more', 'finished'],
      imageUri: '✋',
      translations: {
        en: 'stop',
        ru: 'стоп',
        he: 'עצור'
      }
    },
    {
      id: 'tile-help',
      label: 'help',
      categoryId: 'core-words',
      type: 'core',
      order: 7,
      variants: ['help', 'help me', 'please help'],
      imageUri: '🆘',
      translations: {
        en: 'help',
        ru: 'помощь',
        he: 'עזרה'
      }
    },
    {
      id: 'tile-yes',
      label: 'yes',
      categoryId: 'core-words',
      type: 'core',
      order: 8,
      imageUri: '✅',
      translations: {
        en: 'yes',
        ru: 'да',
        he: 'כן'
      }
    },
    {
      id: 'tile-no',
      label: 'no',
      categoryId: 'core-words',
      type: 'core',
      order: 9,
      imageUri: '❌',
      translations: {
        en: 'no',
        ru: 'нет',
        he: 'לא'
      }
    },
    {
      id: 'tile-like',
      label: 'like',
      categoryId: 'core-words',
      type: 'verb',
      order: 10,
      variants: ['like', "don't like", 'love'],
      imageUri: '❤️',
      translations: {
        en: 'like',
        ru: 'нравиться',
        he: 'אוהב'
      }
    },
    {
      id: 'tile-this',
      label: 'this',
      categoryId: 'core-words',
      type: 'core',
      order: 11,
      imageUri: '👆',
      translations: {
        en: 'this',
        ru: 'это',
        he: 'זה'
      }
    },
    {
      id: 'tile-that',
      label: 'that',
      categoryId: 'core-words',
      type: 'core',
      order: 12,
      imageUri: '👉',
      translations: {
        en: 'that',
        ru: 'то',
        he: 'זה'
      }
    },

    // People
    {
      id: 'tile-mom',
      label: 'mom',
      categoryId: 'people',
      type: 'noun',
      order: 0,
      variants: ['mom', 'mommy', 'mother'],
      imageUri: '👩',
      translations: {
        en: 'mom',
        ru: 'мама',
        he: 'אמא'
      }
    },
    {
      id: 'tile-dad',
      label: 'dad',
      categoryId: 'people',
      type: 'noun',
      order: 1,
      variants: ['dad', 'daddy', 'father'],
      imageUri: '👨',
      translations: {
        en: 'dad',
        ru: 'папа',
        he: 'אבא'
      }
    },
    {
      id: 'tile-sister',
      label: 'sister',
      categoryId: 'people',
      type: 'noun',
      order: 2,
      imageUri: '👧',
      translations: {
        en: 'sister',
        ru: 'сестра',
        he: 'אחות'
      }
    },
    {
      id: 'tile-brother',
      label: 'brother',
      categoryId: 'people',
      type: 'noun',
      order: 3,
      imageUri: '👦',
      translations: {
        en: 'brother',
        ru: 'брат',
        he: 'אח'
      }
    },
    {
      id: 'tile-teacher',
      label: 'teacher',
      categoryId: 'people',
      type: 'noun',
      order: 4,
      imageUri: '👩‍🏫',
      translations: {
        en: 'teacher',
        ru: 'учитель',
        he: 'מורה'
      }
    },
    {
      id: 'tile-friend',
      label: 'friend',
      categoryId: 'people',
      type: 'noun',
      order: 5,
      imageUri: '🧑‍🤝‍🧑',
      translations: {
        en: 'friend',
        ru: 'друг',
        he: 'חבר'
      }
    },

    // Actions
    {
      id: 'tile-eat',
      label: 'eat',
      categoryId: 'actions',
      type: 'verb',
      order: 0,
      imageUri: '🍽️',
      translations: {
        en: 'eat',
        ru: 'есть',
        he: 'לאכול'
      }
    },
    {
      id: 'tile-drink',
      label: 'drink',
      categoryId: 'actions',
      type: 'verb',
      order: 1,
      imageUri: '🥤',
      translations: {
        en: 'drink',
        ru: 'пить',
        he: 'לשתות'
      }
    },
    {
      id: 'tile-play',
      label: 'play',
      categoryId: 'actions',
      type: 'verb',
      order: 2,
      imageUri: '🎮',
      translations: {
        en: 'play',
        ru: 'играть',
        he: 'לשחק'
      }
    },
    {
      id: 'tile-sleep',
      label: 'sleep',
      categoryId: 'actions',
      type: 'verb',
      order: 3,
      imageUri: '😴',
      translations: {
        en: 'sleep',
        ru: 'спать',
        he: 'לישון'
      }
    },
    {
      id: 'tile-sit',
      label: 'sit',
      categoryId: 'actions',
      type: 'verb',
      order: 4,
      imageUri: '🪑',
      translations: {
        en: 'sit',
        ru: 'сидеть',
        he: 'לשבת'
      }
    },
    {
      id: 'tile-walk',
      label: 'walk',
      categoryId: 'actions',
      type: 'verb',
      order: 5,
      imageUri: '🚶',
      translations: {
        en: 'walk',
        ru: 'ходить',
        he: 'ללכת'
      }
    },
    {
      id: 'tile-run',
      label: 'run',
      categoryId: 'actions',
      type: 'verb',
      order: 6,
      imageUri: '🏃',
      translations: {
        en: 'run',
        ru: 'бегать',
        he: 'לרוץ'
      }
    },
    {
      id: 'tile-look',
      label: 'look',
      categoryId: 'actions',
      type: 'verb',
      order: 7,
      imageUri: '👀',
      translations: {
        en: 'look',
        ru: 'смотреть',
        he: 'להסתכל'
      }
    },

    // Food & Drink - with example images
    {
      id: 'tile-water',
      label: 'water',
      categoryId: 'food',
      type: 'noun',
      order: 0,
      imageUri: '💧',
      translations: {
        en: 'water',
        ru: 'вода',
        he: 'מים'
      }
    },
    {
      id: 'tile-milk',
      label: 'milk',
      categoryId: 'food',
      type: 'noun',
      order: 1,
      imageUri: '🥛',
      translations: {
        en: 'milk',
        ru: 'молоко',
        he: 'חלב'
      }
    },
    {
      id: 'tile-juice',
      label: 'juice',
      categoryId: 'food',
      type: 'noun',
      order: 2,
      imageUri: '🧃',
      translations: {
        en: 'juice',
        ru: 'сок',
        he: 'מיץ'
      }
    },
    {
      id: 'tile-apple',
      label: 'apple',
      categoryId: 'food',
      type: 'noun',
      order: 3,
      imageUri: '🍎',
      translations: {
        en: 'apple',
        ru: 'яблоко',
        he: 'תפוח'
      }
    },
    {
      id: 'tile-banana',
      label: 'banana',
      categoryId: 'food',
      type: 'noun',
      order: 4,
      imageUri: '🍌',
      translations: {
        en: 'banana',
        ru: 'банан',
        he: 'בננה'
      }
    },
    {
      id: 'tile-bread',
      label: 'bread',
      categoryId: 'food',
      type: 'noun',
      order: 5,
      imageUri: '🍞',
      translations: {
        en: 'bread',
        ru: 'хлеб',
        he: 'לחם'
      }
    },
    {
      id: 'tile-cookie',
      label: 'cookie',
      categoryId: 'food',
      type: 'noun',
      order: 6,
      imageUri: '🍪',
      translations: {
        en: 'cookie',
        ru: 'печенье',
        he: 'עוגיה'
      }
    },

    // Feelings - with example image
    {
      id: 'tile-happy',
      label: 'happy',
      categoryId: 'feelings',
      type: 'adjective',
      order: 0,
      imageUri: '😊',
      translations: {
        en: 'happy',
        ru: 'счастливый',
        he: 'שמח'
      }
    },
    {
      id: 'tile-sad',
      label: 'sad',
      categoryId: 'feelings',
      type: 'adjective',
      order: 1,
      imageUri: '😢',
      translations: {
        en: 'sad',
        ru: 'грустный',
        he: 'עצוב'
      }
    },
    {
      id: 'tile-angry',
      label: 'angry',
      categoryId: 'feelings',
      type: 'adjective',
      order: 2,
      imageUri: '😠',
      translations: {
        en: 'angry',
        ru: 'злой',
        he: 'כועס'
      }
    },
    {
      id: 'tile-tired',
      label: 'tired',
      categoryId: 'feelings',
      type: 'adjective',
      order: 3,
      imageUri: '😴',
      translations: {
        en: 'tired',
        ru: 'уставший',
        he: 'עייף'
      }
    },
    {
      id: 'tile-excited',
      label: 'excited',
      categoryId: 'feelings',
      type: 'adjective',
      order: 4,
      imageUri: '😃',
      translations: {
        en: 'excited',
        ru: 'взволнованный',
        he: 'נרגש'
      }
    },

    // Places
    {
      id: 'tile-home',
      label: 'home',
      categoryId: 'places',
      type: 'noun',
      order: 0,
      imageUri: '🏠',
      translations: {
        en: 'home',
        ru: 'дом',
        he: 'בית'
      }
    },
    {
      id: 'tile-school',
      label: 'school',
      categoryId: 'places',
      type: 'noun',
      order: 1,
      imageUri: '🏫',
      translations: {
        en: 'school',
        ru: 'школа',
        he: 'בית ספר'
      }
    },
    {
      id: 'tile-park',
      label: 'park',
      categoryId: 'places',
      type: 'noun',
      order: 2,
      imageUri: '🏞️',
      translations: {
        en: 'park',
        ru: 'парк',
        he: 'פארק'
      }
    },
    {
      id: 'tile-store',
      label: 'store',
      categoryId: 'places',
      type: 'noun',
      order: 3,
      imageUri: '🏪',
      translations: {
        en: 'store',
        ru: 'магазин',
        he: 'חנות'
      }
    },
    {
      id: 'tile-car',
      label: 'car',
      categoryId: 'places',
      type: 'noun',
      order: 4,
      imageUri: '🚗',
      translations: {
        en: 'car',
        ru: 'машина',
        he: 'מכונית'
      }
    },

    // Time
    {
      id: 'tile-now',
      label: 'now',
      categoryId: 'time',
      type: 'core',
      order: 0,
      imageUri: '⏰',
      translations: {
        en: 'now',
        ru: 'сейчас',
        he: 'עכשיו'
      }
    },
    {
      id: 'tile-later',
      label: 'later',
      categoryId: 'time',
      type: 'core',
      order: 1,
      imageUri: '🕐',
      translations: {
        en: 'later',
        ru: 'позже',
        he: 'אחר כך'
      }
    },
    {
      id: 'tile-today',
      label: 'today',
      categoryId: 'time',
      type: 'noun',
      order: 2,
      imageUri: '📅',
      translations: {
        en: 'today',
        ru: 'сегодня',
        he: 'היום'
      }
    },
    {
      id: 'tile-tomorrow',
      label: 'tomorrow',
      categoryId: 'time',
      type: 'noun',
      order: 3,
      imageUri: '🌅',
      translations: {
        en: 'tomorrow',
        ru: 'завтра',
        he: 'מחר'
      }
    },

    // Descriptors
    {
      id: 'tile-big',
      label: 'big',
      categoryId: 'descriptors',
      type: 'adjective',
      order: 0,
      imageUri: '📏',
      translations: {
        en: 'big',
        ru: 'большой',
        he: 'גדול'
      }
    },
    {
      id: 'tile-little',
      label: 'little',
      categoryId: 'descriptors',
      type: 'adjective',
      order: 1,
      imageUri: '🤏',
      translations: {
        en: 'little',
        ru: 'маленький',
        he: 'קטן'
      }
    },
    {
      id: 'tile-hot',
      label: 'hot',
      categoryId: 'descriptors',
      type: 'adjective',
      order: 2,
      imageUri: '🔥',
      translations: {
        en: 'hot',
        ru: 'горячий',
        he: 'חם'
      }
    },
    {
      id: 'tile-cold',
      label: 'cold',
      categoryId: 'descriptors',
      type: 'adjective',
      order: 3,
      imageUri: '🧊',
      translations: {
        en: 'cold',
        ru: 'холодный',
        he: 'קר'
      }
    },
    {
      id: 'tile-good',
      label: 'good',
      categoryId: 'descriptors',
      type: 'adjective',
      order: 4,
      imageUri: '👍',
      translations: {
        en: 'good',
        ru: 'хороший',
        he: 'טוב'
      }
    },
    {
      id: 'tile-bad',
      label: 'bad',
      categoryId: 'descriptors',
      type: 'adjective',
      order: 5,
      imageUri: '👎',
      translations: {
        en: 'bad',
        ru: 'плохой',
        he: 'רע'
      }
    }
  ] as Tile[]
};