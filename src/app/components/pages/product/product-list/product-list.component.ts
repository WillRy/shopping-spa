import {
  Product
} from './../../../../model';
import {
  Component,
  OnInit
} from '@angular/core';
import { ProductHttpService } from 'src/app/services/http/product-http.service';

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

  constructor(private productHttpService: ProductHttpService) {}

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
