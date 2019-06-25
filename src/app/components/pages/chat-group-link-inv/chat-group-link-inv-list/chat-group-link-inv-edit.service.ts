import { ChatGroupLinkInvListComponent } from './chat-group-link-inv-list.component';
import {
    Injectable
} from '@angular/core';
import { NotifyMessageService } from 'src/app/services/notify-message.service';
import { HttpErrorResponse } from '@angular/common/http';


@Injectable({
    providedIn: 'root'
})
export class ChatGroupLinkInvEditService {


    private _chatGroupLinkInvListComponent: ChatGroupLinkInvListComponent;

    constructor(private notifyMessage: NotifyMessageService) {}

    set chatGroupLinkInvListComponent(value: ChatGroupLinkInvListComponent) {
        this._chatGroupLinkInvListComponent = value;
    }
    showModalEdit(value: number) {
        this._chatGroupLinkInvListComponent.linkInvitationId = value;
        this._chatGroupLinkInvListComponent.linkInvEditModal.showModal();
    }

    onEditSuccess($event: any) {
        this.notifyMessage.success('Link Editado com sucesso');
        this._chatGroupLinkInvListComponent.getLinkInvitations();
    }

    onEditError($event: HttpErrorResponse) {
        this.notifyMessage.error('Erro ao editar link de convite');
        console.log($event);
    }
}
