import {
  ProductHttpService
} from 'src/app/services/http/product-http.service';
import {
  Component,
  OnInit,
  ViewChild
} from '@angular/core';
import {
  ActivatedRoute
} from '@angular/router';
import {
  Product,
  ProductCategory,
  Category
} from 'src/app/model';
import {
  ProductCategoryHttpService
} from 'src/app/services/http/product-category-http.service';
import {
  CategoryHttpService
} from 'src/app/services/http/category-http.service';
import {
  HttpErrorResponse
} from '@angular/common/http';
import {
  NotifyMessageService
} from 'src/app/services/notify-message.service';
import { ProductCategoryDeleteModalComponent } from '../product-category-delete-modal/product-category-delete-modal.component';
@Component({
  selector: 'app-product-category-list',
  templateUrl: './product-category-list.component.html',
  styleUrls: ['./product-category-list.component.css']
})
export class ProductCategoryListComponent implements OnInit {

  productId: number;

  product: Product = null;

  productCategory: ProductCategory = null;

  categoryId: number;

  @ViewChild(ProductCategoryDeleteModalComponent)
  productCategoryDeleteModal: ProductCategoryDeleteModalComponent;

  constructor(
    private route: ActivatedRoute,
    private productHttp: ProductHttpService,
    private productCategoryHttp: ProductCategoryHttpService,
    private notifyMessage: NotifyMessageService
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.productId = params.product;
      this.getProduct();
      this.getProductCategory();
    });
  }

  getProduct() {
    this.productHttp.get(this.productId).subscribe(
      (product) => {
        this.product = product;
      }
    );
  }

  getProductCategory() {
    this.productCategoryHttp.list(this.productId).subscribe(
      (response) => {
        this.productCategory = response;
        // console.log(response);
      }
    );
  }

  onInsertSuccess($event: any) {
    this.notifyMessage.success('Categorias incluidas com sucesso');
    this.getProductCategory();
  }

  onInsertError($event: HttpErrorResponse) {
    this.notifyMessage.error('Erro ao cadastrar categoria no produto');
    console.log($event);
  }

  showModalDelete(categoryId: number) {
    this.categoryId = categoryId;
    this.productCategoryDeleteModal.showModal();
  }

  onDeleteSuccess($event: any) {
    this.notifyMessage.success('Categoria desvinculada com sucesso');
    this.getProductCategory();
  }

  onDeleteError($event: HttpErrorResponse) {
    this.notifyMessage.error('Não foi possível desvincular a categoria');
    console.log($event);
  }
}
