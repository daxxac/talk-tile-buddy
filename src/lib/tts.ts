// Text-to-Speech utility using Browser Accessibility Features

export interface TTSOptions {
  voice?: SpeechSynthesisVoice;
  rate?: number;
  pitch?: number;
  volume?: number;
  language?: string;
}

class AccessibilityTTSManager {
  private liveRegion: HTMLElement | null = null;
  private synth: SpeechSynthesis;

  constructor() {
    this.synth = window.speechSynthesis;
    this.createLiveRegion();
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

  public announceText(text: string): void {
    if (this.liveRegion) {
      // Clear and set new text for screen reader
      this.liveRegion.textContent = '';
      setTimeout(() => {
        if (this.liveRegion) {
          this.liveRegion.textContent = text;
        }
      }, 10);
    }

    // Also try browser's built-in speech if available
    this.tryNativeSpeech(text);
  }

  private tryNativeSpeech(text: string): void {
    // Use browser's accessibility speech features
    if ('speechSynthesis' in window && this.synth) {
      // Cancel any ongoing speech
      this.synth.cancel();
      
      const utterance = new SpeechSynthesisUtterance(text);
      
      // Use browser's default accessibility voice
      const voices = this.synth.getVoices();
      const defaultVoice = voices.find(voice => voice.default) || voices[0];
      
      if (defaultVoice) {
        utterance.voice = defaultVoice;
        utterance.lang = defaultVoice.lang;
      }
      
      utterance.rate = 0.9;
      utterance.pitch = 1.0;
      utterance.volume = 1.0;

      try {
        this.synth.speak(utterance);
      } catch (error) {
        console.log('Native speech not available, relying on screen reader');
      }
    }
  }

  public speak(text: string, options: TTSOptions = {}): Promise<void> {
    return new Promise((resolve) => {
      if (!text.trim()) {
        resolve();
        return;
      }

      // Use accessibility announcement
      this.announceText(text);
      
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

// Quick speak function
export async function speak(text: string, options: TTSOptions = {}): Promise<void> {
  const formattedText = formatTextForSpeech(text);
  return tts.speak(formattedText, options);
}

// Stop speaking
export function stopSpeaking(): void {
  tts.stop();
}