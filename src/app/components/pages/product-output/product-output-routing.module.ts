import { ProductOutputListComponent } from './product-output-list/product-output-list.component';
import {
    NgModule
} from '@angular/core';

import {
    RouterModule
} from '@angular/router';




const productOutputRoutes = [
    {path: 'list', component: ProductOutputListComponent}
];

    @NgModule({
        imports: [RouterModule.forChild(productOutputRoutes)],
        exports: [RouterModule]
    })
export class ProductOutputRountingModule {}
