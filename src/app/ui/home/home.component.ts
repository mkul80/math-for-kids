import { Component, HostBinding } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { HeaderComponent } from '../layout/header/header.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    HeaderComponent,
    RouterModule,
  ],
  template: `<app-header></app-header>
    <main class="d-flex flex-column align-center justify-center">
      <router-outlet></router-outlet>
    </main>`,
  styles: `
    :host {
      display: block;
      height: 100vh;
      background: linear-gradient(135deg, 
        #ff9ae1 0%,
        #ffd1eb 25%,
        #c1f0ff 50%,
        #b6f5e1 75%,
        #fff3b6 100%
      );
    }
    main{
      height: calc(100dvh - 70px);
      overflow: auto;
    }
  `,
})
export class HomeComponent {
  @HostBinding('class') class = 'h-100';
}
