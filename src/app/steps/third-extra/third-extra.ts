import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, signal, effect, Signal } from '@angular/core';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
  ControlValueAccessor,
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
})
export class ThirdExtra implements ControlValueAccessor, OnInit {
  innerControl = new FormGroup({
    adress: new FormControl<string>('', [Validators.required, Validators.minLength(2)]),
    gender: new FormControl<string>('', [Validators.required, Validators.email]),
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

  birthday!: Signal<string>;

  isMinor = signal<boolean>(false);

  constructor(private fb: FormBuilder) {
    effect(() => {
      const isUserMinor = this.isMinor();
      const parentNameControl = this.innerControl.get('parentName');
      const parentEmailControl = this.innerControl.get('parentEmail');

      if (isUserMinor) {
        parentNameControl?.setValidators([
          Validators.required,
          Validators.minLength(2),
          Validators.pattern(/^[a-zA-Zа-яА-Я\s]*$/),
        ]);
        parentEmailControl?.setValidators([Validators.required, Validators.email]);
      } else {
        parentEmailControl?.clearValidators();
        parentNameControl?.clearValidators();
        parentEmailControl?.reset();
        parentNameControl?.reset();
      }
    });

    effect(() => {
      if (this.birthday) {
        const birthDate = this.birthday();
        if (!birthDate) {
          this.isMinor.set(false);
          return;
        }
        this.isMinor.set(this.getAge(new Date(birthDate)) < 18);
      }
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
    this.birthday = toSignal(this.innerControl.controls.birthday.valueChanges, {
      initialValue: '',
    });

    if (!this.innerControl.contains('parentName')) {
      this.innerControl.addControl('parentName', this.fb.control(''));
    }
    if (!this.innerControl.contains('patentEmail')) {
      this.innerControl.addControl('parentEmail', this.fb.control(''));
    }

    this.innerControl.valueChanges.subscribe((value) => {
      this.onChange(value);
      this.onTouched();
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
