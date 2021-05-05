import { Injectable } from '@angular/core';
import { User } from './user';

import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http: HttpClient,
    private toastr: ToastrService
  ) {}
  
  public currentUser = new User();
  private usersUrl = 'http://localhost:3000/users';
  //public filters : {currentPage =  1, itemPerPage : 6, totalUsers : any, currentFilter , currentReseatch, currentActiveFilter, directionFilter, directionCategorie, users, pages};

  /* ############################
  ############ ALL USERS ########
  ############################ */
  public getUsers(page, items, activeFilter, filtres = "", direction = ""): Observable<HttpResponse<User[]>> {
    if(filtres != "") {
      filtres = "&_sort=" +filtres
      direction = direction === "up" ? "" : "&_order=desc";
      filtres = filtres + direction ;
    }
    return this.http.get<User[]>(this.usersUrl +'?_page=' +page +'&_limit=' +items + "&isActive_like=" +activeFilter + filtres, { observe: 'response' });
  }

  public getByEmail(email: string): Observable<HttpResponse<User[]>> {
    return this.http.get<User[]>(this.usersUrl + "?email = " +email, { observe: 'response' });
  }

  /* ############################
  ############ BORDEL FILTRE ####
  ############################ */
  public getUsersWithKey(page, items, recherche, filterApplied, activeFilter, filtreOrdreCategorie, filtreDirection): Observable<HttpResponse<User[]>> {
    filtreOrdreCategorie = "&_sort=" +filtreOrdreCategorie
    filtreDirection = filtreDirection === "up" ? "" : "&_order=desc";
    filtreOrdreCategorie = filtreOrdreCategorie + filtreDirection ;
    let filterToApply = filterApplied == "all" ? "q=" +recherche : filterApplied + "_like=" + recherche;
    let finalRequest = this.usersUrl +'?_page=' +page +'&_limit=' +items + "&isActive_like=" +activeFilter + "&" +filterToApply + filtreOrdreCategorie;
    console.log(finalRequest);
    return this.http.get<User[]>(this.usersUrl +'?_page=' +page +'&_limit=' +items + "&isActive_like=" +activeFilter + "&" +filterToApply + filtreOrdreCategorie, { observe: 'response' });
  }

  /* ############################
  ############ RECUP USER #######
  ############################ */
  public getSingleUser(id: number): Observable<User> {
    const url = `${this.usersUrl}?id=${id}`;
    return this.http.get<User>(url);
  }

  public getSingleUserWithUserReturn(id: number): Observable<User> {
    console.log("depart");
    const url = `${this.usersUrl}?id=${id}`;
    let user:User = null;
    return this.http.get<User>(url).pipe(map(user => new User()));
  }
  
  /* ############################
  ############ AJOUT USER #######
  ############################ */
  public addUser(user : User): Observable<User> {
    user.isActive = false;
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    return this.http.post<User>(this.usersUrl, user, httpOptions).pipe(
      tap((user: User) => this.log(`added user with id=${user.id}`)),
      catchError(this.handleError<User>('ajout de User'))
    );
  }

  /* ############################
  ############ EDIT USER #######
  ############################ */
  public editUser(user : User): Observable<User> {
    const url = `${this.usersUrl}/${user.id}`;
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    return this.http.put<User>(url, user, httpOptions);
  }


  /* ############################
  ############ SUPPR USER #######
  ############################ */
  public deleteUser(user : User): Observable<User> {
    const url = `${this.usersUrl}/${user.id}`;
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    return this.http.delete<User>(url, httpOptions);
  }

  /* ############################
  ############ NOTIF USER #######
  ############################ */
  showSuccess(notif: string) {
    this.toastr.success(notif);
  }

  private handleError<T>(operation = 'operation', result?: T) {
		return (error: any): Observable<T> => {
			console.error(error);
			console.log(`${operation} failed: ${error.message}`);

			return of(result as T);
		};
	}

  private log(log: string) {
    console.log(log);
  }

}
