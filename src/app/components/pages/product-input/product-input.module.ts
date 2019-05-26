import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from 'src/app/shared.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { ProductInputListComponent } from './product-input-list/product-input-list.component';
import { ProductInputNewModalComponent } from './product-input-new-modal/product-input-new-modal.component';
import { ProductInputFormComponent } from './product-input-form/product-input-form.component';
import { ProductInputSearchFormComponent } from './product-input-search-form/product-input-search-form.component';
import { ProductInputRountingModule } from './product-input-routing.module';
import { Select2Module } from 'ng2-select2';




@NgModule({
  imports: [
    CommonModule,
    ProductInputRountingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    SharedModule,
    NgxPaginationModule,
    Select2Module
  ],
  declarations: [
    ProductInputListComponent,
    ProductInputNewModalComponent,
    ProductInputFormComponent,
    ProductInputSearchFormComponent
  ],
  exports: [
  ],
  providers: []
})


export class ProductInputModule {}
