import {Component, OnInit} from '@angular/core';
import {Http, Jsonp} from '@angular/http';
import {User} from '../Models/user';
import {UserDetailComponent} from './user-detail.component';
import {UserService} from '../Services/user.service';
import {Router} from '@angular/router-deprecated';

@Component({
  selector: 'user-list',
  templateUrl: 'app/Components/user-list.component.html',
  directives: [UserDetailComponent],
  providers: [UserService]
})

export class UsersComponent implements OnInit {
  title = 'Users';
  users: User[];
  error: any;

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

  ngOnInit() {
    this.getUsers();
  }

  gotoDetail(user:User) {
    this.router.navigate(['UserDetail', {id: user._id}]);
  }
}
