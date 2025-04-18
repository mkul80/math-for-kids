import { Operation } from '../models/operation';
import { Exercise } from '../models/exercise';
import { exerciseSettings } from '../consts/user-settings';

export class BinaryArithmeticExerciseGenerator {
  static generateExerciseSet(
    operation: Operation,
    difficultyLevel: number
  ): Exercise[] {
    if (difficultyLevel < 0 || difficultyLevel > 2) {
      throw new Error('Difficulty level out of range. Must be 0, 1, or 2');
    }
    console.log('exerciseCount', exerciseSettings.exerciseCount);
    return Array(exerciseSettings.exerciseCount)
      .fill(null)
      .map(() => this.generateExercise(operation, difficultyLevel));
  }

  private static generateExercise(
    operation: Operation,
    difficultyLevel: number
  ): Exercise {
    let values: number[];

    if (operation === Operation.Addition) {
      values = this.generateAdditionValues(difficultyLevel);
    } else if (operation === Operation.Subtraction) {
      values = this.generateSubtractionValues(difficultyLevel);
    } else {
      throw new Error('Unknown operation');
    }

    return {
      values,
      operation,
      result: this.calculateResult(values[0], values[1], operation),
    };
  }

  private static generateAdditionValues(difficultyLevel: number): number[] {
    switch (difficultyLevel) {
      case 0: {
        const first = Math.floor(Math.random() * 9) + 1;
        const maxSecond = Math.min(9, 10 - first);
        const second = Math.floor(Math.random() * maxSecond) + 1;
        return [first, second];
      }
      case 1: {
        const first = Math.floor(Math.random() * 10) + 10;
        const maxSecond = Math.min(9, 20 - first);
        const second = Math.floor(Math.random() * maxSecond) + 1;
        return [first, second];
      }
      case 2: {
        let first, second;
        do {
          first = Math.floor(Math.random() * 21);
          second = Math.floor(Math.random() * 21);
        } while (first + second > 20);
        return [first, second];
      }
      default:
        throw new Error('Invalid difficulty level');
    }
  }

  /**
   * Generates two numbers for subtraction based on the difficulty level
   * @param difficultyLevel - The difficulty level (0: easy, 1: medium, 2: hard)
   * @returns An array of two numbers where the first number is always greater than the second
   *
   * Difficulty levels:
   * - Level 0: Single digit numbers (1-9)
   * - Level 1: First number 10-19, second number is smaller than first number's ones digit
   * - Level 2: First number 10-19, second number is larger than first number's ones digit
   */
  private static generateSubtractionValues(difficultyLevel: number): number[] {
    switch (difficultyLevel) {
      case 0: {
        const first = Math.floor(Math.random() * 9) + 1;
        const second = Math.floor(Math.random() * first) + 1;
        return [first, second];
      }
      case 1: {
        const first = Math.floor(Math.random() * 10) + 10;
        const secondDigit = first % 10;
        const second = Math.floor(Math.random() * secondDigit) + 1;
        return [first, second];
      }
      case 2: {
        const first = Math.floor(Math.random() * 10) + 10;
        const secondDigit = first % 10;
        const second =
          Math.floor(Math.random() * (first - secondDigit - 1)) +
          secondDigit +
          1;
        return [first, second];
      }
      default:
        throw new Error('Invalid difficulty level');
    }
  }

  private static calculateResult(
    first: number,
    second: number,
    operation: Operation
  ): number {
    switch (operation) {
      case Operation.Addition:
        return first + second;
      case Operation.Subtraction:
        return first - second;
      default:
        throw new Error('Unknown operation');
    }
  }
}
