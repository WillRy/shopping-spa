import { ChatGroupLinkInvListComponent } from './chat-group-link-inv-list/chat-group-link-inv-list.component';

import {
    NgModule
} from '@angular/core';

import {
    RouterModule
} from '@angular/router';





const chatGroupLinkInvRoutes = [
    {path: '', component: ChatGroupLinkInvListComponent}
];

    @NgModule({
        imports: [RouterModule.forChild(chatGroupLinkInvRoutes)],
        exports: [RouterModule]
    })
export class ChatGroupLinkInvRountingModule {}
