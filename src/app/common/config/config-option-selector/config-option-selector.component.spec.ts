import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormControl } from '@angular/forms';
import { ConfigOptionSelectorComponent } from './config-option-selector.component';
import { TranslatePipe } from '@ngx-translate/core';

describe('ConfigOptionSelectorComponent', () => {
  let component: ConfigOptionSelectorComponent;
  let fixture: ComponentFixture<ConfigOptionSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfigOptionSelectorComponent, ReactiveFormsModule],
      providers: [
        {
          provide: TranslatePipe,
          useValue: { transform: (key: string) => key },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ConfigOptionSelectorComponent);
    component = fixture.componentInstance;
    component.labelKey = 'test_label';
    component.options = [
      { value: 'option1', labelKey: 'option1_label' },
      { value: 'option2', labelKey: 'option2_label' },
    ];
    component.formControl = new FormControl();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the label', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.title').textContent).toContain(
      'test_label'
    );
  });

  it('should display the options', () => {
    const compiled = fixture.nativeElement;
    const buttons = compiled.querySelectorAll('.button');
    expect(buttons.length).toBe(2);
    expect(buttons[0].textContent).toContain('option1_label');
    expect(buttons[1].textContent).toContain('option2_label');
  });
});
