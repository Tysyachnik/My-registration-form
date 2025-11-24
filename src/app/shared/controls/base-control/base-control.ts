import { ChangeDetectionStrategy, Component, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-base-control',
  standalone: true,
  imports: [],
  templateUrl: './base-control.html',
  styleUrl: './base-control.less',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => BaseControl),
      multi: true,
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BaseControl<T> implements ControlValueAccessor {
  value: T | null = null;
  disabled: boolean = false;

  protected onChange: (value: any) => void = () => {};
  protected onTouched: () => void = () => {};

  writeValue(val: T | null): void {
    this.value = val ?? null;
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
}
