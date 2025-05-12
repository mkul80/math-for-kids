import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { ClockComponent } from './clock/clock.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-clock-exercise',
  standalone: true,
  imports: [CommonModule, FormsModule, TranslateModule, ClockComponent],
  templateUrl: './clock-exercise.component.html',
  styleUrl: './clock-exercise.component.scss',
})
export class ClockExerciseComponent {
  #route = inject(ActivatedRoute);
  hour: number = 0;
  minutes: number = 0;
  correctAnswer: string = '';
  answers: string[] = [];
  selectedAnswer: string | null = null;
  results: ('correct' | 'wrong')[] = [];
  streak: number = 0;
  showConfetti: boolean = false;
  difficultyLevel: number = 0;

  ngOnInit(): void {
    if (this.#route.snapshot.params['difficultyLevel']) {
      this.difficultyLevel = +this.#route.snapshot.params['difficultyLevel'];
      this.generateQuestion(this.difficultyLevel);
    } else {
      throw new Error('Difficulty level is not provided');
    }
  }

  generateQuestion(difficultyLevel: number): void {
    let minutesOptions: number[];

    switch (difficultyLevel) {
      case 0:
        minutesOptions = [0];
        break;
      case 1:
        minutesOptions = [0, 30];
        break;
      case 2:
        minutesOptions = [0, 15, 30, 45];
        break;
      default:
        throw new Error('Invalid difficulty level');
    }

    this.hour = Math.floor(Math.random() * 12);
    this.minutes =
      minutesOptions[Math.floor(Math.random() * minutesOptions.length)];

    const displayHour = this.hour === 0 ? 12 : this.hour;
    this.correctAnswer = `${displayHour
      .toString()
      .padStart(2, '0')}:${this.minutes.toString().padStart(2, '0')}`;

    const fakeAnswers = new Set<string>();
    fakeAnswers.add(this.correctAnswer);

    while (fakeAnswers.size < 4) {
      const fakeHour = Math.floor(Math.random() * 12);
      const fakeMin =
        minutesOptions[Math.floor(Math.random() * minutesOptions.length)];
      const fake = `${(fakeHour === 0 ? 12 : fakeHour)
        .toString()
        .padStart(2, '0')}:${fakeMin.toString().padStart(2, '0')}`;
      fakeAnswers.add(fake);
    }

    this.answers = Array.from(fakeAnswers).sort(() => Math.random() - 0.5);
    this.selectedAnswer = null;
  }

  chooseAnswer(answer: string): void {
    this.selectedAnswer = answer;

    const isCorrect = this.isCorrect(answer);
    this.results.push(isCorrect ? 'correct' : 'wrong');
    if (this.results.length > 10) this.results.shift();

    if (isCorrect) {
      this.streak++;
      if ([5, 10].includes(this.streak)) {
        this.triggerConfetti();
      }
    } else {
      this.streak = 0;
    }
  }

  isCorrect(answer: string): boolean {
    return answer === this.correctAnswer;
  }

  triggerConfetti(): void {
    this.showConfetti = true;
    setTimeout(() => {
      this.showConfetti = false;
    }, 1200);
  }
}
