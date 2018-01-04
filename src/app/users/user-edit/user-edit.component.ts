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
  id = '';
  firstname: string = null;
  lastname: string = null;
  username: string = null;
  usersSubscription: Subscription;
  users: User[];
  buttonLabel: string;
  editMode = false;
  selectedUser: User;
  addEdit: string;

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
    //this.onGetAllUsers();
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

    this.userService.selectedUserSubject.subscribe(
      user => {
        this.selectedUser = <User>user;
        this.id = user.id;
        this.firstname = user.firstname;
        this.lastname = user.lastname;
        this.username = user.username;
        console.info("in the edit component...");
        console.info(this.selectedUser);
      },
      error => {
        console.error(error);
      }
    );

    this.userService.editModeSubject.subscribe(
      editMode => {
        this.editMode = editMode;
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
    if(this.editMode) {
      console.info('onUpdateUser(...)...' + this.id);
      this.userService.updateUser(this.id, this.firstname, this.lastname, this.username).subscribe(
        data => {
          this.users = this.onGetAllUsers();
          this.userService.updateUsers(this.users);
        },
        error => {
          console.error(error);
        }
      );
      this.editMode = !this.editMode;
      this.resetUser();
      return;
    }
    console.info('onAddUser()...');
    let id = this.generateRandomId();
    if(this.username === undefined || this.username === null) {
      if(this.firstname == undefined || this.firstname == null) {
        return;
      }
      this.username = (this.firstname + this.lastname).toLowerCase();
    }
    console.info("The first name is " + this.firstname);
    this.user = new User(id, this.firstname, this.lastname, this.username);
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
    this.userService.selectedUserSubject.unsubscribe();
    this.userService.editModeSubject.unsubscribe();
  }

  private resetUser() {
    this.id = null;
    this.firstname = null;
    this.lastname = null;
    this.username = null;
  }
}
