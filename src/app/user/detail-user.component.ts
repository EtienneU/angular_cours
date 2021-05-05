import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router'; //recuperation d'elements pr extraire id passé en identifiant
import { UserService } from './user.service';
import { User } from './user';
import { ToastrService } from 'ngx-toastr';


@Component({
    selector: 'detail-user',
    templateUrl: './detail-user.component.html',
    styleUrls: ['./detail-user.component.css']
})
export class DetailUserComponent implements OnInit {
    user: User = null;

    constructor(
        private route: ActivatedRoute,
        private toastr: ToastrService,
        private router: Router,
        private userService : UserService
    ) {}

    ngOnInit(): void {
        let id = +this.route.snapshot.paramMap.get('id');
        console.log(id);
        this.userService.getSingleUser(id).subscribe
            (user => {
                console.log(user);
                this.user = user[0]
            });
        console.log(this.user.id);
    }

    /* ########################## 
    #### SUPPR USER ##########*/
    delete(user: User): void {
        this.userService.deleteUser(user)
            .subscribe(_ => {
                this.showSuccess(`Utilisateur ${user.name} supprimé !`);
                this.goBack();
            })
    }

    /* ########################## 
    #### EDIT USER ##########*/
    edit(user: User): void {
        let link = ['/user/edit', user.id]
        this.router.navigate(link);
    }

    goBack(): void {
        this.router.navigate(['/users']);
    }

    showSuccess(notif: string) {
        this.toastr.success(notif);
    }

}