import { Directive, Input } from '@angular/core';
import {
  AbstractControl,
  NG_VALIDATORS,
  ValidationErrors,
  Validator,
  ValidatorFn,
} from '@angular/forms';

@Directive({
  selector: '[appHexColorValidate]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: HexColorValidatorDirective,
      multi: true,
    },
  ],
  standalone: true,
})
export class HexColorValidatorDirective implements Validator {
  @Input('appHexColorValidate') hexColorValidate = '';

  validate(control: AbstractControl): ValidationErrors | null {
    console.log(this.hexColorValidate);
    return this.hexColorValidate
      ? hexColorValidator(new RegExp(this.hexColorValidate, 'i'))(control)
      : null;
  }
}

export function hexColorValidator(nameRe: RegExp): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const hexColorInvalid = !nameRe.test(control.value);
    return hexColorInvalid ? { hexColorError: { value: control.value } } : null;
  };
}
