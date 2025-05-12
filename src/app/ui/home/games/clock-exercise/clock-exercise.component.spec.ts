import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClockExerciseComponent } from './clock-exercise.component';

describe('ClockExerciseComponent', () => {
  let component: ClockExerciseComponent;
  let fixture: ComponentFixture<ClockExerciseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClockExerciseComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClockExerciseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
