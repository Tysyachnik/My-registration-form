import { AbstractControl, Validators } from '@angular/forms';

export function hasRequiredValidator(control: AbstractControl | null): boolean {
  if (!control || !control.validator) return false;

  const validator = control.validator({} as AbstractControl);
  return validator?.['required'] === true;
}
