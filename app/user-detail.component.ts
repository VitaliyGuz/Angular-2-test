import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {User} from './user';
import {RouteParams} from '@angular/router-deprecated';
import {UserService} from './user.service';

@Component({
  selector: 'my-user-detail',
  template: `
    <div *ngIf="user">
    <h2>{{user.name}} details!</h2>
    <div><label>id: </label>{{user._id}}</div>
    <div>
      <label>name: </label>
    <input [(ngModel)]="user.name" placeholder="name"/>
      </div>
    </div>
    <button (click)="goBack()">Back</button>
    <button (click)="save()">Save</button>
  `
})

export class UserDetailComponent implements OnInit {
  @Input() user:User;
  @Output() close = new EventEmitter();
  error:any;
  navigated = false;

  constructor(private userService:UserService,
              private routeParams:RouteParams) {
  }

  ngOnInit() {
    if (this.routeParams.get('id') !== null) {
      let id = this.routeParams.get('id');
      this.navigated = true;
      this.userService.getUser(id)
        .subscribe(user => this.user = user);
    } else {
      this.navigated = false;
      this.user = new User();
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

  goBack(savedUser:User = null) {
    this.close.emit(savedUser);
    if (this.navigated) {
      window.history.back();
    }
  }

}
