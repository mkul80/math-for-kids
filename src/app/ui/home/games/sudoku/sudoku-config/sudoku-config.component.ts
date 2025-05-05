import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Config } from '../../../../../common/config/config-option-selector/config-option.model';
import { ConfigComponent } from '../../../../../common/config/config.component';

@Component({
  standalone: true,
  selector: 'app-sudoku-config',
  imports: [ConfigComponent],
  templateUrl: './sudoku-config.component.html',
  styleUrl: './sudoku-config.component.scss',
})
export class SudokuConfigComponent {
  #router = inject(Router);

  config: Config = {
    steps: [
      {
        options: [
          { value: 3, labelKey: 'sudoku.config.board_size_3' },
          { value: 4, labelKey: 'sudoku.config.board_size_4' },
          { value: 5, labelKey: 'sudoku.config.board_size_5' },
        ],
        labelKey: 'sudoku.config.board_size',
      },
      {
        options: [
          { value: 0, labelKey: 'sudoku.config.difficulty_level_0' },
          { value: 1, labelKey: 'sudoku.config.difficulty_level_1' },
          { value: 2, labelKey: 'sudoku.config.difficulty_level_2' },
        ],
        labelKey: 'sudoku.config.difficulty_level',
      },
    ],
  };
  onConfigChange([boardSize, difficultyLevel]: number[]): void {
    this.#router.navigate(['/home/sudoku-game', boardSize, difficultyLevel]);
  }
}
