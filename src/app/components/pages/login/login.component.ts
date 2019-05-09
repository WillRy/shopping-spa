import { AuthService } from './../../../services/auth.service';
import {
  HttpClient
} from '@angular/common/http';
import {
  Component,
  OnInit
} from '@angular/core';
import {
  Router
} from '@angular/router';

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

  showMessageError = false;

  constructor(private http: HttpClient, private router: Router, private authService: AuthService) {}

  ngOnInit() {}

  submit() {
    // generics
    this.authService.login(this.credentials)
      .subscribe((data) => {
          this.router.navigate(['categories/list']);
        },
        responseError => {
          this.showMessageError = true;
        });
    return false;
  }
}
