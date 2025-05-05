import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { TranslatePipe } from '@ngx-translate/core';
import { ConfigOption } from './config-option.model';

@Component({
  selector: 'app-config-option-selector',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatButtonToggleModule,
    MatCardModule,
    TranslatePipe,
  ],
  templateUrl: './config-option-selector.component.html',
  styleUrl: './config-option-selector.component.scss',
})
export class ConfigOptionSelectorComponent<T> {
  @Input() labelKey!: string;
  @Input() options!: ConfigOption<T>[];
  @Output() selectionChange = new EventEmitter<T>();

  formControl = new FormControl<T | null>(null);

  constructor() {
    this.formControl.valueChanges.subscribe((value) => {
      if (value !== null) {
        this.selectionChange.emit(value);
      }
    });
  }
}
