import { CommonModule } from '@angular/common';
import { Component, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { DatePickerModule } from 'primeng/datepicker';

@Component({
  selector: 'app-data-picker',
  imports: [CommonModule, FormsModule, DatePickerModule],
  standalone: true,
  templateUrl: './data-picker.html',
  styleUrl: './data-picker.less',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DataPicker),
      multi: true,
    },
  ],
})
export class DataPicker implements ControlValueAccessor {
  @Input() label = 'Date';
  @Input() inputId = 'date';
  @Input() showIcon = true;
  @Input() iconDisplay: 'input' | 'button' = 'input';
  @Input() dateFormat = 'dd.mm.yy';
  @Input() minDate?: Date;
  @Input() maxDate?: Date;

  value: Date | null = null;
  disabled = false;

  onChange: (val: Date | null) => void = () => {};
  onTouched: () => void = () => {};

  writeValue(val: Date | null): void {
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

  onModelChange(val: Date | null) {
    this.value = val;
    this.onChange(val);
  }
}
