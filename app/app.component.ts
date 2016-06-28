import { Component } from '@angular/core';
import { UserService } from './user.service';
import { UsersComponent } from './user-list.component';
import { RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS } from '@angular/router-deprecated';
import {UserDetailComponent} from "./user-detail.component";


@Component({
  selector: 'my-app',
  template: `
    <h1>{{title}}</h1>
    <nav>
      <a [routerLink]="['Users']">Users</a>
    </nav>
    <router-outlet></router-outlet>
  `,
  directives: [
    UsersComponent,
    ROUTER_DIRECTIVES
  ],
  providers: [
    UserService,
    ROUTER_PROVIDERS
  ]
})

@RouteConfig([
  {
    path: '/detail/:id',
    name: 'UserDetail',
    component: UserDetailComponent
  },
  {
    path: '/users',
    name: 'Users',
    component: UsersComponent,
    useAsDefault: true
  }
])

export class AppComponent {
  title = 'List of users';
}
