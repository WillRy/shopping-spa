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
  AuthGuard
} from './guards/auth.guard';


const routes: Routes = [{
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'users',
    loadChildren: './components/pages/user/user.module#UserModule',
    canActivate: [AuthGuard]
  },
  {
    path: 'profile',
    loadChildren: './components/pages/user-profile/user-profile.module#UserProfileModule',
    canActivate: [AuthGuard]
  },
  {
    path: 'categories',
    loadChildren: './components/pages/category/category.module#CategoryModule',
    canActivate: [AuthGuard]
  },
  // {
  //   path: 'products',
  //   loadChildren: './components/pages/product-category/product-category.module#ProductCategoryModule',
  //   canActivate: [AuthGuard]
  // },

  {
    path: 'inputs',
    loadChildren: './components/pages/product-input/product-input.module#ProductInputModule',
    canActivate: [AuthGuard]
  },
  {
    path: 'outputs',
    loadChildren: './components/pages/product-output/product-output.module#ProductOutputModule',
    canActivate: [AuthGuard]
  },
  {
    path: 'products',
    children : [
      { path: '', loadChildren: './components/pages/product/product.module#ProductModule'},
      { path: ':product/photos/manager', loadChildren: './components/pages/product-photo/product-photo.module#ProductPhotoModule'},
      { path: ':product/categories/list', loadChildren: './components/pages/product-category/product-category.module#ProductCategoryModule'}
    ],
    canActivate: [AuthGuard]
  },
  // {
  //   path: 'products/:product/photos/manager',
  //   component: ProductPhotoManagerComponent,
  //   canActivate: [AuthGuard]
  // },
  {
    path: 'chat_groups',
    children : [
      { path: '', loadChildren: './components/pages/chat-group/chat-group.module#ChatGroupModule'},
      { path: ':chat_group/users/list', loadChildren: './components/pages/chat-group-user/chat-group-user.module#ChatGroupUserModule'},
      // tslint:disable-next-line: max-line-length
      { path: ':chat_group/link-invitations/list', loadChildren: './components/pages/chat-group-link-inv/chat-group-link-inv.module#ChatGroupLinkInvModule'},
    ],
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
