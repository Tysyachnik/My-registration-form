import { CommonModule } from '@angular/common';
import {
  Component,
  effect,
  EnvironmentInjector,
  forwardRef,
  inject,
  Input,
  OnInit,
  runInInjectionContext,
  signal,
} from '@angular/core';
import { InputControl } from '../../shared/controls/input-control/input-control';
import { SelectControl } from '../../shared/controls/select-control/select-control';
import { PhoneControl } from '../../shared/controls/phone-control/phone-control';
import { FormControl, FormGroup, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-second-basic',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, InputControl, SelectControl, PhoneControl],
  templateUrl: './second-basic.html',
  styleUrl: './second-basic.less',
})
export class SecondBasic implements OnInit {
  @Input({ required: true }) group!: FormGroup;

  isPhoneVisible: boolean = false;

  selectedCountryCode = signal<string>('');

  countries = [
    { label: 'Russia', code: 'RU' },
    { label: 'USA', code: 'US' },
    { label: 'Germany', code: 'DE' },
  ];

  private context = inject(EnvironmentInjector);

  ngOnInit(): void {
    runInInjectionContext(this.context, () => {
      const countryControl = this.group.get('country') as FormControl;
      const phoneControl = this.group.get('phone') as FormControl;

      const countrySignal = toSignal(countryControl.valueChanges, {
        initialValue: countryControl.value,
      });

      effect(() => {
        const selectedCountry = countrySignal();
        console.log('[effect] selectedCountry =', selectedCountry);
        if (!selectedCountry) {
          this.isPhoneVisible = false;
          phoneControl.reset();
          return;
        }
        this.isPhoneVisible = true;
        const code = selectedCountry?.code ?? selectedCountry ?? '';
        console.log('[effect] code set to:', code);
        this.selectedCountryCode.set(code);
        phoneControl?.setValue(code, { emitEvent: true });
        console.log('[effect] selectedCountryCode signal now =', this.selectedCountryCode());
      });
    });
  }
}
