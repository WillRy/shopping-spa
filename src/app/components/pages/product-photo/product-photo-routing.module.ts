import {
    NgModule
} from '@angular/core';

import {
    RouterModule
} from '@angular/router';
import { ProductPhotoManagerComponent } from './product-photo-manager/product-photo-manager.component';



const productPhotoRoutes = [
    {path: '', component: ProductPhotoManagerComponent}];

    @NgModule({
        imports: [RouterModule.forChild(productPhotoRoutes)],
        exports: [RouterModule]
    })
export class ProductPhotoRountingModule {}
