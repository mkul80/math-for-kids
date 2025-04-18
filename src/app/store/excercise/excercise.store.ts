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
// import { LocalStorageService } from '../exercise/local-storage-service';
// import { BinaryArithmeticExerciseGenerator } from '../../business-logic/binary-arythmetic-exercise-generator.service';

// type ExcerciseState = {
//   excerciseSet: UserExercise[];
//   failedExcerciseSet: Exercise[];
//   currentIndex: number;
// };
// const initialState: ExcerciseState = {
//   excerciseSet: [],
//   failedExcerciseSet: [],
//   currentIndex: 0,
// };

// export const ExcerciseStore = signalStore(
//   withState(initialState),
//   withHooks((store) => ({
//     onInit: () => {
//       const failedExcercises = LocalStorageService.loadFailedExercises();
//       if (failedExcercises) {
//         patchState(store, {
//           failedExcerciseSet: failedExcercises,
//         });
//       }
//     },
//     onDestroy: () => {
//       LocalStorageService.saveFailedExercises(store.failedExcerciseSet());
//     },
//   })),
//   withComputed((store) => ({
//     currentExcercise: computed(() => {
//       const currentIndex = store.currentIndex();
//       return store.excerciseSet()[currentIndex];
//     }),
//   })),
//   withComputed(({ currentIndex, excerciseSet, currentExcercise }) => ({
//     isFinished: computed(() => currentIndex() >= excerciseSet().length),
//     isCurrentAnswered: computed(() => {
//       return currentExcercise() && currentExcercise().userResult !== undefined;
//     }),
//     correctResult: computed(() => {
//       const operation = currentExcercise().operation;
//       const operationSymbol = getOperationSymbol(operation);
//       return `${currentExcercise()?.values[0]} ${operationSymbol} ${
//         currentExcercise()?.values[1]
//       } = ${currentExcercise()?.result}`;
//     }),
//     currentFirstValue: computed(() => {
//       return excerciseSet()[currentIndex()]?.values[0];
//     }),
//     currentSecondValue: computed(() => {
//       return excerciseSet()[currentIndex()]?.values[1];
//     }),
//     currentOperation: computed(() => {
//       return excerciseSet()[currentIndex()]?.operation;
//     }),
//     currentOperationSymbol: computed(() => {
//       const operation = excerciseSet()[currentIndex()]?.operation;
//       return getOperationSymbol(operation);
//     }),
//     currentExcercise: computed(() => {
//       return excerciseSet()[currentIndex()];
//     }),
//     currentExcerciseResult: computed(() => {
//       return excerciseSet()[currentIndex()]?.result;
//     }),
//     currentExcerciseUserResult: computed(() => {
//       return excerciseSet()[currentIndex()]?.userResult;
//     }),
//     currentExcerciseResultCorrect: computed(() => {
//       const excercise = excerciseSet()[currentIndex()];
//       return excercise && excercise.userResult === excercise.result;
//     }),
//     currentExcerciseResultIncorrect: computed(() => {
//       const excercise = excerciseSet()[currentIndex()];
//       return (
//         excercise &&
//         excercise.userResult !== undefined &&
//         excercise.userResult !== excercise.result
//       );
//     }),
//     errorCount: computed(() => {
//       return excerciseSet().filter(
//         (excercise) =>
//           excercise.userResult !== undefined &&
//           excercise.userResult !== excercise.result
//       ).length;
//     }),
//     correctCount: computed(() => {
//       return excerciseSet().filter(
//         (excercise) => excercise.userResult === excercise.result
//       ).length;
//     }),
//     excerciseProgress: computed(() => {
//       const totalExcercises = excerciseSet().length;
//       const answeredExcercises = currentIndex();
//       return (answeredExcercises / totalExcercises) * 100;
//     }),
//   })),
//   withMethods((store) => ({
//     configureExcerciseSet(
//       operation: Operation,
//       difficultyLevel: number,
//       count: number
//     ): void {
//       const excercises = BinaryArithmeticExerciseGenerator.generateExerciseSet(
//         operation,
//         difficultyLevel,
//         count
//       );
//       console.log('excercises', excercises);
//       patchState(store, {
//         excerciseSet: excercises.map((exercise) => ({
//           ...exercise,
//           userResult: undefined,
//         })),
//         currentIndex: 0,
//       });
//     },
//     setAnswer(userResult: number) {
//       const isWrongAnswer = userResult !== store.currentExcercise().result;

//       patchState(store, (state) => {
//         const newState: Partial<ExcerciseState> = {
//           excerciseSet: state.excerciseSet.map((excercise, index) => {
//             if (index === store.currentIndex()) {
//               return { ...excercise, userResult };
//             }
//             return excercise;
//           }),
//         };

//         if (isWrongAnswer) {
//           const exerciseAlreadyExists = state.failedExcerciseSet.some(
//             (failed) =>
//               failed.values[0] === store.currentExcercise().values[0] &&
//               failed.values[1] === store.currentExcercise().values[1] &&
//               failed.operation === store.currentExcercise().operation
//           );

//           if (!exerciseAlreadyExists) {
//             const { userResult, ...excerciseWithoutResult } =
//               store.currentExcercise();
//             newState.failedExcerciseSet = [
//               ...state.failedExcerciseSet,
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
