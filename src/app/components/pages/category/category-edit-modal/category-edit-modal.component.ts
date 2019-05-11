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
import { FormGroup, FormBuilder } from '@angular/forms';


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


  _categoryId: number;

  form: FormGroup;

  constructor(private categoryHttp: CategoryHttpService, private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      name: '',
      active: true
    });
  }

  ngOnInit() {}

  @Input()
  set categoryId(value) {
    this._categoryId = value;
    if (this._categoryId) {
      this.categoryHttp.get(this._categoryId).subscribe(category => this.form.patchValue(category));
    }
  }

  submit() {
    this.categoryHttp.update(this._categoryId, this.form.value)
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
