import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { BaseControl } from '../base-control/base-control';
import { FormControl, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-radio-control',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './radio-control.html',
  styleUrl: './radio-control.less',
})
export class RadioControl extends BaseControl<any> {
  @Input() label!: string;
  @Input() control!: FormControl;
  @Input() declare value: string;

  // ngOnInit() {
  //   this.innerControl.valueChanges.subscribe((value) => {
  //     this.onChange(value);
  //     this.onTouched();
  //   });
  // }
}
