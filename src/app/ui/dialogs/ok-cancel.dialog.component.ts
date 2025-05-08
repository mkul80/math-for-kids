import { Component, Inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { TranslatePipe } from '@ngx-translate/core';

export interface OkCancelDialogData {
  header?: string;
  content?: string;
  okButtonTitle?: string;
  cancelButtonTitle?: string;
  hideCancelButton?: boolean;
}

export enum OkCancelDialogResult {
  OK = 'OK',
  CANCEL = 'CANCEL',
}

@Component({
  selector: 'app-ok-cancel-dialog',
  template: `
    <h2 class="header-1 text-center">
      {{ data.header || 'universal_dialog.header' | translate }}
    </h2>
    <mat-dialog-content>
      <p class="paragraph-1">
        {{ data.content || 'universal_dialog.content' | translate }}
      </p>
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      @if(!data.hideCancelButton) {
      <button mat-button [mat-dialog-close]="false">
        {{
          data.cancelButtonTitle || 'universal_dialog.cancel_button' | translate
        }}</button
      >}
      <button mat-raised-button color="primary" [mat-dialog-close]="true">
        {{ data.okButtonTitle || 'universal_dialog.ok_button' | translate }}
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
      button {
        font-size: 1.5rem;
      }
    `,
  ],
  standalone: true,
  imports: [
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatButtonModule,
    TranslatePipe,
  ],
})
export class OkCancelDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<OkCancelDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: OkCancelDialogData
  ) {}
}
