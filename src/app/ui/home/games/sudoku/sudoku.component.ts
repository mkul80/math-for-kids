import { Component, Input, OnInit, inject } from '@angular/core';
import { boardSize, SudokuField, SudokuBoard } from './sudoku.models';
import { BoardGeneratorService } from './board-generator.service';
import { TranslatePipe } from '@ngx-translate/core';
import { RouterLink } from '@angular/router';
import { MatButton } from '@angular/material/button';
import { ActivatedRoute } from '@angular/router';
import { DatePipe, DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-sudoku',
  imports: [TranslatePipe, DecimalPipe, RouterLink, MatButton],
  templateUrl: './sudoku.component.html',
  styleUrl: './sudoku.component.scss',
})
export class SudokuComponent implements OnInit {
  #route = inject(ActivatedRoute);
  board!: SudokuBoard;
  isGameFinished: boolean = false;
  userGivenUp: boolean = false;
  boardSize!: boardSize;
  timer: { minutes: number; seconds: number } = { minutes: 0, seconds: 0 };
  private timerInterval!: ReturnType<typeof setInterval>;

  ngOnInit(): void {
    if (!this.#route.snapshot.paramMap.has('boardSize')) {
      throw new Error('boardSize is required');
    }
    this.boardSize = +this.#route.snapshot.paramMap.get(
      'boardSize'
    )! as boardSize;
    this.board = BoardGeneratorService.generateBoard(
      this.boardSize,
      Math.floor(this.boardSize / 5) * 8
    );
    this.startTimer();
  }

  private startTimer(): void {
    this.timer = { minutes: 0, seconds: 0 };
    this.timerInterval = setInterval(() => {
      this.timer.seconds++;
      if (this.timer.seconds === 60) {
        this.timer.seconds = 0;
        this.timer.minutes++;
      }
    }, 1000);
  }

  private stopTimer(): void {
    clearInterval(this.timerInterval);
  }

  onRestart(): void {
    this.isGameFinished = false;
    this.board = BoardGeneratorService.generateBoard(
      this.boardSize,
      Math.floor(this.boardSize / 5) * 8
    );
    this.startTimer();
  }

  onGiveUp(): void {
    this.userGivenUp = true;
    this.stopTimer();
    this.board.discoverAllFields();
  }

  onCellClick(field: SudokuField): void {
    if (this.isGameFinished) {
      return;
    }
    if (field.isReadonly) {
      return;
    }
    this.board.changeFieldValue(field);

    if (this.board.isFinished()) {
      this.stopTimer();
      setTimeout(() => {
        this.isGameFinished = true;
      }, 1000);
    }
  }
}
