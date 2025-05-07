import { BoardField } from './field';
import { Position } from './path-finder.models';

export class Board {
  constructor(
    public start: Position,
    public end: Position,
    public size: number,
    public fields: BoardField[][]
  ) {}

  isEndPosition(row: number, column: number): boolean {
    return this.end.row === row && this.end.column === column;
  }
}
