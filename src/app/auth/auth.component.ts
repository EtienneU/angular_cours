import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EmailInterceptor } from '../interceptor/http.interceptor';
import { AuthService } from './auth.service';

@Component({
	selector: 'login',
	templateUrl: './auth.component.html',
})

export class LoginComponent {
	message: string = 'Vous êtes déconnecté.';
	name: string;
	password: string;

	constructor(
    	private router: Router,
		public authService: AuthService
	) {}

	// Informe l'utilisateur sur son authentfication.
	setMessage() {
		this.message = this.authService.isLoggedIn ? 'Vous êtes connecté.' : 'Identifiant ou mot de passe incorrect.';
	}

	// Connecte l'utilisateur auprès du Guard
	login() {
		//this.emailInterceptor.intercept(this.authService.redirectUrl, this.authService.redirectUrl);
		console.log("LOGIN DE LOGIN MODULE")
		this.message = 'Tentative de connexion en cours ...';
		this.authService.login(this.name, this.password).subscribe(() => {
			this.setMessage();
			if (this.authService.isLoggedIn) {
				// Récupère l'URL de redirection depuis le service d'authentification
				// Si aucune redirection n'a été définis, redirige l'utilisateur vers la liste des users.
				let redirect = this.authService.redirectUrl ? this.authService.redirectUrl : '/users';
				// Redirige l'utilisateur
				this.router.navigate([redirect]);
			} else {
				this.password = '';
			}
		});
	}

	// Déconnecte l'utilisateur
	logout() {
		this.authService.logout();
		this.setMessage();
	}
}
