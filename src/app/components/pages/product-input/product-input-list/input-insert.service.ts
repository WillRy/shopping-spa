import {
    Injectable
} from '@angular/core';
import {
    ProductInputListComponent
} from './product-input-list.component';
import {
    NotifyMessageService
} from 'src/app/services/notify-message.service';
import {
    HttpErrorResponse
} from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class InputInsertService {

    private _productInputList: ProductInputListComponent;

    constructor(private notifyMessage: NotifyMessageService) {}

    set productInputList(value) {
        this._productInputList = value;
    }

    showModalInsert() {
        this._productInputList.inputNewModal.showModal();
    }

    onInsertSuccess($event) {
        this.notifyMessage.success('Entrada registrada com sucesso!');
        this._productInputList.getInputs();
    }

    onInsertError($event: HttpErrorResponse) {
        this.notifyMessage.error('Erro ao registrar entrada');
        console.log($event);
    }
}
