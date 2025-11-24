import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  DestroyRef,
  forwardRef,
  inject,
  input,
  Input,
  OnInit,
  Optional,
  Self,
} from '@angular/core';
import { BaseControl } from '../base-control/base-control';
import {
  FormControl,
  NG_VALUE_ACCESSOR,
  NgControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-input-control',
  imports: [CommonModule, ReactiveFormsModule, InputTextModule],
  standalone: true,
  templateUrl: './input-control.html',
  styleUrl: './input-control.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputControl extends BaseControl<string> implements OnInit {
  type = input<string>('text');
  private destroyRef = inject(DestroyRef);

  constructor(@Optional() @Self() public ngControl: NgControl) {
    super();
    if (this.ngControl) {
      this.ngControl.valueAccessor = this;
    }
  }

  ngOnInit() {
    this.innerControl.valueChanges.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((value) => {
      this.onChange(value);
      this.onTouched();
    });
  }

  override writeValue(val: string | null): void {
    this.innerControl.setValue(val, { emitEvent: false });
  }

  override registerOnTouched(fn: any): void {
    this.onTouched = () => {
      this.innerControl.markAsTouched();
      fn();
    };
  }
}
