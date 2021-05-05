import { Injectable } from '@angular/core';
// RxJS 6
import { Observable, of } from 'rxjs';
import { tap, delay } from 'rxjs/operators';

@Injectable()
export class AuthService {
	isLoggedIn: boolean = false; // L'utilisateur est-il connecté ?
	redirectUrl: string; // où rediriger l'utilisateur après l'authentification ?

	// Une méthode de connexion
	login(name: string, password: string): Observable<boolean> {
		console.log(this.isLoggedIn);
		// Faites votre appel à un service d'authentification...
		localStorage.setItem('token', name); // V PROF
		console.log("appel de login methode");
		let isLoggedIn = (name === 'admin' && password === 'admin');
		console.log(isLoggedIn);

		return of(true).pipe(
			delay(1000),
			tap( _ => this.isLoggedIn = isLoggedIn)
		);
	}

	// Une méthode de déconnexion
	logout(): void {
		this.isLoggedIn = false;
	}
}
