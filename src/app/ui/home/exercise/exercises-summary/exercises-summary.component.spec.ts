import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExercisesSummaryComponent } from './exercises-summary.component';

describe('ExercisesSummaryComponent', () => {
  let component: ExercisesSummaryComponent;
  let fixture: ComponentFixture<ExercisesSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExercisesSummaryComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ExercisesSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should calculate total count correctly', () => {
    component.errorCount = 3;
    component.correctCount = 7;
    expect(component.totalCount).toBe(10);
  });

  it('should calculate success rate correctly', () => {
    component.errorCount = 2;
    component.correctCount = 8;
    expect(component.successRate).toBe(80);
  });

  it('should return 0 success rate if total count is 0', () => {
    component.errorCount = 0;
    component.correctCount = 0;
    expect(component.successRate).toBe(0);
  });
});
