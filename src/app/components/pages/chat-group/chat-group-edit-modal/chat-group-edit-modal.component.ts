import {
  ChatGroup
} from 'src/app/model';
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
import {
  FormGroup,
  FormBuilder,
  Validators
} from '@angular/forms';
import {
  ChatGroupHttpService
} from 'src/app/services/http/chat-group-http-service';
import fieldsOptions from '../chat-group-form/chat-group-field-options';


@Component({
  // tslint:disable-next-line: component-selector
  selector: 'chat-group-edit-modal',
  templateUrl: './chat-group-edit-modal.component.html',
  styleUrls: ['./chat-group-edit-modal.component.css']
})
export class ChatGroupEditModalComponent implements OnInit {


  // tslint:disable-next-line: no-output-on-prefix
  @Output() onSuccess: EventEmitter < any > = new EventEmitter < any > ();
  // tslint:disable-next-line: no-output-on-prefix
  @Output() onError: EventEmitter < HttpErrorResponse > = new EventEmitter < HttpErrorResponse > ();

  @ViewChild(ModalComponent)
  modal: ModalComponent;

  _chatGroupId: number;
  form: FormGroup;
  errors = {};
  chatGroup: ChatGroup;

  constructor(private chatGroupHttp: ChatGroupHttpService, private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      name: ['', [Validators.required, Validators.maxLength(fieldsOptions.name.validationMessage.maxlength)]],
      photo: null
    });
  }

  ngOnInit() {}

  submit() {
    this.chatGroupHttp.update(this._chatGroupId, this.form.value)
      .subscribe(
        (chatGroup) => {
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

  @Input()
  set chatGroupId(value) {
    this._chatGroupId = value;
    if (this._chatGroupId) {
      this.chatGroupHttp.get(this._chatGroupId).subscribe(chatGroup => {
        this.chatGroup = chatGroup;
        this.form.patchValue(chatGroup);
      });
    }
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
