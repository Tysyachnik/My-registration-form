import { Component, forwardRef, input, Input, OnInit } from '@angular/core';
import { BaseControl } from '../base-control/base-control';
import { FormControl, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-checkbox-control',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './checkbox-control.html',
  styleUrl: './checkbox-control.less',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CheckboxControl),
      multi: true,
    },
  ],
})
export class CheckboxControl extends BaseControl<any> implements OnInit {
  label = input<string>();
  innerControl = new FormControl('');
  required = input<boolean>(false);

  ngOnInit(): void {
    this.innerControl.valueChanges.subscribe((val) => {
      this.onChange(val);
      this.onTouched();
    });
  }
}
