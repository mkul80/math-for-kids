import { TranslateService } from '@ngx-translate/core';
import { Operation } from '../models/exercise';
import { Injectable } from '@angular/core';
import { Logger } from '../common/logger.service';
import { shuffle } from 'lodash';

enum ItemType {
  Fruit = 'fruit',
  Toy = 'toy',
  Money = 'money',
  StuffedAnimal = 'stuffed_animal',
  Cake = 'cake',
  Hamster = 'hamster',
  Notebook = 'notebook',
  Pencil = 'pencil',
  Candy = 'candy',
  Doll = 'doll',
}

interface TaskInput {
  values: number[];
  operations: Operation[];
}

@Injectable({
  providedIn: 'root',
})
export class WordExerciseBuilder {
  private readonly possibleItemTypes: ItemType[] = Object.values(ItemType);

  constructor(private translate: TranslateService) {}

  private getRandomItemType(): ItemType {
    const randomIndex = Math.floor(
      Math.random() * this.possibleItemTypes.length
    );
    return this.possibleItemTypes[randomIndex];
  }

  private getTranslationKeys(
    op: Operation,
    itemType: ItemType,
    value: number
  ): string[] {
    const baseKey = `task.${itemType}.${op === '+' ? 'add' : 'sub'}`;
    const translations = this.translate.instant(baseKey, { value });
    return Object.values(translations);
  }

  public build(input: TaskInput): {
    wordExercise: string;
    object: string;
  } {
    const {
      values: [first, ...rest],
      operations,
    } = input;
    const itemType = this.getRandomItemType();
    const availableIndices: { [key in Operation]: number[] } = {
      '+': shuffle(this.getTranslationKeys('+', itemType, 0).map((_, i) => i)),
      '-': shuffle(this.getTranslationKeys('-', itemType, 0).map((_, i) => i)),
    };

    const startKey = `task.${itemType}.start`;
    let sentence = this.translate.instant(startKey, { value: first });
    for (let i = 0; i < operations.length; i++) {
      const op = operations[i];
      const val = rest[i];
      const keys = this.getTranslationKeys(op, itemType, val);
      const randomIndex = availableIndices[op].pop(); // Math.floor(Math.random() * keys.length);
      if (randomIndex === undefined) {
        Logger.error('No available index for operation:', op);
        throw new Error('No available index for operation');
      }
      const chosenKey = keys[randomIndex];
      const fragment = this.translate.instant(chosenKey, { value: val });
      sentence += ', ' + fragment;
    }

    const questionKey = `task.${itemType}.question`;
    sentence += '. ' + this.translate.instant(questionKey);
    return { wordExercise: sentence, object: itemType };
  }
}
