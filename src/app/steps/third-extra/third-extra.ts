import { CommonModule } from '@angular/common';
import { Component, OnInit, signal, effect, forwardRef } from '@angular/core';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';
import { toSignal } from '@angular/core/rxjs-interop';
import { SelectControl } from '../../shared/controls/select-control/select-control';
import { DataPicker } from '../../shared/controls/data-picker/data-picker';
import { InputControl } from '../../shared/controls/input-control/input-control';

@Component({
  selector: 'app-third-extra',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, SelectControl, DataPicker, InputControl],
  templateUrl: './third-extra.html',
  styleUrl: './third-extra.less',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ThirdExtra),
      multi: true,
    },
  ],
})
export class ThirdExtra implements ControlValueAccessor, OnInit {
  innerControl = new FormGroup({
    adress: new FormControl<string>('', [Validators.required, Validators.minLength(2)]),
    gender: new FormControl<string>('', [Validators.required]),
    birthday: new FormControl<string>('', { nonNullable: true }),
    parentName: new FormControl<string>(''),
    parentEmail: new FormControl<string>(''),
  });

  genders = [
    { label: 'Male', value: 'male' },
    { label: 'Female', value: 'female' },
    { label: 'Other', value: 'other' },
  ];

  private onChange: any = () => {};
  private onTouched: any = () => {};

  isMinor = signal<boolean>(false);

  birthday = toSignal(this.innerControl.controls.birthday.valueChanges, {
    initialValue: this.innerControl.controls.birthday.value,
  });

  constructor() {
    // effect(() => {
    //   const isUserMinor = this.isMinor();
    //   const parentNameControl = this.innerControl.get('parentName');
    //   const parentEmailControl = this.innerControl.get('parentEmail');

    //   if (isUserMinor) {
    //     parentNameControl?.setValidators([
    //       Validators.required,
    //       Validators.minLength(2),
    //       Validators.pattern(/^[a-zA-Zа-яА-Я\s]*$/),
    //     ]);
    //     parentEmailControl?.setValidators([Validators.required, Validators.email]);
    //   } else {
    //     parentEmailControl?.clearValidators();
    //     parentNameControl?.clearValidators();
    //     parentEmailControl?.reset();
    //     parentNameControl?.reset();
    //   }

    //   parentNameControl?.updateValueAndValidity();
    //   parentEmailControl?.updateValueAndValidity();
    //   this.innerControl.updateValueAndValidity();
    // });

    // effect(() => {
    //   if (this.birthday) {
    //     const birthDate = this.birthday();
    //     if (!birthDate) {
    //       this.isMinor.set(false);
    //       return;
    //     }
    //     this.isMinor.set(this.getAge(new Date(birthDate)) < 18);
    //   }
    // });

    effect(() => {
      const birthDate = this.birthday();
      if (!birthDate) {
        this.isMinor.set(false);
        return;
      }

      const parsed = new Date(birthDate);
      this.isMinor.set(this.getAge(parsed) < 18);
    });

    effect(() => {
      const isMinor = this.isMinor();
      const parentName = this.innerControl.get('parentName');
      const parentEmail = this.innerControl.get('parentEmail');

      if (!parentName || !parentEmail) return;

      if (isMinor) {
        parentName.setValidators([
          Validators.required,
          Validators.minLength(2),
          Validators.pattern(/^[a-zA-Zа-яА-Я\s]*$/),
        ]);
        parentEmail.setValidators([Validators.required, Validators.email]);
      } else {
        parentName.clearValidators();
        parentEmail.clearValidators();
        parentName.reset();
        parentEmail.reset();
      }

      parentName.updateValueAndValidity();
      parentEmail.updateValueAndValidity();
      this.innerControl.updateValueAndValidity({ emitEvent: true });
    });
  }

  writeValue(val: any): void {
    if (val) this.innerControl.patchValue(val, { emitEvent: false });
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  ngOnInit(): void {
    this.innerControl.valueChanges.subscribe((val) => {
      this.onChange(this.innerControl.valid ? val : null);
      this.onTouched();
    });

    this.innerControl.statusChanges.subscribe(() => {
      console.log('VALID?', this.innerControl.valid, this.innerControl.value);
      console.log('isMinor:', this.isMinor());
    });
  }

  private getAge(birthDate: Date): number {
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  }
}
