import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SudokuConfigComponent } from './sudoku-config.component';

describe('SudokuConfigComponent', () => {
  let component: SudokuConfigComponent;
  let fixture: ComponentFixture<SudokuConfigComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SudokuConfigComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SudokuConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
