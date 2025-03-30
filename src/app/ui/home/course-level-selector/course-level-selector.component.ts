import { Component, HostBinding, OnInit, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { UserPreferences } from '../../../consts/user-preferences';
import { Router } from '@angular/router';
import { ExcerciseStore } from '../../../store/excercise/excercise.store';

@Component({
  selector: 'app-course-level-selector',
  standalone: true,
  imports: [ReactiveFormsModule, MatButtonToggleModule, MatCardModule],
  templateUrl: './course-level-selector.component.html',
  styleUrl: './course-level-selector.component.scss',
})
export class CourseLevelSelectorComponent implements OnInit {
  form!: FormGroup;

  @HostBinding('class') class =
    'h-100 d-flex flex-column align-center justify-center';

  valueTotalRanges = UserPreferences.valueTotalRanges;
  excercisesCounts = UserPreferences.excercisesCounts;
  operations = UserPreferences.mathOperations;

  private fb = inject(FormBuilder);
  private router = inject(Router);
  private excerciseStore = inject(ExcerciseStore);

  ngOnInit(): void {
    this.form = this.fb.group({
      totalRange: [null, Validators.required],
      excerciseCount: [null, Validators.required],
      operation: [null, Validators.required],
    });
  }

  onSubmit(): void {
    if (this.form.valid) {
      const formValues = this.form.value;
      this.router.navigate(['/home/excercise'], {
        queryParams: {
          totalRange: formValues.totalRange,
          excerciseCount: formValues.excerciseCount,
          operation: formValues.operation,
        },
      });
    }
  }
}
