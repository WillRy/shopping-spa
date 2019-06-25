import { ChatGroupEditService } from './../../chat-group/chat-group-list/chat-group-edit-service';
import { ChatGroupLinkInvInsertService } from './chat-group-link-inv-insert.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ChatGroupLinkInvitation, ChatGroup } from 'src/app/model';
import { ChatGroupLinkInvHttpService } from 'src/app/services/http/chat-group-link-inv-http.service';
import { ActivatedRoute } from '@angular/router';
import { ChatGroupLinkInvNewModalComponent } from '../chat-group-link-inv-new-modal/chat-group-link-inv-new-modal.component';
import { ChatGroupLinkInvEditModalComponent } from '../chat-group-link-inv-edit-modal/chat-group-link-inv-edit-modal.component';
import { ChatGroupLinkInvEditService } from './chat-group-link-inv-edit.service';
import { ChatGroupLinkInvDeleteService } from './chat-group-link-inv-delete.service';
import { ChatGroupLinkInvDeleteModalComponent } from '../chat-group-link-inv-delete-modal/chat-group-link-inv-delete-modal.component';

@Component({
// tslint:disable-next-line: component-selector
  selector: 'chat-group-link-inv-list',
  templateUrl: './chat-group-link-inv-list.component.html',
  styleUrls: ['./chat-group-link-inv-list.component.css']
})
export class ChatGroupLinkInvListComponent implements OnInit {

  groupId: number;
  linkInvitation: number;
  linkInvitationId: number;
  chatGroup: ChatGroup;
  linkInvitations: Array<ChatGroupLinkInvitation> = [];
  pagination = {
    page: 1,
    totalItems: 0,
    itemsPerPage: 5
  };

  sortColumn = {
    column: 'created_at',
    sort: 'desc'
  };



  @ViewChild(ChatGroupLinkInvNewModalComponent)
  linkInvNewModal: ChatGroupLinkInvNewModalComponent;

  @ViewChild(ChatGroupLinkInvEditModalComponent)
  linkInvEditModal: ChatGroupLinkInvEditModalComponent;

  @ViewChild(ChatGroupLinkInvDeleteModalComponent)
  linkInvDeleteModal: ChatGroupLinkInvDeleteModalComponent;

  constructor(
    private linkInvHttp: ChatGroupLinkInvHttpService,
    private route: ActivatedRoute,
    public linkInvInsertService: ChatGroupLinkInvInsertService,
    public linkInvEditService: ChatGroupLinkInvEditService,
    public linkInvDeleteService: ChatGroupLinkInvDeleteService
  ) {

    this.linkInvInsertService.chatGroupLinkInvListComponent = this;
    this.linkInvEditService.chatGroupLinkInvListComponent = this;
    this.linkInvDeleteService.chatGroupLinkInvListComponent = this;
  }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.groupId = params.chat_group;
      this.getLinkInvitations();
    });
  }

  getLinkInvitations() {
    this.linkInvHttp.list(this.groupId, {
      page: this.pagination.page,
      sort: this.sortColumn.column === '' ? null : this.sortColumn
    }).subscribe(response => {
      this.chatGroup = response.data.group;
      this.linkInvitations = response.data.link_invitations;
      this.pagination.totalItems = response.meta.total;
      this.pagination.itemsPerPage = response.meta.per_page;
    });
  }

  pageChanged(page) {
    this.pagination.page = page;
    this.getLinkInvitations();
  }

  sort(sortColumn) {
    this.getLinkInvitations();
  }




}
