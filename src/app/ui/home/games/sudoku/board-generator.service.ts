import { masks, sampleBoards } from './sudoku.consts';
import { boardSize, SudokuField, SudokuBoard } from './sudoku.models';

export class BoardGeneratorService {
  static generateBoard(
    size: boardSize,
    additionalFieldsToDiscover = 0
  ): SudokuBoard {
    const sampleBoard = sampleBoards[size];
    const mask = masks[size];

    const board = this.initializeBoard(size, sampleBoard, mask);

    if (additionalFieldsToDiscover > 0) {
      this.discoverAdditionalFields(
        board,
        size,
        mask,
        additionalFieldsToDiscover
      );
    }

    return new SudokuBoard(board, size);
  }

  private static initializeBoard(
    size: boardSize,
    sampleBoard: number[][],
    mask: number[][]
  ): SudokuField[][] {
    return sampleBoard.map((row, i) =>
      row.map((value, j) => new SudokuField(value, mask[i][j] === 1))
    );
  }

  private static discoverAdditionalFields(
    board: SudokuField[][],
    size: boardSize,
    mask: number[][],
    additionalFieldsToDiscover: number
  ): void {
    const totalFields = size * size;
    const undiscoveredFields = board
      .flat()
      .filter(
        (field, index) =>
          !field.isDiscovered &&
          mask[Math.floor(index / size)][index % size] === 0
      );

    const fieldsToDiscover = Math.min(
      additionalFieldsToDiscover,
      undiscoveredFields.length
    );
    const shuffledFields = undiscoveredFields.sort(() => Math.random() - 0.5);

    for (let i = 0; i < fieldsToDiscover; i++) {
      shuffledFields[i].discover();
    }
  }
}
