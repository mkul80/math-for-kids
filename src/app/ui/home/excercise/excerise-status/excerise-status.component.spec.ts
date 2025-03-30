import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExceriseStatusComponent } from './excerise-status.component';

describe('ExceriseStatusComponent', () => {
  let component: ExceriseStatusComponent;
  let fixture: ComponentFixture<ExceriseStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExceriseStatusComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExceriseStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
