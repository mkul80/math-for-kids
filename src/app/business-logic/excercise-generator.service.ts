import { Injectable } from '@angular/core';
import { Excercise } from '../models/excercise';
import { Operation } from '../models/operation';

@Injectable({
  providedIn: 'root',
})
export class ExcerciseGeneratorService {
  constructor() {}

  static generateExcercise(
    operation: Operation,
    totalRanges: number,
    excercisesCounts: number
  ) {
    const excercises: Excercise[] = [];
    for (let i = 0; i < excercisesCounts; i++) {
      const firstValue = Math.floor(Math.random() * (totalRanges - 1));
      const secondValue = Math.floor(
        Math.random() * (totalRanges - firstValue) + 1
      );
      const excercise: Excercise = {
        firstValue,
        secondValue,
        operation,
        result: firstValue + secondValue,
      };
      excercises.push(excercise);
    }
    return excercises;
  }
}
