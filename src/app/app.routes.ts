import { Routes } from '@angular/router';
import { HomeComponent } from './ui/home/home.component';
import { CourseLevelSelectorComponent } from './ui/home/course-level-selector/course-level-selector.component';
import { NotFoundComponent } from './ui/not-found/not-found.component';
import { ExcerciseComponent } from './ui/home/exercise/excercise.component';
import { SudokuComponent } from './ui/home/games/sudoku/sudoku.component';
import { SudokuConfigComponent } from './ui/home/games/sudoku/sudoku-config/sudoku-config.component';
import { PathFinderComponent } from './ui/home/games/path-finder/path-finder.component';
import { PathFinderSetupComponent } from './ui/home/games/path-finder/path-finder-setup/path-finder-setup.component';
import { DashboardComponent } from './ui/home/dashboard/dashboard.component';
import { ClockExerciseComponent } from './ui/home/games/clock-exercise/clock-exercise.component';
import { ClockSetupComponent } from './ui/home/games/clock-exercise/clock-setup/clock-setup.component';
import { MathBlasterComponent } from './ui/home/games/math-blaster/math-blaster.component';

export const routes: Routes = [
  { path: '', redirectTo: '/home/dashboard', pathMatch: 'full' },
  {
    path: 'home',
    component: HomeComponent,
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'course-level', component: CourseLevelSelectorComponent },
      {
        path: 'exercise',
        component: ExcerciseComponent,
      },
      { path: 'sudoku', component: SudokuConfigComponent },
      {
        path: 'sudoku-game/:boardSize/:difficultyLevel',
        component: SudokuComponent,
      },
      { path: 'clock-setup', component: ClockSetupComponent },
      { path: 'clock/:difficultyLevel', component: ClockExerciseComponent },
      {
        path: 'path-finder',
        children: [
          {
            path: 'setup',
            component: PathFinderSetupComponent,
          },
          {
            path: 'game/:boardSize',
            component: PathFinderComponent,
          },
        ],
      },
      {
        path: 'math-blaster',
        children: [
          // {
          //   path: 'setup',
          //   component: PathFinderSetupComponent,
          // },
          {
            path: 'game',
            component: MathBlasterComponent,
          },
        ],
      },
    ],
  },
  { path: '**', component: NotFoundComponent }, // Handle undefined routes
];
