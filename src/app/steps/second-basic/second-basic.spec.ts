import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SecondBasic } from './second-basic';

describe('SecondBasic', () => {
  let component: SecondBasic;
  let fixture: ComponentFixture<SecondBasic>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SecondBasic]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SecondBasic);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
