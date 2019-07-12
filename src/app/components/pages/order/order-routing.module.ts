import {
    NgModule
} from '@angular/core';

import {
    RouterModule
} from '@angular/router';
import { OrderListComponent } from './order-list/order-list.component';



const orderRoutes = [
    {path: 'list', component: OrderListComponent}
];

    @NgModule({
        imports: [RouterModule.forChild(orderRoutes)],
        exports: [RouterModule]
    })
export class OrderRountingModule {}
