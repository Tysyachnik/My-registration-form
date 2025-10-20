import { CommonModule } from '@angular/common';
import { Component, forwardRef, Input } from '@angular/core';
import { BaseControl } from '../base-control/base-control';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-input-control',
  imports: [CommonModule],
  standalone: true,
  templateUrl: './input-control.html',
  styleUrl: './input-control.less',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputControl),
      multi: true,
    },
  ],
})
export class InputControl extends BaseControl<any> {
  @Input() label = '';
  @Input() type = 'text';

  handleInput(event: Event) {
    const val = (event.target as HTMLInputElement).value;
    this.value = val;
    this.onChange(val);
  }
}
