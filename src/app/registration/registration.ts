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
import { RegistrationStep } from '../shared/enums/registration-step';

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
  activeStep = signal(RegistrationStep.Method);
  RegistrationStep = RegistrationStep;
  form!: FormGroup<RegistrationForm>;

  constructor(private fb: FormBuilder) {
    effect(() => {
      const step = this.activeStep();
      if (step === 1) {
        this.form.controls.method.setValue(null);
      }
    });
  }

  ngOnInit() {
    this.form = this.fb.group({
      method: this.fb.control<string | null>(null, { validators: [Validators.required] }),
      basic: this.fb.control<string | null>(null, Validators.required),
      extra: this.fb.control<string | null>('', Validators.required),
      confirm: this.fb.control<boolean>(false, Validators.requiredTrue),
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

    this.form.controls.method.valueChanges.subscribe((val) => {
      if (val === 'social') {
        this.activeStep.set(RegistrationStep.Confirm);

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
