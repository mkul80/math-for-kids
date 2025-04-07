import { Component, HostListener } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  template: '<router-outlet></router-outlet>',
  styles: `:host{
    display: block;
    height: 100%;
}`,
})
export class AppComponent {
  @HostListener('document:visibilitychange')
  onVisibilityChange() {
    if (document.visibilityState === 'visible') {
      console.log('Page is visible, checking version...');
      this.checkVersion();
    }
  }
  title = 'math-tutorial';
  constructor() {
    // Check version initially
    this.checkVersion();
  }

  async checkVersion() {
    try {
      const response = await fetch('/assets/version.json');
      const { version: currentVersion } = await response.json();
      const storedVersion = localStorage.getItem('appVersion');

      if (storedVersion && storedVersion !== currentVersion) {
        localStorage.setItem('appVersion', currentVersion);
        window.location.reload();
      } else if (!storedVersion) {
        localStorage.setItem('appVersion', currentVersion);
      }
    } catch (error) {
      console.error('Version check failed:', error);
    }
  }
}
