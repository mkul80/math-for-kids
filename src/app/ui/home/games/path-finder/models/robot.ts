import { Board } from './board';
import { MoveCommand, Position } from './path-finder.models';

export class Robot {
  constructor(private position: Position, private board: Board) {}

  get currentPosition(): Position {
    return {
      ...this.position,
      equals(position: Position): boolean {
        return this.row === position.row && this.column === position.column;
      },
    };
  }

  set currentPosition(position: Position) {
    this.position = new Position(position.row, position.column);
  }

  resetPosition(): void {
    this.position = new Position(this.board.start.row, this.board.start.column);
  }

  validateCommand(command: MoveCommand): boolean {
    const newPosition = { ...this.position };
    switch (command) {
      case 'moveUp':
        newPosition.row -= 1;
        break;
      case 'moveDown':
        newPosition.row += 1;
        break;
      case 'moveLeft':
        newPosition.column -= 1;
        break;
      case 'moveRight':
        newPosition.column += 1;
        break;
      default:
        console.error('Unknown command:', command);
        return false;
    }
    return (
      newPosition.row >= 0 &&
      newPosition.row < this.board.size &&
      newPosition.column >= 0 &&
      newPosition.column < this.board.size &&
      this.board.fields[newPosition.row][newPosition.column].isFree
    );
  }

  performMovement(command: MoveCommand): void {
    if (this.validateCommand(command)) {
      switch (command) {
        case 'moveUp':
          this.move(-1, 0);
          break;
        case 'moveDown':
          this.move(1, 0);
          break;
        case 'moveLeft':
          this.move(0, -1);
          break;
        case 'moveRight':
          this.move(0, 1);
          break;
        default:
          console.error('Unknown command:', command);
      }
    } else {
      console.error('Invalid move:', command);
    }
  }

  private move(rowDelta: number, columnDelta: number): void {
    const newPosition = new Position(
      this.position.row + rowDelta,
      this.position.column + columnDelta
    );

    if (this.isValidPosition(newPosition)) {
      this.position = newPosition;
    }
  }

  private isValidPosition(position: Position): boolean {
    return (
      position.row >= 0 &&
      position.row < this.board.size &&
      position.column >= 0 &&
      position.column < this.board.size &&
      this.board.fields[position.row][position.column].isFree
    );
  }
}
