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
      const languageMap: Record<string, string[]> = {
        'en': ['en-US', 'en-GB', 'en'],
        'ru': ['ru-RU', 'ru'],
        'he': ['he-IL', 'he', 'iw-IL', 'iw']
      };
      
      const requestedLang = options.language || 'en';
      const targetLanguages = languageMap[requestedLang] || [requestedLang];
      
      console.log('TTS: Requested language:', requestedLang);
      console.log('TTS: Available voices:', this.voices.map(v => `${v.name} (${v.lang})`));
      
      // Find best voice for the language
      let selectedVoice: SpeechSynthesisVoice | null = null;
      
      for (const lang of targetLanguages) {
        const matchingVoices = this.voices.filter(voice => 
          voice.lang.toLowerCase().includes(lang.toLowerCase())
        );
        
        if (matchingVoices.length > 0) {
          // Prefer local voices first
          selectedVoice = matchingVoices.find(v => v.localService) || matchingVoices[0];
          console.log('TTS: Selected voice:', selectedVoice.name, selectedVoice.lang);
          break;
        }
      }
      
      // If no voice found for language, warn but continue with default
      if (!selectedVoice) {
        console.warn(`TTS: No voice found for language ${requestedLang}, using default`);
        selectedVoice = this.voices.find(v => v.default) || this.voices[0] || null;
      }
      
      if (selectedVoice) {
        utterance.voice = selectedVoice;
        utterance.lang = selectedVoice.lang;
      } else {
        // Use the requested language even without specific voice
        utterance.lang = targetLanguages[0];
      }

      // Set other options
      utterance.rate = options.rate ?? 0.8; // Slower for better pronunciation
      utterance.pitch = options.pitch ?? 1.0;
      utterance.volume = options.volume ?? 1.0;

      console.log('TTS: Speaking text:', text, 'in language:', utterance.lang);

      // Set up event handlers
      const cleanup = () => {
        clearTimeout(timeout);
      };

      utterance.onstart = () => {
        console.log('TTS: Started speaking');
      };

      utterance.onend = () => {
        console.log('TTS: Finished speaking');
        cleanup();
        resolve();
      };
      
      utterance.onerror = (event) => {
        console.error('TTS Error:', event.error, event);
        cleanup();
        // Don't reject - just resolve to prevent blocking
        resolve();
      };

      // Add timeout as fallback
      const timeout = setTimeout(() => {
        console.warn('TTS: Timeout reached, cancelling');
        this.synth.cancel();
        resolve();
      }, 30000);

      // Speak with retry mechanism
      try {
        this.synth.speak(utterance);
        
        // Force start speaking if it doesn't start within 200ms (browser bug workaround)
        setTimeout(() => {
          if (!this.synth.speaking && !this.synth.pending) {
            console.log('TTS: Retrying speech...');
            this.synth.cancel();
            this.synth.speak(utterance);
          }
        }, 200);
      } catch (error) {
        cleanup();
        console.error('TTS Speak Error:', error);
        resolve();
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