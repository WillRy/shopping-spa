import { ChatGroupLinkInvListComponent } from './chat-group-link-inv-list.component';
import {
    Injectable
} from '@angular/core';
import { NotifyMessageService } from 'src/app/services/notify-message.service';
import { HttpErrorResponse } from '@angular/common/http';


@Injectable({
    providedIn: 'root'
})
export class ChatGroupLinkInvDeleteService {


    private _chatGroupLinkInvListComponent: ChatGroupLinkInvListComponent;

    constructor(private notifyMessage: NotifyMessageService) {}

    set chatGroupLinkInvListComponent(value: ChatGroupLinkInvListComponent) {
        this._chatGroupLinkInvListComponent = value;
    }
    showModalDelete(value: number) {
        this._chatGroupLinkInvListComponent.linkInvitationId = value;
        this._chatGroupLinkInvListComponent.linkInvDeleteModal.showModal();
    }

    onDeleteSuccess($event: any) {
        this.notifyMessage.success('Link removido com sucesso');
        this._chatGroupLinkInvListComponent.getLinkInvitations();
    }

    onDeleteError($event: HttpErrorResponse) {
        this.notifyMessage.error('Erro ao remover link de convite');
        console.log($event);
    }
}
