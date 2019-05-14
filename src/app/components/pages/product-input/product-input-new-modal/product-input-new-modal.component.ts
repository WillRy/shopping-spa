import {
  ProductInputHttpService
} from 'src/app/services/http/product-input-http.service';
import {
  FormGroup,
  FormBuilder,
  Validators
} from '@angular/forms';
import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  ViewChild
} from '@angular/core';
import {
  HttpErrorResponse
} from '@angular/common/http';
import {
  ModalComponent
} from 'src/app/components/bootstrap/modal/modal.component';
import fieldsOptions from '../product-input-form/input-fields-options';


@Component({
  // tslint:disable-next-line: component-selector
  selector: 'product-input-new-modal',
  templateUrl: './product-input-new-modal.component.html',
  styleUrls: ['./product-input-new-modal.component.css']
})
export class ProductInputNewModalComponent implements OnInit {

  // tslint:disable-next-line: no-output-on-prefix
  @Output() onSuccess: EventEmitter < any > = new EventEmitter < any > ();
  // tslint:disable-next-line: no-output-on-prefix
  @Output() onError: EventEmitter < HttpErrorResponse > = new EventEmitter < HttpErrorResponse > ();

  @ViewChild(ModalComponent)
  modal: ModalComponent;

  form: FormGroup;
  errors = {};

  constructor(private inputHttp: ProductInputHttpService, private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      amount: ['', [Validators.required, Validators.min(fieldsOptions.amount.validationMessage.min)]],
      product_id: [null, [Validators.required]],
    });
  }

  ngOnInit() {}

  submit() {
    console.log(this.form.value);
    this.inputHttp.create(this.form.value)
      .subscribe(
        (input) => {
          this.form.reset({
            amount: '',
            product_id: null
          });
          this.onSuccess.emit(input);
          this.modal.hide();

        },
        responseError => {
          if (responseError.status === 422) {
            this.errors = responseError.error.errors;
          }
          this.onError.emit(responseError);
        });
    return false;
  }

  showModal() {
    this.modal.show();
  }
  hideModal($event) {
    this.modal.hide();
  }

  showErrors() {
    return Object.keys(this.errors).length !== 0;
  }

}
