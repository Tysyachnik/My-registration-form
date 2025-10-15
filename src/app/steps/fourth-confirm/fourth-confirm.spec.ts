import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FourthConfirm } from './fourth-confirm';

describe('FourthConfirm', () => {
  let component: FourthConfirm;
  let fixture: ComponentFixture<FourthConfirm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FourthConfirm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FourthConfirm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
