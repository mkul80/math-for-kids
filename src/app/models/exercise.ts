import { inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

export type Operation = '+' | '-';
export type SelectableOperation = '+' | '-' | 'both';

const keycapEmojis = [
  '0️⃣',
  '1️⃣',
  '2️⃣',
  '3️⃣',
  '4️⃣',
  '5️⃣',
  '6️⃣',
  '7️⃣',
  '8️⃣',
  '9️⃣',
  '🔟',
];
export interface ITerm {
  value: number;
  operation?: Operation;
}

export class Term implements ITerm {
  value: number;
  operation?: Operation;

  constructor(value: number, operation?: Operation) {
    this.value = value;
    this.operation = operation;
  }
}

export interface IExercise {
  readonly terms: Term[];
  values: number[];
  evaluate(): number;
  toString(): string;
  renderStepsAsHtml(): string;
}

export class Exercise implements IExercise {
  constructor(public readonly terms: Term[]) {
    if (terms.length < 2) {
      throw new Error('An exercise must contain at least two terms.');
    }
    if (!terms[0] || terms[0].operation) {
      throw new Error(
        'First term must exist and should not have an operation.'
      );
    }
    for (let i = 1; i < terms.length; i++) {
      if (!terms[i].operation) {
        throw new Error(`Term at index ${i} must have an operation.`);
      }
    }
  }

  get values(): number[] {
    return this.terms.map(term => term.value);
  }

  get operations(): Operation[] {
    return this.terms.slice(1).map(term => term.operation as Operation);
  }

  evaluate(): number {
    return this.terms.reduce((acc, term, idx) => {
      if (idx === 0) return term.value;
      if (term.operation === '+') return acc + term.value;
      if (term.operation === '-') return acc - term.value;
      throw new Error(`Invalid operation at index ${idx}`);
    }, 0);
  }

  toString(): string {
    return this.terms
      .map(term =>
        term.operation ? `${term.operation} ${term.value}` : `${term.value}`
      )
      .join(' ');
  }

  renderStepsAsHtml(): string {
    let current = this.terms[0].value;
    let html = '';

    for (let i = 1; i < this.terms.length; i++) {
      const term = this.terms[i];
      const prev = current;
      let opSymbol = term.operation;

      if (opSymbol === '+') {
        current += term.value;
      } else if (opSymbol === '-') {
        current -= term.value;
      } else {
        throw new Error(`Unsupported operation: ${opSymbol}`);
      }

      html += `<div>
      <span class="label">${keycapEmojis[i]}: </span>
        <span class="value">${prev}</span>
        <span class="op op-${opSymbol}"> ${opSymbol} </span>
        <span class="value">${term.value}</span>
        <span class="eq"> = </span>
        <span class="result">${current}</span>
      </div>\n`;
    }

    return html.trim();
  }
}

export class ExerciseBuilder {
  private terms: Term[] = [];

  first(value: number): this {
    if (this.terms.length > 0) {
      throw new Error('First value has already been set.');
    }
    this.terms.push(new Term(value));
    return this;
  }

  add(operation: Operation, value: number): this {
    if (this.terms.length === 0) {
      throw new Error('You must call first() before adding operations.');
    }
    this.terms.push(new Term(value, operation));
    return this;
  }

  build(): Exercise {
    if (this.terms.length < 2) {
      throw new Error('An exercise must contain at least two terms.');
    }
    return new Exercise(this.terms);
  }
}
