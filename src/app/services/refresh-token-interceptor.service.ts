import {
  AuthService
} from './auth.service';
import {
  Injectable
} from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpResponse,
  HttpErrorResponse,
  HttpResponseBase
} from '@angular/common/http';
import {
  Observable
} from 'rxjs';
import {
  tap
} from 'rxjs/internal/operators/tap';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RefreshTokenInterceptorService implements HttpInterceptor {

  constructor(private authService: AuthService, private router: Router) {}

  intercept(req: HttpRequest < any > , next: HttpHandler): Observable < HttpEvent < any >> {
    return next.handle(req).pipe(
      tap(
        (event: HttpEvent < any > ) => {
          this.setNewTokenIfResponseValid(event);
        },
        (eventError: HttpEvent < any > ) => {
          this.setNewTokenIfResponseValid(eventError);
          this.redirectToLoginIfUnauthenticated(eventError);
        })
    );
  }

  private setNewTokenIfResponseValid(event: HttpEvent < any > ) {
    if (event instanceof HttpResponseBase) {
      const authorizationHeader = event.headers.get('Authorization');
      if (authorizationHeader) {
        const token = authorizationHeader.split(' ')[1];
        this.authService.setToken(token);
      }
    }
  }

  private redirectToLoginIfUnauthenticated(eventError: HttpEvent < any > ) {
    if (eventError instanceof HttpErrorResponse && eventError.status === 401) {
      this.authService.setToken(null);
      window.location.href = 'login';
    }
  }
}
