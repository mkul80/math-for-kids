import {
  signalStore,
  withState,
  withMethods,
  withHooks,
  patchState,
} from '@ngrx/signals';
import { Exercise } from '../../models/exercise';
import { LocalStorageService } from '../exercise/local-storage-service';
import { ExerciseAttempt } from '../../models/exercise-attempt';

type FailedExercisesState = {
  failedExerciseSet: Exercise[];
};

const initialState: FailedExercisesState = {
  failedExerciseSet: [],
};

export const FailedExercisesStore = signalStore(
  withState(initialState),
  withHooks((store) => ({
    onDestroy: () => {
      LocalStorageService.saveFailedExercises(store.failedExerciseSet());
    },
  })),
  withMethods((store) => ({
    addFailedExercise(exercise: ExerciseAttempt) {
      // const exerciseAlreadyExists = store
      //   .failedExerciseSet()
      //   .some(
      //     (failed) =>
      //       failed.values[0] === exercise.values[0] &&
      //       failed.values[1] === exercise.values[1] &&
      //       failed.operation === exercise.operation
      //   );
      // if (!exerciseAlreadyExists) {
      //   const { userResult, ...exerciseWithoutResult } = exercise;
      //   patchState(store, (state) => ({
      //     failedExerciseSet: [
      //       ...state.failedExerciseSet,
      //       exerciseWithoutResult,
      //     ],
      //   }));
      // }
    },
  }))
);
