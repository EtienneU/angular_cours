import { Component, OnInit } from '@angular/core';
import { User } from '../user/user';
import { ActivatedRoute, Params } from '@angular/router';
import { UserService } from '../user/user.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {
  user : User;

  constructor(
    private userService: UserService,
    private route: ActivatedRoute) { }
  

  ngOnInit(): void {
    let id = +this.route.snapshot.params['id'];
    console.log(this.userService.getSingleUser(id));
    this.userService.getSingleUser(id)
      .subscribe(user => this.user = user[0]);
  }

}
