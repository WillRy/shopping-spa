import { ChatGroupUserListComponent } from './../chat-group-user/chat-group-user-list/chat-group-user-list.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from 'src/app/shared.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { ChatGroupUserRountingModule } from './chat-group-user-routing.module';
import { ChatGroupUserNewComponent } from './chat-group-user-new/chat-group-user-new.component';
import { Select2Module } from 'ng2-select2';



@NgModule({
  imports: [
    CommonModule,
    ChatGroupUserRountingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    SharedModule,
    NgxPaginationModule,
    Select2Module
  ],
  declarations: [
    ChatGroupUserListComponent,
    ChatGroupUserNewComponent
  ],
  exports: [
  ],
  providers: []
})


export class ChatGroupUserModule {}
