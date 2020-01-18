import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

    constructor(private http: HttpClient) { }

    login(user, passwd) : Observable<any>{
        const credential = { 
            userName: user,
            pwd: passwd
        }
        return this.http.post('https://annotanano-spring.herokuapp.com/api', credential, {
            headers: {'accept': 'application/json'}
        });
    }

}