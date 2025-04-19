import { inject, Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Operation } from '../models/operation';
import { additionTasks, subtractionTasks } from '../consts/math-tasks.consts';

@Injectable({
  providedIn: 'root',
})
export class MathTasksProviderService {
  getByOperation(operation: Operation) {
    const translateService = inject(TranslateService);
    const currentLang = translateService.currentLang;
    if (operation === Operation.Addition) {
      return additionTasks;
    } else if (operation === Operation.Subtraction) {
      return currentLang === 'pl' ? subtractionTasks.pl : subtractionTasks.en;
    }
    return [];
  }
}
