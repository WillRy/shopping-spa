import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from 'src/app/shared.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { ProductPhotoRountingModule } from './product-photo-routing.module';
import { ProductPhotoManagerComponent } from './product-photo-manager/product-photo-manager.component';
import { ProductPhotoUploadComponent } from './product-photo-upload/product-photo-upload.component';
import { ProductPhotoEditModalComponent } from './product-photo-edit-modal/product-photo-edit-modal.component';
import { ProductPhotoDeleteModalComponent } from './product-photo-delete-modal/product-photo-delete-modal.component';



@NgModule({
  imports: [
    CommonModule,
    ProductPhotoRountingModule,
    FormsModule,
    HttpClientModule,
    SharedModule,
    NgxPaginationModule,
  ],
  declarations: [
    ProductPhotoManagerComponent,
    ProductPhotoUploadComponent,
    ProductPhotoEditModalComponent,
    ProductPhotoDeleteModalComponent,
  ],
  exports: [
  ],
  providers: []
})


export class ProductPhotoModule {}
