import {
  ChatGroupListComponent
} from './components/pages/chat-group/chat-group-list/chat-group-list.component';
import {
  ProductPhotoManagerComponent
} from './components/pages/product-photo/product-photo-manager/product-photo-manager.component';
import {
  NgModule
} from '@angular/core';
import {
  Routes,
  RouterModule
} from '@angular/router';
import {
  LoginComponent
} from './components/pages/login/login.component';
import {
  UserListComponent
} from './components/pages/user/user-list/user-list.component';
import {
  AuthGuard
} from './guards/auth.guard';

import {
  ProductCategoryListComponent
} from './components/pages/product-category/product-category-list/product-category-list.component';
import {
  ProductListComponent
} from './components/pages/product/product-list/product-list.component';
import {
  ProductInputListComponent
} from './components/pages/product-input/product-input-list/product-input-list.component';
import {
  ProductOutputListComponent
} from './components/pages/product-output/product-output-list/product-output-list.component';
import {
  UserProfileComponent
} from './components/pages/user-profile/user-profile.component';


const routes: Routes = [{
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'users/list',
    component: UserListComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'profile',
    component: UserProfileComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'categories',
    loadChildren: './components/pages/category/category.module#CategoryModule',
    canActivate: [AuthGuard]
  },
  {
    path: 'products',
    loadChildren: './components/pages/product-category/product-category.module#ProductCategoryModule',
    canActivate: [AuthGuard]
  },
  {
    path: 'products',
    loadChildren: './components/pages/product/product.module#ProductModule',
    canActivate: [AuthGuard]
  },
  {
    path: 'inputs/list',
    component: ProductInputListComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'outputs/list',
    component: ProductOutputListComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'products/:product/photos/manager',
    component: ProductPhotoManagerComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'chat_groups/list',
    component: ChatGroupListComponent,
    canActivate: [AuthGuard]
  },
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
  ],
  declarations: [],
  exports: [
    RouterModule
  ],
  providers: [
    AuthGuard
  ]
})


export class AppRoutingModule {}
