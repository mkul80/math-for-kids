import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnInit,
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
  @Input({ required: true }) maxValue = 20;
  @Input() userAnswered: boolean = false;
  @Output() selectedAnswer = new EventEmitter<number>();

  wrongAnswer1!: number;
  wrongAnswer2!: number;

  answers: number[] = [];
  selectedAnswerValue: number | null = null;

  ngOnChanges(): void {
    this.wrongAnswer1 = this.#generateRandomNumber();
    this.wrongAnswer2 = this.#generateRandomNumber();
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

  #generateRandomNumber(): number {
    let randomNumber;
    do {
      randomNumber = Math.floor(Math.random() * this.maxValue);
    } while (
      randomNumber === this.correctAnswer ||
      randomNumber === this.wrongAnswer1 ||
      randomNumber === this.wrongAnswer2
    );
    return randomNumber;
  }

  #shuffleAnswers(answers: number[]): number[] {
    return answers.sort(() => Math.random() - 0.5);
  }
}
