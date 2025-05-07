import { FIELD_VALUES } from './path-finder.models';

export class BoardField {
  value: number;
  constructor(value: number) {
    this.value = value;
  }
  get isFree(): boolean {
    return this.value === 0;
  }
  get symbol(): string {
    return FIELD_VALUES[this.value];
  }
}
