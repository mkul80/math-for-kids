import { exerciseSettings } from '../consts/user-settings';
import { Exercise } from '../models/exercise';
import { Operation } from '../models/operation';

export class TernaryArithmeticExerciseGenerator {
  static generateExerciseSet(
    operation: Operation,
    difficultyLevel: number
  ): Exercise[] {
    const exercises: Exercise[] = [];
    console.log('difficultyLevel', difficultyLevel);
    for (let i = 0; i < exerciseSettings.exerciseCount; i++) {
      let values: number[];
      let result: number;

      if (operation === Operation.Addition) {
        // Keep existing addition logic
        const firstValue = Math.floor(Math.random() * (difficultyLevel / 2));
        const secondValue = Math.floor(
          (Math.random() * (difficultyLevel - firstValue)) / 2
        );
        const thirdValue = Math.floor(
          Math.random() * (difficultyLevel - firstValue - secondValue)
        );

        values = [firstValue, secondValue, thirdValue];
        result = firstValue + secondValue + thirdValue;
      } else {
        // New subtraction logic with difficulty levels
        let firstValue = 0;
        let secondValue = 0;
        let thirdValue = 0;

        switch (difficultyLevel) {
          case 0: // Easy: small numbers
            firstValue = Math.floor(Math.random() * 5) + 11; // 11-15
            secondValue = Math.floor(Math.random() * 3) + 1; // 1-3
            thirdValue = Math.floor(Math.random() * 2) + 1; // 1-2
            break;
          case 1: // Medium: larger numbers
            firstValue = Math.floor(Math.random() * 5) + 15; // 15-19
            secondValue = Math.floor(Math.random() * 4) + 2; // 2-5
            thirdValue = Math.floor(Math.random() * 3) + 2; // 2-4
            break;
          case 2: // Hard: largest numbers
            firstValue = 20;
            secondValue = Math.floor(Math.random() * 5) + 3; // 3-7
            thirdValue = Math.floor(Math.random() * 4) + 3; // 3-6
            break;
        }

        values = [firstValue, secondValue, thirdValue];
        result = firstValue - secondValue - thirdValue;
      }

      exercises.push({
        values,
        operation,
        result,
      });
    }
    console.log('exercises', difficultyLevel, exercises);
    return exercises;
  }
}
