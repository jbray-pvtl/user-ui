import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { User } from './user.model';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class UserService {
  usersSubject = new BehaviorSubject<User[]>([]);
  usersObservable = this.usersSubject.asObservable();
  users: User[] = [];
  selectedUserSubject = new Subject<User>();

  /**
   * index passed from the user list
   */
  userIndex = new Subject<number>();
  selectedUserObservable = this.selectedUserSubject.asObservable();
  selectedUser: User;
  editMode = false;
  editModeSubject = new Subject<boolean>();
  //rootURL = 'https://jbray-user.cfapps.io'; //'http://localhost:8080';
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
    return this.httpClient.get(this.rootURL + '/user/' + id);
  }

  updateUser(id: string, fname: string, lname: string, uname: string) {
    console.info('updateUser()...');
    return this.httpClient.put(this.rootURL + '/user/' + id + '/' + fname + '/' + lname + '/' + uname, {});
  }

  getAllUsers() {
    console.info("getAllUsers()...");
    this.usersObservable = this.httpClient.get<User[]>(this.rootURL + '/users');
    this.usersObservable.subscribe(
      (data: any) => {
        this.users = data;
        this.updateUsers(this.users);
        console.info(this.users);
      }
    );
    return this.usersObservable;
  }

  updateUsers(users: User[]) {
    this.usersSubject.next(users);
  }

}
