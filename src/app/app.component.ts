import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  constructor(private router: Router) {
    if(!sessionStorage.getItem('userId'))
      this.router.navigateByUrl('/login');
    else
      this.router.navigateByUrl('/list');
  }

  notLogin() : boolean{
    if(window.location.pathname == '/login'){
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
  
}
