import { TestBed } from '@angular/core/testing';

import { ExcerciseGeneratorService } from './excercise-generator.service';

describe('ExcerciseGeneratorService', () => {
  let service: ExcerciseGeneratorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExcerciseGeneratorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
