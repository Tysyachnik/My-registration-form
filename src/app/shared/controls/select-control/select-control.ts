import { CommonModule } from '@angular/common';
import { Component, forwardRef, input, Input, OnInit } from '@angular/core';
import { FormControl, FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { AutoComplete } from 'primeng/autocomplete';
import { BaseControl } from '../base-control/base-control';

@Component({
  selector: 'app-select-control',
  standalone: true,
  imports: [AutoComplete, CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './select-control.html',
  styleUrl: './select-control.less',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectControl),
      multi: true,
    },
  ],
})
export class SelectControl extends BaseControl<any> implements OnInit {
  label = input<string>('Chose');
  optionLabel = input<string>('name');
  optionValue = input<string>('value');
  options = input<any[]>([]);
  appendTo = input<string>('body');
  required = input<boolean>(false);

  filteredOptions: any[] = [];
  touched: boolean = false;

  ngOnInit() {
    this.filteredOptions = [...this.options()];
  }

  search(event: { query: string }) {
    const query = (event.query || '').toLowerCase();

    this.filteredOptions = this.options().filter((option) => {
      return option[this.optionLabel()].toLowerCase().includes(query);
    });
  }

  onSelect(selected: any) {
    this.value = selected[this.optionValue()];
    this.onChange(this.value);
    this.onTouched();
  }

  onBlur() {
    this.touched = true;
    this.onTouched();
  }
}
