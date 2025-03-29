import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MatToolbarModule, MatButtonModule, MatIconModule],
  template: `<mat-toolbar
    color="accent"
    class="d-flex justify-content-between mat-toolbar"
  >
    <button
      mat-icon-button
      class="example-icon"
      aria-label="Example icon-button with menu icon"
    >
      <mat-icon>menu</mat-icon>
    </button>
    <span>Nauka matematyki</span>
    <span class="example-spacer"></span>
    <button
      mat-icon-button
      class="example-icon favorite-icon"
      aria-label="Example icon-button with heart icon"
    >
      <mat-icon>favorite</mat-icon>
    </button>
    <span class="expander"></span>
    <button
      mat-icon-button
      class="example-icon"
      aria-label="Example icon-button with share icon"
    >
      <mat-icon>person</mat-icon>
    </button>
  </mat-toolbar>`,
  styles: ':host {}',
})
export class HomeComponent {}
