import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from 'src/app/shared.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { ProductOutputRountingModule } from './product-output-routing.module';
import { ProductOutputListComponent } from './product-output-list/product-output-list.component';
import { ProductOutputNewModalComponent } from './product-output-new-modal/product-output-new-modal.component';
import { ProductOutputFormComponent } from './product-output-form/product-output-form.component';
import { ProductOutputSearchFormComponent } from './product-output-search-form/product-output-search-form.component';
import { Select2Module } from 'ng2-select2';




@NgModule({
  imports: [
    CommonModule,
    ProductOutputRountingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    SharedModule,
    NgxPaginationModule,
    Select2Module
  ],
  declarations: [
    ProductOutputListComponent,
    ProductOutputNewModalComponent,
    ProductOutputFormComponent,
    ProductOutputSearchFormComponent,
  ],
  exports: [
  ],
  providers: []
})


export class ProductOutputModule {}
