import { Exercise } from './exercise';

export class ExerciseAttempt {
  constructor(
    public readonly exerciseDefinition: Exercise,
    public readonly wordExercise?: string,
    public readonly object?: string,
    public readonly userResult?: number
  ) {}

  withUserResult(userResult: number): ExerciseAttempt {
    return new ExerciseAttempt(
      this.exerciseDefinition,
      this.wordExercise,
      this.object,
      userResult
    );
  }

  toString(): string {
    return this.wordExercise || this.exerciseDefinition.toString();
  }
}
