import { Operation } from '../models/operation';

enum ExerciseType {
  Simple = 'simple',
  Word = 'word',
}

enum DifficultyLevel {
  Easy = 0,
  Medium = 1,
  Hard = 2,
}

export const userPreferences = {
  difficultyLevels: [
    { value: DifficultyLevel.Easy, label: '🦊 Łatwy' },
    { value: DifficultyLevel.Medium, label: '🐼 Średni' },
    { value: DifficultyLevel.Hard, label: '🐯 Trudny' },
  ],

  exerciseTypes: [
    { value: ExerciseType.Simple, label: 'Proste działania' },
    { value: ExerciseType.Word, label: 'Zadania tekstowe' },
  ],

  mathOperations: [
    { label: '➕ Dodawanie', value: Operation.Addition },
    { label: '➖ Odejmowanie', value: Operation.Subtraction },
    // { label: '✖️ Mnożenie', value: Operation.Multiplication },
    // { label: '➗ Dzielenie', value: Operation.Division },
  ],
} as const;

export const localStorageKeys = {
  failedUserExercises: 'failedUserExercises',
} as const;
