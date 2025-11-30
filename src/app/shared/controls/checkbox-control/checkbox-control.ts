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
import { BaseControl } from '../base-control/base-control';
import { FormControl, NG_VALUE_ACCESSOR, NgControl, ReactiveFormsModule } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { hasRequiredValidator } from '../../utilits/hasRequiredValidator';

@Component({
  selector: 'app-checkbox-control',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './checkbox-control.html',
  styleUrl: './checkbox-control.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CheckboxControl extends BaseControl<any> implements OnInit {
  private destroyRef = inject(DestroyRef);

  constructor(@Optional() @Self() public ngControl: NgControl) {
    super();
    if (this.ngControl) {
      this.ngControl.valueAccessor = this;
    }
  }

  ngOnInit(): void {
    const control = this.ngControl?.control;
    if (!control) return;

    this.required.set(hasRequiredValidator(control));

    control.statusChanges.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(() => {
      this.required.set(hasRequiredValidator(control));
    });

    this.innerControl.valueChanges.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((val) => {
      this.onChange(val);
      this.onTouched();
    });
  }
}
