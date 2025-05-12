import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Config } from '../../../../../common/config/config-option-selector/config-option.model';
import { ConfigComponent } from '../../../../../common/config/config.component';

@Component({
  selector: 'app-clock-setup',
  imports: [ConfigComponent],
  templateUrl: './clock-setup.component.html',
  styleUrl: './clock-setup.component.scss',
})
export class ClockSetupComponent {
  #router = inject(Router);

  config: Config<[number]> = {
    steps: [
      {
        options: [
          { value: 0, labelKey: 'clock.config.difficulty_level_0' },
          { value: 1, labelKey: 'clock.config.difficulty_level_1' },
          { value: 2, labelKey: 'clock.config.difficulty_level_2' },
        ],
        labelKey: 'clock.config.difficulty_level',
      },
    ],
  };
  onConfigChange([difficultyLevel]: number[]): void {
    this.#router.navigate(['/home/clock', difficultyLevel]);
  }
}
