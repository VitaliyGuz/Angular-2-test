import { Component } from '@angular/core';
import { Router } from '@angular/router-deprecated';
import { MDL } from '../Directives/MDL'
import { UserService } from '../Services/user.service';

@Component({
  selector: 'login',
  directives: [MDL],
  templateUrl: 'app/Components/login.component.html',
  styleUrls: ['app/Components/login.component.css']
})
export class LoginComponent {
  name: string;
  password: string;

  constructor(private userService: UserService, private router: Router) {}

  onSubmit() {
    this.userService.login(this.name, this.password).subscribe((result) => {
      if (result) {
        this.router.navigate(['Users']);
      }
    });
  }
}
