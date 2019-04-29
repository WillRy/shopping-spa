import {
  HttpClient
} from '@angular/common/http';
import {
  Component,
  OnInit
} from '@angular/core';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {

  categories = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    const token = window.localStorage.getItem('token');
    this.http.get < Array<any> > ('http://localhost:8000/api/categories', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }).subscribe(data => {
      this.categories = data;
      console.log(this.categories);
    });
  }

}
