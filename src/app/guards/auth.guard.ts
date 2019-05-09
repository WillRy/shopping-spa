import {
  AuthService
} from './../services/auth.service';
import {
  Injectable
} from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router
} from '@angular/router';
import {
  Observable
} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable < boolean > | Promise < boolean > | boolean {
    const isAuth =  this.authService.isAuth();
    this.redirectifUnauthenticated(isAuth);
    return isAuth;
  }

  private redirectifUnauthenticated(isAuth: boolean) {
    if (!isAuth) {
      this.router.navigate(['login']);
    }
  }
}
