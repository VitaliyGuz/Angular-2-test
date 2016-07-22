import { Component } from '@angular/core';
import { UserService } from './Services/user.service';
import { UsersComponent } from './Components/user-list.component';
import { RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS } from '@angular/router-deprecated';
import { UserDetailComponent } from "./Components/user-detail.component";
import { LoginComponent } from "./Components/login.component";
import { MDL } from "./Directives/MDL";


@Component({
  selector: 'my-app',
  template: `
    <router-outlet></router-outlet>
  `,
  directives: [
    UsersComponent,
    ROUTER_DIRECTIVES,
    MDL
  ],
  providers: [
    UserService,
    ROUTER_PROVIDERS
  ]
})

@RouteConfig([
  {
    path: '/login',
    name: 'Login',
    component: LoginComponent
  },
  {
    path: '/detail/:id',
    name: 'UserDetail',
    component: UserDetailComponent,

  },
  {
    path: '/users',
    name: 'Users',
    component: UsersComponent,
    useAsDefault: true
  }
])

export class AppComponent { }
