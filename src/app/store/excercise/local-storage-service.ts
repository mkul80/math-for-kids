import { localStorageKeys } from '../../consts/user-preferences';
import { Excercise } from '../../models/excercise';

export class LocalStorageService {
  static saveFailedExcercises(failedExcercises: Excercise[]): void {
    localStorage.setItem(
      localStorageKeys.failedUserExcercises,
      JSON.stringify(failedExcercises)
    );
  }

  static loadFailedExcercises(): Excercise[] | null {
    const failedExcerciseSet = localStorage.getItem(
      localStorageKeys.failedUserExcercises
    );
    if (failedExcerciseSet) {
      return JSON.parse(failedExcerciseSet) as Excercise[];
    }
    return null;
  }
}
