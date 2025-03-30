import { Component, inject, OnInit, HostBinding } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Excercise } from '../../../models/excercise';
import { ExcerciseGeneratorService } from '../../../business-logic/excercise-generator.service';
import { CommonModule } from '@angular/common';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatButtonModule } from '@angular/material/button';
import { ExceriseStatusComponent } from './excerise-status/excerise-status.component';
import { ExcercisesSummaryComponent } from './excercises-summary/excercises-summary.component';
import { Operation } from '../../../models/operation';

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
  errorCount = 0;
  correctCount = 0;

  get progress(): number {
    return ((this.currentIndex + 1) / this.excerciseList.length) * 100;
  }
  excerciseList: Excercise[] = [];
  formControl: FormControl = new FormControl<number | null>(null);
  currentIndex = 0;
  excerciseStatus = ExcerciseStatus.NotAnswered;

  get excerciseFinished(): boolean {
    return (
      this.currentIndex === this.excerciseList.length - 1 &&
      this.excerciseStatus !== ExcerciseStatus.NotAnswered
    );
  }

  route = inject(ActivatedRoute);

  ngOnInit(): void {
    this.excerciseList = this.getExcerciseList();
  }

  private getExcerciseList() {
    const totalRange = this.route.snapshot.queryParams['totalRange'];
    const excerciseCount = this.route.snapshot.queryParams['excerciseCount'];
    const operation: Operation = this.route.snapshot.queryParams['operation'];
    if (!totalRange || !excerciseCount) {
      throw new Error('Invalid query params');
    }
    return ExcerciseGeneratorService.generateExcercise(
      operation,
      totalRange,
      excerciseCount
    );
  }

  checkAnswer(): void {
    const isCorrect =
      this.formControl.value === this.excerciseList[this.currentIndex].result;
    this.excerciseStatus = isCorrect
      ? ExcerciseStatus.Correct
      : ExcerciseStatus.Incorrect;
    if (isCorrect) {
      this.correctCount++;
    } else {
      this.errorCount++;
    }
  }

  get showCheckAnswerButton(): boolean {
    return this.excerciseStatus === ExcerciseStatus.NotAnswered;
  }

  get showNextButton(): boolean {
    return (
      !this.excerciseFinished &&
      this.excerciseStatus !== ExcerciseStatus.NotAnswered
    );
  }

  get showContinueButton(): boolean {
    return (
      (!this.excerciseFinished &&
        this.excerciseStatus === ExcerciseStatus.Correct) ||
      this.excerciseStatus === ExcerciseStatus.Incorrect
    );
  }

  nextExercise(): void {
    this.formControl.reset();
    if (this.currentIndex < this.excerciseList.length) {
      this.currentIndex++;
      this.excerciseStatus = ExcerciseStatus.NotAnswered;
    }
  }

  excerciseStatuses = ExcerciseStatus;
}

enum ExcerciseStatus {
  Correct,
  Incorrect,
  NotAnswered,
}
