import { Component } from '@angular/core';

@Component({
  selector: 'annotanano-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent {

    logos = {
      NS: 'https://www.myreviews.it/wp-content/uploads/2017/07/nintendo-switch-logo-2.jpg',
      PC: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-JQ2M5WdoxrvnKuIjbuOVZG_WphkVWn_ENKGTFWrU63BD3MIo&s'
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

    person: any = {
      name: '',
      avatarUrl: ''
    }

    constructor(){
      
    }

    addGame(){
      this.aggiungiGioco = true;
      this.newGame = {};
      //this.newGame.platform = this.platforms[0];
    }

    modificaGioco(game){
      game.modifica = false;
    }

    annullaModificaGioco(game){
      game.modifica = true;
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
}
