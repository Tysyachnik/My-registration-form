import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ReactiveFormsModule, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-first-method',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './first-method.html',
  styleUrl: './first-method.less',
})
export class FirstMethod {
  @Input() group!: FormGroup;
}
