import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { OkCancelDialogComponent } from '../../dialogs/ok-cancel.dialog.component';
import { take } from 'rxjs/operators';
import { CalculatorComponent } from '../../dialogs/calculator-dialog.component';

@Component({
  standalone: true,
  selector: 'app-header',
  imports: [MatToolbarModule, MatButtonModule, MatIconModule, MatMenuModule],
  template: `<mat-toolbar
    color="primary"
    class="d-flex justify-content-between mat-toolbar"
    style="border-radius: 0 0 15px 15px; box-shadow: 0 2px 6px rgba(0,0,0,0.2);"
  >
    <button mat-icon-button [matMenuTriggerFor]="menu" style="color: #fff;">
      <mat-icon>menu</mat-icon>
    </button>
    <mat-menu #menu="matMenu">
      <button mat-menu-item (click)="goHome()">
        <mat-icon>home</mat-icon>
        <span>Strona główna</span>
      </button>
      <button mat-menu-item (click)="openCalculator()">
        <mat-icon>calculate</mat-icon>
        <span>Kalkulator</span>
      </button>
    </mat-menu>

    <span style="font-size: 1.5em; font-weight: bold; color: #fff;"
      >Nauka matematyki</span
    >

    <span class="expander"></span>
    <button mat-icon-button style="color: #fff;">
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
export class HeaderComponent {
  #router = inject(Router);
  #dialogService = inject(MatDialog);

  goHome() {
    const dialogRef = this.#dialogService.open(OkCancelDialogComponent, {
      data: {
        header: 'Powrót do strony głównej',
        content:
          'Czy na pewno chcesz przerwać to ćwiczenie i wrócić do strony głównej?',
      },
    });

    dialogRef
      .afterClosed()
      .pipe(take(1))
      .subscribe((result) => {
        if (result) {
          this.#router.navigate(['/']);
        }
      });
  }

  openCalculator() {
    this.#dialogService.open(CalculatorComponent, {
      width: '350px',
      maxWidth: '90vw',
    });
  }
}
