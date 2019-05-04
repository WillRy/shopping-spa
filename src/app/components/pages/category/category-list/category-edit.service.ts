import {
    CategoryListComponent
} from './category-list.component';
import {
    Injectable
} from '@angular/core';
import {
    NotifyMessageService
} from 'src/app/services/notify-message.service';
import {
    HttpErrorResponse
} from '@angular/common/http';


@Injectable({
    providedIn: 'root'
})
export class CategoryEditService {

    private __categoryListComponent: CategoryListComponent;

    constructor(private notifyMessage: NotifyMessageService) {}

    set categoryListComponent(value: CategoryListComponent) {
        this.__categoryListComponent = value;
    }
    showModalEdit(categoryId: number) {
        this.__categoryListComponent.categoryId = categoryId;
        this.__categoryListComponent.categoryEditModal.showModal();
    }

    onEditSuccess($event: any) {
        this.notifyMessage.success('Categoria editada com sucesso');
        this.__categoryListComponent.getCategories();
    }

    onEditError($event: HttpErrorResponse) {
        this.notifyMessage.error('Erro ao eeditar categoria, favor tente mais tarde');
        console.log($event);
    }
}
