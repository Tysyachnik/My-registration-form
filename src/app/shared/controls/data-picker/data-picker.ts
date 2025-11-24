import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, forwardRef, input, Input } from '@angular/core';
import { FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { DatePickerModule } from 'primeng/datepicker';
import { BaseControl } from '../base-control/base-control';

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
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DataPicker extends BaseControl<Date> {
  label = input<string>();
  inputId = input<string>();
  showIcon = input<boolean>();
  iconDisplay = input<'button' | 'input'>('input');
  dateFormat = input<string>();
  minDate = input<Date>();
  maxDate = input<Date>();
  appendTo = input<string>('body');

  onModelChange(val: Date | null) {
    this.value = val;
    this.onChange(val);
  }
}
