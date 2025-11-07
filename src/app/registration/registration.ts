import { ChangeDetectionStrategy, Component, effect, OnInit, signal } from '@angular/core';
import { Step, StepPanel, StepperModule } from 'primeng/stepper';
import { FourthConfirm } from '../steps/fourth-confirm/fourth-confirm';
import { ThirdExtra } from '../steps/third-extra/third-extra';
import { SecondBasic } from '../steps/second-basic/second-basic';
import { FirstMethod } from '../steps/first-method/first-method';
import { ButtonModule } from 'primeng/button';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RegistrationForm } from '../shared/interfaces/registration-form';

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
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Registration implements OnInit {
  activeStep = signal<number>(1);

  form: FormGroup<RegistrationForm>;

  constructor(private fb: FormBuilder) {
    this.form = fb.group({
      method: fb.control<string | null>(null, { validators: [Validators.required] }),
      basic: fb.control<string | null>(null, Validators.required),
      extra: fb.control<string | null>('', Validators.required),
      confirm: fb.control<boolean>(false, Validators.requiredTrue),
    }) as FormGroup<RegistrationForm>;

    const saved = localStorage.getItem('registrationForm');
    if (saved) {
      try {
        this.form.patchValue(JSON.parse(saved));
      } catch (error) {}
    }

    this.form.valueChanges.subscribe((value) => {
      localStorage.setItem('registrationForm', JSON.stringify(value));
    });

    effect(() => {
      const step = this.activeStep();
      if (step === 1) {
        this.form.controls.method.setValue(null);
      }
    });
  }

  ngOnInit() {
    this.form.controls.method.valueChanges.subscribe((val) => {
      if (val === 'social') {
        this.activeStep.set(4);

        this.form.controls.method.setValue(null);
      }
    });
  }

  goTo(step: number) {
    this.activeStep.set(step);
    this.form.controls['method'].get('type')?.setValue(null);
  }

  onSubmit() {
    if (this.form.controls['confirm'].valid) {
      console.log('Registration complete');
    } else {
      console.warn('Form invalid');
    }
  }
}
