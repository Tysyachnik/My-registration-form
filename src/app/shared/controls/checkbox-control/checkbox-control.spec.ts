import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckboxControl } from './checkbox-control';

describe('CheckboxControl', () => {
  let component: CheckboxControl;
  let fixture: ComponentFixture<CheckboxControl>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CheckboxControl]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CheckboxControl);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
