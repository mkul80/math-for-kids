import { Operation } from '../models/operation';

export const userPreferences = {
  difficultyLevels: [
    { value: 0, label: 'Łatwy 🦊' },
    { value: 1, label: 'Średni 🐼' },
    { value: 2, label: 'Trudny 🐯' },
  ],

  excercisesCounts: [
    { value: 5, label: '5 zadań 🐰' },
    { value: 10, label: '10 zadań 🐨' },
    { value: 15, label: '15 zadań 🦘' },
    { value: 20, label: '20 zadań 🦒' },
  ],

  mathOperations: [
    { label: '➕ Dodawanie', value: Operation.Addition },
    { label: '➖ Odejmowanie', value: Operation.Subtraction },
    // { label: '✖️ Mnożenie', value: Operation.Multiplication },
    // { label: '➗ Dzielenie', value: Operation.Division },
  ],
} as const;

export const localStorageKeys = {
  failedUserExcercises: 'failedUserExcercises',
} as const;
