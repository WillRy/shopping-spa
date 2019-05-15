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
  EventEmitter
} from '@angular/core';
import {
  ProductPhotoHttpService
} from 'src/app/services/http/product-photo-http.service';


@Component({
  // tslint:disable-next-line: component-selector
  selector: 'product-photo-upload',
  templateUrl: './product-photo-upload.component.html',
  styleUrls: ['./product-photo-upload.component.css']
})
export class ProductPhotoUploadComponent implements OnInit {

  // tslint:disable-next-line: no-output-on-prefix
  @Output()
  onSuccess: EventEmitter < any > = new EventEmitter < any > ();

  // tslint:disable-next-line: no-output-on-prefix
  @Output()
  onError: EventEmitter < HttpErrorResponse > = new EventEmitter < HttpErrorResponse > ();

  productId: number = null;
  errors = {};
  constructor(private productPhotoHttp: ProductPhotoHttpService, private route: ActivatedRoute) {
    this.route.params.subscribe((params) => {
      this.productId = params.product;
    });
  }

  ngOnInit() {

  }

  uploadPhotos(files: FileList) {
    if (!files.length) {
      return;
    }
    this.productPhotoHttp.create(this.productId, files).subscribe(
      (data) => {
      this.onSuccess.emit(data);
      // clear photo field
      const field: HTMLInputElement = document.querySelector('#photo');
      field.value = '';
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
}
