import {
    NgModule
} from '@angular/core';

import {
    RouterModule
} from '@angular/router';
import {
    CategoryListComponent
} from './category-list/category-list.component';


const categoryRoutes = [
    {path: 'list', component: CategoryListComponent}];
@NgModule({
    imports: [RouterModule.forChild(categoryRoutes)],
    exports: [RouterModule]
})
export class CategoryRountingModule {}
