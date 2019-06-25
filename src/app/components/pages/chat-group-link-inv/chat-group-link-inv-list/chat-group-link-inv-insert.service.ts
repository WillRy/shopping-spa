import { ChatGroupLinkInvListComponent } from './chat-group-link-inv-list.component';
import {
    Injectable
} from '@angular/core';
import { NotifyMessageService } from 'src/app/services/notify-message.service';
import { HttpErrorResponse } from '@angular/common/http';


@Injectable({
    providedIn: 'root'
})
export class ChatGroupLinkInvInsertService {

    private _chatGroupLinkInvListComponent: ChatGroupLinkInvListComponent;

    constructor(private notifyMessage: NotifyMessageService) {}

    set chatGroupLinkInvListComponent(value: ChatGroupLinkInvListComponent) {
        this._chatGroupLinkInvListComponent = value;
    }
    showModalInsert() {
        this._chatGroupLinkInvListComponent.linkInvNewModal.showModal();
    }

    onInsertSuccess($event: any) {
        this.notifyMessage.success('Link Criado com sucesso');
        this._chatGroupLinkInvListComponent.getLinkInvitations();
    }

    onInsertError($event: HttpErrorResponse) {
        this.notifyMessage.error('Erro ao gerar link de convite');
        console.log($event);
    }
}
