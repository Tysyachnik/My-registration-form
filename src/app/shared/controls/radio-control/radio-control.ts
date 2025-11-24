import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  forwardRef,
  inject,
  input,
  OnInit,
} from '@angular/core';
import { BaseControl } from '../base-control/base-control';
import { FormControl, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-radio-control',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './radio-control.html',
  styleUrl: './radio-control.less',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => RadioControl),
      multi: true,
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RadioControl extends BaseControl<string> implements OnInit {
  registationWay: string | null = null;
  private destroyRef = inject(DestroyRef);

  ngOnInit(): void {
    this.innerControl.valueChanges.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((val) => {
      this.registationWay = val;
      this.onChange(val);
      this.onTouched();
    });
  }

  override writeValue(val: string | null): void {
    this.registationWay = val;
    this.innerControl.setValue(val, { emitEvent: false });
  }
  onSelect(val: string) {
    this.innerControl.setValue(val);
  }
}
