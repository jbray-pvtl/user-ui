import { Component, OnInit } from '@angular/core';
import { User } from '../user.model';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  users: User[];

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.users = this.userService.users;
  }

  onEditUser(id: string) {
    console.info("editing user " + id);
  }

  onDeleteUser(id: string) {
    console.info("deleting user " + id);
    this.userService.deleteUser(id);
  }

}
