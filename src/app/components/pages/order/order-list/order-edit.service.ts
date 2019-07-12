import {
    Injectable
} from '@angular/core';
import {
    NotifyMessageService
} from 'src/app/services/notify-message.service';
import {
    HttpErrorResponse
} from '@angular/common/http';
import { OrderListComponent } from './order-list.component';


@Injectable({
    providedIn: 'root'
})
export class OrderEditService {

    private __orderListComponent: OrderListComponent;

    constructor(private notifyMessage: NotifyMessageService) {}

    set orderListComponent(value: OrderListComponent) {
        this.__orderListComponent = value;
    }
    showModalEdit(orderId: number) {
        this.__orderListComponent.orderEditModal.showModal(orderId);
    }

    onEditSuccess($event: any) {
        this.notifyMessage.success('Pedido editado com sucesso');
        this.__orderListComponent.getOrders();
    }

    onEditError($event: HttpErrorResponse) {
        this.notifyMessage.error('Erro ao editar pedido, favor tente mais tarde');
        console.log($event);
    }
}
