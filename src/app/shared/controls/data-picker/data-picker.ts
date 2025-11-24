import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  forwardRef,
  inject,
  input,
  Input,
  OnInit,
} from '@angular/core';
import { FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { DatePickerModule } from 'primeng/datepicker';
import { BaseControl } from '../base-control/base-control';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-data-picker',
  imports: [CommonModule, FormsModule, DatePickerModule, ReactiveFormsModule],
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
export class DataPicker extends BaseControl<Date> implements OnInit {
  inputId = input<string>();
  showIcon = input<boolean>();
  iconDisplay = input<'button' | 'input'>('input');
  dateFormat = input<string>();
  minDate = input<Date>();
  maxDate = input<Date>();
  appendTo = input<string>('body');
  private destroyRef = inject(DestroyRef);

  ngOnInit(): void {
    this.innerControl.valueChanges.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((val) => {
      this.onChange(val);
      this.onTouched();
    });
  }

  override writeValue(val: Date | null): void {
    this.innerControl.setValue(val, { emitEvent: false });
  }
}
