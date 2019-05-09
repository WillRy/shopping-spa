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
import { Category } from 'src/app/model';


@Component({
  // tslint:disable-next-line: component-selector
  selector: 'category-edit-modal',
  templateUrl: './category-edit-modal.component.html',
  styleUrls: ['./category-edit-modal.component.css']
})
export class CategoryEditModalComponent implements OnInit {


  // tslint:disable-next-line: no-output-on-prefix
  @Output() onSuccess: EventEmitter < any > = new EventEmitter < any > ();
  // tslint:disable-next-line: no-output-on-prefix
  @Output() onError: EventEmitter < HttpErrorResponse > = new EventEmitter < HttpErrorResponse > ();

  @ViewChild(ModalComponent)
  modal: ModalComponent;

  category: Category = {
    name: '',
    active: true
  };


  _categoryId: number;

  constructor(private categoryHttp: CategoryHttpService) {}

  ngOnInit() {}

  @Input()
  set categoryId(value) {
    this._categoryId = value;
    if (this._categoryId) {
      this.categoryHttp.get(this._categoryId).subscribe(response => this.category = response);
    }
  }

  submit() {
    this.categoryHttp.update(this._categoryId, this.category)
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
  showModal() {
    this.modal.show();
  }
  hideModal($event) {
    this.modal.hide();
  }



}
