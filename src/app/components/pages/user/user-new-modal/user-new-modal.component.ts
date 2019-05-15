import { UserHttpService } from './../../../../services/http/user-http.service';
import {
  Component,
  OnInit,
  Output,
  ViewChild,
  EventEmitter
} from '@angular/core';
import {
  ModalComponent
} from 'src/app/components/bootstrap/modal/modal.component';
import {
  HttpErrorResponse
} from '@angular/common/http';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import fieldsOptions from '../user-form/user-fields-options';


@Component({
// tslint:disable-next-line: component-selector
  selector: 'user-new-modal',
  templateUrl: './user-new-modal.component.html',
  styleUrls: ['./user-new-modal.component.css']
})
export class UserNewModalComponent implements OnInit {

  // tslint:disable-next-line: no-output-on-prefix
  @Output() onSuccess: EventEmitter < any > = new EventEmitter < any > ();
  // tslint:disable-next-line: no-output-on-prefix
  @Output() onError: EventEmitter < HttpErrorResponse > = new EventEmitter < HttpErrorResponse > ();

  @ViewChild(ModalComponent)
  modal: ModalComponent;

  form: FormGroup;
  errors = {};

  constructor(private userHttpService: UserHttpService, private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      name: ['', [Validators.required, Validators.maxLength(fieldsOptions.name.validationMessage.maxlength)]],
      email: ['', [Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  ngOnInit() {}


  showModal() {
    this.modal.show();
  }
  hideModal($event) {
    this.modal.hide();
  }

  submit() {
    this.userHttpService.create(this.form.value).subscribe(
      (user) => {
        this.onSuccess.emit(user);
        this.modal.hide();
      },
      (responseError) => {
        if (responseError.status === 422) {
          this.errors = responseError.error.errors;
        }
        this.onError.emit(responseError);
      });
    return false;
  }

  showErrors() {
    return Object.keys(this.errors).length !== 0;
  }
}
