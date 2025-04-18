import { Exercise } from '../models/exercise';
import { Operation } from '../models/operation';

export class ArithmeticExerciseGenerator {
  static generateExercises(
    operation: Operation,
    maximumValue: number,
    exercisesCounts: number
  ): Exercise[] {
    const exercises: Exercise[] = [];

    for (let i = 0; i < exercisesCounts; i++) {
      let values: number[];
      let result: number;

      if (operation === Operation.Addition) {
        // Generate values ensuring sum doesn't exceed maximumValue
        const firstValue = Math.floor(Math.random() * (maximumValue / 2));
        const secondValue = Math.floor(
          (Math.random() * (maximumValue - firstValue)) / 2
        );
        const thirdValue = Math.floor(
          Math.random() * (maximumValue - firstValue - secondValue)
        );

        values = [firstValue, secondValue, thirdValue];
        result = firstValue + secondValue + thirdValue;
      } else {
        // Generate values ensuring positive result for subtraction
        const firstValue = Math.floor(Math.random() * maximumValue) + 1;
        const secondValue = Math.floor(Math.random() * firstValue);
        const thirdValue = Math.floor(
          Math.random() * (firstValue - secondValue)
        );

        values = [firstValue, secondValue, thirdValue];
        result = firstValue - secondValue - thirdValue;
      }

      exercises.push({
        values,
        operation,
        result,
      });
    }

    return exercises;
  }
}
