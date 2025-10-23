import { CommonModule } from '@angular/common';
import { Component, EventEmitter, forwardRef, Input, Output } from '@angular/core';
import {
  ReactiveFormsModule,
  FormGroup,
  NG_VALUE_ACCESSOR,
  ControlValueAccessor,
  FormsModule,
} from '@angular/forms';
import { RadioControl } from '../../shared/controls/radio-control/radio-control';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-fourth-confirm',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RadioControl, FormsModule, ButtonModule],
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
  @Input() group!: FormGroup;
  @Output() submitForm = new EventEmitter<void>();

  value = {
    terms: false,
    data: false,
    newsletter: false,
  };

  private onChange: any = () => {};
  private onTouched: any = () => {};

  get isFormValid() {
    return this.value.terms && this.value.data;
  }

  writeValue(val: any): void {
    if (val && typeof val === 'object') {
      this.value = { ...this.value, ...val };
    } else {
      this.value = { terms: false, data: false, newsletter: false };
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  onSelect(field: 'terms' | 'data' | 'newsletter', checked: boolean) {
    this.value[field] = checked;
    this.onChange({ ...this.value });
    this.onTouched();
  }

  submit() {
    this.onTouched();
    if (this.isFormValid) {
      console.log('Registration is completed:', this.value);
    }
  }
}
