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
import { TranslatePipe, TranslateService } from '@ngx-translate/core';

@Component({
  standalone: true,
  selector: 'app-header',
  imports: [
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    TranslatePipe,
  ],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  #router = inject(Router);
  #dialogService = inject(MatDialog);
  #translateService = inject(TranslateService);

  get selectedLang() {
    return this.#translateService.currentLang;
  }

  onLangChange(lang: string) {
    this.#translateService.use(lang);
  }

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
