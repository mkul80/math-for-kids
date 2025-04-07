import { Component, Inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogContent,
  MatDialogTitle,
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
    <h2 mat-dialog-title>{{ data.header || 'Potwierdzenie' }}</h2>
    <mat-dialog-content>
      <p>{{ data.content || 'Czy na pewno chcesz wykonać tę operację?' }}</p>
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
    MatDialogTitle,
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
