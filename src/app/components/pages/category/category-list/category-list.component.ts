import {
  Component,
  OnInit,
  ViewChild
} from '@angular/core';
import {
  CategoryNewModalComponent
} from '../category-new-modal/category-new-modal.component';
import {
  CategoryEditModalComponent
} from '../category-edit-modal/category-edit-modal.component';
import {
  CategoryDeleteModalComponent
} from '../category-delete-modal/category-delete-modal.component';
import {
  CategoryHttpService
} from 'src/app/services/http/category-http.service';
import {
  Category
} from 'src/app/model';
import {
  CategoryInsertService
} from './category-insert.service';
import {
  CategoryEditService
} from './category-edit.service';
import {
  CategoryDeleteService
} from './category-delete.service';



@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {

  categories: Array < Category > = [];

  categoryId: number;



  pagination = {
    page: 1,
    totalItems: 0,
    itemsPerPage: 5
  };

  constructor(
    private categoryHttp: CategoryHttpService,
    public categoryInsertService: CategoryInsertService,
    public categoryEditService: CategoryEditService,
    public categoryDeleteService: CategoryDeleteService) {
    this.categoryInsertService.categoryListComponent = this;
    this.categoryEditService.categoryListComponent = this;
    this.categoryDeleteService.categoryListComponent = this;
  }

  sortColumn = {column: '', sort: ''};

  searchText: string;

  @ViewChild(CategoryNewModalComponent)
  categoryNewModal: CategoryNewModalComponent;

  @ViewChild(CategoryEditModalComponent)
  categoryEditModal: CategoryEditModalComponent;

  @ViewChild(CategoryDeleteModalComponent)
  categoryDeleteModal: CategoryDeleteModalComponent;

  ngOnInit() {
    this.getCategories();
  }

  getCategories() {
    this.categoryHttp.list({
      page: this.pagination.page,
      sort: this.sortColumn.column === '' ? null : this.sortColumn,
      search: this.searchText
    }).subscribe(response => {
      this.categories = response.data;
      this.pagination.totalItems = response.meta.total;
      this.pagination.itemsPerPage = response.meta.per_page;
    });
  }

  sort(sortColumn) {
    this.getCategories();
  }
  pageChanged(page) {
    this.pagination.page = page;
    this.getCategories();
  }

  search(search: string) {
    this.searchText = search;
    this.getCategories();
  }

}
