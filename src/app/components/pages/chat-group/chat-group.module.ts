import { ChatGroupUserListComponent } from './../chat-group-user/chat-group-user-list/chat-group-user-list.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from 'src/app/shared.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { ChatGroupListComponent } from './chat-group-list/chat-group-list.component';
import { ChatGroupNewModalComponent } from './chat-group-new-modal/chat-group-new-modal.component';
import { ChatGroupFormComponent } from './chat-group-form/chat-group-form.component';
import { ChatGroupEditModalComponent } from './chat-group-edit-modal/chat-group-edit-modal.component';
import { ChatGroupDeleteModalComponent } from './chat-group-delete-modal/chat-group-delete-modal.component';
import { ChatGroupRountingModule } from './chat-group-routing.module';



@NgModule({
  imports: [
    CommonModule,
    ChatGroupRountingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    SharedModule,
    NgxPaginationModule,
  ],
  declarations: [
    ChatGroupListComponent,
    ChatGroupNewModalComponent,
    ChatGroupFormComponent,
    ChatGroupEditModalComponent,
    ChatGroupDeleteModalComponent
  ],
  exports: [
  ],
  providers: []
})


export class ChatGroupModule {}
