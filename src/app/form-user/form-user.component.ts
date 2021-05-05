import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../user/user';
import { UserService } from '../user/user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-form-user',
  templateUrl: './form-user.component.html',
  styleUrls: ['./form-user.component.css']
})
export class FormUserComponent implements OnInit {
  @Input() user: User; // propriété d'entrée du composant (utilisé via le edit)

  constructor(
    private router: Router,
    private toastr: ToastrService,
    private userService : UserService,
   ) { }

  ngOnInit(): void {}

  showSuccess(notif: string) {
    this.toastr.success(notif);
  }

  submitUser(): void {
    console.log(this.user);
    let isOnAdd: Boolean = this.router.url.includes('add');
    if(isOnAdd) {
      this.showSuccess(`Utilisateur ${this.user.name} créé !`)
      this.userService.addUser(this.user)
      .subscribe(user => {
        this.user = user;
        this.goToUser();
      })
    } else {
      this.showSuccess(`Utilisateur modifié !`)
      this.userService.editUser(this.user)
      .subscribe(user => {
        this.user = user;
      })
      setTimeout(this.goToUser.bind(this), 800);
    }
  }

  goToUser(): void {
    let adresseUrl = ['/user', this.user.id];
    //let adresseUrl = ['/users'];
    this.router.navigate(adresseUrl);
  }


}