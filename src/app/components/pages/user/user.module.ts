import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from 'src/app/shared.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { UserRoutingModule } from './user-routing.module';
import { UserListComponent } from './user-list/user-list.component';
import { UserNewModalComponent } from './user-new-modal/user-new-modal.component';
import { UserEditModalComponent } from './user-edit-modal/user-edit-modal.component';
import { UserDeleteModalComponent } from './user-delete-modal/user-delete-modal.component';
import { UserFormComponent } from './user-form/user-form.component';




@NgModule({
  imports: [
    CommonModule,
    UserRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    SharedModule,
    NgxPaginationModule,
  ],
  declarations: [
    UserListComponent,
    UserNewModalComponent,
    UserEditModalComponent,
    UserDeleteModalComponent,
    UserFormComponent
  ],
  exports: [
  ],
  providers: []
})


export class UserModule {}
