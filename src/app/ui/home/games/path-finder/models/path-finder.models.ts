export type MoveCommand = 'moveUp' | 'moveDown' | 'moveLeft' | 'moveRight';
export type BoardSize = 5 | 6 | 7 | 8 | 9 | 10;
export class Position {
  constructor(public row: number, public column: number) {}

  equals(position: Position): boolean {
    return this.row === position.row && this.column === position.column;
  }
}
export const FIELD_VALUES = [
  '',
  '📦',
  '🗑',
  '🛋',
  '🪑',
  '🧱',
  '🪨',
  '🔧',
  '🧲',
  '🪵',
] as const;
