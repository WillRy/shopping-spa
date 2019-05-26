import { ProductListComponent } from './product-list/product-list.component';
import {
    NgModule
} from '@angular/core';

import {
    RouterModule
} from '@angular/router';



const productRoutes = [
    {path: 'list', component: ProductListComponent},
    {path: ':product/categories/list', loadChildren: '../product-category/product-category.module#ProductCategoryModule'}
];

    @NgModule({
        imports: [RouterModule.forChild(productRoutes)],
        exports: [RouterModule]
    })
export class ProductRountingModule {}
