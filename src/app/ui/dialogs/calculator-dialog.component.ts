import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-calculator-dialog',
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    FormsModule,
    MatGridListModule,
    MatIconModule,
  ],
  template: `
    <h2 mat-dialog-title class="text-center">Kalkulator</h2>
    <mat-dialog-content>
      <div class="display">{{ display || '0' }}</div>
      <mat-grid-list cols="4" rowHeight="60px" gutterSize="10px">
        <mat-grid-tile>
          <button class="calc-btn number-btn" (click)="addNumber('7')">
            7
          </button>
        </mat-grid-tile>
        <mat-grid-tile>
          <button class="calc-btn number-btn" (click)="addNumber('8')">
            8
          </button>
        </mat-grid-tile>
        <mat-grid-tile>
          <button class="calc-btn number-btn" (click)="addNumber('9')">
            9
          </button>
        </mat-grid-tile>
        <mat-grid-tile>
          <button class="calc-btn operator-btn" (click)="setOperation('÷')">
            ÷
          </button>
        </mat-grid-tile>

        <mat-grid-tile>
          <button class="calc-btn number-btn" (click)="addNumber('4')">
            4
          </button>
        </mat-grid-tile>
        <mat-grid-tile>
          <button class="calc-btn number-btn" (click)="addNumber('5')">
            5
          </button>
        </mat-grid-tile>
        <mat-grid-tile>
          <button class="calc-btn number-btn" (click)="addNumber('6')">
            6
          </button>
        </mat-grid-tile>
        <mat-grid-tile>
          <button class="calc-btn operator-btn" (click)="setOperation('×')">
            ×
          </button>
        </mat-grid-tile>

        <mat-grid-tile>
          <button class="calc-btn number-btn" (click)="addNumber('1')">
            1
          </button>
        </mat-grid-tile>
        <mat-grid-tile>
          <button class="calc-btn number-btn" (click)="addNumber('2')">
            2
          </button>
        </mat-grid-tile>
        <mat-grid-tile>
          <button class="calc-btn number-btn" (click)="addNumber('3')">
            3
          </button>
        </mat-grid-tile>
        <mat-grid-tile>
          <button class="calc-btn operator-btn" (click)="setOperation('-')">
            -
          </button>
        </mat-grid-tile>

        <mat-grid-tile>
          <button class="calc-btn number-btn" (click)="addNumber('0')">
            0
          </button>
        </mat-grid-tile>
        <mat-grid-tile>
          <button class="calc-btn operator-btn" (click)="setOperation('+')">
            +
          </button>
        </mat-grid-tile>
        <mat-grid-tile>
          <button class="calc-btn equals-btn" (click)="calculate()">=</button>
        </mat-grid-tile>
        <mat-grid-tile>
          <button class="calc-btn clear-btn" (click)="clear()">C</button>
        </mat-grid-tile>
      </mat-grid-list>
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-flat-button color="primary" (click)="dialogRef.close()">
        Zamknij
      </button>
    </mat-dialog-actions>
  `,
  styles: [
    `
      .display {
        background-color: #f0f8ff;
        padding: 20px;
        font-size: 2rem;
        text-align: right;
        margin-bottom: 20px;
        border-radius: 10px;
        box-shadow: inset 0 2px 5px rgba(0, 0, 0, 0.1);
        min-height: 40px;
      }

      .full-size {
        width: 100%;
        height: 100%;
        border-radius: 10px !important;
        font-size: 1.5rem;
      }

      .calc-btn {
        width: 100%;
        height: 100%;
        border: none;
        border-radius: 10px;
        font-size: 1.5rem;
        cursor: pointer;
        transition: all 0.2s ease;
        font-family: inherit;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 0;
        margin: 0;
        outline: none;

        &:active {
          transform: scale(0.95);
        }
      }

      .number-btn {
        background-color: #e3f2fd;
        &:hover {
          background-color: #90caf9;
        }
      }

      .operator-btn {
        background-color: #fff3e0;
        color: #ff6b6b;
        font-weight: bold;
        &:hover {
          background-color: #ffe0b2;
        }
      }

      .equals-btn {
        background-color: #d4ffea;
        color: #2ecc71;
        font-weight: bold;
        &:hover {
          background-color: #2ecc71;
          color: white;
        }
      }

      .clear-btn {
        background-color: #ffe5e5;
        color: #e74c3c;
        font-weight: bold;
        &:hover {
          background-color: #e74c3c;
          color: white;
        }
      }
    `,
  ],
})
export class CalculatorComponent {
  display = '';
  firstNumber: number | null = null;
  operation: string | null = null;
  newNumber = false;

  constructor(public dialogRef: MatDialogRef<CalculatorComponent>) {}

  addNumber(num: string): void {
    if (this.newNumber) {
      this.display = num;
      this.newNumber = false;
    } else {
      // Limit input to 3 digits
      if (this.display.length >= 3) return;
      this.display = this.display + num;
    }
  }

  setOperation(op: string): void {
    if (this.firstNumber === null) {
      this.firstNumber = Number(this.display);
      this.newNumber = true;
    } else if (!this.newNumber) {
      this.calculate();
    }
    this.operation = op;
  }

  calculate(): void {
    if (this.firstNumber === null || this.newNumber) return;

    const secondNumber = Number(this.display);
    let result: number;

    switch (this.operation) {
      case '+':
        result = this.firstNumber + secondNumber;
        break;
      case '-':
        result = this.firstNumber - secondNumber;
        break;
      case '×':
        result = this.firstNumber * secondNumber;
        break;
      case '÷':
        result = this.firstNumber / secondNumber;
        break;
      default:
        return;
    }

    // Format the result to 2 decimal places if it's a floating point number
    const formattedResult = Number.isInteger(result)
      ? String(result)
      : result.toFixed(2).replace(/\.?0+$/, '');

    this.display = formattedResult;
    this.firstNumber = Number(formattedResult);
    this.newNumber = true;
  }

  clear(): void {
    this.display = '';
    this.firstNumber = null;
    this.operation = null;
    this.newNumber = false;
  }
}
