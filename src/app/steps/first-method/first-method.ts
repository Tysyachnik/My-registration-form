import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormsModule } from '@angular/forms';
import { RadioButton } from 'primeng/radiobutton';

@Component({
  selector: 'app-first-method',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RadioButton, FormsModule],
  templateUrl: './first-method.html',
  styleUrl: './first-method.less',
})
export class FirstMethod {
  @Input() group!: FormGroup;
  ingredient!: string;

  @Output() socialSelected = new EventEmitter<void>();

  ngOnInit() {
    this.group.get('type')?.valueChanges.subscribe((value) => {
      if (value === 'social') {
        this.socialSelected.emit();
      }
    });
  }
}
