import { Operation } from './operation';

export class Exercise {
  constructor(
    public values: number[],
    public operation: Operation,
    public result: number
  ) {}
}
