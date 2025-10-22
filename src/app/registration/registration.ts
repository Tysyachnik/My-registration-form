import { Component, signal } from '@angular/core';
import { Step, StepPanel, StepperModule } from 'primeng/stepper';
import { FourthConfirm } from '../steps/fourth-confirm/fourth-confirm';
import { ThirdExtra } from '../steps/third-extra/third-extra';
import { SecondBasic } from '../steps/second-basic/second-basic';
import { FirstMethod } from '../steps/first-method/first-method';
import { ButtonModule } from 'primeng/button';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    StepperModule,
    ButtonModule,
    FirstMethod,
    SecondBasic,
    ThirdExtra,
    FourthConfirm,
    StepPanel,
    Step,
  ],
  templateUrl: './registration.html',
  styleUrl: './registration.less',
})
export class Registration {
  activeStep = signal<number>(1);

  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = fb.group({
      method: fb.group({
        type: ['email', Validators.required],
      }),
      basic: fb.group({
        email: ['', [Validators.required, Validators.email]],
        name: ['', [Validators.required, Validators.minLength(2)]],
        country: [''],
        phone: [''],
      }),
      extra: fb.group({
        adress: [''],
        birthday: [''],
        gender: [''],
      }),
      confirm: fb.group({
        terms: [false, Validators.requiredTrue],
        data: [false, Validators.requiredTrue],
        newsletter: [false],
      }),
    });

    const saved = localStorage.getItem('registrationForm');
    if (saved) {
      try {
        this.form.patchValue(JSON.parse(saved));
        console.log('Form restored from localStorage:', JSON.parse(saved));
      } catch (error) {
        console.warn('Failed to parse saved form', error);
      }
    }

    this.form.valueChanges.subscribe((value) => {
      localStorage.setItem('registrationForm', JSON.stringify(value));
      console.log('Form saved to localStorage:', value);
    });
  }

  get methodGroup(): FormGroup {
    return this.form.get('method') as FormGroup;
  }
  get basicGroup(): FormGroup {
    return this.form.get('basic') as FormGroup;
  }
  get extraGroup(): FormGroup {
    return this.form.get('extra') as FormGroup;
  }
  get confirmGroup(): FormGroup {
    return this.form.get('confirm') as FormGroup;
  }

  goTo(step: number) {
    this.activeStep.set(step);
  }

  onSubmit() {
    if (this.form?.valid) {
      console.log('Registration complete');
    } else {
      console.warn('Form invalid');
    }
  }
}
