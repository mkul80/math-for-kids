import { Component, inject, OnInit, HostBinding } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatButtonModule } from '@angular/material/button';
import { ExceriseStatusComponent } from './excerise-status/excerise-status.component';
import { ExcercisesSummaryComponent } from './excercises-summary/excercises-summary.component';
import { ExerciseExecutionStore } from '../../../store/exercise/exercise-execution.store';

@Component({
  selector: 'app-excercise',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatProgressBarModule,
    MatButtonModule,
    RouterLink,
    ExceriseStatusComponent,
    ExcercisesSummaryComponent,
  ],
  templateUrl: './excercise.component.html',
  styleUrl: './excercise.component.scss',
})
export class ExcerciseComponent implements OnInit {
  @HostBinding('class') class = 'h-100 d-flex flex-column justify-beetwen';

  formControl: FormControl = new FormControl<number | null>(null);
  excerciseStatus = ExcerciseStatus.NotAnswered;

  route = inject(ActivatedRoute);
  excerciseStore = inject(ExerciseExecutionStore);

  ngOnInit(): void {}

  checkAnswer(): void {
    this.excerciseStore.setAnswer(this.formControl.value);
  }

  nextExercise(): void {
    this.formControl.reset();
    this.excerciseStore.nextExercise();
  }

  excerciseStatuses = ExcerciseStatus;
}

enum ExcerciseStatus {
  Correct,
  Incorrect,
  NotAnswered,
}
