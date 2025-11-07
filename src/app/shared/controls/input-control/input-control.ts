import { CommonModule } from '@angular/common';
import { Component, forwardRef, input, Input, OnInit } from '@angular/core';
import { BaseControl } from '../base-control/base-control';
import { FormControl, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-input-control',
  imports: [CommonModule, ReactiveFormsModule, InputTextModule],
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
  label = input<string>();
  type = input<string>('text');
  innerControl = new FormControl('');

  ngOnInit() {
    this.innerControl.valueChanges.subscribe((value) => this.onChange(value));
  }
}
