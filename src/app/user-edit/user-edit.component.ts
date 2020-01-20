import { Component } from '@angular/core';
import { GamesService } from '../services/games.service';

@Component({
  selector: 'annotanano-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent {

  logos = { 
    NS: 'assets/img/ns.jpg',
    PC: 'assets/img/pc.jpg',
    XB: 'assets/img/xb.gif',
    PS: 'assets/img/ps.jpg'
  }
  
    platforms = [
    {
      name: 'Personal Computer',
      value: 'PC'
    }, 
    {
      name: 'Nintendo Switch',
      value: 'NS'
    },
    { 
      name: 'Xbox ONE',
      value:'XB'
    }, 
    {
      name: 'Playstation',
      value:'PS'
    }]
    aggiungiGioco: boolean = false;
    newGame: any = {}

    person: any = {}

    constructor(private gameService: GamesService){
      this.gameService.getUserGames().subscribe((data) => {
        if(data){
          this.person = data;
          if(this.person.gamesThisYear){
            this.person.gamesThisYear.forEach(element => {
              element.modifica = true;
            });
          }
        }
      });
    }

    addGame(){
      this.aggiungiGioco = true;
      this.newGame = {};
      this.newGame.percentComp = 1;
      //this.newGame.platform = this.platforms[0];
    }

    modificaGioco(game){
      game.modifica = false;
    }

    annullaModificaGioco(game){
      game.modifica = true;
    }

    eliminaGioco(index){
      this.person.gamesThisYear.splice(index, 1);
    }

    saveGame(){
      this.aggiungiGioco = false;
      
      if(!this.newGame.platform){
        this.newGame.platform = 'PC';
      }
      
      this.newGame.modifica = true;
      if(this.person.gamesThisYear){
        this.person.gamesThisYear.push(this.newGame);
      } else {
        this.person.gamesThisYear = [];
        this.person.gamesThisYear.push(this.newGame);
      }
    }

    saveProfile(){
      if(!this.person.userId){
        this.person.userId = sessionStorage.getItem('userId');
      }
      this.gameService.update(this.person).subscribe((data)=>{
        if(data){
          this.person = data;
          this.person.gamesThisYear.forEach(element => {
            element.modifica = true;
          });
        }
      })
    }
}
