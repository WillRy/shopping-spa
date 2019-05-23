import { ChatGroup } from './../../../model';
import { Component, OnInit } from '@angular/core';
import { ChatGroupHttpService } from 'src/app/services/http/chat-group-http-service';

@Component({
  selector: 'app-chat-group-list',
  templateUrl: './chat-group-list.component.html',
  styleUrls: ['./chat-group-list.component.css']
})
export class ChatGroupListComponent implements OnInit {

  chatGroups: Array<ChatGroup> = [];

  chatGroupId: number;

  pagination = {
    page: 1,
    totalItems: 0,
    itemsPerPage: 5
  };

  sortColumn = {column: '', sort: ''};

  constructor(private chatGroupHttp: ChatGroupHttpService) { }

  ngOnInit() {
    this.getChatGroups();
  }

  getChatGroups() {
    this.chatGroupHttp.list({
      page: this.pagination.page,
      sort: this.sortColumn.column === '' ? null : this.sortColumn
    }).subscribe(response => {
      this.chatGroups = response.data;
      this.pagination.totalItems = response.meta.total;
      this.pagination.itemsPerPage = response.meta.per_page;
    });
  }

  pageChanged(page) {
    this.pagination.page = page;
    this.getChatGroups();
  }

}
