import {
    Injectable
} from '@angular/core';
import {
    CategoryListComponent
} from './category-list.component';
import {
    NotifyMessageService
} from 'src/app/services/notify-message.service';
import {
    HttpErrorResponse
} from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})

export class CategoryDeleteService {

    private __categoryListComponent: CategoryListComponent;

    constructor(private notifyMessage: NotifyMessageService) {}

    set categoryListComponent(value: CategoryListComponent) {
        this.__categoryListComponent = value;
    }

    showModalDelete(categoryId: number) {
        this.__categoryListComponent.categoryId = categoryId;
        this.__categoryListComponent.categoryDeleteModal.showModal();
    }

    onDeleteSuccess() {
        this.notifyMessage.success('Categoria excluida com sucesso');
        this.__categoryListComponent.getCategories();
    }

    onDeleteError($event: HttpErrorResponse) {
        this.notifyMessage.error('Não foi possível excluir a categoria, verifique se a mesma não está sendo relacionada com produtos');
        console.log($event);
    }
}
