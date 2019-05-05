import {
    Injectable
} from '@angular/core';
import { NotifyMessageService } from 'src/app/services/notify-message.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ProductListComponent } from './product-list.component';


@Injectable({
    providedIn: 'root'
})
export class ProductDeleteService {

    private __productListComponent: ProductListComponent;

    constructor(private notifyMessage: NotifyMessageService) {}

    set productListComponent(value: ProductListComponent) {
        this.__productListComponent = value;
    }
    showModalDelete(productId: number) {
        this.__productListComponent.productId = productId;
        this.__productListComponent.productDeleteModal.showModal();
    }

    onDeleteSuccess($event: any) {
        this.notifyMessage.success('Produto deletado com sucesso');
        this.__productListComponent.getProducts();
    }

    onDeleteError($event: HttpErrorResponse) {
        this.notifyMessage.error('Erro ao deletar Produto');
        console.log($event);
    }
}
