import { inject } from '@angular/core';
import {
  patchState,
  signalStore,
  withComputed,
  withHooks,
  withMethods,
  withState,
} from '@ngrx/signals';
import { UserExercise } from '../../models/user-exercise';
import { getOperationSymbol, Operation } from '../../models/operation';
import { computed } from '@angular/core';
import { FailedExercisesStore } from '../failed-exercises/failed-exercises.store';
import { BinaryArithmeticExerciseGenerator } from '../../business-logic/binary-arythmetic-exercise-generator.service';
import { TernaryArithmeticExerciseGenerator } from '../../business-logic/ternary-arithmetic-exercise-generator.service';
import { MathTasksProviderService } from '../../business-logic/math-tasks-provider.service';
import { LocalStorageService } from './local-storage-service';

type ExerciseExecutionState = {
  exerciseSet: UserExercise[];
  score: number;
  currentIndex: number;
};

const initialState: ExerciseExecutionState = {
  exerciseSet: [],
  currentIndex: 0,
  score: LocalStorageService.getUserScore() ?? 0,
};

export const ExerciseExecutionStore = signalStore(
  withState(initialState),
  withHooks({
    onDestroy: (store) => {
      LocalStorageService.saveUserScore(store.score());
    },
  }),
  withComputed((store) => ({
    currentExercise: computed(() => {
      const currentIndex = store.currentIndex();
      return store.exerciseSet()[currentIndex];
    }),
  })),
  withComputed(
    ({
      currentIndex,
      exerciseSet: excerciseSet,
      currentExercise: currentExercise,
    }) => ({
      isFinished: computed(() => currentIndex() >= excerciseSet().length),
      isCurrentAnswered: computed(() => {
        return currentExercise() && currentExercise().userResult !== undefined;
      }),
      correctResult: computed(() => {
        const operation = currentExercise().operation;
        const operationSymbol = getOperationSymbol(operation);
        const values = currentExercise().values;
        return (
          values.join(` ${operationSymbol} `) + '= ' + currentExercise().result
        );
      }),

      currentValues: computed(() => {
        return excerciseSet()[currentIndex()]?.values;
      }),
      currentOperation: computed(() => {
        return excerciseSet()[currentIndex()]?.operation;
      }),
      currentOperationSymbol: computed(() => {
        const operation = excerciseSet()[currentIndex()]?.operation;
        return getOperationSymbol(operation);
      }),
      currentExerciseResult: computed(() => {
        return excerciseSet()[currentIndex()]?.result;
      }),
      currentExerciseUserResult: computed(() => {
        return excerciseSet()[currentIndex()]?.userResult;
      }),
      currentExerciseResultCorrect: computed(() => {
        const excercise = excerciseSet()[currentIndex()];
        return excercise && excercise.userResult === excercise.result;
      }),
      currentExerciseResultIncorrect: computed(() => {
        const excercise = excerciseSet()[currentIndex()];
        return (
          excercise &&
          excercise.userResult !== undefined &&
          excercise.userResult !== excercise.result
        );
      }),
      currentSetScore: computed(() => {
        return excerciseSet().reduce((acc, excercise) => {
          if (excercise.userResult === excercise.result) {
            return acc + 1;
          }
          return acc;
        }, 0);
      }),
      errorCount: computed(() => {
        return excerciseSet().filter(
          (excercise) =>
            excercise.userResult !== undefined &&
            excercise.userResult !== excercise.result
        ).length;
      }),
      correctCount: computed(() => {
        return excerciseSet().filter(
          (excercise) => excercise.userResult === excercise.result
        ).length;
      }),
      exerciseProgress: computed(() => {
        const totalExcercises = excerciseSet().length;
        const answeredExcercises = currentIndex();
        return (answeredExcercises / totalExcercises) * 100;
      }),
      isTernary: computed(() => {
        const excercise = excerciseSet()[currentIndex()];

        return (
          excercise &&
          excercise.values.length === 3 &&
          excercise.operation !== Operation.Addition
        );
      }),
      isBinary: computed(() => {
        const excercise = excerciseSet()[currentIndex()];

        return excercise && excercise.values.length === 2;
      }),
    })
  ),
  withMethods(
    (
      store,
      failedExercisesStore = inject(FailedExercisesStore),
      mathTasksProvider = inject(MathTasksProviderService)
    ) => ({
      configureBinaryArythmeticExercises(
        operation: Operation,
        difficultyLevel: number
      ): void {
        const excercises =
          BinaryArithmeticExerciseGenerator.generateExerciseSet(
            operation,
            difficultyLevel
          );
        patchState(store, {
          exerciseSet: excercises.map((excercise) => ({
            ...excercise,
            userResult: undefined,
          })),
          currentIndex: 0,
        });
      },
      configureTernaryArythmeticExercises(
        operation: Operation,
        difficultyLevel: number
      ): void {
        const exercises =
          TernaryArithmeticExerciseGenerator.generateExerciseSet(
            operation,
            difficultyLevel
          );
        patchState(store, {
          exerciseSet: exercises.map((excercise) => ({
            ...excercise,
            userResult: undefined,
          })),
          currentIndex: 0,
        });
      },
      stringifyCurrentExercise: () => {
        const operation = store.exerciseSet()[store.currentIndex()]?.operation;
        const operationSymbol = getOperationSymbol(operation);
        if (store.currentExercise().values.length === 3) {
          const task =
            mathTasksProvider.getByOperation(operation)[store.currentIndex()];
          const { values } = store.currentExercise();
          return `${task(values[0], values[1], values[2])}`;
        }
        return `${store.currentExercise()?.values[0]} ${operationSymbol} ${
          store.currentExercise()?.values[1]
        } = `;
      },
      setAnswer(userResult: number) {
        const currentExercise = store.currentExercise();
        const isWrongAnswer = userResult !== currentExercise.result;

        patchState(store, (state) => ({
          exerciseSet: state.exerciseSet.map((excercise, index) => {
            if (index === store.currentIndex()) {
              return { ...excercise, userResult };
            }
            return excercise;
          }),
        }));

        if (isWrongAnswer) {
          failedExercisesStore.addFailedExercise(currentExercise);
        }
      },
      nextExercise() {
        patchState(store, (state) => ({
          currentIndex: state.currentIndex + 1,
        }));
      },
    })
  )
);
