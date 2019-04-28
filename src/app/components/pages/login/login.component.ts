import {
  HttpClient
} from '@angular/common/http';
import {
  Component,
  OnInit
} from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  credentials = {
    email: '',
    password: ''
  };

  constructor(private http: HttpClient) {}

  ngOnInit() {}

  submit() {
    this.http.post('http://localhost:8000/api/login', this.credentials)
      .subscribe((data) => console.log(data),
        error => console.log(error));
    return false;
  }
}
