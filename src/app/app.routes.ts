import { Routes } from '@angular/router';
import { HomeComponent } from './ui/home/home.component';
import { CourseLevelSelectorComponent } from './ui/home/course-level-selector/course-level-selector.component';
import { NotFoundComponent } from './ui/not-found/not-found.component';
import { ExcerciseComponent } from './ui/home/exercise/excercise.component';
import { SudokuComponent } from './ui/home/games/sudoku/sudoku.component';
import { SudokuConfigComponent } from './ui/home/games/sudoku/sudoku-config/sudoku-config.component';
import { PathFinderComponent } from './ui/home/games/path-finder/path-finder.component';

export const routes: Routes = [
  { path: '', redirectTo: '/home/course-level', pathMatch: 'full' },
  {
    path: 'home',
    component: HomeComponent,
    children: [
      { path: 'course-level', component: CourseLevelSelectorComponent },
      {
        path: 'excercise',
        component: ExcerciseComponent,
      },
      { path: 'sudoku', component: SudokuConfigComponent },
      {
        path: 'sudoku-game/:boardSize/:difficultyLevel',
        component: SudokuComponent,
      },
      {
        path: 'path-finder-game',
        component: PathFinderComponent,
      },
    ],
  },
  { path: '**', component: NotFoundComponent }, // Handle undefined routes
];
