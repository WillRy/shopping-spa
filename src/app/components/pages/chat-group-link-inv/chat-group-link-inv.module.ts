import { ChatGroupLinkInvFormComponent } from './chat-group-link-inv-form/chat-group-link-inv-form.component';
import { ChatGroupLinkInvNewModalComponent } from './chat-group-link-inv-new-modal/chat-group-link-inv-new-modal.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from 'src/app/shared.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { ChatGroupLinkInvListComponent } from './chat-group-link-inv-list/chat-group-link-inv-list.component';
import { ChatGroupLinkInvRountingModule } from './chat-group-link-inv-routing.module';
import { ChatGroupLinkInvEditModalComponent } from './chat-group-link-inv-edit-modal/chat-group-link-inv-edit-modal.component';

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
    ChatGroupLinkInvListComponent,
    ChatGroupLinkInvFormComponent,
    ChatGroupLinkInvNewModalComponent,
    ChatGroupLinkInvEditModalComponent,
  ],
  exports: [],
  providers: []
})
export class ChatGroupLinkInvModule {}
