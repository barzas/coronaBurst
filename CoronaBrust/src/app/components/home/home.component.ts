import { Component, OnInit } from '@angular/core';
import {User} from "../../models/user";
import {UserService} from "../../services/user.service";
import {AuthenticationService} from "../../services/authentication.service";
import {first} from "rxjs";

/**
 * The home component contains logic for displaying the current user,
 * a list of all users and enables the deletion of users.
 */

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  currentUser : User;
  users : User[];

  constructor(private authenticationService: AuthenticationService,
              private userService: UserService)
  {
    this.users = [];
    this.currentUser = this.authenticationService.currentUserValue;
  }

  ngOnInit() {
    // this.loadAllUsers();
  }

  deleteUser(id : number) {
    this.userService.delete(id)
      .pipe(first())
      .subscribe(() => this.loadAllUsers())
  }
  private loadAllUsers() {
    this.userService.getAll()
      .pipe(first())
      .subscribe(users => this.users = users);
  }

}
