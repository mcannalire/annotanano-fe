import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  thisYear: number;
  
  constructor(private router: Router, private cookieService: CookieService) {
    const cookieUserId = this.cookieService.get('userId');

    if(cookieUserId && cookieUserId.length > 0 && cookieUserId !== 'null'){
      sessionStorage.setItem('userId', cookieUserId);
    }

    if(!sessionStorage.getItem('userId'))
      this.router.navigateByUrl('/login');
    else
      this.router.navigateByUrl('/list');

    this.thisYear = new Date().getFullYear();
  }

  notLogin() : boolean{
    if(window.location.hash == '#/login'){
      return false;
    }
    return true;
  }

  edit(){
    this.router.navigateByUrl('/edit');
  }

  list(){
    this.router.navigateByUrl('/list');
  }

  compare(){
    this.router.navigateByUrl('/compare');
  }

  goldBook(){
    this.router.navigateByUrl('/goldbook');
  }
  
}
