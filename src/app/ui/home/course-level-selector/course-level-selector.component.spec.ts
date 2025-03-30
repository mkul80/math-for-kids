import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseLevelSelectorComponent } from './course-level-selector.component';

describe('CourseLevelSelectorComponent', () => {
  let component: CourseLevelSelectorComponent;
  let fixture: ComponentFixture<CourseLevelSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CourseLevelSelectorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CourseLevelSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
