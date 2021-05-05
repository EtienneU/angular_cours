import { Component, OnInit } from '@angular/core';
import { User } from './user';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { UserService } from './user.service';
import * as _ from 'underscore';

@Component({
  selector: 'app-liste-user',
  templateUrl: './liste-user.component.html',
  styleUrls: ['./liste-user.component.css']
})

export class ListeUserComponent implements OnInit {

  /* ##########################
  ##### LISTE DES FILTERS #####
  ########################## */
  pages : number[];
  public pagination : {currentPage: any, itemPerPage : any, totalUsers : any};
  types = [
    { value: 'all', display: 'All' },
    { value: 'name', display: 'Name' },
    { value: 'email', display: 'Email' },
    { value: 'company', display: 'Company' }
  ];
  currentFilter : string = "all";
  currentReseatch : string = "";
  currentActiveFilter : string = "";
  directionFilter : string = "up";
  directionCategorie : string = "id";
  users;
  currentUser:User = new User();

  constructor(
    public router : Router,
    public toastr: ToastrService,
    public userSevice: UserService
  ) {}

  ngOnInit() : void {
    this.pagination = {currentPage: 1, itemPerPage : 6, totalUsers : 0};
    this.onKey(this.currentReseatch);
  }

  /* ########################## 
  #### SELECTION DE USER ####*/ 
  selectUser(user : User) {
    let link = ['/user', user.id];
    this.router.navigate(link);
  }

  /* ########################## 
  #### ORDRE D'AFFICHAGE ####*/
  filterListe(filtre : string, direction : string) {
    this.pagination.currentPage = 1;
    this.directionFilter = direction;
    this.directionCategorie = filtre;
    this.onKey(this.currentReseatch);
  }

  /* ########################## 
  #### FILTRE CATEGORIE #####*/
  filterChanged(selectedValue : string) {
    this.currentFilter = selectedValue;
    this.onKey(this.currentReseatch);
  }

  /* ########################## 
  #### FILTRE isActive ######*/
  activeFilter(activeStatut : string){
    this.currentActiveFilter = activeStatut;
    this.onKey(this.currentReseatch);
  }

  /* ########################## 
  #### FILTRE page ##########*/
  paginate(nbPage: number) {
    this.pagination.currentPage = nbPage;
    console.log(nbPage);
    this.onKey(this.currentReseatch);
  }

  /* ########################## 
  #### SUPPR USER ##########*/
  delete(user: User): void {
    console.log(user.name)
		this.userSevice.deleteUser(user)
			.subscribe(_ => {
        this.showSuccess(`Utilisateur ${user.name} supprimé !`);
        this.onKey(this.currentReseatch);
      });
	}

  showSuccess(notif: string) {
    this.toastr.success(notif);
  }

  populateUsers() {
    this.userSevice.getUsers(this.pagination.currentPage, this.pagination.itemPerPage, this.currentActiveFilter).subscribe( responseGet => {
      this.pagination.totalUsers = responseGet.headers.get('X-Total-Count');
      this.pages = _.range(1, Math.ceil(this.pagination.totalUsers / this.pagination.itemPerPage) + 1);
      this.users = responseGet.body;
    });
  }

  public updateList(e) {
    console.log(e);
    if(e=== true) {
      this.onKey(this.currentReseatch);
    }
  }


  onKey(word) {
    if(word !== this.currentReseatch && word !== "") {
      this.currentReseatch = word.target.value;
      this.pagination.currentPage = 1;
    } else if(word === "") {
      this.currentReseatch = "";
    }
    //remise a 0
    this.userSevice.getUsersWithKey(this.pagination.currentPage, this.pagination.itemPerPage, this.currentReseatch, this.currentFilter, this.currentActiveFilter, this.directionCategorie, this.directionFilter).subscribe( responseGet => {
      this.pagination.totalUsers = responseGet.headers.get('X-Total-Count');
      this.pages = _.range(1, Math.ceil(this.pagination.totalUsers / this.pagination.itemPerPage) + 1);
      this.users = responseGet.body;
    });
  }  


  /*
  private handleError<T>(operation = 'operation', result?: T) {
		return (error: any): Observable<T> => {
			console.error(error);
			console.log(`${operation} failed: ${error.message}`);

			return of(result as T);
		};
	}
  */
}
