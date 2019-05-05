import {
    Injectable
} from '@angular/core';
import { NotifyMessageService } from 'src/app/services/notify-message.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ProductListComponent } from './product-list.component';


@Injectable({
    providedIn: 'root'
})
export class ProductEditService {

    private __productListComponent: ProductListComponent;

    constructor(private notifyMessage: NotifyMessageService) {}

    set productListComponent(value: ProductListComponent) {
        this.__productListComponent = value;
    }
    showModalEdit(productId: number) {
        this.__productListComponent.productId = productId;
        this.__productListComponent.productEditModal.showModal();
    }

    onEditSuccess($event: any) {
        this.notifyMessage.success('Produto editado com sucesso');
        this.__productListComponent.getProducts();
    }

    onEditError($event: HttpErrorResponse) {
        this.notifyMessage.error('Erro ao editar Produto');
        console.log($event);
    }
}
