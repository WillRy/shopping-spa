import {
  ChatGroupHttpService
} from './../../../../services/http/chat-group-http-service';
import {
  FormGroup, FormBuilder, Validators
} from '@angular/forms';
import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  ViewChild
} from '@angular/core';
import {
  HttpErrorResponse
} from '@angular/common/http';
import {
  ModalComponent
} from 'src/app/components/bootstrap/modal/modal.component';
import fieldsOptions from '../../category/category-form/category-fields-options';

@Component({
// tslint:disable-next-line: component-selector
  selector: 'chat-group-new-modal',
  templateUrl: './chat-group-new-modal.component.html',
  styleUrls: ['./chat-group-new-modal.component.css']
})
export class ChatGroupNewModalComponent implements OnInit {

  // tslint:disable-next-line: no-output-on-prefix
  @Output() onSuccess: EventEmitter < any > = new EventEmitter < any > ();
  // tslint:disable-next-line: no-output-on-prefix
  @Output() onError: EventEmitter < HttpErrorResponse > = new EventEmitter < HttpErrorResponse > ();

  @ViewChild(ModalComponent)
  modal: ModalComponent;


  form: FormGroup;
  errors = {};

  constructor(private chatGroupHttp: ChatGroupHttpService, private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      name: ['', [Validators.required, Validators.maxLength(fieldsOptions.name.validationMessage.maxlength)]],
      photo: [null, [Validators.required]]
    });
  }

  ngOnInit() {}

  submit() {
    this.chatGroupHttp.create(this.form.value)
      .subscribe(
        (chatGroup) => {
          this.form.reset({
            name: '',
            photo: null,
          });
          this.onSuccess.emit(chatGroup);
          this.modal.hide();

        },
        responseError => {
          if (responseError.status === 422) {
            this.errors = responseError.error.errors;
          }
          this.onError.emit(responseError);
        });
    return false;
  }

  showModal() {
    this.modal.show();
  }
  hideModal($event) {
    this.modal.hide();
  }

  showErrors() {
    return Object.keys(this.errors).length !== 0;
  }

}
