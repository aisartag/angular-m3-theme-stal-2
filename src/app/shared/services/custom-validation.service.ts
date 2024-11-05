import { Injectable } from '@angular/core';
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class CustomValidationService {
  patternValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const regex = new RegExp('^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$');
      const valid = regex.test(control.value);
      return valid ? null : { forbiddenName: { value: control.value } };
    };
  }
}
