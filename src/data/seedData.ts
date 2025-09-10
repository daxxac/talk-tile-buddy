import { Category, Tile } from '../types';

// Import all kikoriki-style images
import iImage from '../assets/kikoriki/i.png';
import youImage from '../assets/kikoriki/you.png';
import wantImage from '../assets/kikoriki/want.png';
import haveImage from '../assets/kikoriki/have.png';
import goImage from '../assets/kikoriki/go.png';
import moreImage from '../assets/kikoriki/more.png';
import stopImage from '../assets/kikoriki/stop.png';
import helpImage from '../assets/kikoriki/help.png';
import yesImage from '../assets/kikoriki/yes.png';
import noImage from '../assets/kikoriki/no.png';
import likeImage from '../assets/kikoriki/like.png';
import thisImage from '../assets/kikoriki/this.png';
import thatImage from '../assets/kikoriki/that.png';
import momImage from '../assets/kikoriki/mom.png';
import dadImage from '../assets/kikoriki/dad.png';
import sisterImage from '../assets/kikoriki/sister.png';
import brotherImage from '../assets/kikoriki/brother.png';
import teacherImage from '../assets/kikoriki/teacher.png';
import friendImage from '../assets/kikoriki/friend.png';
import eatImage from '../assets/kikoriki/eat.png';
import drinkImage from '../assets/kikoriki/drink.png';
import playImage from '../assets/kikoriki/play.png';
import sleepImage from '../assets/kikoriki/sleep.png';
import sitImage from '../assets/kikoriki/sit.png';
import walkImage from '../assets/kikoriki/walk.png';
import runImage from '../assets/kikoriki/run.png';
import lookImage from '../assets/kikoriki/look.png';
import waterImage from '../assets/kikoriki/water.png';
import milkImage from '../assets/kikoriki/milk.png';
import juiceImage from '../assets/kikoriki/juice.png';
import appleImage from '../assets/kikoriki/apple.png';
import bananaImage from '../assets/kikoriki/banana.png';
import breadImage from '../assets/kikoriki/bread.png';
import cookieImage from '../assets/kikoriki/cookie.png';
import happyImage from '../assets/kikoriki/happy.png';
import sadImage from '../assets/kikoriki/sad.png';
import angryImage from '../assets/kikoriki/angry.png';
import tiredImage from '../assets/kikoriki/tired.png';
import excitedImage from '../assets/kikoriki/excited.png';
import homeImage from '../assets/kikoriki/home.png';
import schoolImage from '../assets/kikoriki/school.png';
import parkImage from '../assets/kikoriki/park.png';
import storeImage from '../assets/kikoriki/store.png';
import carImage from '../assets/kikoriki/car.png';
import nowImage from '../assets/kikoriki/now.png';
import laterImage from '../assets/kikoriki/later.png';
import todayImage from '../assets/kikoriki/today.png';
import tomorrowImage from '../assets/kikoriki/tomorrow.png';
import bigImage from '../assets/kikoriki/big.png';
import littleImage from '../assets/kikoriki/little.png';
import hotImage from '../assets/kikoriki/hot.png';
import coldImage from '../assets/kikoriki/cold.png';
import goodImage from '../assets/kikoriki/good.png';
import badImage from '../assets/kikoriki/bad.png';
// New images
import swimmingPoolImage from '../assets/kikoriki/swimming-pool.png';
import oracleParkImage from '../assets/kikoriki/oracle-park.png';
import watermelonImage from '../assets/kikoriki/watermelon.png';
import friedPotatoesImage from '../assets/kikoriki/fried-potatoes.png';
import chipsImage from '../assets/kikoriki/chips.png';
import dietPepsiImage from '../assets/kikoriki/diet-pepsi.png';
import colaZeroImage from '../assets/kikoriki/cola-zero.png';

