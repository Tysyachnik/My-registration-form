import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  forwardRef,
  inject,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import {
  ReactiveFormsModule,
  FormsModule,
  NG_VALUE_ACCESSOR,
  ControlValueAccessor,
  FormControl,
} from '@angular/forms';
import { RadioControl } from '../../shared/controls/radio-control/radio-control';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-first-method',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RadioControl, FormsModule],
  templateUrl: './first-method.html',
  styleUrl: './first-method.less',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FirstMethod),
      multi: true,
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FirstMethod implements ControlValueAccessor, OnInit {
  innerControl = new FormControl<string | null>(null);
  value: string | null = null;
  private destroyRef = inject(DestroyRef);

  private onChange: any = () => {};
  private onTouched: any = () => {};

  ngOnInit(): void {
    this.innerControl.valueChanges.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((val) => {
      this.onChange(val);
      this.onTouched();
    });
  }

  writeValue(val: string): void {
    this.innerControl.setValue(val, { emitEvent: false });
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
}
