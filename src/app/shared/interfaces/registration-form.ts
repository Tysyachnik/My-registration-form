import { FormControl, FormGroup } from '@angular/forms';

export interface RegistrationForm {
  method: FormControl<string | null>;
  basic: FormControl<string | null>;
  extra: FormControl<string | null>;
  confirm: FormControl<boolean>;
}
