import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import {
  Config,
  ConfigOption,
  Step,
} from '../../../common/config/config-option-selector/config-option.model';
import { ConfigComponent } from '../../../common/config/config.component';
import { ExerciseExecutionStore } from '../../../store/exercise/exercise-execution.store';
import { Operation, SelectableOperation } from '../../../models/exercise';
import { DifficultyLevel } from '../../../business-logic/exercise-generator.service';

@Component({
  standalone: true,
  selector: 'app-course-level-selector',
  imports: [ConfigComponent],
  templateUrl: './course-level-selector.component.html',
  styleUrl: './course-level-selector.component.scss',
})
export class CourseLevelSelectorComponent {
  #router = inject(Router);
  #exerciseStore = inject(ExerciseExecutionStore);
  config: Config<[SelectableOperation, number, string]> = {
    steps: [
      {
        options: [
          { value: '+', labelKey: 'operation_addition' },
          { value: '-', labelKey: 'operation_subtraction' },
          { value: 'both', labelKey: 'operation_any' },
        ],
        labelKey: 'select_operation',
      },
      {
        options: [
          { value: 0, labelKey: 'difficulty_level_easy' },
          { value: 1, labelKey: 'difficulty_level_medium' },
          { value: 2, labelKey: 'difficulty_level_hard' },
        ],
        labelKey: 'select_difficulty_level',
      },
      {
        options: [
          { value: 'simple', labelKey: 'exercise_type_simple' },
          { value: 'word', labelKey: 'exercise_type_word' },
        ],
        labelKey: 'select_exercise_type',
      },
    ],
  };

  onConfigChange([operation, difficultyLevel, exerciseType]: [
    SelectableOperation,
    DifficultyLevel,
    string
  ]): void {
    if (exerciseType === 'simple') {
      this.#exerciseStore.configureBinaryArythmeticExercises(
        operation,
        difficultyLevel
      );
    } else {
      this.#exerciseStore.configureTernaryArythmeticExercises(
        operation,
        difficultyLevel
      );
    }
    this.#router.navigate(['/home/exercise']);
  }
}
