import { AbstractControl } from '@angular/forms';
import urlRegex from 'url-regex';

export class Validators {
  static url(control: AbstractControl) {
    return urlRegex().test(control.value) ? null : { url: true };
  }

  static urlOrEmpty(control: AbstractControl) {
    return !control.value || control.value === '' ? null : Validators.url(control);
  }
}
