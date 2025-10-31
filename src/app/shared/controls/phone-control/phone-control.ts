import { Component, effect, forwardRef, input, OnInit, signal } from '@angular/core';
import { BaseControl } from '../base-control/base-control';
import { FormControl, FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';

@Component({
  selector: 'app-phone-control',
  imports: [CommonModule, FormsModule, NgxMaskDirective, ReactiveFormsModule],
  standalone: true,
  templateUrl: './phone-control.html',
  styleUrl: './phone-control.less',
  providers: [provideNgxMask()],
})
export class PhoneControl extends BaseControl<string> implements OnInit {
  innerControl = new FormControl('');
  countryCode = input<string>('');

  maskSignal = signal<string>('');

  constructor() {
    super();

    effect(() => {
      switch (this.countryCode()) {
        case 'RU':
          this.maskSignal.set('+7 (000) 000-00-000');
          break;
        case 'US':
          this.maskSignal.set('+1 (000) 000-0000');
          break;
        case 'DE':
          this.maskSignal.set('+49 000 000000');
          break;
        default:
          this.maskSignal.set('+0 (000) 000-00-000');
      }
    });
  }

  override writeValue(val: string | null): void {
    this.value = val;
    this.innerControl.setValue(val, { emitEvent: false });
  }

  override registerOnChange(fn: any): void {
    this.innerControl.valueChanges.subscribe(fn);
  }
  ngOnInit() {
    this.innerControl.valueChanges.subscribe((value) => {
      this.value = value;
      this.onChange(value);
    });
  }
}
