import {
  ModalComponent
} from './../../../bootstrap/modal/modal.component';
import {
  Component,
  OnInit,
  Input,
  ViewChild,
  Output,
  EventEmitter
} from '@angular/core';
import {
  Product
} from 'src/app/model';
import {
  ProductHttpService
} from 'src/app/services/http/product-http.service';
import {
  HttpErrorResponse
} from '@angular/common/http';

@Component({
// tslint:disable-next-line: component-selector
  selector: 'product-delete-modal',
  templateUrl: './product-delete-modal.component.html',
  styleUrls: ['./product-delete-modal.component.css']
})
export class ProductDeleteModalComponent implements OnInit {

  product: Product = null;

  _productId: number;

  // tslint:disable-next-line: no-output-on-prefix
  @Output() onSuccess: EventEmitter < any > = new EventEmitter < any > ();
  // tslint:disable-next-line: no-output-on-prefix
  @Output() onError: EventEmitter < HttpErrorResponse > = new EventEmitter < HttpErrorResponse > ();

  @ViewChild(ModalComponent)
  modal: ModalComponent;

  constructor(private productHttp: ProductHttpService) {}

  ngOnInit() {}

  @Input()
  set productId(value) {
    this._productId = value;
    if (this._productId) {
      this.productHttp.get(this._productId).subscribe(response => this.product = response);
    }
  }

  destroy() {
    this.productHttp.destroy(this._productId)
      .subscribe(
        (product) => {
          this.onSuccess.emit(product);
          this.modal.hide();

        },
        error => {
          this.onError.emit(error);
        });
    return false;
  }

  showModal() {
    this.modal.show();
  }

  hideModal($event) {
    this.modal.hide();
  }
}
