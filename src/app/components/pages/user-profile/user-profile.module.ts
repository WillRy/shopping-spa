import {
    UserProfileComponent
} from './user-profile.component';
import {
    UserProfileRoutingModule
} from './user-profile-routing.module';
import {
    NgModule
} from '@angular/core';
import {
    CommonModule
} from '@angular/common';
import {
    FormsModule,
    ReactiveFormsModule
} from '@angular/forms';
import {
    HttpClientModule
} from '@angular/common/http';
import {
    SharedModule
} from 'src/app/shared.module';
import {
    NgxPaginationModule
} from 'ngx-pagination';
import { PhoneNumberAuthModalComponent } from '../../commom/phone-number-auth-modal/phone-number-auth-modal.component';



@NgModule({
    imports: [
        CommonModule,
        UserProfileRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        SharedModule,
        NgxPaginationModule,


    ],
    declarations: [
        UserProfileComponent
    ],
    exports: [],
    providers: []
})


export class UserProfileModule {}
