import { Component, OnInit, Output, EventEmitter, ViewChild, Input } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { ModalComponent } from 'src/app/components/bootstrap/modal/modal.component';
import fieldsOptions from './../chat-group-link-inv-form/chat-group-link-inv-field-options';
import { ChatGroupLinkInvHttpService } from 'src/app/services/http/chat-group-link-inv-http.service';

@Component({
// tslint:disable-next-line: component-selector
  selector: 'chat-group-link-inv-new-modal',
  templateUrl: './chat-group-link-inv-new-modal.component.html',
  styleUrls: ['./chat-group-link-inv-new-modal.component.css']
})
export class ChatGroupLinkInvNewModalComponent implements OnInit {

  @Input()
  chatGroupId: number;

  // tslint:disable-next-line: no-output-on-prefix
  @Output() onSuccess: EventEmitter < any > = new EventEmitter < any > ();
  // tslint:disable-next-line: no-output-on-prefix
  @Output() onError: EventEmitter < HttpErrorResponse > = new EventEmitter < HttpErrorResponse > ();

  @ViewChild(ModalComponent)
  modal: ModalComponent;


  form: FormGroup;
  errors = {};

  constructor(private linkInvHttp: ChatGroupLinkInvHttpService, private formBuilder: FormBuilder) {
    const min = fieldsOptions.total.validationMessage.min;
    this.form = this.formBuilder.group({
      total: [min, [Validators.required, Validators.min(min)]],
      expires_at: null,
      remaining: null
    });
  }

  ngOnInit() {}

  showModal() {
    this.modal.show();
  }
  hideModal() {
    this.modal.hide();
  }

  submit() {
    this.linkInvHttp.create(this.chatGroupId, this.form.value)
      .subscribe(
        (linkInv) => {
          this.form.reset({
            total: fieldsOptions.total.validationMessage.min,
            expires_at: null,
            remaining: null
          });
          this.errors = {};
          this.onSuccess.emit(linkInv);
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

  showErrors() {
    return Object.keys(this.errors).length !== 0;
  }

}
