import { CommonModule } from '@angular/common';
import { Component, forwardRef, Input } from '@angular/core';
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
})
export class DataPicker extends BaseControl<Date> {
  @Input() label = 'Date';
  @Input() inputId = 'date';
  @Input() showIcon = true;
  @Input() iconDisplay: 'input' | 'button' = 'input';
  @Input() dateFormat = 'dd.mm.yy';
  @Input() minDate?: Date;
  @Input() maxDate?: Date;

  onModelChange(val: Date | null) {
    this.value = val;
    this.onChange(val);
  }
}
