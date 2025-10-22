import { CommonModule } from '@angular/common';
import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { AutoComplete } from 'primeng/autocomplete';
import { BaseControl } from '../base-control/base-control';

@Component({
  selector: 'app-select-control',
  standalone: true,
  imports: [AutoComplete, CommonModule, FormsModule],
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
  @Input() label = 'Chose';
  @Input() optionLabel = 'name';
  @Input() options: any[] = [];
  @Input() optionValue: string = 'value';

  filteredOptions: any[] = [];

  ngOnInit() {
    this.filteredOptions = [...this.options];
  }

  search(event: { query: string }) {
    const query = (event.query || '').toLowerCase();

    this.filteredOptions = this.options.filter((option) => {
      console.log('option value:', option[this.optionLabel]);
      return option[this.optionLabel].toLowerCase().includes(query);
    });
  }

  onModelChange(selectedObject: any): void {
    this.value = selectedObject;
    const newValue = selectedObject ? selectedObject[this.optionValue] : null;
    this.onChange(newValue);
  }
}
