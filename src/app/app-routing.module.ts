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
    path: 'products',
    loadChildren: './components/pages/product/product.module#ProductModule',
    canActivate: [AuthGuard]
  },
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
