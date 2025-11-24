import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  effect,
  forwardRef,
  inject,
  input,
  OnInit,
  signal,
} from '@angular/core';
import { BaseControl } from '../base-control/base-control';
import { FormControl, FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-phone-control',
  imports: [CommonModule, FormsModule, NgxMaskDirective, ReactiveFormsModule],
  standalone: true,
  templateUrl: './phone-control.html',
  styleUrl: './phone-control.less',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => PhoneControl),
      multi: true,
    },
    provideNgxMask(),
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PhoneControl extends BaseControl<string> implements OnInit {
  countryCode = input<string>('');
  prefix = signal<string>('');
  maskSignal = signal<string>('+0 (000) 000-00-000');
  private destroyRef = inject(DestroyRef);

  constructor() {
    super();

    effect(() => {
      switch (this.countryCode()) {
        case 'RU':
          this.maskSignal.set(' (000) 000-00-000');
          this.prefix.set('+7');
          break;
        case 'US':
          this.maskSignal.set(' (000) 000-0000');
          this.prefix.set('+1');
          break;
        case 'DE':
          this.maskSignal.set(' 000 000000');
          this.prefix.set('+49');
          break;
        default:
          this.maskSignal.set('+0 (000) 000-00-000');
      }
    });
  }

  ngOnInit() {
    this.innerControl.valueChanges.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((value) => {
      this.value = value;
      this.onChange(value);
    });
  }
}
