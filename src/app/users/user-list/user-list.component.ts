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
  usersObservable: Observable<User[]>;
  userSubscription: Subscription;
  @Input() users: User[];

  constructor(private userService: UserService) { }

  ngOnInit() {
    //this.users = this.userService.users;
    this.onGetAllUsers();
    this.userService.getAllUsers();
    this.userSubscription = this.userService.usersObservable.subscribe();
    this.usersObservable = this.userService.usersObservable;
  }

  onEditUser(id: string) {
    console.info("editing user " + id);
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
    this.userSubscription = this.userService.getAllUsers().subscribe(
      (data: any) => {
        this.userService.users = data;
        this.users = this.userService.users;
        console.info(this.users);
      }
    );
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }

}
