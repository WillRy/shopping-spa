import {
  ModalComponent
} from 'src/app/components/bootstrap/modal/modal.component';
import {
  HttpErrorResponse
} from '@angular/common/http';
import {
  ActivatedRoute
} from '@angular/router';
import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  ViewChild,
  Input
} from '@angular/core';
import {
  ProductPhotoHttpService
} from 'src/app/services/http/product-photo-http.service';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'product-photo-edit-modal',
  templateUrl: './product-photo-edit-modal.component.html',
  styleUrls: ['./product-photo-edit-modal.component.css']
})
export class ProductPhotoEditModalComponent implements OnInit {


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

  editPhoto(files: FileList) {
    if (!files.length) {
      return;
    }
    this.productPhotoHttp.update(this.productId, this.photoId, files[0]).subscribe(
      (data) => {
        this.onSuccess.emit(data);
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
