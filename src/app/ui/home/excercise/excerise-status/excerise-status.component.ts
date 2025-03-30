import { Component, Input } from '@angular/core';
import { Excercise } from '../../../../models/excercise';
import { FAILURE_MESSAGES, SUCCESS_MESSAGES } from './excercise-status.consts';

@Component({
  selector: 'app-excerise-status',
  imports: [],
  templateUrl: './excerise-status.component.html',
  styleUrl: './excerise-status.component.scss',
})
export class ExceriseStatusComponent {
  @Input() excercise!: Excercise;
  @Input() userResult!: number;

  get correctAnswer(): string {
    return `${this.excercise.firstValue} + ${this.excercise.secondValue} = ${this.excercise.result}`;
  }

  get isCorrect(): boolean {
    return this.excercise.result === this.userResult;
  }

  get successMessage(): { title: string; message: string } {
    return SUCCESS_MESSAGES[
      Math.floor(Math.random() * SUCCESS_MESSAGES.length)
    ];
  }

  get failureMessage(): { title: string; message: string } {
    return FAILURE_MESSAGES[
      Math.floor(Math.random() * FAILURE_MESSAGES.length)
    ];
  }
}
