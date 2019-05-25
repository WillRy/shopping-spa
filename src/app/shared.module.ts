import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ModalComponent } from './components/bootstrap/modal/modal.component';
import { NavbarComponent } from './components/bootstrap/navbar/navbar.component';
import { SortColumnComponent } from './components/commom/sort-column/sort-column.component';
import { FieldErrorComponent } from './components/bootstrap/field-error/field-error.component';
import { IsInvalidDirective, IsInvalidControlDirective } from './directives/is-invalid.directive';
import { ListErrorComponent } from './components/bootstrap/list-error/list-error.component';
import { CardErrorComponent } from './components/bootstrap/card-error/card-error.component';
import { AuthGuard } from './guards/auth.guard';
import { AlertErrorComponent } from './components/bootstrap/alert-error/alert-error.component';
import { RouterModule } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';


@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    NgxPaginationModule
  ],
  declarations: [
    ModalComponent,
    NavbarComponent,
    SortColumnComponent,
    FieldErrorComponent,
    IsInvalidDirective,
    IsInvalidControlDirective,
    ListErrorComponent,
    CardErrorComponent,
    AlertErrorComponent,
  ],
  exports: [
    ModalComponent,
    NavbarComponent,
    SortColumnComponent,
    FieldErrorComponent,
    IsInvalidDirective,
    IsInvalidControlDirective,
    ListErrorComponent,
    CardErrorComponent,
    AlertErrorComponent
  ],
  providers: [
    AuthGuard
  ]
})


export class SharedModule {}
