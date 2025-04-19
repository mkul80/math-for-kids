import { Component, Input } from '@angular/core';
import { Exercise } from '../../../../models/exercise';
import {
  getRandomSuccessMessage,
  getRandomFailureMessage,
  SUCCESS_IMAGES,
  FAILURE_IMAGES,
} from '../../../../consts/exercise-status.consts';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-excerise-status',
  imports: [TranslatePipe],
  templateUrl: './excerise-status.component.html',
  styleUrl: './excerise-status.component.scss',
})
export class ExceriseStatusComponent {
  successImage: string;
  failureImage: string;
  failureMessage: Message;
  successMessage: Message;

  @Input() excercise!: Exercise;
  @Input() userResult!: number;
  @Input() correctAnswer!: string;

  get isCorrect(): boolean {
    return this.excercise.result === this.userResult;
  }

  #getRandomImage(images: string[]): string {
    return images[Math.floor(Math.random() * images.length)];
  }

  constructor() {
    this.successImage = this.#getRandomImage(SUCCESS_IMAGES);
    this.failureImage = this.#getRandomImage(FAILURE_IMAGES);
    this.successMessage = getRandomSuccessMessage();
    this.failureMessage = getRandomFailureMessage();
  }
}

interface Message {
  title: string;
  message: string;
}
