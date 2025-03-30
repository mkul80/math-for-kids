import {
  patchState,
  signalStore,
  withComputed,
  withHooks,
  withMethods,
  withProps,
  withState,
} from '@ngrx/signals';
import { UserExcercise } from '../../models/user-excercise';
import { Operation } from '../../models/operation';
import { ExcerciseGeneratorService } from '../../business-logic/excercise-generator.service';
import { computed } from '@angular/core';

type ExcerciseState = {
  excerciseSet: UserExcercise[];
  currentExcerciseIndex: number;
};
const initialState: ExcerciseState = {
  excerciseSet: [],
  currentExcerciseIndex: 0,
};

export const ExcerciseStore = signalStore(
  withState(initialState),
  withComputed((store) => ({
    isFinished: computed(
      () => store.currentExcerciseIndex() >= store.excerciseSet().length
    ),
    isCurrentAnswered: computed(() => {
      const current = store.excerciseSet()[store.currentExcerciseIndex()];
      return current && current.userResult !== undefined;
    }),
  })),
  withMethods((store) => ({
    configureExcerciseSet(
      operation: Operation,
      totalRange: number,
      count: number
    ): void {
      const excercises = ExcerciseGeneratorService.generateExcercise(
        operation,
        totalRange,
        count
      );
      patchState(store, {
        excerciseSet: excercises.map((excercise) => ({
          excercise: excercise,
          userResult: undefined,
        })),
        currentExcerciseIndex: 0,
      });
    },
    setAnswer(userResult: number) {
      patchState(store, () => ({
        excerciseSet: store.excerciseSet().map((excercise, index) => {
          if (index === store.currentExcerciseIndex()) {
            return { ...excercise, userResult };
          }
          return excercise;
        }),
      }));
    },
    nextExcercise() {
      patchState(store, (state) => ({
        currentExcerciseIndex: state.currentExcerciseIndex + 1,
      }));
    },
  }))
);
