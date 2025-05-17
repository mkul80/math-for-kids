import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MathBlasterSoundService {
  private audioMap: Map<string, HTMLAudioElement> = new Map();
  private backgroundMusic: HTMLAudioElement | null = null;
  private enabled = true;

  constructor() {
    // Preload sounds for better performance
    this.preloadSounds();
    this.setupBackgroundMusic();
  }

  /**
   * Preload sounds to avoid delay on first play
   */
  private preloadSounds(): void {
    this.loadSound('correctHit', 'assets/sounds/success.mp3');
    this.loadSound('wrongHit', 'assets/sounds/wrong.mp3');
    this.loadSound('gameOver', 'assets/sounds/game-over.mp3');
    this.loadSound('levelComplete', 'assets/sounds/level-complete.mp3');
    this.loadSound('shoot', 'assets/sounds/shoot.mp3');
  }

  /**
   * Setup background music
   */
  private setupBackgroundMusic(): void {
    this.backgroundMusic = new Audio('assets/sounds/game-loop.mp3');
    this.backgroundMusic.loop = true;
    this.backgroundMusic.volume = 0.5; // Set volume to 50%
    this.backgroundMusic.preload = 'auto';
  }

  /**
   * Start playing background music
   */
  startBackgroundMusic(): void {
    if (this.enabled && this.backgroundMusic) {
      // Only start if music isn't already playing
      if (this.backgroundMusic.paused) {
        this.backgroundMusic
          .play()
          .catch(error =>
            console.error('Error playing background music:', error)
          );
      }
    }
  }

  /**
   * Stop background music
   */
  stopBackgroundMusic(): void {
    if (this.backgroundMusic) {
      this.backgroundMusic.pause();
      this.backgroundMusic.currentTime = 0;
    }
  }

  /**
   * Load a sound into memory
   */
  private loadSound(id: string, src: string): void {
    const audio = new Audio(src);
    audio.preload = 'auto';
    this.audioMap.set(id, audio);
  }

  /**
   * Play sound for hitting the correct answer
   */
  playCorrectHitSound(): void {
    this.playSound('correctHit');
  }

  /**
   * Play sound for hitting a wrong answer
   */
  playWrongHitSound(): void {
    this.playSound('wrongHit');
  }

  /**
   * Play shooting sound
   */
  playShootSound(): void {
    this.playSound('shoot');
  }

  /**
   * Play game over sound
   */
  playGameOverSound(): void {
    this.playSound('gameOver');
  }

  /**
   * Play level complete sound
   */
  playLevelCompleteSound(): void {
    this.playSound('levelComplete');
  }

  /**
   * Play a sound by its ID
   */
  private playSound(id: string): void {
    if (!this.enabled) return;

    const audio = this.audioMap.get(id);
    if (audio) {
      // Reset sound to beginning if it's already playing
      audio.currentTime = 0;
      audio.play().catch(error => console.error('Error playing sound:', error));
    }
  }

  /**
   * Enable or disable sounds
   */
  setEnabled(enabled: boolean): void {
    this.enabled = enabled;

    // Stop background music if sounds are disabled
    if (!enabled && this.backgroundMusic && !this.backgroundMusic.paused) {
      this.backgroundMusic.pause();
    } else if (enabled && this.backgroundMusic && this.backgroundMusic.paused) {
      // Resume background music if sounds are enabled again
      this.backgroundMusic
        .play()
        .catch(error =>
          console.error('Error resuming background music:', error)
        );
    }
  }
}
