import { CommonModule } from '@angular/common';
import { Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { AutoCompleteModule } from 'primeng/autocomplete';

@Component({
  selector: 'app-select-control',
  standalone: true,
  imports: [AutoCompleteModule, CommonModule, FormsModule],
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
export class SelectControl implements ControlValueAccessor {
  @Input() label = 'Chose';
  @Input() optionLabel = 'name';
  @Input() options: any[] = [];

  value: any = null;
  filteredOptions: any[] = [];

  disabled = false;

  onChange: (value: any) => void = () => {};
  onTouched: () => void = () => {};

  search(event: { query: string }) {
    const query = event.query.toLowerCase();
    this.filteredOptions = this.options.filter((option) =>
      option[this.optionLabel].toLowerCase().includes(query)
    );
  }

  ngOnInit() {
    this.filteredOptions = [...this.options];
  }

  writeValue(val: any): void {
    const selectedOption = this.options.find(
      (option) => option === val || (option && option.code === val)
    );
    this.value = selectedOption ?? null;
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
  onModelChange(value: any): void {
    this.value = value;
    this.onChange(this.value);
  }
}
