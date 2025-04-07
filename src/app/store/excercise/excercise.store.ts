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
import { localStorageKeys } from '../../consts/user-preferences';

type ExcerciseState = {
  excerciseSet: UserExcercise[];
  failedExcerciseSet: Excercise[];
  currentExcerciseIndex: number;
};
const initialState: ExcerciseState = {
  excerciseSet: [],
  failedExcerciseSet: [],
  currentExcerciseIndex: 0,
};

export const ExcerciseStore = signalStore(
  withState(initialState),
  withHooks((store) => ({
    onInit: () => {
      const failedExcerciseSet = localStorage.getItem(
        localStorageKeys.failedUserExcercises
      );
      if (failedExcerciseSet) {
        const parsedFailedExcerciseSet = JSON.parse(
          failedExcerciseSet
        ) as Excercise[];
        patchState(store, {
          failedExcerciseSet: parsedFailedExcerciseSet,
        });
      }
    },
    onDestroy: () => {
      localStorage.setItem(
        localStorageKeys.failedUserExcercises,
        JSON.stringify(store.failedExcerciseSet())
      );
    },
  })),
  withComputed((store) => ({
    isFinished: computed(
      () => store.currentExcerciseIndex() >= store.excerciseSet().length
    ),
    isCurrentAnswered: computed(() => {
      const current = store.excerciseSet()[store.currentExcerciseIndex()];
      return current && current.userResult !== undefined;
    }),
    correctResult: computed(() => {
      const current = store.excerciseSet()[store.currentExcerciseIndex()];
      const operation = current.excercise.operation;
      const operationSymbol = getOperationSymbol(operation);
      return `${current?.excercise.firstValue} ${operationSymbol} ${current?.excercise.secondValue} = ${current?.excercise.result}`;
    }),
    currentFirstValue: computed(() => {
      const currentIndex = store.currentExcerciseIndex();
      return store.excerciseSet()[currentIndex]?.excercise.firstValue;
    }),
    currentSecondValue: computed(() => {
      const currentIndex = store.currentExcerciseIndex();
      return store.excerciseSet()[currentIndex]?.excercise.secondValue;
    }),
    currentOperation: computed(() => {
      const currentIndex = store.currentExcerciseIndex();
      return store.excerciseSet()[currentIndex]?.excercise.operation;
    }),
    currentOperationSymbol: computed(() => {
      const currentIndex = store.currentExcerciseIndex();
      const operation = store.excerciseSet()[currentIndex]?.excercise.operation;
      return getOperationSymbol(operation);
    }),
    currentExcercise: computed(() => {
      const currentIndex = store.currentExcerciseIndex();
      return store.excerciseSet()[currentIndex];
    }),
    currentExcerciseResult: computed(() => {
      const currentIndex = store.currentExcerciseIndex();
      return store.excerciseSet()[currentIndex]?.excercise.result;
    }),
    currentExcerciseUserResult: computed(() => {
      const currentIndex = store.currentExcerciseIndex();
      return store.excerciseSet()[currentIndex]?.userResult;
    }),
    currentExcerciseResultCorrect: computed(() => {
      const currentIndex = store.currentExcerciseIndex();
      const excercise = store.excerciseSet()[currentIndex];
      return excercise && excercise.userResult === excercise.excercise.result;
    }),
    currentExcerciseResultIncorrect: computed(() => {
      const currentIndex = store.currentExcerciseIndex();
      const excercise = store.excerciseSet()[currentIndex];
      return (
        excercise &&
        excercise.userResult !== undefined &&
        excercise.userResult !== excercise.excercise.result
      );
    }),
    errorCount: computed(() => {
      return store
        .excerciseSet()
        .filter(
          (excercise) =>
            excercise.userResult !== undefined &&
            excercise.userResult !== excercise.excercise.result
        ).length;
    }),
    correctCount: computed(() => {
      return store
        .excerciseSet()
        .filter(
          (excercise) => excercise.userResult === excercise.excercise.result
        ).length;
    }),
    excerciseProgress: computed(() => {
      const totalExcercises = store.excerciseSet().length;
      const answeredExcercises = store.currentExcerciseIndex();
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
        currentExcerciseIndex: 0,
      });
    },
    setAnswer(userResult: number) {
      const currentExcercise =
        store.excerciseSet()[store.currentExcerciseIndex()];
      const isWrongAnswer = userResult !== currentExcercise.excercise.result;

      patchState(store, (state) => {
        const newState: Partial<ExcerciseState> = {
          excerciseSet: state.excerciseSet.map((excercise, index) => {
            if (index === store.currentExcerciseIndex()) {
              return { ...excercise, userResult };
            }
            return excercise;
          }),
        };

        if (isWrongAnswer) {
          const exerciseAlreadyExists = state.failedExcerciseSet.some(
            (failed) =>
              failed.firstValue === currentExcercise.excercise.firstValue &&
              failed.secondValue === currentExcercise.excercise.secondValue &&
              failed.operation === currentExcercise.excercise.operation
          );

          if (!exerciseAlreadyExists) {
            newState.failedExcerciseSet = [
              ...state.failedExcerciseSet,
              currentExcercise.excercise,
            ];
          }
        }

        return newState;
      });
    },
    nextExcercise() {
      patchState(store, (state) => ({
        currentExcerciseIndex: state.currentExcerciseIndex + 1,
      }));
    },
  }))
);
