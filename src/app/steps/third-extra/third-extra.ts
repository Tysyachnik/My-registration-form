import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, signal, effect, Signal } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
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
export class ThirdExtra implements OnInit {
  @Input({ required: true }) group!: FormGroup;

  genders = [
    { label: 'Male', value: 'male' },
    { label: 'Female', value: 'female' },
    { label: 'Other', value: 'other' },
  ];

  birthday!: Signal<string>;

  isMinor = signal<boolean>(false);

  constructor(private fb: FormBuilder) {
    effect(() => {
      const isUserMinor = this.isMinor();
      const parentNameControl = this.group.get('parentName');
      const parentEmailControl = this.group.get('parentEmail');

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

  ngOnInit(): void {
    this.birthday = toSignal(this.group.get('birthday')!.valueChanges);

    if (!this.group.contains('parentName')) {
      this.group.addControl('parentName', this.fb.control(''));
    }
    if (!this.group.contains('patentEmail')) {
      this.group.addControl('parentEmail', this.fb.control(''));
    }
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
