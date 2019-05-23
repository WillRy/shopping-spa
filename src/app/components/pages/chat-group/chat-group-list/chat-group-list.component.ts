import {
  ChatGroupInsertService
} from './chat-group-insert-service';
import {
  ChatGroupNewModalComponent
} from './../chat-group-new-modal/chat-group-new-modal.component';
import {
  Component,
  OnInit,
  ViewChild
} from '@angular/core';
import {
  ChatGroup
} from 'src/app/model';
import {
  ChatGroupHttpService
} from 'src/app/services/http/chat-group-http-service';
import {
  ChatGroupEditModalComponent
} from '../chat-group-edit-modal/chat-group-edit-modal.component';
import {
  ChatGroupEditService
} from './chat-group-edit-service';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'chat-group-list',
  templateUrl: './chat-group-list.component.html',
  styleUrls: ['./chat-group-list.component.css']
})
export class ChatGroupListComponent implements OnInit {

  chatGroups: Array < ChatGroup > = [];

  chatGroupId: number;

  pagination = {
    page: 1,
    totalItems: 0,
    itemsPerPage: 5
  };

  sortColumn = {
    column: '',
    sort: ''
  };

  @ViewChild(ChatGroupNewModalComponent)
  chatGroupNewModal: ChatGroupNewModalComponent;

  @ViewChild(ChatGroupEditModalComponent)
  chatGroupEditModal: ChatGroupEditModalComponent;

  constructor(
    private chatGroupHttp: ChatGroupHttpService,
    public chatGroupInsertService: ChatGroupInsertService,
    public chatGroupEditService: ChatGroupEditService
  ) {
    this.chatGroupInsertService.chatGroupListComponent = this;
    this.chatGroupEditService.chatGroupListComponent = this;
  }

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
