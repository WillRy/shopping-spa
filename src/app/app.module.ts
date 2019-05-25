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

import { UserListComponent } from './components/pages/user/user-list/user-list.component';
import { UserNewModalComponent } from './components/pages/user/user-new-modal/user-new-modal.component';
import { UserEditModalComponent } from './components/pages/user/user-edit-modal/user-edit-modal.component';
import { UserDeleteModalComponent } from './components/pages/user/user-delete-modal/user-delete-modal.component';
import { ProductCategoryListComponent } from './components/pages/product-category/product-category-list/product-category-list.component';
import { ProductCategoryNewComponent } from './components/pages/product-category/product-category-new/product-category-new.component';
// tslint:disable-next-line: max-line-length
import { ProductCategoryDeleteModalComponent } from './components/pages/product-category/product-category-delete-modal/product-category-delete-modal.component';
import {JwtModule, JWT_OPTIONS} from '@auth0/angular-jwt';
import { RefreshTokenInterceptorService } from './services/refresh-token-interceptor.service';
import { AppRoutingModule } from './app-routing.module';
import { ProductInputListComponent } from './components/pages/product-input/product-input-list/product-input-list.component';
import { ProductInputNewModalComponent } from './components/pages/product-input/product-input-new-modal/product-input-new-modal.component';
import { ProductInputFormComponent } from './components/pages/product-input/product-input-form/product-input-form.component';
// tslint:disable-next-line: max-line-length
import { ProductInputSearchFormComponent } from './components/pages/product-input/product-input-search-form/product-input-search-form.component';
import { Select2Module } from 'ng2-select2';
import { ProductOutputListComponent } from './components/pages/product-output/product-output-list/product-output-list.component';
// tslint:disable-next-line: max-line-length
import { ProductOutputNewModalComponent } from './components/pages/product-output/product-output-new-modal/product-output-new-modal.component';
import { ProductOutputFormComponent } from './components/pages/product-output/product-output-form/product-output-form.component';
// tslint:disable-next-line: max-line-length
import { ProductOutputSearchFormComponent } from './components/pages/product-output/product-output-search-form/product-output-search-form.component';
import { UserFormComponent } from './components/pages/user/user-form/user-form.component';
import { ProductPhotoManagerComponent } from './components/pages/product-photo/product-photo-manager/product-photo-manager.component';
import { ProductPhotoUploadComponent } from './components/pages/product-photo/product-photo-upload/product-photo-upload.component';
// tslint:disable-next-line: max-line-length
import { ProductPhotoEditModalComponent } from './components/pages/product-photo/product-photo-edit-modal/product-photo-edit-modal.component';
// tslint:disable-next-line: max-line-length
import { ProductPhotoDeleteModalComponent } from './components/pages/product-photo/product-photo-delete-modal/product-photo-delete-modal.component';
import { UserProfileComponent } from './components/pages/user-profile/user-profile.component';
import { PhoneNumberAuthModalComponent } from './components/commom/phone-number-auth-modal/phone-number-auth-modal.component';
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
    UserListComponent,
    UserNewModalComponent,
    UserEditModalComponent,
    UserDeleteModalComponent,
    ProductCategoryListComponent,
    ProductCategoryNewComponent,
    ProductCategoryDeleteModalComponent,
    ProductInputListComponent,
    ProductInputNewModalComponent,
    ProductInputFormComponent,
    ProductInputSearchFormComponent,
    ProductOutputListComponent,
    ProductOutputNewModalComponent,
    ProductOutputFormComponent,
    ProductOutputSearchFormComponent,
    UserFormComponent,
    ProductPhotoManagerComponent,
    ProductPhotoUploadComponent,
    ProductPhotoEditModalComponent,
    ProductPhotoDeleteModalComponent,
    UserProfileComponent,
    PhoneNumberAuthModalComponent,
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
    Select2Module,
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
