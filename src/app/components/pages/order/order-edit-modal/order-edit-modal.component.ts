import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  ViewChild,
  Input
} from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { ModalComponent } from 'src/app/components/bootstrap/modal/modal.component';
import { FormGroup, FormBuilder } from '@angular/forms';
import { OrderHttpService } from 'src/app/services/http/order-http.service';
import { Order, OrderStatus } from 'src/app/model';
import { Validators } from 'src/app/Common/validators';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'order-edit-modal',
  templateUrl: './order-edit-modal.component.html',
  styleUrls: ['./order-edit-modal.component.css']
})
export class OrderEditModalComponent implements OnInit {
  // tslint:disable-next-line: no-output-on-prefix
  @Output() onSuccess: EventEmitter<any> = new EventEmitter<any>();
  // tslint:disable-next-line: no-output-on-prefix
  @Output() onError: EventEmitter<HttpErrorResponse> = new EventEmitter<
    HttpErrorResponse
  >();

  @ViewChild(ModalComponent)
  modal: ModalComponent;

  STATUS_ENUM = OrderStatus;

  _orderId: number;

  order: Order;

  form: FormGroup;

  errors = {};

  constructor(
    private orderHttp: OrderHttpService,
    private formBuilder: FormBuilder
  ) {
    this.form = this.formBuilder.group({
      payment_link: ['', Validators.urlOrEmpty],
      obs: ''
    });
  }

  ngOnInit() {}

  submit(status: OrderStatus = null) {
    const isPaymentLinkDisabled = this.form.get('payment_link').disabled;
    this.orderHttp
      .update(this._orderId, {
        status: status,
        obs: this.form.get('obs').value,
        payment_link: isPaymentLinkDisabled
          ? null
          : this.form.get('payment_link').value
      })
      .subscribe(
        order => {
          this.onSuccess.emit(order);
          this.modal.hide();
        },
        responseError => {
          if (responseError.status === 422) {
            this.errors = responseError.error.errors;
          }
          this.onError.emit(responseError);
        }
      );
    return false;
  }

  showModal(orderId) {
    this._orderId = orderId;
    this.getOrder();
    this.modal.show();
  }

  getOrder() {
    this.orderHttp.get(this._orderId).subscribe(order => {
      this.order = order;
      this.form.patchValue(order);
      if (order.status !== OrderStatus.STATUS_PENDING) {
        this.form.get('payment_link').disable();
      }
    });
  }

  hideModal($event) {
    this.modal.hide();
    this.reset();
  }

  reset() {
    console.log('fechou');
    this.form.reset({
      obs: '',
      payment_link: { value: '', disabled: false }
    });
    this.order = null;
  }

  showErrors() {
    return Object.keys(this.errors).length !== 0;
  }
}
