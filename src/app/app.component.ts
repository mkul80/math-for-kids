import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HomeComponent } from './ui/home/home.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HomeComponent],
  template: '<app-home></app-home>',
  styles: '',
})
export class AppComponent {
  title = 'math-tutorial';
}
