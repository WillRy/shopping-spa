import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  ViewChild,
  Input
} from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { ModalComponent } from 'src/app/components/bootstrap/modal/modal.component';
import { ChatGroup } from 'src/app/model';
import { ChatGroupHttpService } from 'src/app/services/http/chat-group-http-service';


@Component({
// tslint:disable-next-line: component-selector
  selector: 'chat-group-delete-modal',
  templateUrl: './chat-group-delete-modal.component.html',
  styleUrls: ['./chat-group-delete-modal.component.css']
})
export class ChatGroupDeleteModalComponent implements OnInit {

  // tslint:disable-next-line: no-output-on-prefix
  @Output() onSuccess: EventEmitter < any > = new EventEmitter < any > ();
  // tslint:disable-next-line: no-output-on-prefix
  @Output() onError: EventEmitter < HttpErrorResponse > = new EventEmitter < HttpErrorResponse > ();

  @ViewChild(ModalComponent)
  modal: ModalComponent;

  _chatGroupId: number;
  chatGroup: ChatGroup;
  errors = {};

  constructor(private chatGroupHttp: ChatGroupHttpService) {

  }

  ngOnInit() {}

  submit() {
    this.chatGroupHttp.destroy(this._chatGroupId)
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
    if (this._chatGroupId) {
      this.chatGroupHttp.get(this._chatGroupId).subscribe(chatGroup => {
        this.chatGroup = chatGroup;
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
