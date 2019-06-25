import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from 'src/app/shared.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { ChatGroupLinkInvListComponent } from './chat-group-link-inv-list/chat-group-link-inv-list.component';
import { ChatGroupLinkInvRountingModule } from './chat-group-link-inv-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    SharedModule,
    NgxPaginationModule,
    ChatGroupLinkInvRountingModule
  ],
  declarations: [
    ChatGroupLinkInvListComponent
  ],
  exports: [],
  providers: []
})
export class ChatGroupLinkInvModule {}
