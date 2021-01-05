import { Component, ViewEncapsulation, ChangeDetectorRef } from '@angular/core';
import { GamesService } from '../services/games.service';
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';


@Component({
  selector: 'series-edit',
  templateUrl: './series-edit.component.html',
  styleUrls: ['./series-edit.component.css'], 
  encapsulation: ViewEncapsulation.None
})
export class SeriesEditComponent {
  person: any = {};
  aggiungiSeries: boolean = false;
  newSeries: any = {};
  selectedItem;
  modalGame: any = {};
  modalIndex: number;
  modalDisplay: boolean = false;

  faPencilAlt = faPencilAlt;
  faTrash = faTrash;
  faCheck = faCheck;
  createModal: boolean = false;
  constructor(private gamesService: GamesService){
    this.gamesService.getUserGames().subscribe((data) => {
      if(data){
        this.person = data;
        if(this.person.seriesThisYear){
          this.person.seriesThisYear.forEach(element => {
            element.modifica = true;
          });
        }
      }
    });
  }

  addSeries(){
    this.aggiungiSeries = true;
    this.newSeries = {};
    //this.newGame.platform = this.platforms[0];
  }

  saveSeries(){
    this.aggiungiSeries = false;
    
    this.newSeries.modifica = true;
    this.newSeries.explode = false;
    if(this.person.seriesThisYear){
      this.person.seriesThisYear.push(this.newSeries);
    } else {
      this.person.seriesThisYear = [];
      this.person.seriesThisYear.push(this.newSeries);
    }
  }

  modificaSeries(movie){
    movie.modifica = false;
  }

  annullaModificaSeries(movie){
    movie.modifica = true;
  }

  eliminaSeries(index){
    this.person.seriesThisYear.splice(index, 1);
  }

  saveProfile(){
    if(!this.person.userId){
      this.person.userId = sessionStorage.getItem('userId');
    }
    this.gamesService.update(this.person).subscribe((data)=>{
      if(data){
        this.person = data;
        this.person.seriesThisYear.forEach(element => {
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

  saveSeriesInfo(){
    this.gamesService.update(this.person).subscribe((data)=>{
      if(data){
        this.person = data;
        this.person.seriesThisYear.forEach(element => {
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
