import {
    NgModule
} from '@angular/core';

import {
    RouterModule
} from '@angular/router';
import { ProductInputListComponent } from './product-input-list/product-input-list.component';



const productInputRoutes = [
    {path: 'list', component: ProductInputListComponent}
];

    @NgModule({
        imports: [RouterModule.forChild(productInputRoutes)],
        exports: [RouterModule]
    })
export class ProductInputRountingModule {}
