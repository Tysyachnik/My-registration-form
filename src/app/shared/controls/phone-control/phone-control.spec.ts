import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhoneControl } from './phone-control';

describe('PhoneControl', () => {
  let component: PhoneControl;
  let fixture: ComponentFixture<PhoneControl>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PhoneControl]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PhoneControl);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
