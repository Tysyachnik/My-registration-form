import { CommonModule } from '@angular/common';
import { Component, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

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
export class InputControl implements ControlValueAccessor {
  @Input() label = '';
  @Input() type = 'text';

  value = '';
  disabled = false;

  onChange = (val: any) => {};
  onTouched = () => {};

  writeValue(val: any): void {
    this.value = val;
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  handleInput(event: Event) {
    const val = (event.target as HTMLInputElement).value;
    this.value = val;
    this.onChange(val);
  }
}
