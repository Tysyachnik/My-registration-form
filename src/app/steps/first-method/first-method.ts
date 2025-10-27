import { CommonModule } from '@angular/common';
import { Component, forwardRef, Input, OnInit, Output } from '@angular/core';
import {
  ReactiveFormsModule,
  FormsModule,
  NG_VALUE_ACCESSOR,
  ControlValueAccessor,
  FormControl,
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
export class FirstMethod implements ControlValueAccessor, OnInit {
  @Input() activateCallback!: (step: number) => void;
  innerControl = new FormControl<string | null>(null);
  value: string = '';

  private onChange: any = () => {};
  private onTouched: any = () => {};

  writeValue(val: string): void {
    this.innerControl.setValue(val, { emitEvent: false });
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  ngOnInit(): void {
    this.innerControl.valueChanges.subscribe((val) => {
      this.onChange(val);
      this.onTouched();
    });
  }
}
