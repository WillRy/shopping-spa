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

  category = null;


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
        console.log(error);
      });
    }
  }

  destroy() {
    const token = window.localStorage.getItem('token');
    this.http.delete(`http://localhost:8000/api/categories/${this._categoryId}`, {
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
