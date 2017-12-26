import { Component, OnInit } from '@angular/core';

import { UserService } from './user.service';
import { User } from './user.model';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  numberOfUsers: number;
  firstname: string;
  lastname: string;
  username: string;

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.numberOfUsers = this.userService.users.length;
  }

  /**
   * Send a request to the service to add a new user
   */
  onAddUser() {
    console.info("onAddUser()...");
    let id = this.generateRandomId();
    if(this.username === undefined) {
      this.username = (this.firstname + this.lastname).toLowerCase();
    }
    let user = new User(id,this.firstname,this.lastname,this.username);
    this.userService.addUser(user);
  }

  private generateRandomId() {
    let randomId: string = Math.random().toString(36).slice(2);
    return randomId;
  }

}
