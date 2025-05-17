import { Injectable } from '@angular/core';
import {
  DifficultyLevel,
  Enemy,
  GameState,
} from '../models/math-blaster.models';

@Injectable({
  providedIn: 'root',
})
export class MathBlasterMathProblemService {
  private nextEnemyId: number = 1;
  private currentDifficulty: DifficultyLevel = DifficultyLevel.Easy;

  /**
   * Set the game difficulty level
   */
  setDifficulty(level: DifficultyLevel): void {
    this.currentDifficulty = level;
  }

  /**
   * Generates a math problem based on current difficulty
   */
  generateMathProblem(): { task: string; correctAnswer: number } {
    switch (this.currentDifficulty) {
      case DifficultyLevel.Easy:
        return this.generateAdditionProblem(1, 10);
      case DifficultyLevel.Medium:
        return this.generateMixedProblem(1, 15);
      case DifficultyLevel.Hard:
        return this.generateMixedProblem(5, 20);
      default:
        return this.generateAdditionProblem(1, 10);
    }
  }

  /**
   * Generates an addition problem
   */
  private generateAdditionProblem(
    min: number,
    max: number
  ): { task: string; correctAnswer: number } {
    const num1 = Math.floor(Math.random() * (max - min + 1)) + min;
    const num2 = Math.floor(Math.random() * (max - min + 1)) + min;
    const task = `${num1} + ${num2} = ?`;
    const correctAnswer = num1 + num2;

    return { task, correctAnswer };
  }

  /**
   * Generates a mixed problem (addition or subtraction)
   */
  private generateMixedProblem(
    min: number,
    max: number
  ): { task: string; correctAnswer: number } {
    const operation = Math.random() > 0.5 ? '+' : '-';
    let num1 = Math.floor(Math.random() * (max - min + 1)) + min;
    let num2 = Math.floor(Math.random() * (max - min + 1)) + min;

    // For subtraction, ensure num1 >= num2 to avoid negative results
    if (operation === '-' && num1 < num2) {
      [num1, num2] = [num2, num1]; // Swap values
    }

    const task = `${num1} ${operation} ${num2} = ?`;
    const correctAnswer = operation === '+' ? num1 + num2 : num1 - num2;

    return { task, correctAnswer };
  }

  /**
   * Creates a random incorrect answer that's different from the correct one
   */
  getRandomIncorrectAnswer(correctAnswer: number): number {
    // Generate range based on difficulty
    const maxRange =
      this.currentDifficulty === DifficultyLevel.Easy
        ? 20
        : this.currentDifficulty === DifficultyLevel.Medium
        ? 30
        : 40;

    let answer;
    do {
      answer = Math.floor(Math.random() * maxRange) + 1;
    } while (answer === correctAnswer);
    return answer;
  }

  /**
   * Creates initial enemies for the game including one with the correct answer
   */
  createEnemies(correctAnswer: number): Enemy[] {
    // Number of enemies increases with difficulty
    const totalEnemies =
      this.currentDifficulty === DifficultyLevel.Easy
        ? 5
        : this.currentDifficulty === DifficultyLevel.Medium
        ? 8
        : 12;

    const enemies: Enemy[] = [];

    for (let i = 0; i < totalEnemies; i++) {
      const isCorrect = i === 0; // First enemy is the correct answer
      const value = isCorrect
        ? correctAnswer
        : this.getRandomIncorrectAnswer(correctAnswer);

      enemies.push({
        id: this.nextEnemyId++,
        x: 10 + Math.random() * 80, // Random position between 10% and 90%
        y: 10 + Math.random() * 40, // Random position between 10% and 50%
        value,
        isTarget: isCorrect,
      });
    }

    return enemies;
  }

  /**
   * Sets up a new game state with a math problem and enemies
   */
  setupNewProblem(): GameState {
    // Generate a new math problem
    const { task, correctAnswer } = this.generateMathProblem();

    // Create enemies including one with the correct answer
    const enemies = this.createEnemies(correctAnswer);

    return {
      currentTask: task,
      correctAnswer,
      enemies,
    };
  }

  /**
   * Resets the enemy ID counter
   */
  resetEnemyIdCounter(): void {
    this.nextEnemyId = 1;
  }

  /**
   * Gets the next enemy ID and increments the counter
   */
  getNextEnemyId(): number {
    return this.nextEnemyId++;
  }
}
