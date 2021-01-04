import { Component, ViewEncapsulation, ChangeDetectorRef } from '@angular/core';
import { GamesService } from '../services/games.service';
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';


@Component({
  selector: 'annotanano-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class UserEditComponent {

  modalGame: any = {};
  modalDisplay: boolean = false;
  modalIndex: number;

  faPencilAlt = faPencilAlt;
  faTrash = faTrash;
  faCheck = faCheck;
 

  createModal: boolean = false;

  selectedItem;

  gameResults = [];

  fonts = {
    PC: 'windows',
    NS: 'nintendo',
    PS: 'playstation',
    XB: 'xbox',
    P5: 'playstation',
    XX: 'xbox',
    ST: 'windows'
  }

  logos = { 
    NS: 'assets/img/ns.jpg',
    PC: 'assets/img/pc.jpg',
    XB: 'assets/img/xb.gif',
    PS: 'assets/img/ps.jpg',
    P5: 'assets/img/ps5.jpg',
    XX: 'assets/img/xx.jpg',
    ST: 'assets/img/stadia.jpg'
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
      name: 'Playstation 4',
      value:'PS'
    },
    {
      name: 'Playstation 5',
      value: 'P5'
    },
    {
      name: 'Xbox Series X|S',
      value: 'XX'
    },
    {
      name: 'Google Stadia',
      value: 'ST'
    }
    ]
    aggiungiGioco: boolean = false;
    newGame: any = {};
    newGameColl: any = {};

    person: any = {};

    constructor(private gameService: GamesService, private ref: ChangeDetectorRef){
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

    saveGameToCollection(){
      if(!this.newGame.collection){
        this.newGame.collection = [];
      }

      if(!this.newGameColl.percentComp){
        this.newGameColl.percentComp = 1;
      }

      let collectionGame = {
        name: this.newGameColl.name,
        percentComp: this.newGameColl.percentComp,
        modifica: false
      }
      
      this.newGame.collection.push(collectionGame);
      this.newGameColl = {};
      this.calculatePercentageFirst();
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

    modificaGiocoCollectionFirst(game){
      game.modifica = true;
      this.calculatePercentageFirst();
    }

    annullaModificaGiocoCollectionFirst(game){
      game.modifica = false;
      this.calculatePercentageFirst();
    }

    private calculatePercentageFirst(){
      if(!this.newGame.percentComp){
        this.newGame.percentComp = 1;
      }

      let totalPercentage = 0;
      this.newGame.collection.forEach(elem => {
        totalPercentage += elem.percentComp;
      })

      if(this.newGame.collection.length !== 0)
        this.newGame.percentComp = Math.floor(totalPercentage/this.newGame.collection.length);
      else
        this.newGame.percentComp = 1;
    }

    private calculatePercentage(i, j, game: any){
      if(!game.percentComp){
        game.percentComp = 1;
      }

      let totalPercentage = 0;
      this.person.gamesThisYear[i].collection.forEach(elem => {
        totalPercentage += elem.percentComp;
      })

      if(this.person.gamesThisYear[i].collection.length !== 0)
        this.person.gamesThisYear[i].percentComp = Math.floor(totalPercentage/this.newGame.collection.length);
      else
        this.person.gamesThisYear[i].percentComp = 1;
    }

    eliminaGiocoCollectionFirst(index){
      this.newGame.collection.splice(index, 1);
      this.calculatePercentageFirst();
    }

    modificaGiocoCollection(i, j, game){
      game.modifica = true;
      this.calculatePercentage(i, j, game);
    }

    annullaModificaGiocoCollection(i, j, game){
      game.modifica = false;
      this.calculatePercentage(i, j, game);
    }

    eliminaGiocoCollection(i, j, game){
      this.person.gamesThisYear[i].collection.splice(j, 1);
      this.calculatePercentage(i, j, game);
    }

    saveGame(){
      this.aggiungiGioco = false;
      
      if(!this.newGame.platform){
        this.newGame.platform = 'PC';
      }
      
      this.newGame.modifica = true;
      this.newGame.explode = false;
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

    searchGame(event){
      this.gameService.gameList(event.query).subscribe((data) => {
        if(data && data.result){
          const games = data.result;
          games.forEach(element => {
            if(element.platform === 'PS4' || element.platform === 'Switch' || element.platform === 'XONE' || element.platform === 'PC'){
              this.gameResults.push(element);
            }
          });
        }
      });
    }

    selectionAutocompleteSingle(value){
      if(value) {
        this.newGame.name = value.title;
        this.newGame.platform = value.platform;
      }
      
    }


    showCommentDialog(gameName, index){
      this.modalIndex = index;
      this.modalGame = gameName;
      this.createModal = true;
      setTimeout(() => this.modalDisplay = true, 760);
    }

    saveGameInfo(){
     
      this.gameService.update(this.person).subscribe((data)=>{
        if(data){
          this.person = data;
          this.person.gamesThisYear.forEach(element => {
            element.modifica = true;
            this.modalDisplay = false;
            setTimeout(() => this.createModal = false,760);
          });
        }
      })
      
      
    }

    digestClose(){
      this.modalDisplay = false;
      setTimeout(() => this.createModal = false, 760);
    }

    
    
}
