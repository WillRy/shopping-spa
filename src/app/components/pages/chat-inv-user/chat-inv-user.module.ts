import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from 'src/app/shared.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { ChatInvUserListComponent } from './chat-inv-user-list/chat-inv-user-list.component';
import { ChatInvUserRoutingModule } from './chat-inv-user-routing.module';
import { ChatInvUserStatusComponent } from './chat-inv-user-status/chat-inv-user-status.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    SharedModule,
    NgxPaginationModule,
    ChatInvUserRoutingModule
  ],
  declarations: [
    ChatInvUserListComponent,
    ChatInvUserStatusComponent
  ]
})
export class ChatInvUserModule { }
