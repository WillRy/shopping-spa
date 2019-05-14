import { Component, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { ModalComponent } from 'src/app/components/bootstrap/modal/modal.component';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ProductoutputHttpService } from 'src/app/services/http/product-output-http.service';
import fieldsOptions from '../product-output-form/output-fields-options';

@Component({
// tslint:disable-next-line: component-selector
  selector: 'product-output-new-modal',
  templateUrl: './product-output-new-modal.component.html',
  styleUrls: ['./product-output-new-modal.component.css']
})
export class ProductOutputNewModalComponent implements OnInit {

  // tslint:disable-next-line: no-output-on-prefix
  @Output() onSuccess: EventEmitter < any > = new EventEmitter < any > ();
  // tslint:disable-next-line: no-output-on-prefix
  @Output() onError: EventEmitter < HttpErrorResponse > = new EventEmitter < HttpErrorResponse > ();

  @ViewChild(ModalComponent)
  modal: ModalComponent;

  form: FormGroup;
  errors = {};

  constructor(private outputHttp: ProductoutputHttpService, private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      amount: ['', [Validators.required, Validators.min(fieldsOptions.amount.validationMessage.min)]],
      product_id: [null, [Validators.required]],
    });
  }

  ngOnInit() {}

  submit() {
    console.log(this.form.value);
    this.outputHttp.create(this.form.value)
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
