import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private authService: AuthService, private router: Router) {}
    
	canActivate() {
		if(sessionStorage.getItem('userId')){
			return true;
		}else{
            this.router.navigateByUrl('/login');
		    return false;
		}
	}
}

