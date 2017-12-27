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

  addUser(user: User) {
    console.info("service.addUser(user)...");
    this.users.push(user);
    this.httpClient.post(this.rootURL + '/user/jane/doe/janedoe', {}).subscribe(
      data => {
        console.info(data);
      },
      error => {
        console.error('An error occurred while attempting to save a new user:' + error);
      }
    );
    this.getAllUsers();
  }

  deleteUser(id: string) {
    console.info("service.deleteUser(id)...");
    this.httpClient.delete(this.rootURL + '/user/' + id).subscribe(
      data => {
        console.info(data);
      },
      error => {
        console.error('Deletion error on ' + id);
      }
    );
  }

  getUser(id: string) {
    console.info("getUser(id)...");
  }

  getAllUsers() {
    
    console.info("getAllUsers()...");
    this.usersObservable = this.httpClient.get<User[]>(this.rootURL + '/users');
  }

}
