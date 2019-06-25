import { Component, OnInit, Output, EventEmitter, ViewChild, Input } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { ModalComponent } from 'src/app/components/bootstrap/modal/modal.component';
import { ChatGroupLinkInvHttpService } from 'src/app/services/http/chat-group-link-inv-http.service';

@Component({
// tslint:disable-next-line: component-selector
  selector: 'chat-group-link-inv-delete-modal',
  templateUrl: './chat-group-link-inv-delete-modal.component.html',
  styleUrls: ['./chat-group-link-inv-delete-modal.component.css']
})
export class ChatGroupLinkInvDeleteModalComponent implements OnInit {


  // tslint:disable-next-line: no-output-on-prefix
  @Output() onSuccess: EventEmitter < any > = new EventEmitter < any > ();
  // tslint:disable-next-line: no-output-on-prefix
  @Output() onError: EventEmitter < HttpErrorResponse > = new EventEmitter < HttpErrorResponse > ();

  @ViewChild(ModalComponent)
  modal: ModalComponent;

  _linkInvitationId: number;
  _chatGroupId: number;
  errors = {};


  constructor(private linkInvHttp: ChatGroupLinkInvHttpService) {

  }

  ngOnInit() {}

  destroy() {
    this.linkInvHttp.destroy(this._chatGroupId, this._linkInvitationId)
      .subscribe(
        () => {
          this.onSuccess.emit(true);
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
  }


  @Input()
  set linkInvitationId(value) {
    this._linkInvitationId = value;
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
