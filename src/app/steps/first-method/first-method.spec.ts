import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FirstMethod } from './first-method';

describe('FirstMethod', () => {
  let component: FirstMethod;
  let fixture: ComponentFixture<FirstMethod>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FirstMethod]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FirstMethod);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
