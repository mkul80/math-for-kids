import { localStorageKeys } from '../../consts/user-preferences';
import { Exercise } from '../../models/exercise';

export class LocalStorageService {
  static saveFailedExercises(failedExercises: Exercise[]): void {
    localStorage.setItem(
      localStorageKeys.failedUserExercises,
      JSON.stringify(failedExercises)
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
}
