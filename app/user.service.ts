import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { User } from './user';

@Injectable()
export class UserService {
  private usersUrl = 'app/users';  // URL to web api
  constructor(private http: Http) { }
  getUsers(): Promise<User[]> {
    return this.http.get(this.usersUrl)
      .toPromise()
      .then(response => response.json().data)
      .catch(this.handleError);
  }
  getUser(id: string) {
    return this.getUsers()
      .then(users => users.filter(user => user.id === id)[0]);
  }
  save(user: User): Promise<User>  {
    if (user.id) {
      return this.put(user);
    }
    return this.post(user);
  }
  delete(user: User) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let url = `${this.usersUrl}/${user.id}`;
    return this.http
      .delete(url, headers)
      .toPromise()
      .catch(this.handleError);
  }
  // Add new User
  private post(user: User): Promise<User> {
    let headers = new Headers({
      'Content-Type': 'application/json'});
    return this.http
      .post(this.usersUrl, JSON.stringify(user), {headers: headers})
      .toPromise()
      .then(res => res.json().data)
      .catch(this.handleError);
  }
  // Update existing User
  private put(user: User) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let url = `${this.usersUrl}/${user.id}`;
    return this.http
      .put(url, JSON.stringify(user), {headers: headers})
      .toPromise()
      .then(() => user)
      .catch(this.handleError);
  }
  private handleError(error: any) {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}
