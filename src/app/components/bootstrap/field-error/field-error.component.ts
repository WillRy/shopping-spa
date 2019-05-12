import {
  Component,
  OnInit,
  Input
} from '@angular/core';
import {
  FormControl
} from '@angular/forms';
import {
  ValidationMessage
} from 'src/app/Common/validation-message';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'field-error',
  templateUrl: './field-error.component.html',
  styleUrls: ['./field-error.component.css'],
  // tslint:disable-next-line: use-host-property-decorator
  host: {
    'class': 'invalid-feedback'
  }
})
export class FieldErrorComponent implements OnInit {

  @Input()
  field: FormControl;

  @Input()
  label: string;

  @Input()
  messages;

  constructor() {}

  ngOnInit() {}

  get errorKeys() {
    return Object.keys(this.errors);
  }

  get errors() {
    return this.field.errors;
  }

  showError() {
    return this.field.invalid && (this.field.dirty || this.field.touched);
  }

  getMessageError(error) {
    let replaceTokens = [this.label];

    if (this.messages && this.messages.hasOwnProperty(error)) {
      if (Array.isArray(this.messages[error])) {
        replaceTokens = replaceTokens.concat(this.messages[error]);
      } else {
        replaceTokens.push(this.messages[error]);
      }
    }
    return ValidationMessage.getMessage(error, replaceTokens);
  }
}
