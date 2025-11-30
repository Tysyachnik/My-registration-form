import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  effect,
  inject,
  OnInit,
  signal,
  ViewChild,
} from '@angular/core';
import { Step, StepPanel, StepperModule } from 'primeng/stepper';
import { FourthConfirm } from '../steps/fourth-confirm/fourth-confirm';
import { ThirdExtra } from '../steps/third-extra/third-extra';
import { SecondBasic } from '../steps/second-basic/second-basic';
import { FirstMethod } from '../steps/first-method/first-method';
import { ButtonModule } from 'primeng/button';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RegistrationForm } from '../shared/interfaces/registration-form';
import { RegistrationStep } from '../shared/enums/registration-step';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

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
  @ViewChild(FirstMethod) firstMethodComponent!: FirstMethod;
  activeStep = signal(RegistrationStep.Method);
  RegistrationStep = RegistrationStep;
  form!: FormGroup<RegistrationForm>;
  private destroyRef = inject(DestroyRef);

  constructor(private fb: FormBuilder) {
    effect(() => {
      const step = this.activeStep();

      if (step === RegistrationStep.Method && this.firstMethodComponent) {
        // this.firstMethodComponent.innerControl.setValue(null, { emitEvent: false });
        // this.form.controls.method.setValue(null, { emitEvent: false });
      }
    });
  }

  ngOnInit() {
    this.initializeForm();
    this.setValueFromLocalStorage();

    this.form.controls.method.valueChanges
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((val) => {
        if (val === 'Social') {
          this.activeStep.set(RegistrationStep.Confirm);

          this.firstMethodComponent.innerControl.setValue('');
          this.form.controls.method.setValue('', { emitEvent: false });
        }
      });
  }

  clickOnStep(event: MouseEvent) {
    const target = event.target as HTMLElement;

    const clickedStep = target.closest('p-step') as HTMLElement | null;

    if (!clickedStep) return;
    const titleEl = clickedStep.querySelector('.p-step-title') as HTMLElement;
    const nameOfStep = titleEl.innerText.trim();

    if (nameOfStep === 'Method') {
      this.activeStep.set(RegistrationStep.Method);
    }
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

  private initializeForm() {
    this.form = this.fb.group({
      method: this.fb.control<string | null>(null, { validators: [Validators.required] }),
      basic: this.fb.control<string | null>(null, Validators.required),
      extra: this.fb.control<string | null>('', Validators.required),
      confirm: this.fb.control<boolean>(false, Validators.requiredTrue),
    }) as FormGroup<RegistrationForm>;
  }

  private setValueFromLocalStorage() {
    const saved = localStorage.getItem('registrationForm');
    if (saved) {
      try {
        this.form.patchValue(JSON.parse(saved));
      } catch (error) {}
    }

    this.form.valueChanges.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((value) => {
      localStorage.setItem('registrationForm', JSON.stringify(value));
    });
  }
}
