import { ChatGroupLinkInvitation } from './../../../../model';
import { ChatGroupLinkInvHttpService } from './../../../../services/http/chat-group-link-inv-http.service';
import { Component, OnInit, Output, EventEmitter, ViewChild, Input } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { ModalComponent } from 'src/app/components/bootstrap/modal/modal.component';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import fieldsOptions from './../chat-group-link-inv-form/chat-group-link-inv-field-options';


@Component({
  // tslint:disable-next-line: component-selector
  selector: 'chat-group-link-inv-edit-modal',
  templateUrl: './chat-group-link-inv-edit-modal.component.html',
  styleUrls: ['./chat-group-link-inv-edit-modal.component.css']
})
export class ChatGroupLinkInvEditModalComponent implements OnInit {




  // tslint:disable-next-line: no-output-on-prefix
  @Output() onSuccess: EventEmitter < any > = new EventEmitter < any > ();
  // tslint:disable-next-line: no-output-on-prefix
  @Output() onError: EventEmitter < HttpErrorResponse > = new EventEmitter < HttpErrorResponse > ();

  @ViewChild(ModalComponent)
  modal: ModalComponent;

  _linkInvitationId: number;
  _chatGroupId: number;
  form: FormGroup;
  errors = {};


  constructor(private linkInvHttp: ChatGroupLinkInvHttpService, private formBuilder: FormBuilder) {
    const min = fieldsOptions.total.validationMessage.min;
    this.form = this.formBuilder.group({
      total: [0, [Validators.required, Validators.min(min)]],
      expires_at: null,
      remaining: null
    });
  }

  ngOnInit() {}

  submit() {
    this.linkInvHttp.update(this._chatGroupId, this._linkInvitationId, this.form.value)
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

  @Input()
  set chatGroupId(value) {
    this._chatGroupId = value;
    this.getLinkInvitation();
  }


  @Input()
  set linkInvitationId(value) {
    this._linkInvitationId = value;
    this.getLinkInvitation();
  }

  getLinkInvitation() {
    if (this._chatGroupId && this._linkInvitationId) {
        this.linkInvHttp.get(this._chatGroupId, this._linkInvitationId).subscribe(linkInv => {
          const data: any = linkInv;
          data.expires_at = data.expires_at ? data.expires_at.date.substring(0, 10) : null;
          this.form.patchValue(linkInv);
        });
    }
  }

  showModal() {
    this.modal.show();
  }
  hideModal() {
    this.modal.hide();
  }

  showErrors() {
    return Object.keys(this.errors).length !== 0;
  }

}
