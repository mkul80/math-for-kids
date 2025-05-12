import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Config } from '../../../../../common/config/config-option-selector/config-option.model';
import { ConfigComponent } from '../../../../../common/config/config.component';

@Component({
  selector: 'app-path-finder-setup',
  imports: [ConfigComponent],
  templateUrl: './path-finder-setup.component.html',
  styleUrl: './path-finder-setup.component.scss',
})
export class PathFinderSetupComponent {
  #router = inject(Router);

  config: Config<[number]> = {
    steps: [
      {
        options: [
          { value: 5, labelKey: 'path_finder.config.board_size_5' },
          { value: 6, labelKey: 'path_finder.config.board_size_6' },
          { value: 7, labelKey: 'path_finder.config.board_size_7' },
          { value: 8, labelKey: 'path_finder.config.board_size_8' },
        ],
        labelKey: 'path_finder.config.board_size',
      },
    ],
  };
  onConfigChange([boardSize]: number[]): void {
    this.#router.navigate(['/home/path-finder/game', boardSize]);
  }
}
