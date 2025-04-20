import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-answer-selector',
  imports: [MatButtonModule],
  standalone: true,
  templateUrl: './answer-selector.component.html',
  styleUrl: './answer-selector.component.scss',
})
export class AnswerSelectorComponent implements OnChanges {
  @Input({ required: true }) correctAnswer!: number;
  @Input() disabled: boolean = false;
  @Output() selectedAnswer = new EventEmitter<number>();

  wrongAnswer1!: number;
  wrongAnswer2!: number;
  answers: number[] = [];
  selectedAnswerValue: number | null = null;

  ngOnChanges({ correctAnswer }: SimpleChanges): void {
    if (correctAnswer) {
      this.#generateAnswers();
      this.selectedAnswerValue = null;
    }
  }

  #generateAnswers(): void {
    this.selectedAnswerValue = null;
    this.wrongAnswer1 = this.#generateRandomNumber(this.correctAnswer);
    this.wrongAnswer2 = this.#generateRandomNumber(this.correctAnswer);
    this.answers = this.#shuffleAnswers([
      this.correctAnswer,
      this.wrongAnswer1,
      this.wrongAnswer2,
    ]);
  }

  selectAnswer(answer: number): void {
    this.selectedAnswerValue = answer;
    this.selectedAnswer.emit(answer);
  }

  #generateRandomNumber(correctAnswer: number): number {
    let randomNumber;
    const range = 3; // Maximum difference from correct answer
    do {
      const offset = Math.floor(Math.random() * (range * 2 + 1)) - range;
      randomNumber = correctAnswer + offset;
    } while (
      randomNumber === this.correctAnswer ||
      randomNumber === this.wrongAnswer1 ||
      randomNumber === this.wrongAnswer2 ||
      randomNumber < 0
    );
    return randomNumber;
  }

  #shuffleAnswers(answers: number[]): number[] {
    return answers.sort(() => Math.random() - 0.5);
  }
}
