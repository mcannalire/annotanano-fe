import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GamesService {

    constructor(private http: HttpClient) { }

    getUserGames() : Observable<any>{
        const userId = sessionStorage.getItem('userId');
        return this.http.post('https://annotanano-spring.herokuapp.com/api/getUserGames', userId, {
            headers: {'accept': 'application/json'}
        });
    }

    getAll(){
        return this.http.get('https://annotanano-spring.herokuapp.com/api/getAll', {
            headers: {'accept': 'application/json'}
        });
    }

    update(body){
        return this.http.put('https://annotanano-spring.herokuapp.com/api/', body, {
            headers: {'accept': 'application/json'}
        });
    }

}