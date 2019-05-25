import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryListComponent } from './category-list/category-list.component';
import { CategoryNewModalComponent } from './category-new-modal/category-new-modal.component';
import { CategoryEditModalComponent } from './category-edit-modal/category-edit-modal.component';
import { CategoryDeleteModalComponent } from './category-delete-modal/category-delete-modal.component';
import { CategorySearchFormComponent } from './category-search-form/category-search-form.component';
import { CategoryFormComponent } from './category-form/category-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from 'src/app/shared.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { CategoryRountingModule } from './category-routing.module';


@NgModule({
  imports: [
    CommonModule,
    CategoryRountingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    SharedModule,
    NgxPaginationModule,
  ],
  declarations: [
    CategoryListComponent,
    CategoryNewModalComponent,
    CategoryEditModalComponent,
    CategoryDeleteModalComponent,
    CategorySearchFormComponent,
    CategoryFormComponent,
  ],
  exports: [
  ],
  providers: []
})


export class CategoryModule {}
