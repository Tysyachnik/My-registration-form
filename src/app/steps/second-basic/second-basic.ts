import { CommonModule } from '@angular/common';
import { Component, effect, forwardRef, Input, OnInit, signal } from '@angular/core';
import { InputControl } from '../../shared/controls/input-control/input-control';
import { SelectControl } from '../../shared/controls/select-control/select-control';
import { PhoneControl } from '../../shared/controls/phone-control/phone-control';
import {
  ControlValueAccessor,
  FormControl,
  FormGroup,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-second-basic',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, InputControl, SelectControl, PhoneControl],
  templateUrl: './second-basic.html',
  styleUrl: './second-basic.less',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SecondBasic),
      multi: true,
    },
  ],
})
export class SecondBasic implements OnInit, ControlValueAccessor {
  innerControl = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(2)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    country: new FormControl(''),
    phone: new FormControl(''),
  });

  countries = [
    { label: 'Russia', code: 'RU' },
    { label: 'USA', code: 'US' },
    { label: 'Germany', code: 'DE' },
  ];

  isPhoneVisible = false;
  selectedCountryCode = '';

  private onChange: any = () => {};
  private onTouched: any = () => {};

  get emailControl(): FormControl {
    return this.innerControl.get('email') as FormControl;
  }
  get nameControl(): FormControl {
    return this.innerControl.get('name') as FormControl;
  }
  get countryControl(): FormControl {
    return this.innerControl.get('country') as FormControl;
  }
  get phoneControl(): FormControl {
    return this.innerControl.get('phone') as FormControl;
  }

  ngOnInit(): void {
    const countryControl = this.innerControl.get('country') as FormControl;
    const phoneControl = this.innerControl.get('phone') as FormControl;

    countryControl.valueChanges.subscribe((selected: string | null) => {
      if (!selected) {
        this.isPhoneVisible = false;
        this.selectedCountryCode = '';
        return;
      }

      this.selectedCountryCode = selected;
      this.isPhoneVisible = true;
    });

    this.innerControl.valueChanges.subscribe((val) => {
      this.onChange(val);
      this.onTouched();
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
}
