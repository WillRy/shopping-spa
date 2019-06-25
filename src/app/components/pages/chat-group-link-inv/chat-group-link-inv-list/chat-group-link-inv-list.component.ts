import { Component, OnInit } from '@angular/core';
import { ChatGroupLinkInvitation, ChatGroup } from 'src/app/model';
import { ChatGroupLinkInvHttpService } from 'src/app/services/http/chat-group-link-inv-http.service';
import { ActivatedRoute } from '@angular/router';

@Component({
// tslint:disable-next-line: component-selector
  selector: 'chat-group-link-inv-list',
  templateUrl: './chat-group-link-inv-list.component.html',
  styleUrls: ['./chat-group-link-inv-list.component.css']
})
export class ChatGroupLinkInvListComponent implements OnInit {

  groupId: number;
  linkInvitation: number;
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



  // @ViewChild(ProductInputNewModalComponent)
  // inputNewModal: ProductInputNewModalComponent;

  constructor(
    private linkInvHttp: ChatGroupLinkInvHttpService,
    private route: ActivatedRoute,
  ) {
    this.route.params.subscribe((params) => {
      this.groupId = params.chat_group;
      this.getLinkInvitations();
    });
  }

  ngOnInit() {
    this.getLinkInvitations();
  }

  getLinkInvitations() {
    this.linkInvHttp.list(this.groupId, {
      page: this.pagination.page,
      sort: this.sortColumn.column === '' ? null : this.sortColumn
    }).subscribe(response => {
      this.chatGroup = response.data.chat_group;
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
