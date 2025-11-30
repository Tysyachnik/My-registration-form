import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  forwardRef,
  inject,
  input,
  Input,
  OnInit,
  Optional,
  Self,
} from '@angular/core';
import {
  FormControl,
  FormsModule,
  NG_VALUE_ACCESSOR,
  NgControl,
  ReactiveFormsModule,
} from '@angular/forms';
import { AutoComplete } from 'primeng/autocomplete';
import { BaseControl } from '../base-control/base-control';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { hasRequiredValidator } from '../../utilits/hasRequiredValidator';

@Component({
  selector: 'app-select-control',
  standalone: true,
  imports: [AutoComplete, CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './select-control.html',
  styleUrl: './select-control.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectControl extends BaseControl<any> implements OnInit {
  optionLabel = input<string>('name');
  optionValue = input<string>('value');
  options = input<any[]>([]);
  appendTo = input<string>('body');

  filteredOptions: any[] = [];
  touched: boolean = false;
  private destroyRef = inject(DestroyRef);

  constructor(@Optional() @Self() public ngControl: NgControl) {
    super();
    if (this.ngControl) {
      this.ngControl.valueAccessor = this;
    }
  }

  ngOnInit() {
    this.filteredOptions = [...this.options()];

    const control = this.ngControl?.control;
    if (!control) return;

    this.required.set(hasRequiredValidator(control));

    control.statusChanges.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(() => {
      this.required.set(hasRequiredValidator(control));
    });

    this.innerControl.valueChanges.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((val) => {
      this.value = val;
      this.onChange(val);
      this.onTouched();
    });
  }

  search(event: { query: string }) {
    const query = (event.query || '').toLowerCase();

    this.filteredOptions = this.options().filter((option) => {
      return option[this.optionLabel()].toLowerCase().includes(query);
    });
  }

  onSelect(selected: any) {
    this.value = selected[this.optionValue()];
    if (this.value != null) {
      this.innerControl.setValue(this.value);
    }
  }

  onBlur() {
    this.touched = true;
    this.onTouched();
  }
}
