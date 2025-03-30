import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'app-header',
  imports: [MatToolbarModule, MatButtonModule, MatIconModule],
  template: `<mat-toolbar
    color="primary"
    class="d-flex justify-content-between mat-toolbar"
    style="border-radius: 0 0 15px 15px; box-shadow: 0 2px 6px rgba(0,0,0,0.2);"
  >
    <button mat-icon-button>
      <mat-icon>school</mat-icon>
    </button>
    <span style="font-size: 1.5em; font-weight: bold; color: #fff;"
      >Nauka matematyki</span
    >

    <span class="expander"></span>
    <button mat-icon-button class="example-icon" style="color: #fff;">
      <mat-icon>face</mat-icon>
    </button>
  </mat-toolbar>`,
  styles: `
    .mat-toolbar {
      padding: 8px 16px;
      min-height: 70px;
      height:70px;
    }
  `,
})
export class HeaderComponent {}
