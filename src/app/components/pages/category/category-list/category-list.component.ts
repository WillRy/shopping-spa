import {
  HttpClient
} from '@angular/common/http';
import {
  Component,
  OnInit,
  ViewChild
} from '@angular/core';
import {
  ModalComponent
} from 'src/app/components/bootstrap/modal/modal.component';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {

  categories = [];

  category = {
    name: ''
  };

  @ViewChild(ModalComponent)
  modal: ModalComponent;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.getCategories();
  }

  submit() {
    const token = window.localStorage.getItem('token');
    this.http.post('http://localhost:8000/api/categories', this.category, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      .subscribe((category) => {
        console.log(category);
        this.modal.hide();
        this.getCategories();
      });
    return false;
  }

  getCategories() {
    const token = window.localStorage.getItem('token');
    this.http.get < {
      data: Array < any >
    } > ('http://localhost:8000/api/categories', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }).subscribe(response => {
      this.categories = response.data;
      console.log(this.categories);
    });
  }

  showModal() {
    this.modal.show();
  }
  hideModal($event) {
    this.modal.hide();
  }
}
