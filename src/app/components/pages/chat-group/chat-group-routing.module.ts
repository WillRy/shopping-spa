
import {
    NgModule
} from '@angular/core';

import {
    RouterModule
} from '@angular/router';
import { ChatGroupListComponent } from './chat-group-list/chat-group-list.component';



const chatGroupRoutes = [
    {path: 'list', component: ChatGroupListComponent}
];

    @NgModule({
        imports: [RouterModule.forChild(chatGroupRoutes)],
        exports: [RouterModule]
    })
export class ChatGroupRountingModule {}
