import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { User } from './user';
import {Observable} from 'rxjs/Observable';
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
  private handleError(error: any) {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}