// This will be populated with default categories and tiles for new users
export const seedData = {
  categories: [
    {
      id: 'core-words',
      name: 'Core Words',
      icon: '💬',
      order: 0,
      color: 'hsl(220, 100%, 70%)',
      nameTranslations: {
        en: 'Core Words',
        ru: 'Основные слова',
        he: 'מילים בסיסיות'
      }
    },
    {
      id: 'people',
      name: 'People',
      icon: '👥',
      order: 1,
      color: 'hsl(340, 80%, 60%)',
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
      color: 'hsl(30, 90%, 60%)',
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
      color: 'hsl(120, 70%, 50%)',
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
      color: 'hsl(280, 80%, 70%)',
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
      color: 'hsl(180, 70%, 50%)',
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
      color: 'hsl(60, 80%, 60%)',
      nameTranslations: {
        en: 'Time',
        ru: 'Время',
        he: 'זמן'
      }
    },
    {
      id: 'descriptors',
      name: 'Descriptors',
      icon: '📏',
      order: 7,
      color: 'hsl(200, 70%, 60%)',
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
      imageUri: iImage,
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
      imageUri: youImage,
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
      imageUri: wantImage,
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
      imageUri: haveImage,
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
      imageUri: goImage,
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
      imageUri: moreImage,
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
      imageUri: stopImage,
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
      imageUri: helpImage,
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
      imageUri: yesImage,
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
      imageUri: noImage,
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
      imageUri: likeImage,
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
      imageUri: thisImage,
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
      imageUri: thatImage,
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
      imageUri: momImage,
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
      imageUri: dadImage,
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
      imageUri: sisterImage,
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
      imageUri: brotherImage,
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
      imageUri: teacherImage,
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
      imageUri: friendImage,
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
      imageUri: eatImage,
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
      imageUri: drinkImage,
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
      imageUri: playImage,
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
      imageUri: sleepImage,
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
      imageUri: sitImage,
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
      imageUri: walkImage,
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
      imageUri: runImage,
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
      imageUri: lookImage,
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
      imageUri: waterImage,
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
      imageUri: milkImage,
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
      imageUri: juiceImage,
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
      imageUri: appleImage,
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
      imageUri: bananaImage,
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
      imageUri: breadImage,
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
      imageUri: cookieImage,
      translations: {
        en: 'cookie',
        ru: 'печенье',
        he: 'עוגיה'
      }
    },
    {
      id: 'tile-watermelon',
      label: 'watermelon',
      categoryId: 'food',
      type: 'noun',
      order: 7,
      imageUri: watermelonImage,
      translations: {
        en: 'watermelon',
        ru: 'арбуз',
        he: 'אבטיח'
      }
    },
    {
      id: 'tile-fried-potatoes',
      label: 'fried potatoes',
      categoryId: 'food',
      type: 'noun',
      order: 8,
      imageUri: friedPotatoesImage,
      translations: {
        en: 'fried potatoes',
        ru: 'жареная картошка',
        he: 'תפוחי אדמה מטוגנים'
      }
    },
    {
      id: 'tile-chips',
      label: 'chips',
      categoryId: 'food',
      type: 'noun',
      order: 9,
      imageUri: chipsImage,
      translations: {
        en: 'chips',
        ru: 'чипсы',
        he: 'צ׳יפס'
      }
    },
    {
      id: 'tile-diet-pepsi',
      label: 'Diet Pepsi',
      categoryId: 'food',
      type: 'noun',
      order: 10,
      imageUri: dietPepsiImage,
      translations: {
        en: 'Diet Pepsi',
        ru: 'Диет Пепси',
        he: 'דיאט פפסי'
      }
    },
    {
      id: 'tile-cola-zero',
      label: 'Cola Zero',
      categoryId: 'food',
      type: 'noun',
      order: 11,
      imageUri: colaZeroImage,
      translations: {
        en: 'Cola Zero',
        ru: 'Кола Зеро',
        he: 'קולה זירו'
      }
    },

    // Feelings - with example image
    {
      id: 'tile-happy',
      label: 'happy',
      categoryId: 'feelings',
      type: 'adjective',
      order: 0,
      imageUri: happyImage,
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
      imageUri: sadImage,
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
      imageUri: angryImage,
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
      imageUri: tiredImage,
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
      imageUri: excitedImage,
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
      imageUri: homeImage,
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
      imageUri: schoolImage,
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
      imageUri: parkImage,
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
      imageUri: storeImage,
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
      imageUri: carImage,
      translations: {
        en: 'car',
        ru: 'машина',
        he: 'מכונית'
      }
    },
    {
      id: 'tile-swimming-pool',
      label: 'swimming pool',
      categoryId: 'places',
      type: 'noun',
      order: 5,
      imageUri: swimmingPoolImage,
      translations: {
        en: 'swimming pool',
        ru: 'бассейн',
        he: 'בריכת שחייה'
      }
    },
    {
      id: 'tile-oracle-park',
      label: 'Oracle Park',
      categoryId: 'places',
      type: 'noun',
      order: 6,
      imageUri: oracleParkImage,
      translations: {
        en: 'Oracle Park',
        ru: 'Оракл Парк',
        he: 'אורקל פארק'
      }
    },

    // Time
    {
      id: 'tile-now',
      label: 'now',
      categoryId: 'time',
      type: 'core',
      order: 0,
      imageUri: nowImage,
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
      imageUri: laterImage,
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
      imageUri: todayImage,
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
      imageUri: tomorrowImage,
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
      imageUri: bigImage,
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
      imageUri: littleImage,
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
      imageUri: hotImage,
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
      imageUri: coldImage,
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
      imageUri: goodImage,
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
      imageUri: badImage,
      translations: {
        en: 'bad',
        ru: 'плохой',
        he: 'רע'
      }
    }
  ] as Tile[]
};