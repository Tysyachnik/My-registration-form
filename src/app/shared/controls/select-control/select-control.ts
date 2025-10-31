import { CommonModule } from '@angular/common';
import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { FormControl, FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { AutoComplete } from 'primeng/autocomplete';
import { BaseControl } from '../base-control/base-control';

@Component({
  selector: 'app-select-control',
  standalone: true,
  imports: [AutoComplete, CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './select-control.html',
  styleUrl: './select-control.less',
})
export class SelectControl extends BaseControl<any> implements OnInit {
  @Input() label = 'Chose';
  @Input() optionLabel = 'name';
  @Input() options: any[] = [];
  @Input() optionValue: string = 'value';

  filteredOptions: any[] = [];
  innerControl = new FormControl(null);

  ngOnInit() {
    this.filteredOptions = [...this.options];

    this.innerControl.valueChanges.subscribe((selected) => {
      const newValue = selected ? selected[this.optionValue] : null;
      this.onChange(newValue);
      this.onTouched();
    });
  }

  search(event: { query: string }) {
    const query = (event.query || '').toLowerCase();

    this.filteredOptions = this.options.filter((option) => {
      return option[this.optionLabel].toLowerCase().includes(query);
    });
  }
}
