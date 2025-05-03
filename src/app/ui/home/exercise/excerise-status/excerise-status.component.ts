import { Component, inject, Input } from '@angular/core';
import { Exercise } from '../../../../models/exercise';

import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { MessageService } from '../../../../consts/exercise-status.consts';

@Component({
  standalone: true,
  selector: 'app-excerise-status',
  imports: [TranslatePipe],
  templateUrl: './excerise-status.component.html',
  styleUrl: './excerise-status.component.scss',
})
export class ExceriseStatusComponent {
  #messageService = inject(MessageService);
  #translateService = inject(TranslateService);
  failureMessage: Message;
  successMessage: Message;

  @Input() excercise!: Exercise;
  @Input() userResult!: number;
  @Input() correctAnswer!: number;
  @Input() explanation!: string;

  get isCorrect(): boolean {
    return this.excercise.evaluate() === this.userResult;
  }

  constructor() {
    this.successMessage = this.#messageService.getRandomSuccessMessage();
    this.failureMessage = this.#messageService.getRandomFailureMessage();
    this.#translateService.onLangChange.subscribe(() => {
      this.successMessage = this.#messageService.getRandomSuccessMessage();
      this.failureMessage = this.#messageService.getRandomFailureMessage();
    });
  }
}

interface Message {
  title: string;
  message: string;
}
