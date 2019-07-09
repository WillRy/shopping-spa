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
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import fieldsOptions from '../category-form/category-fields-options';


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

  errors = {};

  constructor(private categoryHttp: CategoryHttpService, private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      name: ['', [Validators.required, Validators.maxLength(fieldsOptions.name.validationMessage.maxlength)]],
      active: true
    });
  }

  ngOnInit() {}

  submit() {
    this.categoryHttp.update(this._categoryId, this.form.value)
      .subscribe(
        (category) => {
          this.form.reset({name: ''});
          this.onSuccess.emit(category);
          this.modal.hide();
        },
        responseError => {
          if (responseError.status === 422) {
            this.errors = responseError.error.errors;
          }
          this.onError.emit(responseError);
        });
    return false;
  }

  showModal(categoryId) {
    this._categoryId = categoryId;
    this.getCategory();
    this.modal.show();
  }

  getCategory() {
    this.categoryHttp.get(this._categoryId).subscribe(category => this.form.patchValue(category));
  }

  hideModal($event) {
    this.modal.hide();
  }

  showErrors() {
    return Object.keys(this.errors).length !== 0;
  }

}
