import { ProductDeleteService } from './product-delete.service';
import {
  Product
} from './../../../../model';
import {
  Component,
  OnInit,
  ViewChild
} from '@angular/core';
import {
  ProductHttpService
} from 'src/app/services/http/product-http.service';
import {
  ProductNewModalComponent
} from '../product-new-modal/product-new-modal.component';
import {
  ProductInsertService
} from './product-insert.service';
import { ProductEditService } from './product-edit.service';
import { ProductEditModalComponent } from '../product-edit-modal/product-edit-modal.component';
import { ProductDeleteModalComponent } from '../product-delete-modal/product-delete-modal.component';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  products: Array < Product > = [];

  productId: number;

  pagination = {
    page: 1,
    totalItems: 0,
    itemsPerPage: 5
  };

  constructor(
    private productHttpService: ProductHttpService,
    public productInsertService: ProductInsertService,
    public productEditService: ProductEditService,
    public productDeleteService: ProductDeleteService
  ) {
    this.productInsertService.productListComponent = this;
    this.productEditService.productListComponent = this;
    this.productDeleteService.productListComponent = this;
  }

  @ViewChild(ProductNewModalComponent)
  productNewModel: ProductNewModalComponent;

  @ViewChild(ProductEditModalComponent)
  productEditModal: ProductEditModalComponent;

  @ViewChild(ProductDeleteModalComponent)
  productDeleteModal: ProductDeleteModalComponent;

  ngOnInit() {
    this.getProducts();
  }

  getProducts() {
    this.productHttpService.list(this.pagination.page).subscribe((response) => {
      this.products = response.data;
      this.pagination.totalItems = response.meta.total;
      this.pagination.itemsPerPage = response.meta.per_page;
    });
  }

  pageChanged(page) {
    this.pagination.page = page;
    this.getProducts();
  }

}
