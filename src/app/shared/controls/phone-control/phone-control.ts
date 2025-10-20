import { Component, forwardRef } from '@angular/core';
import { BaseControl } from '../base-control/base-control';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-phone-control',
  imports: [],
  standalone: true,
  templateUrl: './phone-control.html',
  styleUrl: './phone-control.less',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => PhoneControl),
      multi: true,
    },
  ],
})
export class PhoneControl extends BaseControl<any> {}
