import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { UserService } from '../user.service';
import { User } from '../user.model';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit, OnDestroy {
  user: User;
  numberOfUsers: number;
  firstname: string;
  lastname: string;
  username: string;
  usersSubscription: Subscription;
  users: User[];
  buttonLabel: string;

  constructor(private userService: UserService) {
    this.userService.usersObservable.subscribe(
      data => {
        this.users = data;
      },
      error => {
        console.error(error);
      }
    );
  }


  onEditUser() {
    console.info("onEditUser()...");
    //TODO
  }

  ngOnInit() {
    this.onGetAllUsers();
    this.buttonLabel = 'Add User';
    this.numberOfUsers = this.userService.users.length;
    this.userService.getAllUsers();
    this.userService.usersObservable.subscribe(
      data => {
        this.users = data;
      },
      error => {
        console.error(error);
      }
    );
  }

  /**
   * Send a request to the service to add a new user
   */
  onAddUser() {
    console.info('onAddUser()...');
    let id = this.generateRandomId();
    if(this.username === undefined || this.username === null) {
      this.username = (this.firstname + this.lastname).toLowerCase();
    }
    this.user = new User(id,this.firstname,this.lastname,this.username);
    this.userService.addUser(this.firstname, this.lastname, this.username).subscribe(
      data => {
        console.info(data);
        this.users = this.onGetAllUsers();
        this.userService.updateUsers(this.users);
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

  onGetAllUsers(): User[] {
    console.info("getting all users...");
    this.usersSubscription = this.userService.getAllUsers().subscribe(
      (data: any) => {
        this.userService.users = data;
        //this.users = this.userService.users;
        this.numberOfUsers = this.userService.users.length;
        console.info(data);
        this.resetUser();
        return this.users;
      }
    );
    return this.userService.users;
  }

  ngOnDestroy() {
    this.usersSubscription.unsubscribe();
  }

  private resetUser() {
    this.firstname = null;
    this.lastname = null;
    this.username = null;
  }
}
