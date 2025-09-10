// Text-to-Speech utility using Browser Accessibility Features

export interface TTSOptions {
  voice?: SpeechSynthesisVoice;
  rate?: number;
  pitch?: number;
  volume?: number;
  language?: string;
}

// Language configuration for proper TTS mapping
export const TTS_LANGUAGE_CONFIG = {
  'en': {
    locales: ['en-US', 'en-GB', 'en-CA', 'en-AU', 'en'],
    name: 'English',
    fallback: 'en-US'
  },
  'ru': {
    locales: ['ru-RU', 'ru-BY', 'ru'],
    name: 'Russian',
    fallback: 'ru-RU'
  },
  'he': {
    locales: ['he-IL', 'he', 'iw-IL', 'iw'], // iw is legacy Hebrew code
    name: 'Hebrew',
    fallback: 'he-IL'
  }
};

class AccessibilityTTSManager {
  private liveRegion: HTMLElement | null = null;
  private synth: SpeechSynthesis;
  private availableVoices: SpeechSynthesisVoice[] = [];
  private voicesLoaded: boolean = false;

  constructor() {
    this.synth = window.speechSynthesis;
    this.createLiveRegion();
    this.loadVoices();
  }

  private loadVoices(): void {
    const updateVoices = () => {
      this.availableVoices = this.synth.getVoices();
      this.voicesLoaded = true;
      console.log('TTS: Available voices loaded:', this.availableVoices.map(v => `${v.name} (${v.lang})`));
    };

    // Load voices immediately if available
    updateVoices();

    // Also listen for voiceschanged event (required for some browsers)
    if (this.synth.onvoiceschanged !== undefined) {
      this.synth.onvoiceschanged = updateVoices;
    }

    // Fallback timeout to ensure voices are loaded
    setTimeout(updateVoices, 1000);
  }

  private createLiveRegion(): void {
    // Create ARIA live region for screen reader announcements
    this.liveRegion = document.createElement('div');
    this.liveRegion.setAttribute('aria-live', 'polite');
    this.liveRegion.setAttribute('aria-atomic', 'true');
    this.liveRegion.style.position = 'absolute';
    this.liveRegion.style.left = '-10000px';
    this.liveRegion.style.width = '1px';
    this.liveRegion.style.height = '1px';
    this.liveRegion.style.overflow = 'hidden';
    document.body.appendChild(this.liveRegion);
  }

  private findBestVoice(language: string): SpeechSynthesisVoice | null {
    const config = TTS_LANGUAGE_CONFIG[language as keyof typeof TTS_LANGUAGE_CONFIG];
    if (!config) {
      console.warn('TTS: No configuration for language:', language);
      return this.availableVoices.find(v => v.default) || this.availableVoices[0] || null;
    }

    console.log(`TTS: Looking for ${config.name} voice among ${this.availableVoices.length} available voices`);

    // Try each locale in priority order
    for (const locale of config.locales) {
      const matchingVoices = this.availableVoices.filter(voice => 
        voice.lang.toLowerCase().startsWith(locale.toLowerCase())
      );

      if (matchingVoices.length > 0) {
        // Prefer local voices over remote ones
        const localVoice = matchingVoices.find(v => v.localService);
        const selectedVoice = localVoice || matchingVoices[0];
        console.log(`TTS: Selected ${config.name} voice:`, selectedVoice.name, `(${selectedVoice.lang})`);
        return selectedVoice;
      }
    }

    console.warn(`TTS: No ${config.name} voice found, using default system voice`);
    return this.availableVoices.find(v => v.default) || this.availableVoices[0] || null;
  }

  public announceText(text: string, language: string = 'en'): void {
    if (this.liveRegion) {
      // Clear and set new text for screen reader
      this.liveRegion.textContent = '';
      setTimeout(() => {
        if (this.liveRegion) {
          this.liveRegion.textContent = text;
        }
      }, 10);
    }

    // Also use browser's speech synthesis with proper language configuration
    this.speakWithLanguage(text, language);
  }

  private speakWithLanguage(text: string, language: string): void {
    if (!this.synth || !text.trim()) return;

    // Cancel any ongoing speech
    this.synth.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    const config = TTS_LANGUAGE_CONFIG[language as keyof typeof TTS_LANGUAGE_CONFIG];
    
    // Find and set the best voice for the language
    const voice = this.findBestVoice(language);
    if (voice) {
      utterance.voice = voice;
      utterance.lang = voice.lang;
    } else if (config) {
      // No specific voice found, but set the language code anyway
      utterance.lang = config.fallback;
    }

    // Configure speech parameters for better accessibility
    utterance.rate = 0.85; // Slightly slower for better comprehension
    utterance.pitch = 1.0;
    utterance.volume = 1.0;

    console.log(`TTS: Speaking "${text}" in ${config?.name || language} (${utterance.lang})`);

    // Handle events
    utterance.onstart = () => {
      console.log('TTS: Speech started');
    };

    utterance.onend = () => {
      console.log('TTS: Speech ended');
    };

    utterance.onerror = (event) => {
      console.error('TTS: Speech error:', event.error);
    };

    // Speak with retry mechanism for browser compatibility
    try {
      this.synth.speak(utterance);
      
      // Workaround for browsers that don't start speaking immediately
      setTimeout(() => {
        if (!this.synth.speaking && !this.synth.pending) {
          console.log('TTS: Retrying speech...');
          this.synth.cancel();
          this.synth.speak(utterance);
        }
      }, 100);
    } catch (error) {
      console.error('TTS: Failed to speak:', error);
    }
  }

  public speak(text: string, options: TTSOptions = {}): Promise<void> {
    return new Promise((resolve) => {
      if (!text.trim()) {
        resolve();
        return;
      }

      const language = options.language || 'en';
      
      // Use accessibility announcement with proper language
      this.announceText(text, language);
      
      // Resolve after a short delay to allow announcement
      setTimeout(() => resolve(), 500);
    });
  }

  public stop(): void {
    if (this.synth) {
      this.synth.cancel();
    }
    if (this.liveRegion) {
      this.liveRegion.textContent = '';
    }
  }

  public isSpeaking(): boolean {
    return this.synth ? this.synth.speaking : false;
  }

  // Method to get available voices for a specific language
  public getVoicesForLanguage(language: string): SpeechSynthesisVoice[] {
    const config = TTS_LANGUAGE_CONFIG[language as keyof typeof TTS_LANGUAGE_CONFIG];
    if (!config) return [];

    return this.availableVoices.filter(voice => 
      config.locales.some(locale => 
        voice.lang.toLowerCase().startsWith(locale.toLowerCase())
      )
    );
  }
}

// Create singleton instance
export const tts = new AccessibilityTTSManager();

// Helper function to format text for better speech
export function formatTextForSpeech(text: string): string {
  return text
    .replace(/[^\w\s'-]/g, ' ') // Replace special chars with spaces
    .replace(/\s+/g, ' ') // Collapse multiple spaces
    .trim();
}

// Quick speak function with language support
export async function speak(text: string, options: TTSOptions = {}): Promise<void> {
  const formattedText = formatTextForSpeech(text);
  return tts.speak(formattedText, options);
}

// Stop speaking
export function stopSpeaking(): void {
  tts.stop();
}