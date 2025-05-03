import { Component, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { Router, RouterLink } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { OkCancelDialogComponent } from '../../dialogs/ok-cancel.dialog.component';
import { map, take } from 'rxjs/operators';
import { CalculatorComponent } from '../../dialogs/calculator-dialog.component';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { MatDividerModule } from '@angular/material/divider';
import { HttpClient } from '@angular/common/http';
import { Logger } from '../../../common/logger.service';
import { AuthService } from '../../../common/auth.service';

@Component({
  standalone: true,
  imports: [
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    TranslatePipe,
    MatDividerModule,
    RouterLink,
  ],
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  #router = inject(Router);
  #dialogService = inject(MatDialog);
  #translateService = inject(TranslateService);
  #http = inject(HttpClient);
  #authService = inject(AuthService);
  get userName(): string {
    Logger.log('userName', this.#authService);
    return this.#authService.userName;
  }

  version: string = '';

  ngOnInit() {
    this.#http
      .get<{ version: string }>('assets/version.json')
      .pipe(
        take(1),
        map((data) => data.version)
      )
      .subscribe((version) => (this.version = version));
  }

  get selectedLang() {
    Logger.log('selectedLang', this.#translateService.currentLang);
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
