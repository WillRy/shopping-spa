import {
  ProductCategory
} from './../../../../model';
import {
  CategoryHttpService
} from 'src/app/services/http/category-http.service';
import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  Input
} from '@angular/core';
import {
  Category
} from 'src/app/model';
import {
  ProductHttpService
} from 'src/app/services/http/product-http.service';
import {
  ProductCategoryHttpService
} from 'src/app/services/http/product-category-http.service';
import {
  HttpErrorResponse
} from '@angular/common/http';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'product-category-new',
  templateUrl: './product-category-new.component.html',
  styleUrls: ['./product-category-new.component.css']
})
export class ProductCategoryNewComponent implements OnInit {

  // tslint:disable-next-line: no-output-on-prefix
  @Output() onSuccess: EventEmitter < any > = new EventEmitter < any > ();
  // tslint:disable-next-line: no-output-on-prefix
  @Output() onError: EventEmitter < HttpErrorResponse > = new EventEmitter < HttpErrorResponse > ();

  @Input()
  productId: number;

  @Input()
  productCategory: ProductCategory = null;

  categories: Category[] = [];

  categoriesId: number[] = [];

  constructor(private categoryHttp: CategoryHttpService, private productCategoryHttp: ProductCategoryHttpService) {}

  ngOnInit() {
    this.getCategories();
  }

  getCategories() {
    this.categoryHttp.list({all: true}).subscribe(response => {
      this.categories = response.data;
    });
  }

  submit() {
    const categoriesId = this.mergeCategories();
    this.productCategoryHttp.create(this.productId, categoriesId).subscribe((productCategory) => {
      this.onSuccess.emit(productCategory);
    });
    return false;
  }

  // metodo que exclui da lista de categorias enviadas pelo usuario, as categorias que ja existem
  // no produto
  private mergeCategories(): number[] {
    const categoriesId = this.productCategory.categories.map((category) => category.id);
    const newCategoriesId = this.categoriesId.filter((category) => {
      return categoriesId.indexOf(category) === -1;
    });
    return categoriesId.concat(newCategoriesId);
  }

}
