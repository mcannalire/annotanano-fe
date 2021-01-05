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
  mode: string;
  modalDisplay: boolean;
  mSelectorGame: boolean;
  mSelectorMovie: boolean;
  mSelectorSeries: boolean;
  mSelectorKnowHow: boolean;
  
  
  constructor(private router: Router, private cookieService: CookieService) {
    this.mode = 'game';
    this.modalDisplay = false;
    const cookieUserId = this.cookieService.get('userId');
    this.mSelectorGame = false;
    this.mSelectorMovie = false;
    this.mSelectorSeries = false;
    this.mSelectorKnowHow = false;

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

  editMovie(){
    this.router.navigateByUrl('/movie-edit');
  }

  listMovie(){
    this.router.navigateByUrl('/movie-list');
  }

  goldBookMovie(){
    this.router.navigateByUrl('/movie-goldbook');
  }

  editSeries(){
    this.router.navigateByUrl('/series-edit');
  }

  listSeries(){
    this.router.navigateByUrl('/series-list');
  }

  goldBookSeries(){
    this.router.navigateByUrl('/series-goldbook');
  }

  sessionClicked(mod){
    this.mode = mod;

    if(this.mode === 'movie'){
      this.router.navigateByUrl('/movie-edit');
    }

    if(this.mode === 'game'){
      this.router.navigateByUrl('/list');
    }

    if(this.mode === 'series'){
      this.router.navigateByUrl('/series-edit');
    }
    
  }

  showModal(){
    this.modalDisplay = true;
  }
  
}
