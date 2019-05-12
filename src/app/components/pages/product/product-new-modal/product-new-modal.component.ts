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
import {
  FormGroup,
  Validators,
  FormBuilder
} from '@angular/forms';
import fieldsOptions from '../product-form/product-fields-options';



@Component({
  // tslint:disable-next-line: component-selector
  selector: 'product-new-modal',
  templateUrl: './product-new-modal.component.html',
  styleUrls: ['./product-new-modal.component.css']
})
export class ProductNewModalComponent implements OnInit {

  form: FormGroup;
  errors = {};

  constructor(private productHttpService: ProductHttpService, private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      name: ['', [Validators.required, Validators.maxLength(fieldsOptions.name.validationMessage.maxlength)]],
      description: ['', [Validators.required]],
      price: ['', [Validators.required]],
      active: true
    });
  }

  // tslint:disable-next-line: no-output-on-prefix
  @Output() onSuccess: EventEmitter < any > = new EventEmitter < any > ();
  // tslint:disable-next-line: no-output-on-prefix
  @Output() onError: EventEmitter < HttpErrorResponse > = new EventEmitter < HttpErrorResponse > ();

  @ViewChild(ModalComponent)
  modal: ModalComponent;


  ngOnInit() {}

  showModal() {
    this.modal.show();
  }
  hideModal($event) {
    this.modal.hide();
  }

  submit() {
    this.productHttpService.create(this.form.value).subscribe(
      (product) => {
        this.onSuccess.emit(product);
        this.modal.hide();
      },
      (responseError) => {
        if (responseError.status === 422) {
          this.errors = responseError.error.errors;
        }
        this.onError.emit(responseError);
      });
    return false;
  }

  showErrors() {
    return Object.keys(this.errors).length !== 0;
  }
}
