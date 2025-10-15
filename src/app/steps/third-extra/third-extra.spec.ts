import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThirdExtra } from './third-extra';

describe('ThirdExtra', () => {
  let component: ThirdExtra;
  let fixture: ComponentFixture<ThirdExtra>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ThirdExtra]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ThirdExtra);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
