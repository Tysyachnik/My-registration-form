import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RadioControl } from './radio-control';

describe('RadioControl', () => {
  let component: RadioControl;
  let fixture: ComponentFixture<RadioControl>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RadioControl]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RadioControl);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
