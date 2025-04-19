import { localStorageKeys } from '../../consts/user-preferences';
import { Exercise } from '../../models/exercise';

export class LocalStorageService {
  static saveFailedExercises(failedExercises: Exercise[]): void {
    const existingExercises = this.loadFailedExercises() || [];
    const combinedExercises = [...existingExercises, ...failedExercises];
    localStorage.setItem(
      localStorageKeys.failedUserExercises,
      JSON.stringify(combinedExercises)
    );
  }

  static loadFailedExercises(): Exercise[] | null {
    const failedExerciseSet = localStorage.getItem(
      localStorageKeys.failedUserExercises
    );
    if (failedExerciseSet) {
      return JSON.parse(failedExerciseSet) as Exercise[];
    }
    return null;
  }

  static saveUserScore(score: number): void {
    const existingScore = this.loadUserScore() || 0;
    const totalScore = existingScore + score;
    localStorage.setItem(
      localStorageKeys.userScore,
      JSON.stringify(totalScore)
    );
  }

  static loadUserScore(): number | null {
    const userScore = localStorage.getItem(localStorageKeys.userScore);
    if (userScore) {
      return JSON.parse(userScore) as number;
    }
    return null;
  }
}
