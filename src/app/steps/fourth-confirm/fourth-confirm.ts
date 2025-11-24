import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  forwardRef,
  inject,
  OnInit,
} from '@angular/core';
import {
  ReactiveFormsModule,
  FormGroup,
  NG_VALUE_ACCESSOR,
  ControlValueAccessor,
  FormsModule,
  FormControl,
  Validators,
} from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CheckboxControl } from '../../shared/controls/checkbox-control/checkbox-control';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-fourth-confirm',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, FormsModule, ButtonModule, CheckboxControl],
  templateUrl: './fourth-confirm.html',
  styleUrl: './fourth-confirm.less',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FourthConfirm),
      multi: true,
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FourthConfirm implements ControlValueAccessor, OnInit {
  innerControl = new FormGroup({
    terms: new FormControl<boolean>(false, Validators.requiredTrue),
    data: new FormControl<boolean>(false, Validators.requiredTrue),
    newsletter: new FormControl<boolean>(false),
  });
  private destroyRef = inject(DestroyRef);

  private onChange: any = () => {};
  private onTouched: any = () => {};

  ngOnInit(): void {
    this.innerControl.valueChanges.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(() => {
      this.checkValidity();
    });
  }

  writeValue(val: any): void {
    if (val) this.innerControl.patchValue(val, { emitEvent: false });
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  private checkValidity() {
    const termsValid = this.innerControl.controls['terms'].value;
    const dataValid = this.innerControl.controls['data'].value;

    if (termsValid && dataValid) {
      this.onChange(true);
      this.onTouched();
    } else {
      this.onChange(false);
    }
  }
}
