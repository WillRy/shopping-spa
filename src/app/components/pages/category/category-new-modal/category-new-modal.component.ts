import {
  Component,
  OnInit,
  ViewChild,
  Output,
  EventEmitter
} from '@angular/core';
import {
  ModalComponent
} from 'src/app/components/bootstrap/modal/modal.component';
import {
  HttpErrorResponse
} from '@angular/common/http';
import {
  Category
} from 'src/app/model';
import {
  CategoryHttpService
} from 'src/app/services/http/category-http.service';
import {
  FormGroup,
  FormBuilder,
  Validators
} from '@angular/forms';
import fieldsOptions from '../category-form/category-fields-options';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'category-new-modal',
  templateUrl: './category-new-modal.component.html',
  styleUrls: ['./category-new-modal.component.css']
})
export class CategoryNewModalComponent implements OnInit {

  // tslint:disable-next-line: no-output-on-prefix
  @Output() onSuccess: EventEmitter < any > = new EventEmitter < any > ();
  // tslint:disable-next-line: no-output-on-prefix
  @Output() onError: EventEmitter < HttpErrorResponse > = new EventEmitter < HttpErrorResponse > ();

  @ViewChild(ModalComponent)
  modal: ModalComponent;


  form: FormGroup;
  errors = {};

  constructor(private categoryHttp: CategoryHttpService, private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      name: ['', [Validators.required, Validators.maxLength(fieldsOptions.name.validationMessage.maxlength)]],
      active: true
    });
  }

  ngOnInit() {}

  showModal() {
    this.modal.show();
  }
  hideModal($event) {
    this.modal.hide();
  }

  submit() {
    this.categoryHttp.create(this.form.value)
      .subscribe(
        (category) => {
          this.form.reset({
            name: '',
            active: true
          });
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

  showErrors() {
    return Object.keys(this.errors).length !== 0;
  }
}
