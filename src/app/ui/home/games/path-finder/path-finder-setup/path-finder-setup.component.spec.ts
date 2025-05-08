import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PathFinderSetupComponent } from './path-finder-setup.component';

describe('PathFinderSetupComponent', () => {
  let component: PathFinderSetupComponent;
  let fixture: ComponentFixture<PathFinderSetupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PathFinderSetupComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PathFinderSetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
