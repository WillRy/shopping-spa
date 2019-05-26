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
import { ProductPhotoManagerComponent } from './components/pages/product-photo/product-photo-manager/product-photo-manager.component';
import { ProductPhotoUploadComponent } from './components/pages/product-photo/product-photo-upload/product-photo-upload.component';
// tslint:disable-next-line: max-line-length
import { ProductPhotoEditModalComponent } from './components/pages/product-photo/product-photo-edit-modal/product-photo-edit-modal.component';
// tslint:disable-next-line: max-line-length
import { ProductPhotoDeleteModalComponent } from './components/pages/product-photo/product-photo-delete-modal/product-photo-delete-modal.component';
import { ChatGroupListComponent } from './components/pages/chat-group/chat-group-list/chat-group-list.component';
import { ChatGroupNewModalComponent } from './components/pages/chat-group/chat-group-new-modal/chat-group-new-modal.component';
import { ChatGroupFormComponent } from './components/pages/chat-group/chat-group-form/chat-group-form.component';
import { ChatGroupEditModalComponent } from './components/pages/chat-group/chat-group-edit-modal/chat-group-edit-modal.component';
import { ChatGroupDeleteModalComponent } from './components/pages/chat-group/chat-group-delete-modal/chat-group-delete-modal.component';
import { SharedModule } from './shared.module';

function jwtFactory(authService: AuthService) {
  return {
    tokenGetter: () => {
      return authService.getToken();
    },
    whitelistedDomains: [
      new RegExp('localhost:8000/*')
    ]
  };
}
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ProductPhotoManagerComponent,
    ProductPhotoUploadComponent,
    ProductPhotoEditModalComponent,
    ProductPhotoDeleteModalComponent,
    ChatGroupListComponent,
    ChatGroupNewModalComponent,
    ChatGroupFormComponent,
    ChatGroupEditModalComponent,
    ChatGroupDeleteModalComponent
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
