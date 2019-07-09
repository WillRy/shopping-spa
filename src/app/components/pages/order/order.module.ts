import { OrderRountingModule } from './order-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from 'src/app/shared.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { OrderListComponent } from './order-list/order-list.component';
import { OrderSearchFormComponent } from './order-search-form/order-search-form.component';
import { OrderStatusComponent } from './order-status/order-status.component';

@NgModule({
  imports: [
    CommonModule,
    OrderRountingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    SharedModule,
    NgxPaginationModule
  ],
  declarations: [OrderListComponent, OrderSearchFormComponent, OrderStatusComponent],
  exports: [],
  providers: []
})
export class OrderModule {}
