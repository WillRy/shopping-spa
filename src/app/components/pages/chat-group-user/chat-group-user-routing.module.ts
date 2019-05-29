
import {
    NgModule
} from '@angular/core';

import {
    RouterModule
} from '@angular/router';

import { ChatGroupUserListComponent } from './chat-group-user-list/chat-group-user-list.component';



const chatGroupUserRoutes = [
    {path: '', component: ChatGroupUserListComponent}
];

    @NgModule({
        imports: [RouterModule.forChild(chatGroupUserRoutes)],
        exports: [RouterModule]
    })
export class ChatGroupUserRountingModule {}
