import { Component, signal } from '@angular/core';
import { Registration } from './registration/registration';

@Component({
  selector: 'app-root',
  imports: [Registration],
  standalone: true,
  templateUrl: './app.html',
  styleUrl: './app.less',
})
export class App {
  protected readonly title = signal('my-registration-form');
}
