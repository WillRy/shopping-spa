import {
  ProductPhotoEditModalComponent
} from './../product-photo-edit-modal/product-photo-edit-modal.component';
import {
  ProductPhoto,
  Product
} from './../../../../model';
import {
  Component,
  OnInit,
  ViewChild
} from '@angular/core';
import {
  ProductPhotoHttpService
} from 'src/app/services/http/product-photo-http.service';
import {
  ActivatedRoute
} from '@angular/router';
import {
  NotifyMessageService
} from 'src/app/services/notify-message.service';
import {
  ProductPhotoDeleteModalComponent
} from '../product-photo-delete-modal/product-photo-delete-modal.component';

declare const $;

@Component({
  selector: 'app-product-photo-manager',
  templateUrl: './product-photo-manager.component.html',
  styleUrls: ['./product-photo-manager.component.css']
})
export class ProductPhotoManagerComponent implements OnInit {

  photos: ProductPhoto[] = [];
  product: Product = null;
  productId: number = null;
  photoIdToEdit: number = null;
  photoIdToDelete: number = null;

  @ViewChild(ProductPhotoEditModalComponent)
  editModal: ProductPhotoEditModalComponent;

  @ViewChild(ProductPhotoDeleteModalComponent)
  deleteModal: ProductPhotoDeleteModalComponent;

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
    this.configFancybox();
  }

  getPhotos() {
    this.productPhotoHttp.list(this.productId).subscribe((data) => {
      this.photos = data.photos;
      this.product = data.product;
    });
  }

  configFancybox() {
    $.fancybox.defaults.btnTpl.edit = `<a class="fancybox-button" data-fancybox-edit
    title="Substituir" href="javascript:void(0)" style="text-align:center">
    <i class="fas fa-edit"></i></a>`;
    $.fancybox.defaults.buttons = ['download', 'edit', 'close', 'delete'];
    $('body').on('click', '[data-fancybox-edit]', (e) => {
      this.photoIdToEdit = this.getPhotoIdfromSlideShow();
      console.log(this.photoIdToEdit);
      this.editModal.showModal();
    });

    $.fancybox.defaults.btnTpl.delete = `<a class="fancybox-button" data-fancybox-delete
    title="Deletar" href="javascript:void(0)" style="text-align:center">
    <i class="fas fa-trash"></i></a>`;
    $('body').on('click', '[data-fancybox-delete]', (e) => {
      this.photoIdToDelete = this.getPhotoIdfromSlideShow();
      this.deleteModal.showModal();
    });
  }

  getPhotoIdfromSlideShow() {
    const src = $('.fancybox-slide--current .fancybox-image').attr('src');
    const id = $('[data-fancybox="gallery"]').find(`[src="${src}"]`).attr('id');
    return id.split('-')[1];

  }
  onInsertSuccess(data: {
    photos: ProductPhoto[]
  }) {
    this.photos.push(...data.photos);
    this.notifyMessage.success('Fotos(s) cadastradas com sucesso');
  }

  onEditSuccess(data: ProductPhoto) {
    this.editModal.hideModal();
    $.fancybox.getInstance().close();

    const index = this.photos.findIndex((photo: ProductPhoto) => {
      // tslint:disable-next-line: triple-equals
      return photo.id == this.photoIdToEdit;
    });
    this.photos[index] = data;
    this.notifyMessage.success('Foto substituida com sucesso');
  }

  onDeleteSuccess(data: number) {
    this.deleteModal.hideModal();
    $.fancybox.getInstance().close();

    const index = this.photos.findIndex((photo: ProductPhoto) => {
      // tslint:disable-next-line: triple-equals
      return photo.id == this.photoIdToDelete;
    });
    this.photos.splice(index, 1);
    this.notifyMessage.success('Foto deletada com sucesso');
  }
}
