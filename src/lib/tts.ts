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
    const languageVoices = this.getVoicesByLanguage(language);
    
    // Prefer local voices
    const localVoice = languageVoices.find(voice => voice.localService);
    if (localVoice) return localVoice;
    
    // Fallback to any voice for the language
    return languageVoices[0] || this.voices[0] || null;
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
      
      // Set voice
      if (options.voice) {
        utterance.voice = options.voice;
      } else if (options.language) {
        const defaultVoice = this.getDefaultVoice(options.language);
        if (defaultVoice) {
          utterance.voice = defaultVoice;
        }
      }

      // Set other options
      utterance.rate = options.rate ?? 1.0;
      utterance.pitch = options.pitch ?? 1.0;
      utterance.volume = options.volume ?? 1.0;
      
      if (options.language) {
        utterance.lang = options.language;
      }

      // Set up event handlers
      utterance.onend = () => resolve();
      utterance.onerror = () => reject(new Error('Speech synthesis failed'));

      // Speak
      this.synth.speak(utterance);
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