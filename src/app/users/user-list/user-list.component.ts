import { Component, OnInit, OnDestroy } from '@angular/core';
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
  usersObservable: Observable<User[]>;
  userSubscription: Subscription;
  users;

  constructor(private userService: UserService) { }

  ngOnInit() {
    //this.users = this.userService.users;
    this.userService.getAllUsers();
    this.userSubscription = this.userService.usersObservable.subscribe();
    this.usersObservable = this.userService.usersObservable;
  }

  onEditUser(id: string) {
    console.info("editing user " + id);
  }

  onDeleteUser(id: string) {
    console.info("deleting user " + id);
    this.userService.deleteUser(id);
  }

  onGetAllUsers() {
    console.info("getting all users...");
    this.userService.getAllUsers();
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }

}
