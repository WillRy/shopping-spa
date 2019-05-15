import { Component, OnInit, Output, EventEmitter, ViewChild, Input } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { ModalComponent } from 'src/app/components/bootstrap/modal/modal.component';
import { ProductPhotoHttpService } from 'src/app/services/http/product-photo-http.service';
import { ActivatedRoute } from '@angular/router';

@Component({
// tslint:disable-next-line: component-selector
  selector: 'product-photo-delete-modal',
  templateUrl: './product-photo-delete-modal.component.html',
  styleUrls: ['./product-photo-delete-modal.component.css']
})
export class ProductPhotoDeleteModalComponent implements OnInit {


  // tslint:disable-next-line: no-output-on-prefix
  @Output()
  onSuccess: EventEmitter < any > = new EventEmitter < any > ();

  // tslint:disable-next-line: no-output-on-prefix
  @Output()
  onError: EventEmitter < HttpErrorResponse > = new EventEmitter < HttpErrorResponse > ();

  @ViewChild(ModalComponent)
  modal: ModalComponent;

  @Input()
  photoId: number = null;

  productId: number = null;
  errors = {};
  constructor(private productPhotoHttp: ProductPhotoHttpService, private route: ActivatedRoute) {
    this.route.params.subscribe((params) => {
      this.productId = params.product;
    });
  }

  ngOnInit() {

  }

  deletePhoto() {
    this.productPhotoHttp.destroy(this.productId, this.photoId).subscribe(
      (data) => {
        this.onSuccess.emit(this.photoId);
      },
      (responseError) => {
        if (responseError.status === 422) {
          this.errors = responseError.error.errors;
        }
        this.onError.emit(responseError);
      });

  }

  showErrors() {
    return Object.keys(this.errors).length !== 0;
  }

  showModal() {
    this.modal.show();
  }

  hideModal() {
    this.modal.hide();
  }


}
