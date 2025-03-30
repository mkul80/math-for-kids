import { Routes } from '@angular/router';
import { HomeComponent } from './ui/home/home.component';
import { CourseLevelSelectorComponent } from './ui/home/course-level-selector/course-level-selector.component';
import { NotFoundComponent } from './ui/not-found/not-found.component';
import { ExcerciseComponent } from './ui/home/excercise/excercise.component';

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
    ],
  },
  { path: '**', component: NotFoundComponent }, // Handle undefined routes
];
