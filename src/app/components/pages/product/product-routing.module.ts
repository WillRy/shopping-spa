import { ProductListComponent } from './product-list/product-list.component';
import {
    NgModule
} from '@angular/core';

import {
    RouterModule
} from '@angular/router';



const productRoutes = [
    {path: 'list', component: ProductListComponent}];

    @NgModule({
        imports: [RouterModule.forChild(productRoutes)],
        exports: [RouterModule]
    })
export class ProductRountingModule {}
