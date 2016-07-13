import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {User} from '../Models/user';
import {RouteParams} from '@angular/router-deprecated';
import {UserService} from '../Services/user.service';
import {Router} from '@angular/router-deprecated';
import {MDL} from '../Directives/MDL'


@Component({
  selector: 'user-detail',
  directives: [MDL],
  templateUrl: 'app/Components/user-detail.component.html',
  styleUrls: ['app/Components/user-detail.component.css']
})

export class UserDetailComponent implements OnInit {
  @Input() user:User;
  @Output() close = new EventEmitter();
  error:any;
  navigated = false;

  constructor(private router: Router,
              private userService: UserService,
              private routeParams: RouteParams) {
  }

  ngOnInit() {
    if (this.routeParams.get('id') !== null) {
      let id = this.routeParams.get('id');
      this.navigated = true;
      this.userService.getUser(id)
        .subscribe(user => {
          if (user._id){
            this.user = user;
          } else {
            this.router.navigate(['Users']);
          }
        });
    } else {
      this.router.navigate(['Users']);
    }
  }

  save() {
    this.userService
      .save(this.user)
      .subscribe(user => {
          this.user = user;
          this.goBack(user);
        },
        error => console.log(error)
      )
  }

  delete() {
    this.userService
      .delete(this.user)
      .subscribe(res => {
          this.goBack();
        },
        error => console.log(error)
      )
  }

  goBack(savedUser:User = null) {
    this.close.emit(savedUser);
    if (this.navigated) {
      window.history.back();
    }
  }

}
