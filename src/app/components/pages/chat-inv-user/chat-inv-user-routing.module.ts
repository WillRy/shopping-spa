import { ChatInvUserListComponent } from './chat-inv-user-list/chat-inv-user-list.component';

import {
    NgModule
} from '@angular/core';

import {
    RouterModule
} from '@angular/router';





const chatInvUserRoutes = [
    {path: '', component: ChatInvUserListComponent}
];

    @NgModule({
        imports: [RouterModule.forChild(chatInvUserRoutes)],
        exports: [RouterModule]
    })
export class ChatInvUserRoutingModule {}
