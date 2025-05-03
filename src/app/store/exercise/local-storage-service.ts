import { localStorageKeys } from '../../consts/user-preferences';
import { Exercise } from '../../models/exercise';
import { UserScore } from '../../models/user-score';

export class LocalStorageService {
  static getLanguage(): string | null {
    return localStorage.getItem(localStorageKeys.language);
  }
  static setLanguage(language: string): void {
    localStorage.setItem(localStorageKeys.language, language);
  }
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

  static saveUserScore(score: UserScore): void {
    localStorage.setItem(localStorageKeys.userScore, JSON.stringify(score));
  }

  static getUserScore(): UserScore | null {
    const userScore = localStorage.getItem(localStorageKeys.userScore);
    if (userScore) {
      return JSON.parse(userScore) as UserScore;
    }
    return null;
  }
}
