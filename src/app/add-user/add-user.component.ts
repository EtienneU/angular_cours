import { Component, OnInit } from '@angular/core';
import { User } from '../user/user';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {
  user: User = null;

  ngOnInit(): void {
    this.user = new User();
  }

  /*
  user: User = new User();

  constructor(
    private router: Router,
    private userService : UserService
   ) { }

  ngOnInit(): void {}

  addUser(): void {
    console.log(this.user);
    this.userService.addUser(this.user)
      .subscribe(user => {
        this.user = user;
        this.goToUserCreated();
      })
  }

  goToUserCreated(): void {
    let adresseUrl = ['/user', this.user.id];
    this.router.navigate(adresseUrl);
  }
  */
}
