import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  forwardRef,
  inject,
  input,
  Input,
  OnInit,
} from '@angular/core';
import { BaseControl } from '../base-control/base-control';
import { FormControl, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-checkbox-control',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './checkbox-control.html',
  styleUrl: './checkbox-control.less',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CheckboxControl),
      multi: true,
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CheckboxControl extends BaseControl<any> implements OnInit {
  label = input<string>();
  innerControl = new FormControl('');
  required = input<boolean>(false);
  private destroyRef = inject(DestroyRef);

  ngOnInit(): void {
    this.innerControl.valueChanges.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((val) => {
      this.onChange(val);
      this.onTouched();
    });
  }
}
