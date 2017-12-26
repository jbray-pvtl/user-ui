import { Injectable } from '@angular/core';

import { User } from './user.model';

@Injectable()
export class UserService {

  users: User[] = [];

  constructor() { }

  addUser(user: User) {
    console.info("service.addUser(user)...");
    this.users.push(user);
  }

  deleteUser(id: string) {
    console.info("service.deleteUser(id)...");
  }

}
