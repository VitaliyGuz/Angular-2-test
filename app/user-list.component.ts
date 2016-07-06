import {Component, OnInit} from '@angular/core';
import {Http, Jsonp} from '@angular/http';
import {User} from './user';
import {UserDetailComponent} from './user-detail.component';
import {UserService} from './user.service';
import {Router} from '@angular/router-deprecated';


@Component({
  selector: 'user-list',
  template: `
      <h1>{{title}}</h1>
      <h2>My users</h2>
      <div *ngFor="let user of users"
        (click)="gotoDetail(user)" class="col-1-4">
        <h4> {{user.name}} </h4>
      </div>
      <button class="delete-button" (click)="delete(user, $event)">Delete</button>
    `,
  directives: [UserDetailComponent],
  providers: [UserService]
})

export class UsersComponent implements OnInit {
  title = 'List of Users';
  users:User[];
  selectedUser:User;
  error:any;

  constructor(private router:Router,
              private userService:UserService) {
  }

  getUsers() {
    this.userService.getUsers()
      .subscribe(
        users => this.users = users,
        error => console.log(error)
      );
  }

  delete(user:User, event:any) {
    event.stopPropagation();
    this.userService
      .delete(user)
      .subscribe(res => {
        this.users = this.users.filter(h => h !== user);
        if (this.selectedUser === user) {
          this.selectedUser = null;
        }
      }, error => console.log(error))

  }

  ngOnInit() {
    this.getUsers();
  }


  gotoDetail(user:User) {
    this.router.navigate(['UserDetail', {id: user._id}]);
  }

}
