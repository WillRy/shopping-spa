
import {
  ChatGroupUserHttpService
} from './../../../../services/http/chat-group-user-http-service';
import {
  ChatGroup
} from './../../../../model';
import {
  Component,
  OnInit,
  ViewChild
} from '@angular/core';
import {
  User
} from 'src/app/model';
import {
  ActivatedRoute
} from '@angular/router';
import {
  NotifyMessageService
} from 'src/app/services/notify-message.service';
import {
  HttpErrorResponse
} from '@angular/common/http';
import { ChatGroupUserDeleteModalComponent } from '../chat-group-user-delete-modal/chat-group-user-delete-modal.component';

@Component({
  selector: 'app-chat-group-user-list',
  templateUrl: './chat-group-user-list.component.html',
  styleUrls: ['./chat-group-user-list.component.css']
})
export class ChatGroupUserListComponent implements OnInit {

  chatGroupId: number;

  chatGroup: ChatGroup;

  users: Array < User > = [];

  userIdToDelete: number = null;

  pagination = {
    page: 1,
    totalItems: 0,
    itemsPerPage: 5
  };

  @ViewChild(ChatGroupUserDeleteModalComponent)
  chatGroupUserDeleteModal: ChatGroupUserDeleteModalComponent;

  constructor(
    private route: ActivatedRoute,
    private chatGroupUserHttp: ChatGroupUserHttpService,
    private notifyMessage: NotifyMessageService
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.chatGroupId = params.chat_group;
      this.getUsers();
    });
  }


  getUsers() {
    this.chatGroupUserHttp.list(this.chatGroupId, {
      page: this.pagination.page
    }).subscribe(
      (response) => {
        this.chatGroup = response.data.chat_group;
        this.users = response.data.users;
        this.pagination.totalItems = response.meta.total;
        this.pagination.itemsPerPage = response.meta.per_page;
      }
    );
  }

  onInsertSuccess($event: any) {
    this.notifyMessage.success('Usuarios incluidos com sucesso');
    this.getUsers();
  }

  onInsertError($event: HttpErrorResponse) {
    this.notifyMessage.error('Erro ao inserir usuario no grupo');
    console.log($event);
  }

  onDeleteSuccess($event: any) {
    this.notifyMessage.success('Usuario desvinculada com sucesso');
    this.getUsers();
  }

  onDeleteError($event: HttpErrorResponse) {
    this.notifyMessage.error('Não foi possível desvincular o usuário');
    console.log($event);
  }

  pageChanged(page) {
    this.pagination.page = page;
    this.getUsers();
  }


  openModalDelete(id) {
    this.userIdToDelete = id;
    this.chatGroupUserDeleteModal.showModal();
  }

}
