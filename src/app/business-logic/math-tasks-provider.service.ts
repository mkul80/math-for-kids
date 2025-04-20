import { inject, Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Operation } from '../models/operation';
import { additionTasks, subtractionTasks } from '../consts/math-tasks.consts';

@Injectable({
  providedIn: 'root',
})
export class MathTasksProviderService {
  #translateService = inject(TranslateService);

  getByOperation(operation: Operation) {
    const currentLang = this.#translateService.currentLang;
    if (operation === Operation.Addition) {
      return additionTasks;
    } else if (operation === Operation.Subtraction) {
      return currentLang === 'pl' ? subtractionTasks.pl : subtractionTasks.en;
    }
    return [];
  }
}
