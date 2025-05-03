import { Component, Inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

export interface OkCancelDialogData {
  header?: string;
  content?: string;
}

@Component({
  selector: 'app-ok-cancel-dialog',
  template: `
    <h2 class="header-1 text-center">{{ data.header || 'Potwierdzenie' }}</h2>
    <mat-dialog-content>
      <p class="paragraph-1">
        {{ data.content || 'Czy na pewno chcesz wykonać tę operację?' }}
      </p>
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button [mat-dialog-close]="false">Anuluj</button>
      <button mat-raised-button color="primary" [mat-dialog-close]="true">
        OK
      </button>
    </mat-dialog-actions>
  `,
  styles: [
    `
      mat-dialog-content {
        min-width: 300px;
      }
      mat-dialog-actions {
        padding: 16px;
      }
    `,
  ],
  standalone: true,
  imports: [
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatButtonModule,
  ],
})
export class OkCancelDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<OkCancelDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: OkCancelDialogData
  ) {}
}
