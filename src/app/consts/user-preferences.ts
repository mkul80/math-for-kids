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
    { value: DifficultyLevel.Easy, labelKey: 'difficulty_level_easy' },
    { value: DifficultyLevel.Medium, labelKey: 'difficulty_level_medium' },
    { value: DifficultyLevel.Hard, labelKey: 'difficulty_level_hard' },
  ],

  exerciseTypes: [
    { value: ExerciseType.Simple, labelKey: 'exercise_type_simple' },
    { value: ExerciseType.Word, labelKey: 'exercise_type_word' },
  ],

  mathOperations: [
    { labelKey: 'operation_addition', value: '+' },
    { labelKey: 'operation_subtraction', value: '-' },
    // { label: '✖️ Mnożenie', value: Operation.Multiplication },
    // { label: '➗ Dzielenie', value: Operation.Division },
  ],
} as const;

export const localStorageKeys = {
  failedUserExercises: 'failedUserExercises',
  userScore: 'userScore',
  language: 'language',
} as const;
