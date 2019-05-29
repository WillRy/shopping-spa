import {
  ChatGroupUserHttpService
} from './../../../../services/http/chat-group-user-http-service';
import {
  UserHttpService
} from 'src/app/services/http/user-http.service';
import {
  ChatGroupHttpService
} from 'src/app/services/http/chat-group-http-service';
import {
  ModalComponent
} from './../../../bootstrap/modal/modal.component';
import {
  Component,
  OnInit,
  ViewChild,
  Input,
  Output,
  EventEmitter
} from '@angular/core';
import {
  ChatGroup,
  User
} from 'src/app/model';
import {
  HttpErrorResponse
} from '@angular/common/http';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'chat-group-user-delete-model',
  templateUrl: './chat-group-user-delete-modal.component.html',
  styleUrls: ['./chat-group-user-delete-modal.component.css']
})
export class ChatGroupUserDeleteModalComponent implements OnInit {
  // tslint:disable-next-line: no-output-on-prefix
  @Output() onSuccess: EventEmitter < any > = new EventEmitter < any > ();
  // tslint:disable-next-line: no-output-on-prefix
  @Output() onError: EventEmitter < HttpErrorResponse > = new EventEmitter < HttpErrorResponse > ();

  @ViewChild(ModalComponent)
  modal: ModalComponent;

  @Input()
  _chatGroupId: number = null;

  @Input()
  _userId: number = null;

  chatGroup: ChatGroup;

  user: User;

  constructor(
    private chatGroupHttp: ChatGroupHttpService,
    private userHttp: UserHttpService,
    private chatGroupUserHttpService: ChatGroupUserHttpService
  ) {}

  ngOnInit() {}


  @Input()
  set chatGroupId(value) {
    this._chatGroupId = value;
    if (this._chatGroupId) {
      this.chatGroupHttp.get(this._chatGroupId).subscribe(response => this.chatGroup = response);
    }
  }

  @Input()
  set userId(value) {
    this._userId = value;
    if (this._userId) {
      this.userHttp.get(this._userId).subscribe(response => this.user = response);
    }
  }

  destroy() {
    this.chatGroupUserHttpService.destroy(this._chatGroupId, this._userId).subscribe((response) => {
        this.onSuccess.emit(response);
        this.modal.hide();
      },
      (error) => {
        this.onError.emit(error);
      });
  }

  showModal() {
    this.modal.show();
  }

  hideModal($event) {
    this.modal.hide();
  }


}
