import {
    NgModule
} from '@angular/core';

import {
    RouterModule
} from '@angular/router';

import { UserListComponent } from './user-list/user-list.component';



const userRoutes = [
    {path: 'list', component: UserListComponent}];

    @NgModule({
        imports: [RouterModule.forChild(userRoutes)],
        exports: [RouterModule]
    })
export class UserRoutingModule {}
