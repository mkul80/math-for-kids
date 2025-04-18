import { APP_INITIALIZER, ApplicationConfig, inject } from '@angular/core';
import { provideRouter, withHashLocation } from '@angular/router';
import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { FailedExercisesStore } from './store/failed-exercises/failed-exercises.store';
import { LocalStorageService } from './store/exercise/local-storage-service';
import { ExerciseExecutionStore } from './store/exercise/exercise-execution.store';

function initializeStores() {
  return () => {
    const failedExercises = LocalStorageService.loadFailedExercises();
    if (failedExercises) {
      const failedExercisesStore = inject(FailedExercisesStore);
      failedExercises.forEach((exercise) =>
        failedExercisesStore.addFailedExercise(exercise)
      );
    }
  };
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes, withHashLocation()),
    provideAnimationsAsync(),
    ExerciseExecutionStore,
    FailedExercisesStore,
    {
      provide: APP_INITIALIZER,
      useFactory: initializeStores,
      multi: true,
    },
  ],
};
