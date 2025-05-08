import { APP_INITIALIZER, ApplicationConfig, inject } from '@angular/core';
import {
  provideRouter,
  withComponentInputBinding,
  withHashLocation,
} from '@angular/router';
import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { FailedExercisesStore } from './store/failed-exercises/failed-exercises.store';
import { LocalStorageService } from './store/exercise/local-storage-service';
import { ExerciseExecutionStore } from './store/exercise/exercise-execution.store';
import {
  provideTranslateService,
  TranslateCompiler,
  TranslateLoader,
} from '@ngx-translate/core';
import { HttpClient, provideHttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { DOCUMENT } from '@angular/common';
import { TranslateMessageFormatCompiler } from 'ngx-translate-messageformat-compiler';
import { Logger } from './common/logger.service';

function initializeStores() {
  return () => {
    const failedExercises = LocalStorageService.loadFailedExercises();
    // if (failedExercises) {
    //   const failedExercisesStore = inject(FailedExercisesStore);
    //   failedExercises.forEach((exercise) =>
    //     failedExercisesStore.addFailedExercise(exercise)
    //   );
    // }
  };
}

export function httpLoaderFactory(http: HttpClient, document: Document) {
  const baseHref = document.querySelector('base')?.getAttribute('href') ?? '/';
  return new TranslateHttpLoader(http, `${baseHref}assets/i18n/`, '.json');
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(),
    provideRouter(routes, withComponentInputBinding(), withHashLocation()),
    provideAnimationsAsync(),
    ExerciseExecutionStore,
    FailedExercisesStore,
    {
      provide: APP_INITIALIZER,
      useFactory: initializeStores,
      multi: true,
    },
    provideTranslateService({
      compiler: {
        provide: TranslateCompiler,
        useClass: TranslateMessageFormatCompiler,
      },
      loader: {
        provide: TranslateLoader,
        useFactory: httpLoaderFactory,
        deps: [HttpClient, DOCUMENT],
      },
    }),
  ],
};
