import { AuthService } from './services/auth.service';
import {
  BrowserModule
} from '@angular/platform-browser';
import {
  NgModule
} from '@angular/core';
import {
  AppComponent
} from './app.component';
import {
  LoginComponent
} from './components/pages/login/login.component';
import {
  FormsModule, ReactiveFormsModule
} from '@angular/forms';
import {
  HttpClientModule, HTTP_INTERCEPTORS
} from '@angular/common/http';
import {
  NgxPaginationModule
} from 'ngx-pagination';

// tslint:disable-next-line: max-line-length
import {JwtModule, JWT_OPTIONS} from '@auth0/angular-jwt';
import { RefreshTokenInterceptorService } from './services/refresh-token-interceptor.service';
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared.module';
import { environment } from 'src/environments/environment';

export function jwtFactory(authService: AuthService) {
  return {
    tokenGetter: () => {
      return authService.getToken();
    },
    whitelistedDomains: [
      new RegExp(`${environment.api.host}`),
      new RegExp('http://localhost:8000/*'),
      new RegExp('http://192.168.25.7:8000/*')
    ]
  };
}
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    NgxPaginationModule,
    JwtModule.forRoot({
      jwtOptionsProvider: {
        provide: JWT_OPTIONS,
        useFactory: jwtFactory,
        deps: [AuthService]
      }
    }),

  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: RefreshTokenInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
