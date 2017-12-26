import { Component, OnInit } from '@angular/core';

import { User } from '../user.model';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {
  user: User;

  constructor() { }

  ngOnInit() {
    this.user = new User("","","","");
  }

  onEditUser() {
    console.info("onEditUser()...");
    //TODO
  }
}
