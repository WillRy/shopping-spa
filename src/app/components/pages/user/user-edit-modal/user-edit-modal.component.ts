import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  ViewChild,
  Input
} from '@angular/core';
import {
  HttpErrorResponse
} from '@angular/common/http';
import {
  ModalComponent
} from 'src/app/components/bootstrap/modal/modal.component';
import { UserHttpService } from 'src/app/services/http/user-http.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import fieldsOptions from '../user-form/user-fields-options';


@Component({
// tslint:disable-next-line: component-selector
  selector: 'user-edit-modal',
  templateUrl: './user-edit-modal.component.html',
  styleUrls: ['./user-edit-modal.component.css']
})
export class UserEditModalComponent implements OnInit {
  // tslint:disable-next-line: no-output-on-prefix
  @Output() onSuccess: EventEmitter < any > = new EventEmitter < any > ();
  // tslint:disable-next-line: no-output-on-prefix
  @Output() onError: EventEmitter < HttpErrorResponse > = new EventEmitter < HttpErrorResponse > ();

  @ViewChild(ModalComponent)
  modal: ModalComponent;

  form: FormGroup;
  errors = {};

  _userId: number;

  constructor(private userHttp: UserHttpService, private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      name: ['', [Validators.required, Validators.maxLength(fieldsOptions.name.validationMessage.maxlength)]],
      email: ['', [Validators.email]],
      password: null
    });
  }

  ngOnInit() {}


  submit() {
    const data = Object.assign({}, this.form.value);
    if (!this.form.get('password').value) {
      delete data.password;
    }
    this.userHttp.update(this._userId, data).subscribe(
      (user) => {
        this.form.reset({name: '', email: '', password: null});
        this.onSuccess.emit(user);
        this.modal.hide();
      },
      (responseError) => {
        if (responseError.status === 422) {
          this.errors = responseError.error.errors;
        }
        this.onError.emit(responseError);
      });
  }

  showModal(userId) {
    this._userId = userId;
    this.getUser();
    this.modal.show();
  }

  getUser() {
    this.userHttp.get(this._userId).subscribe(response => this.form.patchValue(response));
  }

  hideModal($event) {
    this.modal.hide();
  }

  showErrors() {
    return Object.keys(this.errors).length !== 0;
  }

}
