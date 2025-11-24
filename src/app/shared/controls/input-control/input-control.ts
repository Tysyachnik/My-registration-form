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
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputControl),
      multi: true,
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputControl extends BaseControl<any> implements OnInit {
  label = input<string>();
  type = input<string>('text');
  innerControl = new FormControl('');
  required = input<boolean>(false);
  private destroyRef = inject(DestroyRef);

  ngOnInit() {
    this.innerControl.valueChanges
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((value) => this.onChange(value));
  }
}
