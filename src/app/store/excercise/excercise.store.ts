import {
  patchState,
  signalStore,
  withComputed,
  withHooks,
  withMethods,
  withState,
} from '@ngrx/signals';
import { UserExcercise } from '../../models/user-excercise';
import { getOperationSymbol, Operation } from '../../models/operation';
import { ExcerciseGeneratorService } from '../../business-logic/excercise-generator.service';
import { computed } from '@angular/core';
import { Excercise } from '../../models/excercise';
import { LocalStorageService } from './local-storage-service';

type ExcerciseState = {
  excerciseSet: UserExcercise[];
  failedExcerciseSet: Excercise[];
  currentIndex: number;
};
const initialState: ExcerciseState = {
  excerciseSet: [],
  failedExcerciseSet: [],
  currentIndex: 0,
};

export const ExcerciseStore = signalStore(
  withState(initialState),
  withHooks((store) => ({
    onInit: () => {
      const failedExcercises = LocalStorageService.loadFailedExcercises();
      if (failedExcercises) {
        patchState(store, {
          failedExcerciseSet: failedExcercises,
        });
      }
    },
    onDestroy: () => {
      LocalStorageService.saveFailedExcercises(store.failedExcerciseSet());
    },
  })),
  withComputed((store) => ({
    currentExcercise: computed(() => {
      const currentIndex = store.currentIndex();
      return store.excerciseSet()[currentIndex];
    }),
  })),
  withComputed(({ currentIndex, excerciseSet, currentExcercise }) => ({
    isFinished: computed(() => currentIndex() >= excerciseSet().length),
    isCurrentAnswered: computed(() => {
      return currentExcercise() && currentExcercise().userResult !== undefined;
    }),
    correctResult: computed(() => {
      const operation = currentExcercise().excercise.operation;
      const operationSymbol = getOperationSymbol(operation);
      return `${currentExcercise()?.excercise.firstValue} ${operationSymbol} ${
        currentExcercise()?.excercise.secondValue
      } = ${currentExcercise()?.excercise.result}`;
    }),
    currentFirstValue: computed(() => {
      return excerciseSet()[currentIndex()]?.excercise.firstValue;
    }),
    currentSecondValue: computed(() => {
      return excerciseSet()[currentIndex()]?.excercise.secondValue;
    }),
    currentOperation: computed(() => {
      return excerciseSet()[currentIndex()]?.excercise.operation;
    }),
    currentOperationSymbol: computed(() => {
      const operation = excerciseSet()[currentIndex()]?.excercise.operation;
      return getOperationSymbol(operation);
    }),
    currentExcercise: computed(() => {
      return excerciseSet()[currentIndex()];
    }),
    currentExcerciseResult: computed(() => {
      return excerciseSet()[currentIndex()]?.excercise.result;
    }),
    currentExcerciseUserResult: computed(() => {
      return excerciseSet()[currentIndex()]?.userResult;
    }),
    currentExcerciseResultCorrect: computed(() => {
      const excercise = excerciseSet()[currentIndex()];
      return excercise && excercise.userResult === excercise.excercise.result;
    }),
    currentExcerciseResultIncorrect: computed(() => {
      const excercise = excerciseSet()[currentIndex()];
      return (
        excercise &&
        excercise.userResult !== undefined &&
        excercise.userResult !== excercise.excercise.result
      );
    }),
    errorCount: computed(() => {
      return excerciseSet().filter(
        (excercise) =>
          excercise.userResult !== undefined &&
          excercise.userResult !== excercise.excercise.result
      ).length;
    }),
    correctCount: computed(() => {
      return excerciseSet().filter(
        (excercise) => excercise.userResult === excercise.excercise.result
      ).length;
    }),
    excerciseProgress: computed(() => {
      const totalExcercises = excerciseSet().length;
      const answeredExcercises = currentIndex();
      return (answeredExcercises / totalExcercises) * 100;
    }),
  })),
  withMethods((store) => ({
    configureExcerciseSet(
      operation: Operation,
      difficultyLevel: number,
      count: number
    ): void {
      const excercises = ExcerciseGeneratorService.generateExcerciseSet(
        operation,
        difficultyLevel,
        count
      );
      patchState(store, {
        excerciseSet: excercises.map((excercise) => ({
          excercise: excercise,
          userResult: undefined,
        })),
        currentIndex: 0,
      });
    },
    setAnswer(userResult: number) {
      const isWrongAnswer =
        userResult !== store.currentExcercise().excercise.result;

      patchState(store, (state) => {
        const newState: Partial<ExcerciseState> = {
          excerciseSet: state.excerciseSet.map((excercise, index) => {
            if (index === store.currentIndex()) {
              return { ...excercise, userResult };
            }
            return excercise;
          }),
        };

        if (isWrongAnswer) {
          const exerciseAlreadyExists = state.failedExcerciseSet.some(
            (failed) =>
              failed.firstValue === store.currentExcercise().excercise.firstValue &&
              failed.secondValue === store.currentExcercise().excercise.secondValue &&
              failed.operation === store.currentExcercise().excercise.operation
          );

          if (!exerciseAlreadyExists) {
            newState.failedExcerciseSet = [
              ...state.failedExcerciseSet,
              store.currentExcercise().excercise,
            ];
          }
        }

        return newState;
      });
    },
    nextExcercise() {
      patchState(store, (state) => ({
        currentIndex: state.currentIndex + 1,
      }));
    },
  }))
);
