import { Injectable } from '@angular/core';
import { Enemy } from '../models/math-blaster.models';

@Injectable({
  providedIn: 'root',
})
export class MathBlasterScoreManagerService {
  private score = 0;
  private lives = 5;

  constructor() {}

  /**
   * Get current score
   */
  getScore(): number {
    return this.score;
  }

  /**
   * Add points based on enemy type
   */
  addPoints(enemy: Enemy): void {
    if (enemy.isTarget) {
      this.score += 100; // More points for correct target
    } else {
      this.score -= 50; // Deduct points for hitting wrong answers
    }

    // Don't let score go below zero
    this.score = Math.max(0, this.score);
  }

  /**
   * Get remaining lives
   */
  getLives(): number {
    return this.lives;
  }

  /**
   * Decrease life counter
   */
  decreaseLife(): void {
    if (this.lives > 0) {
      this.lives--;
    }
  }

  /**
   * Check if player is out of lives
   */
  isGameOver(): boolean {
    return this.lives <= 0;
  }

  /**
   * Reset score and lives for new game
   */
  reset(): void {
    this.score = 0;
    this.lives = 5;
  }
}
