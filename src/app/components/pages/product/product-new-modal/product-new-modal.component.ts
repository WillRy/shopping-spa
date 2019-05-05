import {
  ProductHttpService
} from './../../../../services/http/product-http.service';
import {
  HttpErrorResponse
} from '@angular/common/http';
import {
  Component,
  OnInit,
  ViewChild,
  Output,
  EventEmitter
} from '@angular/core';
import {
  ModalComponent
} from 'src/app/components/bootstrap/modal/modal.component';
import {
  Product
} from 'src/app/model';


@Component({
  // tslint:disable-next-line: component-selector
  selector: 'product-new-modal',
  templateUrl: './product-new-modal.component.html',
  styleUrls: ['./product-new-modal.component.css']
})
export class ProductNewModalComponent implements OnInit {

  constructor(private productHttpService: ProductHttpService) {}

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

  ngOnInit() {}

  showModal() {
    this.modal.show();
  }
  hideModal($event) {
    this.modal.hide();
  }

  submit() {
    this.productHttpService.create(this.product).subscribe(
      (product) => {
        this.onSuccess.emit(product);
        this.modal.hide();
      },
      (error) => {
        this.onError.emit(error);
      });
    return false;
  }

}
