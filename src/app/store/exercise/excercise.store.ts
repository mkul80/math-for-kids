// import {
//   patchState,
//   signalStore,
//   withComputed,
//   withHooks,
//   withMethods,
//   withState,
// } from '@ngrx/signals';
// import { UserExercise } from '../../models/user-exercise';
// import { getOperationSymbol, Operation } from '../../models/operation';
// import { computed } from '@angular/core';
// import { Exercise } from '../../models/exercise';
// import { LocalStorageService } from './local-storage-service';
// import { BinaryArithmeticExerciseGenerator } from '../../business-logic/binary-arythmetic-exercise-generator.service';

// type ExerciseState = {
//   exerciseSet: UserExercise[];
//   failedExerciseSet: Exercise[];
//   currentIndex: number;
// };
// const initialState: ExerciseState = {
//   exerciseSet: [],
//   failedExerciseSet: [],
//   currentIndex: 0,
// };

// export const ExerciseStore = signalStore(
//   withState(initialState),
//   withHooks((store) => ({
//     onInit: () => {
//       const failedExercises = LocalStorageService.loadFailedExercises();
//       if (failedExercises) {
//         patchState(store, {
//           failedExerciseSet: failedExercises,
//         });
//       }
//     },
//     onDestroy: () => {
//       LocalStorageService.saveFailedExercises(store.failedExerciseSet());
//     },
//   })),
//   withComputed((store) => ({
//     currentExcercise: computed(() => {
//       const currentIndex = store.currentIndex();
//       return store.exerciseSet()[currentIndex];
//     }),
//   })),
//   withComputed(
//     ({ currentIndex, exerciseSet: excerciseSet, currentExcercise }) => ({
//       isFinished: computed(() => currentIndex() >= excerciseSet().length),
//       isCurrentAnswered: computed(() => {
//         return (
//           currentExcercise() && currentExcercise().userResult !== undefined
//         );
//       }),
//       correctResult: computed(() => {
//         const operation = currentExcercise().operation;
//         const operationSymbol = getOperationSymbol(operation);
//         return `${currentExcercise()?.values[0]} ${operationSymbol} ${
//           currentExcercise()?.values[1]
//         } = ${currentExcercise()?.result}`;
//       }),
//       currentFirstValue: computed(() => {
//         return excerciseSet()[currentIndex()]?.values[0];
//       }),
//       currentSecondValue: computed(() => {
//         return excerciseSet()[currentIndex()]?.values[1];
//       }),
//       currentOperation: computed(() => {
//         return excerciseSet()[currentIndex()]?.operation;
//       }),
//       currentOperationSymbol: computed(() => {
//         const operation = excerciseSet()[currentIndex()]?.operation;
//         return getOperationSymbol(operation);
//       }),
//       currentExercise: computed(() => {
//         return excerciseSet()[currentIndex()];
//       }),
//       currentExerciseResult: computed(() => {
//         return excerciseSet()[currentIndex()]?.result;
//       }),
//       currentExerciseUserResult: computed(() => {
//         return excerciseSet()[currentIndex()]?.userResult;
//       }),
//       currentExerciseResultCorrect: computed(() => {
//         const excercise = excerciseSet()[currentIndex()];
//         return excercise && excercise.userResult === excercise.result;
//       }),
//       currentExerciseResultIncorrect: computed(() => {
//         const excercise = excerciseSet()[currentIndex()];
//         return (
//           excercise &&
//           excercise.userResult !== undefined &&
//           excercise.userResult !== excercise.result
//         );
//       }),
//       errorCount: computed(() => {
//         return excerciseSet().filter(
//           (excercise) =>
//             excercise.userResult !== undefined &&
//             excercise.userResult !== excercise.result
//         ).length;
//       }),
//       correctCount: computed(() => {
//         return excerciseSet().filter(
//           (excercise) => excercise.userResult === excercise.result
//         ).length;
//       }),
//       exerciseProgress: computed(() => {
//         const totalExercises = excerciseSet().length;
//         const answeredExcercises = currentIndex();
//         return (answeredExcercises / totalExercises) * 100;
//       }),
//     })
//   ),
//   withMethods((store) => ({
//     configureExerciseSet(
//       operation: Operation,
//       difficultyLevel: number,
//       count: number
//     ): void {
//       const exercises = BinaryArithmeticExerciseGenerator.generateExerciseSet(
//         operation,
//         difficultyLevel,
//         count
//       );
//       console.log('exercises 2', exercises);
//       patchState(store, {
//         exerciseSet: exercises.map((excercise) => ({
//           ...excercise,
//           userResult: undefined,
//         })),
//         currentIndex: 0,
//       });
//     },
//     setAnswer(userResult: number) {
//       const isWrongAnswer = userResult !== store.currentExercise().result;

//       patchState(store, (state) => {
//         const newState: Partial<ExerciseState> = {
//           exerciseSet: state.exerciseSet.map((excercise, index) => {
//             if (index === store.currentIndex()) {
//               return { ...excercise, userResult };
//             }
//             return excercise;
//           }),
//         };

//         if (isWrongAnswer) {
//           const exerciseAlreadyExists = state.failedExerciseSet.some(
//             (failed) =>
//               failed.values[0] === store.currentExercise().values[0] &&
//               failed.values[1] === store.currentExercise().values[1] &&
//               failed.operation === store.currentExercise().operation
//           );

//           if (!exerciseAlreadyExists) {
//             const { userResult, ...excerciseWithoutResult } =
//               store.currentExercise();
//             newState.failedExerciseSet = [
//               ...state.failedExerciseSet,
//               excerciseWithoutResult,
//             ];
//           }
//         }

//         return newState;
//       });
//     },
//     nextExcercise() {
//       patchState(store, (state) => ({
//         currentIndex: state.currentIndex + 1,
//       }));
//     },
//   }))
// );
