import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  ViewChild,
  Input
} from '@angular/core';
import {
  HttpErrorResponse,
  HttpClient
} from '@angular/common/http';
import {
  ModalComponent
} from 'src/app/components/bootstrap/modal/modal.component';


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

  category = {
    name: ''
  };


  _categoryId: number;

  constructor(private http: HttpClient) {}

  ngOnInit() {}

  @Input()
  set categoryId(value) {
    const token = window.localStorage.getItem('token');
    this._categoryId = value;
    if (this._categoryId) {
      this.http.get < {
        data: any
      } > (`http://localhost:8000/api/categories/${value}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }).subscribe((response) => {
        this.category = response.data;
      }, (error) => {

      });
    }
  }

  submit() {
    const token = window.localStorage.getItem('token');
    this.http.put(`http://localhost:8000/api/categories/${this._categoryId}`, this.category, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
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
