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

    // Generate random start and end positions
    const startRow = Math.floor(Math.random() * size);
    let endRow;
    do {
      endRow = Math.floor(Math.random() * size);
    } while (endRow === startRow);

    let currentRow = startRow;
    let currentCol = 0;

    while (!(currentRow === endRow && currentCol === size - 1)) {
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
          fields[i][j].value =
            Math.floor(Math.random() * (FIELD_VALUES.length - 1)) + 1;
        }
      }
    }

    return new Board(
      new Position(startRow, 0),
      new Position(endRow, size - 1),
      size,
      fields
    );
  }
}
