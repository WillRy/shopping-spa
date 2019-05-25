import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from 'src/app/shared.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { ProductCategoryRountingModule } from './product-category-routing.module';
import { ProductCategoryListComponent } from './product-category-list/product-category-list.component';
import { ProductCategoryNewComponent } from './product-category-new/product-category-new.component';
import { ProductCategoryDeleteModalComponent } from './product-category-delete-modal/product-category-delete-modal.component';



@NgModule({
  imports: [
    CommonModule,
    ProductCategoryRountingModule,
    FormsModule,
    HttpClientModule,
    SharedModule,
    NgxPaginationModule,
  ],
  declarations: [
    ProductCategoryListComponent,
    ProductCategoryNewComponent,
    ProductCategoryDeleteModalComponent,
  ],
  exports: [
  ],
  providers: []
})


export class ProductCategoryModule {}
