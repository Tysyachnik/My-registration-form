import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ReactiveFormsModule, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-fourth-confirm',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './fourth-confirm.html',
  styleUrl: './fourth-confirm.less',
})
export class FourthConfirm {
  @Input() group!: FormGroup;
  @Output() submitForm = new EventEmitter<void>();
}
