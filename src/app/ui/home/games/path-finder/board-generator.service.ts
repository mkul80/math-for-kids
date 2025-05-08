import { Board } from './models/board';
import { BoardField } from './models/field';
import { FIELD_VALUES, Position } from './models/path-finder.models';

export class BoardGeneratorService {
  static generateBoard(size: number): Board {
    const fields = Array(size)
      .fill(null)
      .map(() =>
        Array(size)
          .fill(null)
          .map(() => new BoardField(1))
      );

    // Place start in one corner and end in the opposite
    const useTopLeftToBottomRight = Math.random() < 0.5;
    const startRow = useTopLeftToBottomRight ? 0 : size - 1;
    const startCol = 0;
    const endRow = useTopLeftToBottomRight ? size - 1 : 0;
    const endCol = size - 1;

    let currentRow = startRow;
    let currentCol = startCol;

    while (!(currentRow === endRow && currentCol === endCol)) {
      fields[currentRow][currentCol].value = 0;
      const moveUp = currentRow > 0;
      const moveDown = currentRow < size - 1;
      const moveRight = currentCol < size - 1;

      const direction = Math.random();
      if (currentRow < endRow && moveDown && direction < 0.4) {
        currentRow++;
        fields[currentRow][currentCol].value = 0;
      } else if (currentRow > endRow && moveUp && direction < 0.4) {
        currentRow--;
        fields[currentRow][currentCol].value = 0;
      } else if (moveRight) {
        currentCol++;
        fields[currentRow][currentCol].value = 0;
      }
    }

    // Fill remaining fields with random values
    for (let i = 0; i < size; i++) {
      for (let j = 0; j < size; j++) {
        if (fields[i][j].value !== 0) {
          fields[i][j].value = Math.floor(Math.random() * FIELD_VALUES.length);
        }
      }
    }

    return new Board(
      new Position(startRow, startCol),
      new Position(endRow, endCol),
      size,
      fields
    );
  }
}
