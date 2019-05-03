import {
  HttpClient,
  HttpErrorResponse
} from '@angular/common/http';
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
import { Category } from 'src/app/model';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {

  categories: Array<Category> = [];

  categoryId: number;

  constructor(private http: HttpClient, public categoryHttp: CategoryHttpService) {}

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
    this.categoryHttp.list().subscribe(response => {
      this.categories = response.data;
      console.log(this.categories);
    });
  }

  showModalInsert() {
    this.categoryNewModal.showModal();
  }

  onInsertSuccess($event: any) {
    this.getCategories();
  }

  onInsertError($event: HttpErrorResponse) {
    console.log($event);
  }

  showModalEdit(categoryId: number) {
    this.categoryId = categoryId;
    this.categoryEditModal.showModal();
  }

  onEditSuccess($event: any) {
    this.getCategories();
  }

  onEditError($event: HttpErrorResponse) {
    console.log($event);
  }

  showModalDelete(categoryId: number) {
    this.categoryId = categoryId;
    this.categoryDeleteModal.showModal();
  }

  onDeleteSuccess($event: any) {
    this.getCategories();
  }

  onDeleteError($event: HttpErrorResponse) {
    console.log($event);
  }

}
