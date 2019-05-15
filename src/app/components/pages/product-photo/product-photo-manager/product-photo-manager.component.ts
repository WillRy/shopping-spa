import {
  ProductPhoto,
  Product
} from './../../../../model';
import {
  Component,
  OnInit
} from '@angular/core';
import {
  ProductPhotoHttpService
} from 'src/app/services/http/product-photo-http.service';
import {
  Router,
  ActivatedRoute
} from '@angular/router';
import { NotifyMessageService } from 'src/app/services/notify-message.service';

@Component({
  selector: 'app-product-photo-manager',
  templateUrl: './product-photo-manager.component.html',
  styleUrls: ['./product-photo-manager.component.css']
})
export class ProductPhotoManagerComponent implements OnInit {

  photos: ProductPhoto[] = [];
  product: Product = null;
  productId: number = null;

  constructor(
    private productPhotoHttp: ProductPhotoHttpService,
    private route: ActivatedRoute,
    private notifyMessage: NotifyMessageService
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.productId = params.product;
      this.getPhotos();
    });
  }

  getPhotos() {
    this.productPhotoHttp.list(this.productId).subscribe((data) => {
      this.photos = data.photos;
      this.product = data.product;
    });
  }

  onInsertSuccess(data: {photos: ProductPhoto[]}) {

    this.photos.push(...data.photos);
    this.notifyMessage.success('Fotos(s) cadastradas com sucesso');
  }
}
