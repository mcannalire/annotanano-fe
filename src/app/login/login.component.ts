import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service'
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'annotanano-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

    constructor(private router: Router, private authService: AuthService, private cookieService: CookieService) {}

    username: string;
    pwd: string;
    loginFallito: boolean = false;
    rememberMe: boolean = false;

    login(){
      this.loginFallito = false;
      if(!sessionStorage.getItem('userId')){
        this.authService.login(this.username, this.pwd).subscribe((data) => {
          if(data.userId !== 'NA'){
            sessionStorage.setItem('userId', data.userId);
            if(this.rememberMe){
              this.cookieService.set('userId', sessionStorage.getItem('userId'));
            }
            this.router.navigateByUrl('/edit');
          } else {
            this.loginFallito = true;
          }
          
        })
      } else {
        this.router.navigateByUrl('/edit');
      }
    }

    verifyInput() : boolean {
        if(this.username && this.pwd)
          return this.username.length < 3 && this.pwd.length < 3
        else
          return false;
    }
}
