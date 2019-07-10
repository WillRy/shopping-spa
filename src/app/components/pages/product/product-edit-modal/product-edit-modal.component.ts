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
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import fieldsOptions from '../../category/category-form/category-fields-options';

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

  form: FormGroup;

  errors = {};

  _productId: number;

  constructor(private productHttp: ProductHttpService, private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      name: ['', [Validators.required, Validators.maxLength(fieldsOptions.name.validationMessage.maxlength)]],
      description: ['', [Validators.required]],
      price: ['', [Validators.required]],
      active: true
    });
  }

  ngOnInit() {}



  submit() {
    this.productHttp.update(this._productId, this.form.value).subscribe(
      (product) => {
        this.form.reset({name: '', description: '', price: ''});
        this.onSuccess.emit(product);
        this.modal.hide();
      },
      (responseError) => {
        if (responseError.status === 422) {
          this.errors = responseError.error.errors;
        }
        this.onError.emit(responseError);
      });
  }

  showModal(productId) {
    this._productId = productId;
    this.getProduct();
    this.modal.show();
  }

  getProduct() {
    this.productHttp.get(this._productId).subscribe(response => this.form.patchValue(response));
  }

  hideModal($event) {
    this.modal.hide();
  }

  showErrors() {
    return Object.keys(this.errors).length !== 0;
  }

}
