import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { User } from '../user.model';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit, OnDestroy {
  usersSubscription: Subscription;
  users: User[];

  constructor(private userService: UserService) {
    this.usersSubscription = this.userService.usersObservable.subscribe(
      users => {
        this.users = users;
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
    this.onGetAllUsers();
    this.userService.getAllUsers();
  }

  onEditUser(id: string) {
    console.info("editing user " + id);
    this.usersSubscription.add(this.userService.getUser(id).subscribe(
      data => {
        console.info(data);
        this.userService.selectedUser = <User>data;
      },
      error => {
        console.error(error);
      }
    ));
  }

  onDeleteUser(id: string) {
    console.info("deleting user " + id);
    this.userService.deleteUser(id).subscribe(
      data => {
        console.info(data);
        this.onGetAllUsers();
      },
      error => {
        console.error('Deletion error on ' + id);
      }
    );
  }

  onGetAllUsers() {
    console.info("getting all users...");
    this.userService.getAllUsers().subscribe(
      (data: any) => {
        this.userService.users = data;
        this.users = this.userService.users;
      }
    );
  }

  ngOnDestroy() {
    this.usersSubscription.unsubscribe();
  }

}
