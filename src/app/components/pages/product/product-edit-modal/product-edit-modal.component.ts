import {
  Component,
  OnInit,
  ViewChild,
  EventEmitter,
  Output,
  Input
} from '@angular/core';
import {
  ModalComponent
} from 'src/app/components/bootstrap/modal/modal.component';
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
  selector: 'product-edit-modal',
  templateUrl: './product-edit-modal.component.html',
  styleUrls: ['./product-edit-modal.component.css']
})
export class ProductEditModalComponent implements OnInit {

  // tslint:disable-next-line: no-output-on-prefix
  @Output() onSuccess: EventEmitter < any > = new EventEmitter < any > ();
  // tslint:disable-next-line: no-output-on-prefix
  @Output() onError: EventEmitter < HttpErrorResponse > = new EventEmitter < HttpErrorResponse > ();

  @ViewChild(ModalComponent)
  modal: ModalComponent;

  product: Product = {
    name: '',
    active: true,
    description: '',
    price: 0
  };

  _productId: number;

  constructor(private productHttp: ProductHttpService) {}

  ngOnInit() {}

  @Input()
  set productId(value) {
    const token = window.localStorage.getItem('token');
    this._productId = value;
    if (this._productId) {
      this.productHttp.get(this._productId).subscribe(response => this.product = response);
    }
  }

  submit() {
    this.productHttp.update(this._productId, this.product).subscribe(
      (product) => {
        this.onSuccess.emit(product);
        this.modal.hide();
      },
      (error) => {
        this.onError.emit(error);
      });
  }

  showModal() {
    this.modal.show();
  }
  hideModal($event) {
    this.modal.hide();
  }

}
