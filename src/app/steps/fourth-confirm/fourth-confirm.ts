import { CommonModule } from '@angular/common';
import { Component, EventEmitter, forwardRef, Input, OnInit, Output } from '@angular/core';
import {
  ReactiveFormsModule,
  FormGroup,
  NG_VALUE_ACCESSOR,
  ControlValueAccessor,
  FormsModule,
  FormBuilder,
  FormControl,
} from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CheckboxControl } from '../../shared/controls/checkbox-control/checkbox-control';

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
})
export class FourthConfirm implements ControlValueAccessor {
  @Input() control!: FormGroup;

  private onChange: any = () => {};
  private onTouched: any = () => {};

  get terms() {
    return this.control.get('terms') as FormControl;
  }
  get data() {
    return this.control.get('data') as FormControl;
  }
  get newsletter() {
    return this.control.get('newsletter') as FormControl;
  }

  writeValue(val: any): void {
    if (val) this.control.patchValue(val, { emitEvent: false });
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
}
