import { Component, ViewEncapsulation, ChangeDetectorRef } from '@angular/core';
import { GamesService } from '../services/games.service';
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';


@Component({
  selector: 'series-list',
  templateUrl: './series-list.component.html',
  styleUrls: ['./series-list.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class SeriesListComponent {
  ordering = '';
  listPerson = [];
  modalGame: any = {};
  modalIndex: number;
  modalDisplay: boolean = false;
  createModal: boolean = false;
  constructor(private gamesService: GamesService){
    this.gamesService.getAll().subscribe((data : any) => {
      this.listPerson = data; 

      });
  }

  showCommentDialog(series, index){
    this.modalIndex = index;
    this.modalGame = series;
    this.createModal = true;
    setTimeout(() => this.modalDisplay = true, 760);
  }

  digestClose(){
    this.modalDisplay = false;
    setTimeout(() => this.createModal = false, 760);
  }

  customComparator(person1, person2){
    if(person1.seriesThisYear && !person2.seriesThisYear)
      return -1;
    
    if(!person1.seriesThisYear && person2.seriesThisYear)
      return 1;

    if(!person1.seriesThisYear && !person2.seriesThisYear)
      return 0;

    if(person1.seriesThisYear.length !== 0 && person2.seriesThisYear.length === 0)
      return -1;

    if(person1.seriesThisYear.length === 0 && person2.seriesThisYear.length !== 0)
      return 1;

    if(person1.seriesThisYear.length > person2.seriesThisYear.length)
      return 1;

    if(person1.seriesThisYear.length < person2.seriesThisYear.length)
      return -1;
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
