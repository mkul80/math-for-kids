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
import { ExcerciseStore } from '../../../store/excercise/excercise.store';
import { Router } from '@angular/router';
import { userPreferences } from '../../../consts/user-preferences';

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
  excercisesCounts = userPreferences.excercisesCounts;
  operations = userPreferences.mathOperations;

  private fb = inject(FormBuilder);
  private excerciseStore = inject(ExcerciseStore);

  currentStep = 0;
  readonly totalSteps = 3;

  ngOnInit(): void {
    this.form = this.fb.group({
      difficultyLevel: [null, Validators.required],
      excerciseCount: [null, Validators.required],
      operation: [null, Validators.required],
    });
  }

  isLastStep(): boolean {
    return this.currentStep === this.totalSteps - 1;
  }

  onSubmit(): void {
    if (this.form.valid) {
      const { operation, difficultyLevel, excerciseCount } = this.form.value;
      this.excerciseStore.configureExcerciseSet(
        operation,
        difficultyLevel,
        excerciseCount
      );
      this.#router.navigate(['/home/excercise']);
    }
  }

  handleSelectionAndProgress(): void {
    setTimeout(() => {
      if (this.currentStep < this.totalSteps - 1) {
        this.currentStep++;
      }
    }, 400);
  }
}
