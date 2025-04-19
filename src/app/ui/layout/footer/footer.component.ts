import { Component, inject } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { MatMenuModule } from '@angular/material/menu';

@Component({
  selector: 'app-footer',
  imports: [
    TranslatePipe,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
  ],
  standalone: true,
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent {
  #translateService = inject(TranslateService);

  get selectedLang() {
    return this.#translateService.currentLang;
  }

  langChange(lang: string) {
    this.#translateService.use(lang);
  }

  currentYear = new Date().getFullYear();
}
