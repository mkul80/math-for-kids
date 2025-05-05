export const FIELD_VALUES = ['🍎', '🍌', '🍒', '🍐', '🫐', '🥝'] as const;
export type FieldValue = (typeof FIELD_VALUES)[number];
export type boardSize = 3 | 4 | 5;
export type difficultyLevel = 0 | 1 | 2;

export class SudokuField {
  value?: number;
  #correctValue: number;
  isDiscovered: boolean;
  isReadonly: boolean;

  get symbol(): string {
    return this.value ? FIELD_VALUES[this.value - 1] : '❓';
  }
  changeValue(value: number): void {
    if (this.isReadonly) {
      throw new Error('Cannot change value of a readonly field');
    }
    this.value = value;
  }
  constructor(value: number, isDiscovered = false) {
    this.value = isDiscovered ? value : undefined;
    this.isReadonly = isDiscovered;
    this.isDiscovered = isDiscovered;
    this.#correctValue = value;
  }
  discover(): void {
    if (this.isReadonly) {
      throw new Error('Cannot discover a readonly field');
    }
    this.isDiscovered = true;
    this.value = this.#correctValue;
  }
  isCorrect(): boolean {
    return this.value === this.#correctValue;
  }
}

export class SudokuBoard {
  size: boardSize;
  fields: SudokuField[][];
  constructor(fields: SudokuField[][], size: boardSize) {
    this.fields = fields;
    this.size = size;
  }
  getField(row: number, col: number): SudokuField {
    if (row < 0 || row >= this.size || col < 0 || col >= this.size) {
      throw new Error('Invalid row or column index');
    }
    return this.fields[row][col];
  }
  getRow(row: number): SudokuField[] {
    if (row < 0 || row >= this.size) {
      throw new Error('Invalid row index');
    }
    return this.fields[row];
  }
  changeFieldValue(field: SudokuField): void {
    if (field.isReadonly) {
      throw new Error('Cannot change value of a readonly field');
    }
    field.isDiscovered = true;
    field.value = !field.value ? 1 : (field.value % this.size) + 1;
  }
  discoverAllFields(): void {
    this.fields.forEach((row) =>
      row.forEach((field) => {
        if (!field.isReadonly) {
          field.discover();
        }
      })
    );
  }
  isFinished(): boolean {
    return this.fields.every((row) =>
      row.every((field) => field.isDiscovered && field.isCorrect())
    );
  }
}
