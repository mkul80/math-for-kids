import { inject } from '@angular/core';
import {
  patchState,
  signalStore,
  withComputed,
  withHooks,
  withMethods,
  withState,
} from '@ngrx/signals';
import { ExerciseAttempt } from '../../models/exercise-attempt';
import { computed } from '@angular/core';
import { FailedExercisesStore } from '../failed-exercises/failed-exercises.store';
import { LocalStorageService } from './local-storage-service';
import { UserScore } from '../../models/user-score';
import { Exercise, Operation } from '../../models/exercise';
import {
  DifficultyLevel,
  ExerciseGenerator,
} from '../../business-logic/exercise-generator.service';
import { WordExerciseBuilder } from '../../business-logic/word-exercise-builder.service';

type ExerciseExecutionState = {
  exerciseSet: ExerciseAttempt[];
  totalScore: UserScore;
  currentExerciseScore: number;
  currentIndex: number;
  difficultyLevel: number;
};

const initialState: ExerciseExecutionState = {
  exerciseSet: [],
  currentIndex: 0,
  currentExerciseScore: 0,
  difficultyLevel: 0,
  totalScore: LocalStorageService.getUserScore() ?? [0, 0, 0],
};

export const ExerciseExecutionStore = signalStore(
  withState(initialState),
  withHooks({
    onDestroy: (store) => {
      LocalStorageService.saveUserScore(store.totalScore());
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
      difficultyLevel,
      exerciseSet: excerciseSet,
      currentExercise: currentExercise,
    }) => ({
      isFinished: computed(() => currentIndex() >= excerciseSet().length),
      isCurrentAnswered: computed(() => {
        return currentExercise() && currentExercise().userResult !== undefined;
      }),
      correctResult: computed(() => {
        return currentExercise().exerciseDefinition.evaluate();
      }),
      currentExerciseSetScore: computed(() => {
        return excerciseSet().reduce((acc, excercise) => {
          if (
            excercise.userResult === excercise.exerciseDefinition.evaluate()
          ) {
            return acc + difficultyLevel();
          }
          return acc;
        }, 0);
      }),
      errorCount: computed(() => {
        return excerciseSet().filter(
          (excercise) =>
            excercise.userResult !== undefined &&
            excercise.userResult !== excercise.exerciseDefinition.evaluate()
        ).length;
      }),
      correctCount: computed(() => {
        return excerciseSet().filter(
          (excercise) =>
            excercise.userResult === excercise.exerciseDefinition.evaluate()
        ).length;
      }),
      exerciseObject: computed(() => {
        const excercise = excerciseSet()[currentIndex()];
        return excercise && excercise.object;
      }),
      exerciseProgress: computed(() => {
        const totalExcercises = excerciseSet().length;
        const answeredExcercises = currentIndex();
        return (answeredExcercises / totalExcercises) * 100;
      }),
      isTernary: computed(() => {
        const excercise = excerciseSet()[currentIndex()];

        return excercise && excercise.exerciseDefinition.terms.length === 3;
      }),
      isBinary: computed(() => {
        const excercise = excerciseSet()[currentIndex()];

        return excercise && excercise.exerciseDefinition.terms.length === 2;
      }),
    })
  ),
  withMethods(
    (
      store,
      failedExercisesStore = inject(FailedExercisesStore),
      wordExerciseBuilder = inject(WordExerciseBuilder)
    ) => ({
      configureBinaryArythmeticExercises(
        operation: Operation,
        difficultyLevel: DifficultyLevel
      ): void {
        const exercises: Exercise[] = Array.from({ length: 10 }, () =>
          ExerciseGenerator.generateExercise(
            2,
            difficultyLevel,
            operation ? [operation] : undefined
          )
        );

        patchState(store, {
          exerciseSet: exercises.map(
            (exercise) => new ExerciseAttempt(exercise)
          ),
          difficultyLevel,
          currentIndex: 0,
        });
      },
      configureTernaryArythmeticExercises(
        operation: Operation,
        difficultyLevel: DifficultyLevel
      ): void {
        const exercises: Exercise[] = Array.from({ length: 10 }, () =>
          ExerciseGenerator.generateExercise(
            3,
            difficultyLevel,
            operation ? [operation, operation] : undefined
          )
        );

        patchState(store, {
          exerciseSet: exercises.map(
            (exercise) =>
              new ExerciseAttempt(
                exercise,
                ...Object.values(
                  wordExerciseBuilder.build({
                    values: exercise.values,
                    operations: exercise.operations,
                  })
                )
              )
          ),
          difficultyLevel,
          currentIndex: 0,
        });
      },
      setAnswer(userResult: number) {
        const currentExercise = store.currentExercise();
        const updatedExercise = currentExercise.withUserResult(userResult);

        patchState(store, (state) => ({
          exerciseSet: state.exerciseSet.map((exercise, index) =>
            index === store.currentIndex() ? updatedExercise : exercise
          ),
        }));
      },
      nextExercise() {
        patchState(store, (state) => ({
          currentIndex: state.currentIndex + 1,
        }));
      },
    })
  )
);
