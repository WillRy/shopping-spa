import { ChatInvitationUserStatus, ChatInvitationUser } from './../../../../model';
import { ChatInvUserHttpService } from './../../../../services/http/chat-inv-user-http.service';
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { NotifyMessageService } from 'src/app/services/notify-message.service';

@Component({
// tslint:disable-next-line: component-selector
  selector: 'chat-inv-user-status',
  templateUrl: './chat-inv-user-status.component.html',
  styleUrls: ['./chat-inv-user-status.component.css']
})
export class ChatInvUserStatusComponent implements OnInit {
  @Input()
  groupId: number;

  @Input()
  invitation: ChatInvitationUser;

  // tslint:disable-next-line: no-output-on-prefix
  @Output()
  onSuccess: EventEmitter<any> = new EventEmitter<any>();

  constructor(
    private chatInvUserHttp: ChatInvUserHttpService,
    private notifyMessage: NotifyMessageService
  ) {}

  ngOnInit() {}

  approve() {
    this.update(ChatInvitationUserStatus.APPROVE);
  }

  reprove() {
    this.update(ChatInvitationUserStatus.REPROVE);
  }

  update(status: ChatInvitationUserStatus) {
    this.chatInvUserHttp
      .update(this.groupId, this.invitation.id, status)
      .subscribe(() => {
        this.onSuccess.emit(status);
        this.notifyMessage.success('Salvo com sucesso');
      });
  }
}
