import { Exercise, ExerciseBuilder, Operation } from '../models/exercise';

export type DifficultyLevel = 0 | 1 | 2;

export class ExerciseGenerator {
  static generateExercise(
    numbersCount: number,
    level: DifficultyLevel,
    operations?: Operation[]
  ): Exercise {
    const availableOperations: Operation[] = ['+', '-'];
    const actualOperations =
      operations ||
      Array(numbersCount - 1)
        .fill(null)
        .map(
          () =>
            availableOperations[
              ExerciseGenerator.getRandomInt(0, availableOperations.length - 1)
            ]
        );

    if (actualOperations.length !== numbersCount - 1) {
      throw new Error(
        `Number of operations must be ${numbersCount - 1}, but got ${
          actualOperations.length
        }`
      );
    }

    const levelSettings = [
      { maxStart: 9, maxStep: 9 },
      { maxStart: 20, maxStep: 9 },
      { maxStart: 40, maxStep: 15 },
    ];

    const { maxStart, maxStep } = levelSettings[level];
    const builder = new ExerciseBuilder();

    // Start with a random number between 1 and maxStart
    let current = ExerciseGenerator.getRandomInt(3, maxStart);
    builder.first(current);

    for (let i = 0; i < numbersCount - 1; i++) {
      let nextVal: number;
      const operation = actualOperations[i];

      if (operation === '+') {
        nextVal = ExerciseGenerator.getRandomInt(1, maxStep);
      } else {
        // Ensure that the next value does not exceed the current value
        // to avoid negative results
        nextVal = ExerciseGenerator.getRandomInt(1, Math.min(current, maxStep));
      }

      current = operation === '+' ? current + nextVal : current - nextVal;
      builder.add(operation, nextVal);
    }

    return builder.build();
  }

  private static getRandomInt(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}
