import { Component, OnInit, ViewChild } from '@angular/core';
import { User } from 'src/app/model';
import { UserNewModalComponent } from '../user-new-modal/user-new-modal.component';
import { UserHttpService } from 'src/app/services/http/user-http.service';
import { UserInsertService } from './user-insert.service';
import { UserEditService } from './user-edit.service';
import { UserDeleteService } from './user-delete.service';
import { UserEditModalComponent } from '../user-edit-modal/user-edit-modal.component';
import { UserDeleteModalComponent } from '../user-delete-modal/user-delete-modal.component';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  users: Array < User > = [];

  userId: number;

  pagination = {
    page: 1,
    totalItems: 0,
    itemsPerPage: 5
  };

  constructor(
    private userHttpService: UserHttpService,
    public userInsertService: UserInsertService,
    public userEditService: UserEditService,
    public userDeleteService: UserDeleteService
  ) {
    this.userInsertService.userListComponent = this;
    this.userEditService.userListComponent = this;
    this.userDeleteService.userListComponent = this;
  }

  @ViewChild(UserNewModalComponent)
  userNewModel: UserNewModalComponent;

  @ViewChild(UserEditModalComponent)
  userEditModal: UserEditModalComponent;

  @ViewChild(UserDeleteModalComponent)
  userDeleteModal: UserDeleteModalComponent;

  ngOnInit() {
    this.getUsers();
  }

  getUsers() {
    this.userHttpService.list(this.pagination.page).subscribe((response) => {
      this.users = response.data;
      this.pagination.totalItems = response.meta.total;
      this.pagination.itemsPerPage = response.meta.per_page;
    });
  }

  pageChanged(page) {
    this.pagination.page = page;
    this.getUsers();
  }

}
