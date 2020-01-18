import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  
  
  constructor(private router: Router, private authService: AuthService) {}

  login(user, pwd){
    if(!sessionStorage.getItem('userId')){
      this.authService.login(user, pwd).subscribe((data) => {
        sessionStorage.setItem('userId', data.userId);
        this.router.navigateByUrl('/edit');
      })
    } else {
      this.router.navigateByUrl('/edit');
    }
    

  }
}
