import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { User } from './user.model';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class UserService {
  usersObservable: Observable<User[]>;
  users: User[] = [];
  rootURL = 'http://localhost:8080';

  constructor(private httpClient: HttpClient) { }

  addUser(fname: string, lname: string, uname: string) {
    console.info("service.addUser(user)...");
    return this.httpClient.post(this.rootURL + '/user/' + fname + '/' + lname + '/' + uname, {});
  }

  deleteUser(id: string) {
    console.info("service.deleteUser(id)...");
    return this.httpClient.delete(this.rootURL + '/user/' + id);
  }

  getUser(id: string) {
    console.info("getUser(id)...");
  }

  getAllUsers() {
    console.info("getAllUsers()...");
    this.usersObservable = this.httpClient.get<User[]>(this.rootURL + '/users');
    return this.usersObservable;
  }

}
