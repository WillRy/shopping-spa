import { CategoryHttpService } from './../../../../services/http/category-http.service';
import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  ViewChild,
  Input
} from '@angular/core';
import {
  HttpErrorResponse} from '@angular/common/http';
import {
  ModalComponent
} from 'src/app/components/bootstrap/modal/modal.component';
import {
  Category
} from 'src/app/model';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'category-delete-modal',
  templateUrl: './category-delete-modal.component.html',
  styleUrls: ['./category-delete-modal.component.css']
})
export class CategoryDeleteModalComponent implements OnInit {


  // tslint:disable-next-line: no-output-on-prefix
  @Output() onSuccess: EventEmitter < any > = new EventEmitter < any > ();
  // tslint:disable-next-line: no-output-on-prefix
  @Output() onError: EventEmitter < HttpErrorResponse > = new EventEmitter < HttpErrorResponse > ();

  @ViewChild(ModalComponent)
  modal: ModalComponent;

  category: Category = null;


  _categoryId: number;

  constructor(private categoryHttp: CategoryHttpService) {}

  ngOnInit() {}



  destroy() {
    this.categoryHttp.destroy(this._categoryId)
      .subscribe(
        (category) => {
          this.onSuccess.emit(category);
          this.modal.hide();

        },
        error => {
          this.onError.emit(error);
        });
    return false;
  }

  showModal(categoryId) {
    this._categoryId = categoryId;
    this.getCategory();
    this.modal.show();
  }

  getCategory() {
    this.categoryHttp.get(this._categoryId).subscribe(category => this.category = category);
  }

  hideModal($event) {
    this.modal.hide();
  }
}
