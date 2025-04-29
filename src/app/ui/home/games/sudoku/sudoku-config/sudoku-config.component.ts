import { Component, inject } from '@angular/core';
import {
  ConfigOption,
  ConfigOptionSelectorComponent,
} from '../../../../../common/ui/config-option-selector/config-option-selector.component';
import { Router } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-sudoku-config',
  imports: [ConfigOptionSelectorComponent],
  templateUrl: './sudoku-config.component.html',
  styleUrl: './sudoku-config.component.scss',
})
export class SudokuConfigComponent {
  #router = inject(Router);
  selectedBoardSize: number = 3;
  boardSizes: ConfigOption<number>[] = [
    { value: 3, labelKey: 'sudoku.config.board_size_3' },
    { value: 4, labelKey: 'sudoku.config.board_size_4' },
    { value: 5, labelKey: 'sudoku.config.board_size_5' },
  ];
  onBoardSizeChange(selectedBoardSize: number): void {
    this.selectedBoardSize = selectedBoardSize;
    this.#router.navigate(['/home/sudoku-game', selectedBoardSize]);
  }
}
