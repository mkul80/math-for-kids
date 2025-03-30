import { Injectable } from '@angular/core';
import { Operation } from '../models/operation';

@Injectable({
  providedIn: 'root',
})
export class UserPreferences {
  static readonly valueTotalRanges = [
    { value: 10, label: 'Do 10 🦊' },
    { value: 20, label: 'Do 20 🐼' },
    { value: 50, label: 'Do 50 🦁' },
    { value: 100, label: 'Do 100 🐯' },
  ];

  static readonly excercisesCounts = [
    { value: 5, label: '5 zadań 🐰' },
    { value: 10, label: '10 zadań 🐨' },
    { value: 15, label: '15 zadań 🦘' },
    { value: 20, label: '20 zadań 🦒' },
  ];

  static readonly mathOperations = [
    { label: '➕ Dodawanie', value: Operation.Addition },
    { label: '➖ Odejmowanie', value: Operation.Subtraction },
    { label: '✖️ Mnożenie', value: Operation.Multiplication },
    { label: '➗ Dzielenie', value: Operation.Division },
  ];
}
