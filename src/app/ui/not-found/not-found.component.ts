import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [MatButtonModule, MatIconModule, RouterLink],
  template: `
    <div class="container h-100 d-flex flex-column justify-center align-center">
      <h1>Ups! Zgubiliśmy się w kosmosie!</h1>
      <p>Nie martw się, wróćmy do naszej przygody z matematyką!</p>
      <button mat-raised-button color="primary" routerLink="/">
        <mat-icon>home</mat-icon>
        Wróć do strony głównej
      </button>
    </div>
  `,
  styles: `
    .container {
      padding: 16px;
    }
    .emoji {
      font-size: 64px;
      height: 64px;
      width: 64px;
      margin-bottom: 16px;
      color: #FFA726;
    }
    h1 {
      color: #3F51B5;
      margin-bottom: 16px;
      text-align: center;
    }
    p {
      color: #666;
      font-size: 18px;
      margin-bottom: 24px;
      text-align: center;
    }
  `,
})
export class NotFoundComponent {}
