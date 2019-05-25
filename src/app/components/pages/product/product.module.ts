import { ProductRountingModule } from './product-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from 'src/app/shared.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductNewModalComponent } from './product-new-modal/product-new-modal.component';
import { ProductEditModalComponent } from './product-edit-modal/product-edit-modal.component';
import { ProductDeleteModalComponent } from './product-delete-modal/product-delete-modal.component';
import { ProductFormComponent } from './product-form/product-form.component';



@NgModule({
  imports: [
    CommonModule,
    ProductRountingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    SharedModule,
    NgxPaginationModule,
  ],
  declarations: [
    ProductListComponent,
    ProductNewModalComponent,
    ProductEditModalComponent,
    ProductDeleteModalComponent,
    ProductFormComponent,
  ],
  exports: [
  ],
  providers: []
})


export class ProductModule {}
