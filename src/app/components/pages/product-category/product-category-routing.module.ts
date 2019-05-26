import {
    NgModule
} from '@angular/core';

import {
    RouterModule
} from '@angular/router';
import { ProductCategoryListComponent } from './product-category-list/product-category-list.component';



const productCategoryRoutes = [
    {path: '', component: ProductCategoryListComponent}];

    @NgModule({
        imports: [RouterModule.forChild(productCategoryRoutes)],
        exports: [RouterModule]
    })
export class ProductCategoryRountingModule {}
