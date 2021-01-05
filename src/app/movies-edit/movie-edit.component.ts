import { Component, ViewEncapsulation, ChangeDetectorRef } from '@angular/core';
import { GamesService } from '../services/games.service';
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faCheck } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'movie-edit',
  templateUrl: './movie-edit.component.html',
  styleUrls: ['./movie-edit.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class MovieEditComponent {
  person: any = {};
  aggiungiFilm: boolean = false;
  newMovie: any = {};
  selectedItem;
  modalGame: any = {};
  modalIndex: number;
  modalDisplay: boolean = false;

  faPencilAlt = faPencilAlt;
  faTrash = faTrash;
  faCheck = faCheck;
  createModal: boolean = false;

  constructor(private gameService: GamesService){
    this.gameService.getUserGames().subscribe((data) => {
      if(data){
        this.person = data;
        if(this.person.moviesThisYear){
          this.person.moviesThisYear.forEach(element => {
            element.modifica = true;
          });
        }
      }
    });
  }

  addMovie(){
    this.aggiungiFilm = true;
    this.newMovie = {};
    //this.newGame.platform = this.platforms[0];
  }

  saveMovie(){
    this.aggiungiFilm = false;
    
    this.newMovie.modifica = true;
    this.newMovie.explode = false;
    if(this.person.moviesThisYear){
      this.person.moviesThisYear.push(this.newMovie);
    } else {
      this.person.moviesThisYear = [];
      this.person.moviesThisYear.push(this.newMovie);
    }
  }

  modificaFilm(movie){
    movie.modifica = false;
  }

  annullaModificaFilm(movie){
    movie.modifica = true;
  }

  eliminaFilm(index){
    this.person.moviesThisYear.splice(index, 1);
  }

  saveProfile(){
    if(!this.person.userId){
      this.person.userId = sessionStorage.getItem('userId');
    }
    this.gameService.update(this.person).subscribe((data)=>{
      if(data){
        this.person = data;
        this.person.moviesThisYear.forEach(element => {
          element.modifica = true;
        });
      }
    })
  }

  showCommentDialog(movie, index){
    this.modalIndex = index;
    this.modalGame = movie;
    this.createModal = true;
    setTimeout(() => this.modalDisplay = true, 760);
  }

  digestClose(){
    this.modalDisplay = false;
    setTimeout(() => this.createModal = false, 760);
  }

  saveMovieInfo(){
    this.gameService.update(this.person).subscribe((data)=>{
      if(data){
        this.person = data;
        this.person.moviesThisYear.forEach(element => {
          element.modifica = true;
          this.modalDisplay = false;
          setTimeout(() => this.createModal = false,760);
        });
      }
    })
  }

  

  logos = { 
    NF: 'assets/img/nf.jpg',
    PV: 'assets/img/pv.jpg',
    DP: 'assets/img/dp.jpg',
    VV: 'assets/img/vv.jpg',
    CI: 'assets/img/ci.jpg',
    IN: 'assets/img/in.jpg',
    RP: 'assets/img/rp.png',
    ST: 'assets/img/st.png'
  }

  platforms = [
    {
      name: 'Netflix',
      value: 'NF'
    }, 
    {
      name: 'Prime Video',
      value: 'PV'
    },
    { 
      name: 'Disney Plus',
      value:'DP'
    }, 
    {
      name: 'VVVVID',
      value:'VV'
    },
    {
      name: 'Cinema',
      value: 'CI'
    },
    {
      name: 'Infinity',
      value: 'IN'
    },
    {
      name: 'Rai Play',
      value: 'RP'
    },
    {
      name: 'Streaming',
      value: 'ST'
    }
    ]
    
}
