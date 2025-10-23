import { CommonModule } from '@angular/common';
import { Component, EventEmitter, forwardRef, Input, Output } from '@angular/core';
import {
  ReactiveFormsModule,
  FormsModule,
  NG_VALUE_ACCESSOR,
  ControlValueAccessor,
} from '@angular/forms';
import { RadioControl } from '../../shared/controls/radio-control/radio-control';

@Component({
  selector: 'app-first-method',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RadioControl, FormsModule],
  templateUrl: './first-method.html',
  styleUrl: './first-method.less',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FirstMethod),
      multi: true,
    },
  ],
})
export class FirstMethod implements ControlValueAccessor {
  @Input() activateCallback!: (step: number) => void;

  value: string = '';

  private onChange: any = () => {};
  private onTouched: any = () => {};

  writeValue(val: string): void {
    this.value = val;
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setValue(val: string) {
    this.value = val;
    this.onChange(this.value);
    this.onTouched();

    if (val === 'social' && this.activateCallback) {
      this.activateCallback(4);
      console.log('Social selected — emitting event');
    }
  }
}
