import { Component, computed, forwardRef, Input, signal } from '@angular/core';
import { BaseControl } from '../base-control/base-control';
import { FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';

@Component({
  selector: 'app-phone-control',
  imports: [CommonModule, FormsModule, NgxMaskDirective],
  standalone: true,
  templateUrl: './phone-control.html',
  styleUrl: './phone-control.less',
  providers: [
    provideNgxMask(),
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => PhoneControl),
      multi: true,
    },
  ],
})
export class PhoneControl extends BaseControl<any> {
  @Input() set mask(value: string | null) {
    console.log('[mask Input setter] mask received:', value);
    this.maskSignal.set(value ?? '');
  }
  private maskSignal = signal<string>('');

  showMask = computed(() => {
    const code = this.maskSignal();
    console.log('[computed showMask] current code:', code);

    switch (code) {
      case 'RU':
        return '+7 (000) 000-00-000';
      case 'US':
        return '+1 (000) 000-0000';
      case 'DE':
        return '+49 000 000000';
      default:
        return '+0 (000) 000-00-000';
    }
  });

  onModelChange(val: string) {
    this.value = val;
    console.log('value in control:', this.value);
    this.onChange(val);
  }
}
