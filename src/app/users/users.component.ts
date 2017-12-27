import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { UserService } from './user.service';
import { User } from './user.model';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit, OnDestroy {

  numberOfUsers: number;
  firstname: string;
  lastname: string;
  username: string;
  usersSubscription: Subscription;
  users: User[];

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.onGetAllUsers();
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
    this.userService.addUser(this.firstname, this.lastname, this.username).subscribe(
      data => {
        console.info(data);
        this.onGetAllUsers();
      },
      error => {
        console.error('An error occurred while attempting to save a new user:' + error);
      }
    );
  }

  private generateRandomId() {
    let randomId: string = Math.random().toString(36).slice(2);
    return randomId;
  }

  onGetAllUsers() {
    console.info("getting all users...");
    this.usersSubscription = this.userService.getAllUsers().subscribe(
      (data: any) => {
        this.userService.users = data;
        this.users = this.userService.users;
        console.info(data);
      }
    );
  }

  ngOnDestroy() {
    this.usersSubscription.unsubscribe();
  }

}
