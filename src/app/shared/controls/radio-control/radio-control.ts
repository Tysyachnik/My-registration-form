import { Component, forwardRef, input, OnInit } from '@angular/core';
import { BaseControl } from '../base-control/base-control';
import { FormControl, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-radio-control',
  standalone: true,
  imports: [ReactiveFormsModule],
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
  label = input<string>();
  registationWay: string | null = null;
  override value: any = input<string | null>();

  onSelect() {
    this.registationWay = this.value();
    this.onChange(this.registationWay);
    this.onTouched();
  }

  override writeValue(val: string | null): void {
    this.registationWay = val;
  }
}
