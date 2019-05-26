import { UserProfileComponent } from './user-profile.component';
import {
    NgModule
} from '@angular/core';

import {
    RouterModule
} from '@angular/router';



const profileRoutes = [
    {path: '', component: UserProfileComponent}
];

    @NgModule({
        imports: [RouterModule.forChild(profileRoutes)],
        exports: [RouterModule]
    })
export class UserProfileRoutingModule {}
