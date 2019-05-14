import {
    Injectable
} from '@angular/core';
import {
    ProductOutputListComponent
} from './product-output-list.component';
import {
    NotifyMessageService
} from 'src/app/services/notify-message.service';
import {
    HttpErrorResponse
} from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class OutputInsertService {

    private _productOutputList: ProductOutputListComponent;

    constructor(private notifyMessage: NotifyMessageService) {}

    set productOutputList(value) {
        this._productOutputList = value;
    }

    showModalInsert() {
        this._productOutputList.outputNewModal.showModal();
    }

    onInsertSuccess($event) {
        this.notifyMessage.success('Saida registrada com sucesso!');
        this._productOutputList.getOutputs();
    }

    onInsertError($event: HttpErrorResponse) {
        this.notifyMessage.error('Erro ao registrar Saida');
        console.log($event);
    }
}
