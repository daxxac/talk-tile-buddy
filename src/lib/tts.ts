// Text-to-Speech utility using Web Speech API

export interface TTSOptions {
  voice?: SpeechSynthesisVoice;
  rate?: number;
  pitch?: number;
  volume?: number;
  language?: string;
}

class TTSManager {
  private synth: SpeechSynthesis;
  private voices: SpeechSynthesisVoice[] = [];
  private isInitialized: boolean = false;

  constructor() {
    this.synth = window.speechSynthesis;
    this.loadVoices();
  }

  private loadVoices(): void {
    const loadVoicesHandler = () => {
      this.voices = this.synth.getVoices();
      this.isInitialized = true;
    };

    // Load voices immediately if available
    this.voices = this.synth.getVoices();
    if (this.voices.length > 0) {
      this.isInitialized = true;
    }

    // Also listen for the voiceschanged event (required for some browsers)
    if (this.synth.onvoiceschanged !== undefined) {
      this.synth.onvoiceschanged = loadVoicesHandler;
    }

    // Fallback timeout
    setTimeout(() => {
      if (!this.isInitialized) {
        this.voices = this.synth.getVoices();
        this.isInitialized = true;
      }
    }, 100);
  }

  public getVoices(): SpeechSynthesisVoice[] {
    return this.voices;
  }

  public getVoicesByLanguage(language: string): SpeechSynthesisVoice[] {
    return this.voices.filter(voice => 
      voice.lang.toLowerCase().startsWith(language.toLowerCase())
    );
  }

  public getDefaultVoice(language: string = 'en'): SpeechSynthesisVoice | null {
    // Map language codes to full locale codes for better voice matching
    const languageMap: Record<string, string[]> = {
      'en': ['en-US', 'en-GB', 'en-CA', 'en-AU', 'en'],
      'ru': ['ru-RU', 'ru', 'ru-BY'],
      'he': ['he-IL', 'he', 'iw-IL', 'iw']
    };

    const targetLanguages = languageMap[language] || [language];
    
    // Try each language variant
    for (const lang of targetLanguages) {
      const languageVoices = this.voices.filter(voice => 
        voice.lang.toLowerCase().startsWith(lang.toLowerCase())
      );
      
      if (languageVoices.length > 0) {
        // Prefer local voices
        const localVoice = languageVoices.find(voice => voice.localService);
        if (localVoice) return localVoice;
        
        // Fallback to any voice for the language
        return languageVoices[0];
      }
    }
    
    // Ultimate fallback to default system voice
    return this.voices.find(voice => voice.default) || this.voices[0] || null;
  }

  public speak(text: string, options: TTSOptions = {}): Promise<void> {
    return new Promise((resolve, reject) => {
      if (!this.synth) {
        reject(new Error('Speech synthesis not supported'));
        return;
      }

      // Cancel any ongoing speech
      this.synth.cancel();

      if (!text.trim()) {
        resolve();
        return;
      }

      const utterance = new SpeechSynthesisUtterance(text);
      
      // Map language codes to proper locale codes
      const languageMap: Record<string, string> = {
        'en': 'en-US',
        'ru': 'ru-RU',
        'he': 'he-IL'
      };
      
      const targetLanguage = options.language ? (languageMap[options.language] || options.language) : 'en-US';
      
      // Set voice
      if (options.voice) {
        utterance.voice = options.voice;
      } else {
        const defaultVoice = this.getDefaultVoice(options.language || 'en');
        if (defaultVoice) {
          utterance.voice = defaultVoice;
        }
      }

      // Set other options
      utterance.rate = options.rate ?? 0.9; // Slightly slower for better clarity
      utterance.pitch = options.pitch ?? 1.0;
      utterance.volume = options.volume ?? 1.0;
      
      // Set language with proper locale
      utterance.lang = targetLanguage;

      // Set up event handlers
      utterance.onend = () => resolve();
      utterance.onerror = (event) => {
        console.error('TTS Error:', event);
        // Don't reject, just resolve to prevent blocking
        resolve();
      };

      // Add timeout as fallback
      const timeout = setTimeout(() => {
        this.synth.cancel();
        resolve();
      }, 30000); // 30 second timeout

      utterance.onend = () => {
        clearTimeout(timeout);
        resolve();
      };

      // Speak with retry mechanism
      try {
        this.synth.speak(utterance);
        
        // Force start speaking if it doesn't start within 100ms (browser bug workaround)
        setTimeout(() => {
          if (!this.synth.speaking && !this.synth.pending) {
            this.synth.cancel();
            this.synth.speak(utterance);
          }
        }, 100);
      } catch (error) {
        clearTimeout(timeout);
        console.error('TTS Speak Error:', error);
        resolve(); // Don't reject, just resolve
      }
    });
  }

  public stop(): void {
    if (this.synth) {
      this.synth.cancel();
    }
  }

  public isSpeaking(): boolean {
    return this.synth ? this.synth.speaking : false;
  }

  public isPaused(): boolean {
    return this.synth ? this.synth.paused : false;
  }

  public pause(): void {
    if (this.synth && this.synth.speaking) {
      this.synth.pause();
    }
  }

  public resume(): void {
    if (this.synth && this.synth.paused) {
      this.synth.resume();
    }
  }
}

// Create singleton instance
export const tts = new TTSManager();

// Helper function to format text for better speech
export function formatTextForSpeech(text: string): string {
  return text
    .replace(/[^\w\s'-]/g, ' ') // Replace special chars with spaces
    .replace(/\s+/g, ' ') // Collapse multiple spaces
    .trim();
}

// Quick speak function
export async function speak(text: string, options: TTSOptions = {}): Promise<void> {
  const formattedText = formatTextForSpeech(text);
  return tts.speak(formattedText, options);
}

// Stop speaking
export function stopSpeaking(): void {
  tts.stop();
}