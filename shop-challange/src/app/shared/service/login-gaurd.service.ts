import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {TokenService} from "../../core/service/token.service";

@Injectable({
	providedIn: 'root',
})
export class LoginGuardService implements CanActivate {
	constructor(public tokenService: TokenService, public router: Router) {}
	canActivate(): boolean {
		if (this.tokenService.checkLoggedStatus()) {
			this.router.navigate(['/home']);
			return false;
		}
		return true;
	}
}
