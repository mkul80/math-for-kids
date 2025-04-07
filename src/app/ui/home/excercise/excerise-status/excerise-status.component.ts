import { Component, Input } from '@angular/core';
import { Excercise } from '../../../../models/excercise';
import {
  FAILURE_MESSAGES,
  SUCCESS_MESSAGES,
  SUCCESS_IMAGES,
  FAILURE_IMAGES,
} from './excercise-status.consts';

@Component({
  selector: 'app-excerise-status',
  imports: [],
  templateUrl: './excerise-status.component.html',
  styleUrl: './excerise-status.component.scss',
})
export class ExceriseStatusComponent {
  successImage: string;
  failureImage: string;
  failureMessage: Message;
  successMessage: Message;

  @Input() excercise!: Excercise;
  @Input() userResult!: number;
  @Input() correctAnswer!: string;
  @Input() explanation!: string;

  get isCorrect(): boolean {
    return this.excercise.result === this.userResult;
  }

  #getRandomMessage(messages: Message[]): Message {
    return messages[Math.floor(Math.random() * messages.length)];
  }

  #getRandomImage(images: string[]): string {
    return images[Math.floor(Math.random() * images.length)];
  }

  constructor() {
    this.successImage = this.#getRandomImage(SUCCESS_IMAGES);
    this.failureImage = this.#getRandomImage(FAILURE_IMAGES);
    this.successMessage = this.#getRandomMessage(SUCCESS_MESSAGES);
    this.failureMessage = this.#getRandomMessage(FAILURE_MESSAGES);
  }
}

interface Message {
  title: string;
  message: string;
}
