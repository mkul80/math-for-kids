import { Operation } from '../models/operation';
import { Excercise } from '../models/excercise';

export class ExcerciseGeneratorService {
  static generateExcerciseSet(
    operation: Operation,
    difficultyLevel: number,
    count: number
  ): Excercise[] {
    if (difficultyLevel < 0 || difficultyLevel > 2) {
      throw new Error('Difficulty level out of range. Must be 0, 1, or 2');
    }

    return Array(count)
      .fill(null)
      .map(() => this.generateExcercise(operation, difficultyLevel));
  }

  private static generateExcercise(
    operation: Operation,
    difficultyLevel: number
  ): Excercise {
    let firstValue: number;
    let secondValue: number;

    if (operation === Operation.Addition) {
      [firstValue, secondValue] = this.generateAdditionValues(difficultyLevel);
    } else if (operation === Operation.Subtraction) {
      [firstValue, secondValue] =
        this.generateSubtractionValues(difficultyLevel);
    } else {
      throw new Error('Unknown operation');
    }

    return {
      firstValue,
      secondValue,
      operation,
      result: this.calculateResult(firstValue, secondValue, operation),
    };
  }

  private static generateAdditionValues(
    difficultyLevel: number
  ): [number, number] {
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

  private static generateSubtractionValues(
    difficultyLevel: number
  ): [number, number] {
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
