import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { NgForm } from '@angular/forms';

import { UserService } from './user.service';
import { User } from './user.model';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit, OnDestroy {

  numberOfUsers: number;
  usersSubscription: Subscription;
  users: User[];
  selectedUser: User;

  constructor(private userService: UserService) {
    this.userService.usersObservable.subscribe(
      data => {
        this.users = data;
        this.numberOfUsers = this.users.length;
      },
      error => {
        console.error(error);
      }
    );
    this.userService.selectedUserObservable.subscribe(
      user => {
        this.selectedUser = user;
      },
      error => {
        console.error('User not found! ' + error);
      }
    );
  }

  ngOnInit() {
    this.usersSubscription = this.userService.usersObservable.subscribe(
      data => {
        this.users = data;
      },
      error => {}
    );
  }

  ngOnDestroy() {
    this.usersSubscription.unsubscribe();
  }

}
