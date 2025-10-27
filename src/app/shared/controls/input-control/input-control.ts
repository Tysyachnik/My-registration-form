import { CommonModule } from '@angular/common';
import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { BaseControl } from '../base-control/base-control';
import {
  FormControl,
  FormControlName,
  FormsModule,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
} from '@angular/forms';

@Component({
  selector: 'app-input-control',
  imports: [CommonModule, ReactiveFormsModule],
  standalone: true,
  templateUrl: './input-control.html',
  styleUrl: './input-control.less',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputControl),
      multi: true,
    },
  ],
})
export class InputControl extends BaseControl<any> implements OnInit {
  @Input() label = '';
  @Input() type = 'text';
  @Input() control!: FormControl;
  // innerControl = new FormControl('');

  ngOnInit() {
    this.control.valueChanges.subscribe((value) => this.onChange(value));
  }
}
