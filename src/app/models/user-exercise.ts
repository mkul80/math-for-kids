import { Exercise } from './exercise';

export interface UserExercise extends Exercise {
  userResult?: number;
}
