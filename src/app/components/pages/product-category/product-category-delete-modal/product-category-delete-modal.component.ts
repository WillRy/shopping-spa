import {
  CategoryHttpService
} from 'src/app/services/http/category-http.service';
import {
  Component,
  OnInit,
  ViewChild,
  Input,
  Output,
  EventEmitter
} from '@angular/core';
import {
  ModalComponent
} from 'src/app/components/bootstrap/modal/modal.component';
import {
  Category
} from 'src/app/model';
import {
  ProductCategoryHttpService
} from 'src/app/services/http/product-category-http.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
// tslint:disable-next-line: component-selector
  selector: 'product-category-delete-modal',
  templateUrl: './product-category-delete-modal.component.html',
  styleUrls: ['./product-category-delete-modal.component.css']
})
export class ProductCategoryDeleteModalComponent implements OnInit {

  // tslint:disable-next-line: no-output-on-prefix
  @Output() onSuccess: EventEmitter < any > = new EventEmitter < any > ();
  // tslint:disable-next-line: no-output-on-prefix
  @Output() onError: EventEmitter < HttpErrorResponse > = new EventEmitter < HttpErrorResponse > ();

  @ViewChild(ModalComponent)
  modal: ModalComponent;

  category: Category = null;

  _categoryId: number;

  @Input()
  productId: number;

  constructor(private categoryHttp: CategoryHttpService, private productCategoryHttp: ProductCategoryHttpService) {}

  ngOnInit() {}


  @Input()
  set categoryId(value) {
    const token = window.localStorage.getItem('token');
    this._categoryId = value;
    if (this._categoryId) {
      this.categoryHttp.get(this._categoryId).subscribe(response => this.category = response);
    }
  }

  destroy() {
    this.productCategoryHttp.destroy(this.productId, this._categoryId).subscribe((response) => {
      this.onSuccess.emit(response);
      this.modal.hide();
    });
  }

  showModal() {
    this.modal.show();
  }

  hideModal($event) {
    this.modal.hide();
  }

}
