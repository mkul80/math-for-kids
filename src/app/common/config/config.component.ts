import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Config } from './config-option-selector/config-option.model';
import { ConfigOptionSelectorComponent } from './config-option-selector/config-option-selector.component';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-config',
  imports: [ConfigOptionSelectorComponent, TranslatePipe],
  templateUrl: './config.component.html',
  styleUrl: './config.component.scss',
})
export class ConfigComponent {
  @Input() config!: Config<any>;
  @Output() selectionChange = new EventEmitter();
  currentIndex = 0;
  selectedValues: any[] = [];

  onSelectionChange(selectedValue: any): void {
    this.selectedValues[this.currentIndex] = selectedValue;
    if (this.currentIndex < this.config.steps.length) {
      this.currentIndex++;
    }
    if (this.currentIndex === this.config.steps.length) {
      this.selectionChange.emit(this.selectedValues);
      this.currentIndex = 0; // Reset to the first step after selection
    }
  }
}
