import { Category, Tile } from '@/types';

// Core vocabulary seed data for AAC app
export const seedData = {
  categories: [
    {
      id: 'core-words',
      name: 'Core Words',
      icon: '⭐',
      order: 0,
      color: 'core'
    },
    {
      id: 'people',
      name: 'People',
      icon: '👥',
      order: 1,
      color: 'noun'
    },
    {
      id: 'actions',
      name: 'Actions',
      icon: '🏃',
      order: 2,
      color: 'verb'
    },
    {
      id: 'food',
      name: 'Food & Drink',
      icon: '🍎',
      order: 3,
      color: 'noun'
    },
    {
      id: 'feelings',
      name: 'Feelings',
      icon: '😊',
      order: 4,
      color: 'adjective'
    },
    {
      id: 'places',
      name: 'Places',
      icon: '🏠',
      order: 5,
      color: 'noun'
    },
    {
      id: 'time',
      name: 'Time',
      icon: '⏰',
      order: 6,
      color: 'noun'
    },
    {
      id: 'descriptors',
      name: 'Descriptors',
      icon: '✨',
      order: 7,
      color: 'adjective'
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
      variants: ['me', 'myself']
    },
    {
      id: 'tile-you',
      label: 'you',
      categoryId: 'core-words',
      type: 'pronoun',
      order: 1
    },
    {
      id: 'tile-want',
      label: 'want',
      categoryId: 'core-words',
      type: 'verb',
      order: 2,
      variants: ['want', "don't want", 'need']
    },
    {
      id: 'tile-have',
      label: 'have',
      categoryId: 'core-words',
      type: 'verb',
      order: 3,
      variants: ['have', "don't have", 'got']
    },
    {
      id: 'tile-go',
      label: 'go',
      categoryId: 'core-words',
      type: 'verb',
      order: 4,
      variants: ['go', 'come', 'leave']
    },
    {
      id: 'tile-more',
      label: 'more',
      categoryId: 'core-words',
      type: 'core',
      order: 5
    },
    {
      id: 'tile-stop',
      label: 'stop',
      categoryId: 'core-words',
      type: 'core',
      order: 6,
      variants: ['stop', 'no more', 'finished']
    },
    {
      id: 'tile-help',
      label: 'help',
      categoryId: 'core-words',
      type: 'core',
      order: 7,
      variants: ['help', 'help me', 'please help']
    },
    {
      id: 'tile-yes',
      label: 'yes',
      categoryId: 'core-words',
      type: 'core',
      order: 8
    },
    {
      id: 'tile-no',
      label: 'no',
      categoryId: 'core-words',
      type: 'core',
      order: 9
    },
    {
      id: 'tile-like',
      label: 'like',
      categoryId: 'core-words',
      type: 'verb',
      order: 10,
      variants: ['like', "don't like", 'love']
    },
    {
      id: 'tile-this',
      label: 'this',
      categoryId: 'core-words',
      type: 'core',
      order: 11
    },
    {
      id: 'tile-that',
      label: 'that',
      categoryId: 'core-words',
      type: 'core',
      order: 12
    },

    // People
    {
      id: 'tile-mom',
      label: 'mom',
      categoryId: 'people',
      type: 'noun',
      order: 0,
      variants: ['mom', 'mommy', 'mother']
    },
    {
      id: 'tile-dad',
      label: 'dad',
      categoryId: 'people',
      type: 'noun',
      order: 1,
      variants: ['dad', 'daddy', 'father']
    },
    {
      id: 'tile-sister',
      label: 'sister',
      categoryId: 'people',
      type: 'noun',
      order: 2
    },
    {
      id: 'tile-brother',
      label: 'brother',
      categoryId: 'people',
      type: 'noun',
      order: 3
    },
    {
      id: 'tile-teacher',
      label: 'teacher',
      categoryId: 'people',
      type: 'noun',
      order: 4
    },
    {
      id: 'tile-friend',
      label: 'friend',
      categoryId: 'people',
      type: 'noun',
      order: 5
    },

    // Actions
    {
      id: 'tile-eat',
      label: 'eat',
      categoryId: 'actions',
      type: 'verb',
      order: 0
    },
    {
      id: 'tile-drink',
      label: 'drink',
      categoryId: 'actions',
      type: 'verb',
      order: 1
    },
    {
      id: 'tile-play',
      label: 'play',
      categoryId: 'actions',
      type: 'verb',
      order: 2
    },
    {
      id: 'tile-sleep',
      label: 'sleep',
      categoryId: 'actions',
      type: 'verb',
      order: 3
    },
    {
      id: 'tile-sit',
      label: 'sit',
      categoryId: 'actions',
      type: 'verb',
      order: 4
    },
    {
      id: 'tile-walk',
      label: 'walk',
      categoryId: 'actions',
      type: 'verb',
      order: 5
    },
    {
      id: 'tile-run',
      label: 'run',
      categoryId: 'actions',
      type: 'verb',
      order: 6
    },
    {
      id: 'tile-look',
      label: 'look',
      categoryId: 'actions',
      type: 'verb',
      order: 7
    },

    // Food & Drink - with some example images
    {
      id: 'tile-water',
      label: 'water',
      categoryId: 'food',
      type: 'noun',
      order: 0,
      imageUri: '/src/assets/water-icon.png'
    },
    {
      id: 'tile-milk',
      label: 'milk',
      categoryId: 'food',
      type: 'noun',
      order: 1
    },
    {
      id: 'tile-juice',
      label: 'juice',
      categoryId: 'food',
      type: 'noun',
      order: 2
    },
    {
      id: 'tile-apple',
      label: 'apple',
      categoryId: 'food',
      type: 'noun',
      order: 3,
      imageUri: '/src/assets/apple-icon.png'
    },
    {
      id: 'tile-banana',
      label: 'banana',
      categoryId: 'food',
      type: 'noun',
      order: 4
    },
    {
      id: 'tile-bread',
      label: 'bread',
      categoryId: 'food',
      type: 'noun',
      order: 5
    },
    {
      id: 'tile-cookie',
      label: 'cookie',
      categoryId: 'food',
      type: 'noun',
      order: 6
    },

    // Feelings - with example image
    {
      id: 'tile-happy',
      label: 'happy',
      categoryId: 'feelings',
      type: 'adjective',
      order: 0,
      imageUri: '/src/assets/happy-icon.png'
    },
    {
      id: 'tile-sad',
      label: 'sad',
      categoryId: 'feelings',
      type: 'adjective',
      order: 1
    },
    {
      id: 'tile-angry',
      label: 'angry',
      categoryId: 'feelings',
      type: 'adjective',
      order: 2
    },
    {
      id: 'tile-tired',
      label: 'tired',
      categoryId: 'feelings',
      type: 'adjective',
      order: 3
    },
    {
      id: 'tile-excited',
      label: 'excited',
      categoryId: 'feelings',
      type: 'adjective',
      order: 4
    },

    // Places
    {
      id: 'tile-home',
      label: 'home',
      categoryId: 'places',
      type: 'noun',
      order: 0
    },
    {
      id: 'tile-school',
      label: 'school',
      categoryId: 'places',
      type: 'noun',
      order: 1
    },
    {
      id: 'tile-park',
      label: 'park',
      categoryId: 'places',
      type: 'noun',
      order: 2
    },
    {
      id: 'tile-store',
      label: 'store',
      categoryId: 'places',
      type: 'noun',
      order: 3
    },
    {
      id: 'tile-car',
      label: 'car',
      categoryId: 'places',
      type: 'noun',
      order: 4
    },

    // Time
    {
      id: 'tile-now',
      label: 'now',
      categoryId: 'time',
      type: 'core',
      order: 0
    },
    {
      id: 'tile-later',
      label: 'later',
      categoryId: 'time',
      type: 'core',
      order: 1
    },
    {
      id: 'tile-today',
      label: 'today',
      categoryId: 'time',
      type: 'noun',
      order: 2
    },
    {
      id: 'tile-tomorrow',
      label: 'tomorrow',
      categoryId: 'time',
      type: 'noun',
      order: 3
    },

    // Descriptors
    {
      id: 'tile-big',
      label: 'big',
      categoryId: 'descriptors',
      type: 'adjective',
      order: 0
    },
    {
      id: 'tile-little',
      label: 'little',
      categoryId: 'descriptors',
      type: 'adjective',
      order: 1
    },
    {
      id: 'tile-hot',
      label: 'hot',
      categoryId: 'descriptors',
      type: 'adjective',
      order: 2
    },
    {
      id: 'tile-cold',
      label: 'cold',
      categoryId: 'descriptors',
      type: 'adjective',
      order: 3
    },
    {
      id: 'tile-good',
      label: 'good',
      categoryId: 'descriptors',
      type: 'adjective',
      order: 4
    },
    {
      id: 'tile-bad',
      label: 'bad',
      categoryId: 'descriptors',
      type: 'adjective',
      order: 5
    }
  ] as Tile[]
};