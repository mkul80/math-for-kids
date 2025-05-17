import { Injectable } from '@angular/core';

export interface Enemy {
  id: number;
  x: number;
  y: number;
  value: number;
  isTarget: boolean;
}

export interface GameState {
  currentTask: string;
  correctAnswer: number;
  enemies: Enemy[];
}

@Injectable({
  providedIn: 'root',
})
export class MathBlasterBoardGeneratorService {
  private nextEnemyId: number = 1;

  /**
   * Generates a random addition math problem suitable for children
   */
  generateMathProblem(): { task: string; correctAnswer: number } {
    const num1 = Math.floor(Math.random() * 10) + 1;
    const num2 = Math.floor(Math.random() * 10) + 1;
    const task = `${num1} + ${num2} = ?`;
    const correctAnswer = num1 + num2;

    return { task, correctAnswer };
  }

  /**
   * Creates a random incorrect answer that's different from the correct one
   */
  getRandomIncorrectAnswer(correctAnswer: number): number {
    let answer;
    do {
      answer = Math.floor(Math.random() * 20) + 1;
    } while (answer === correctAnswer);
    return answer;
  }

  /**
   * Creates initial enemies for the game including one with the correct answer
   */
  createEnemies(correctAnswer: number, totalEnemies: number = 8): Enemy[] {
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
  setupNewGame(): GameState {
    // Generate a new math problem
    const { task, correctAnswer } = this.generateMathProblem();

    // Create enemies including one with the correct answer
    const enemies = this.createEnemies(correctAnswer);

    return {
      currentTask: task,
      correctAnswer: correctAnswer,
      enemies: enemies,
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
