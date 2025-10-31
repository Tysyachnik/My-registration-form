import { Component, forwardRef, Input } from '@angular/core';
import { BaseControl } from '../base-control/base-control';
import { FormControl, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-checkbox-control',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './checkbox-control.html',
  styleUrl: './checkbox-control.less',
})
export class CheckboxControl extends BaseControl<any> {
  @Input() label!: string;
  @Input() control!: FormControl;
}
