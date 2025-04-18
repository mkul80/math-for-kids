import { Component, HostBinding, OnInit, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { userPreferences } from '../../../consts/user-preferences';
import { ExerciseExecutionStore } from '../../../store/exercise/exercise-execution.store';
import { Operation } from '../../../models/operation';

@Component({
  selector: 'app-course-level-selector',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatButtonToggleModule,
    MatCardModule,
    MatButtonModule,
  ],
  templateUrl: './course-level-selector.component.html',
  styleUrl: './course-level-selector.component.scss',
})
export class CourseLevelSelectorComponent implements OnInit {
  #router = inject(Router);
  form!: FormGroup;

  @HostBinding('class') class =
    'h-100 d-flex flex-column align-center justify-center';

  difficultyLevels = userPreferences.difficultyLevels;
  exerciseTypes = userPreferences.exerciseTypes;
  operations = userPreferences.mathOperations;

  private fb = inject(FormBuilder);
  private excerciseStore = inject(ExerciseExecutionStore);

  currentStep = 0;
  readonly totalSteps = 3;

  ngOnInit(): void {
    this.form = this.fb.group({
      difficultyLevel: [null, Validators.required],
      exerciseType: [null, Validators.required],
      operation: [null, Validators.required],
    });
  }

  get isSubtraction(): boolean {
    return this.form.value.operation === Operation.Subtraction;
  }

  isLastStep(): boolean {
    return this.currentStep === this.totalSteps - 1;
  }

  startArithmeticExercises(): void {
    console.log('startArithmeticExercises');
    const { operation, difficultyLevel, exerciseType } = this.form.value;
    this.excerciseStore.configureBinaryArythmeticExercises(
      operation,
      difficultyLevel
    );
    this.#router.navigate(['/home/excercise']);
  }

  startWordExercises(): void {
    const { operation, difficultyLevel, exerciseType } = this.form.value;
    this.excerciseStore.configureTernaryArythmeticExercises(
      operation,
      difficultyLevel
    );
    console.log('startWordExercises', this.excerciseStore.currentExercise());
    this.#router.navigate(['/home/excercise']);
  }

  handleSelectionAndProgress(): void {
    setTimeout(() => {
      if (this.currentStep < this.totalSteps - 1) {
        this.currentStep++;
      }
    }, 400);
  }
}
