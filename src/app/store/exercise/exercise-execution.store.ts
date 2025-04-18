import { inject } from '@angular/core';
import {
  patchState,
  signalStore,
  withComputed,
  withMethods,
  withState,
} from '@ngrx/signals';
import { UserExercise } from '../../models/user-exercise';
import { getOperationSymbol, Operation } from '../../models/operation';
import { computed } from '@angular/core';
import { FailedExercisesStore } from '../failed-exercises/failed-exercises.store';
import { BinaryArithmeticExerciseGenerator } from '../../business-logic/binary-arythmetic-exercise-generator.service';
import { mathTasks } from '../../consts/math-tasks.consts';
import { TernaryArithmeticExerciseGenerator } from '../../business-logic/ternary-arithmetic-exercise-generator.service';

type ExerciseExecutionState = {
  exerciseSet: UserExercise[];
  currentIndex: number;
};

const initialState: ExerciseExecutionState = {
  exerciseSet: [],
  currentIndex: 0,
};

export const ExerciseExecutionStore = signalStore(
  withState(initialState),
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
      currentToString: computed(() => {
        const operation = excerciseSet()[currentIndex()]?.operation;
        const operationSymbol = getOperationSymbol(operation);
        if (currentExercise().values.length === 3) {
          console.log(
            'currentToString',
            currentExercise().values,
            currentExercise().operation
          );
          const task = mathTasks.getByOperation(operation)[currentIndex()];
          const { values } = currentExercise();
          console.log(`values`, values, 'index', currentIndex());
          return `${task(values[0], values[1], values[2])}`;
        }
        return `${currentExercise()?.values[0]} ${operationSymbol} ${
          currentExercise()?.values[1]
        } = `;
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
      currentExercise: computed(() => {
        return excerciseSet()[currentIndex()];
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
    })
  ),
  withMethods((store, failedExercisesStore = inject(FailedExercisesStore)) => ({
    configureBinaryArythmeticExercises(
      operation: Operation,
      difficultyLevel: number
    ): void {
      console.log('configureBinaryArythmeticExercises', operation);
      const excercises = BinaryArithmeticExerciseGenerator.generateExerciseSet(
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
      console.log('configureTernaryArythmeticExercises', operation);
      const exercises = TernaryArithmeticExerciseGenerator.generateExerciseSet(
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
  }))
);
