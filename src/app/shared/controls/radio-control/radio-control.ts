import { Component, forwardRef, Input } from '@angular/core';
import { BaseControl } from '../base-control/base-control';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-radio-control',
  standalone: true,
  imports: [],
  templateUrl: './radio-control.html',
  styleUrl: './radio-control.less',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => RadioControl),
      multi: true,
    },
  ],
})
export class RadioControl extends BaseControl<any> {
  @Input() label!: string;

  checked: boolean = false;

  onSelect() {
    this.checked = !this.checked;
    this.onChange(this.checked);
    this.onTouched();
  }
}
