import { CategoryListComponent } from './category-list.component';
import {
    Injectable
} from '@angular/core';
import { NotifyMessageService } from 'src/app/services/notify-message.service';
import { HttpErrorResponse } from '@angular/common/http';


@Injectable({
    providedIn: 'root'
})
export class CategoryInsertService {

    private __categoryListComponent: CategoryListComponent;

    constructor(private notifyMessage: NotifyMessageService) {}

    set categoryListComponent(value: CategoryListComponent) {
        this.__categoryListComponent = value;
    }
    showModalInsert() {
        this.__categoryListComponent.categoryNewModal.showModal();
    }

    onInsertSuccess($event: any) {
        this.notifyMessage.success('Categoria cadastrada com sucesso');
        this.__categoryListComponent.getCategories();
    }

    onInsertError($event: HttpErrorResponse) {
        this.notifyMessage.error('Erro ao cadastrar categoria');
        console.log($event);
    }
}
