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

  filteredOptions: any[] = [];

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
    const newValue = selected ? selected[this.optionValue()] : null;
    this.value = newValue;
    this.onChange(newValue);
    this.onTouched();
  }
}
