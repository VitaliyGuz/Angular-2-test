import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { User } from '../Models/user';
import {Observable} from '../../node_modules/rxjs/Observable';
import 'rxjs/Rx';
import 'rxjs/add/operator/map';

@Injectable()
export class UserService {
  private usersUrl = 'https://rocky-citadel-19338.herokuapp.com/api/users';  // URL to web api
  constructor(private http: Http) { }
  getUsers(): Observable<User[]> {
    return this.http.get(this.usersUrl)
      .map(res => res.json());
  }
  getUser(id: string): Observable<User> {
    let url = `${this.usersUrl}/${id}`;
    return this.http.get(url)
      .map(res => res.json());
  }
  save(user: User): Observable<User>  {
    if (user._id) {
      return this.put(user);
    }
    return this.post(user);
  }
  delete(user: User) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let url = `${this.usersUrl}/${user._id}`;
    return this.http
      .delete(url, headers)
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
          //this.loggedIn = true;
        }

        return res.success;
      });
  }

  logout() {
    localStorage.removeItem('auth_token');
    //this.loggedIn = false;
  }


  // Add new User
  private post(user: User): Observable<User> {
    let headers = new Headers({
      'Content-Type': 'application/json'});
    return this.http
      .post(this.usersUrl, JSON.stringify(user), {headers: headers})
      .map(res => res.json());
  }
  // Update existing User
  private put(user: User) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let url = `${this.usersUrl}/${user._id}`;
    return this.http
      .put(url, JSON.stringify(user), {headers: headers})
      .map(res => res.json());
  }
}
