import {
    Injectable
} from '@angular/core';
import { NotifyMessageService } from 'src/app/services/notify-message.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ProductListComponent } from './product-list.component';


@Injectable({
    providedIn: 'root'
})
export class ProductInsertService {

    private __productListComponent: ProductListComponent;

    constructor(private notifyMessage: NotifyMessageService) {}

    set productListComponent(value: ProductListComponent) {
        this.__productListComponent = value;
    }
    showModalInsert() {
        this.__productListComponent.productNewModel.showModal();
    }

    onInsertSuccess($event: any) {
        this.notifyMessage.success('Produto cadastrado com sucesso');
        this.__productListComponent.getProducts();
    }

    onInsertError($event: HttpErrorResponse) {
        this.notifyMessage.error('Erro ao cadastrar Produto');
        console.log($event);
    }
}
