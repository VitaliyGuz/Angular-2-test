import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { User } from '../Models/user';
import { Observable } from '../../node_modules/rxjs/Observable';
import 'rxjs/Rx';
import 'rxjs/add/operator/map';

@Injectable()
export class UserService {
  private usersUrl = 'https://rocky-citadel-19338.herokuapp.com/api/users';  // URL to web api
  private headers: Headers;
  constructor(private http: Http) {
    this.headers = new Headers();
    this.setToken();
  }
  setToken(){
    this.headers.set('X-Access-Token', localStorage.getItem('auth_token'));
    this.headers.set('Content-Type', 'application/json');
  }
  getUsers(): Observable<User[]> {
    return this.http.get(this.usersUrl, { headers: this.headers })
      .map(res => res.json());
  }
  getUser(id: string): Observable<User> {
    let url = `${this.usersUrl}/${id}`;
    return this.http.get(url, { headers: this.headers })
      .map(res => res.json());
  }
  save(user: User): Observable<User>  {
    if (user._id) {
      return this.put(user);
    }
    return this.post(user);
  }
  delete(user: User) {
    let url = `${this.usersUrl}/${user._id}`;
    return this.http
      .delete(url, { headers: this.headers })
      .map(res => res.json());
  }

  login(name: string, password: string) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    return this.http
      .post(
        'https://rocky-citadel-19338.herokuapp.com/api/authenticate',
        JSON.stringify({ name, password }),
        { headers }
      )
      .map(res => res.json())
      .map((res) => {
        if (res.success) {
          localStorage.setItem('auth_token', res.token);
          this.setToken();
          //this.loggedIn = true;
        }
        return res.success;
      });
  }

  logout() {
    localStorage.removeItem('auth_token');
    this.setToken();
    //this.loggedIn = false;
  }


  // Add new User
  private post(user: User): Observable<User> {
    return this.http
      .post(this.usersUrl, JSON.stringify(user), { headers: this.headers })
      .map(res => res.json());
  }
  // Update existing User
  private put(user: User) {
    let url = `${this.usersUrl}/${user._id}`;
    return this.http
      .put(url, JSON.stringify(user), { headers: this.headers })
      .map(res => res.json());
  }
}

export function isLoggedIn() {
  return localStorage.getItem('auth_token') ? true : false;
}
