import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { InputControl } from '../../shared/controls/input-control/input-control';
import { SelectControl } from '../../shared/controls/select-control/select-control';
import { PhoneControl } from '../../shared/controls/phone-control/phone-control';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-second-basic',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, InputControl, SelectControl, PhoneControl],
  templateUrl: './second-basic.html',
  styleUrl: './second-basic.less',
})
export class SecondBasic {
  @Input() group!: FormGroup;

  countries = [
    { name: 'Russia', code: 'RU' },
    { name: 'USA', code: 'US' },
    { name: 'Germany', code: 'DE' },
  ];

  form = new FormGroup({
    country: new FormControl({ name: 'Russia', code: 'RU' }),
  });
}
