import {Component} from '@angular/core';
import {User} from './user';
import {UserDetailComponent} from './user-detail.component';
import {UserService} from './user.service';
/*import {OnInit} from "../node_modules/@angular/core/src/metadata/lifecycle_hooks";*/


@Component({
    selector: 'my-app',
    template: `
      <h1>{{title}}</h1>
      <h2>My users</h2>
      <ul class="users">
        <li *ngFor="let user of users"
          [class.selected]="user === selectedUser"
          (click)="onSelect(user)">
          <span class="badge">{{user.id}}</span> {{user.name}}
        </li>
      </ul>
      <my-user-detail [user]="selectedUser"></my-user-detail>
    `,
    directives: [UserDetailComponent],
    providers: [UserService]
})

export class AppComponent implements OnInit {
  title = 'List of Users';
  users: User[];
  selectedUser: User;

  constructor (private userService: UserService) {}

  getUsers() {
    this.userService.getUsers().then(users => this.users = users);
  }

  ngOnInit() {
    this.getUsers();
  }

  onSelect(user: User) { this.selectedUser = user; }

}
