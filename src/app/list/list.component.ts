import { Component } from '@angular/core';
import { GamesService } from '../services/games.service';

@Component({
  selector: 'annotanano-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListUserComponent {
  ordering = '';

  title = 'Annotanano 2020';

  giochiCompleti = false;
  reverse = false;

  stereotype = {
    PC: 'http://simpleicon.com/wp-content/uploads/mouse.png',
    NS: 'https://image.flaticon.com/icons/png/512/2217/2217193.png',
    PS: 'https://banner2.cleanpng.com/20180525/xxt/kisspng-playstation-2-computer-icons-5b08a3188b4563.4843535815272926965705.jpg',
    XB: 'https://i.dlpng.com/static/png/1784426-xbox-icon-png-50-px-png-xbox-1600_1600_preview.webp'
  }

  logos = { 
    NS: 'https://www.myreviews.it/wp-content/uploads/2017/07/nintendo-switch-logo-2.jpg',
    PC: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-JQ2M5WdoxrvnKuIjbuOVZG_WphkVWn_ENKGTFWrU63BD3MIo&s'
  }
  listPerson = [];

  constructor(private gamesService: GamesService){
    this.gamesService.getAll().subscribe((data : any) => {
      this.listPerson = data;

      if(this.listPerson){
        this.listPerson.forEach((person: any) => {
          if(person.gamesThisYear){
            person.badge = this.getBadge(person);
          }
        })
      }
      
    })

    
  }

  customComparator(person1, person2) {
    if(person1.gamesThisYear && !person2.gamesThisYear)
      return -1;
    
    if(!person1.gamesThisYear && person2.gamesThisYear)
      return 1;

    if(person1.gamesThisYear.length !== 0 && person2.gamesThisYear.length === 0)
      return -1;

    if(person1.gamesThisYear.length === 0 && person2.gamesThisYear.length !== 0)
      return 1;
    
    if(person1.gamesThisYear.length !== 0 && person2.gamesThisYear.length !== 0){
      let p1Count = 0;
      let p2Count = 0;
      if(person1.gamesThisYear.length > person2.gamesThisYear.length){
        
        person1.gamesThisYear.forEach(element => {
          if(element.percentComp === 100)
            p1Count++
        });

        person2.gamesThisYear.forEach(element => {
          if(element.percentComp === 100)
            p2Count++
        });

        if(p1Count > p2Count)
          return -1;
        else if(p1Count < p2Count)
          return 1;
        else {
          return -1;
        }
    } else if(person1.gamesThisYear.length < person2.gamesThisYear.length){
        person1.gamesThisYear.forEach(element => {
          if(element.percentComp === 100)
            p1Count++
        });

        person2.gamesThisYear.forEach(element => {
          if(element.percentComp === 100)
            p2Count++
        });

        if(p1Count > p2Count)
          return -1;
        else if(p1Count < p2Count)
          return 1;
        else {
          return 1;
        }
    } else {
      person1.gamesThisYear.forEach(element => {
        if(element.percentComp === 100)
          p1Count++
      });

      person2.gamesThisYear.forEach(element => {
        if(element.percentComp === 100)
          p2Count++
      });

      if(p1Count > p2Count)
        return -1;
      else if(p1Count < p2Count)
        return 1;
      else {
        return 1;
      }
    }

    
  }

}

  private getBadge(person):string{
    const games = person.gamesThisYear;
    let countNintendo = 0;
    let countXbox = 0;
    let countPc = 0;
    let countPs = 0;
    games.forEach(element => {
      if(element.platform === 'PC')
        countPc++;
      if(element.platform === 'NS')
        countNintendo++;
      if(element.platform === 'XB')
        countXbox++;
      if(element.platform === 'PS')
        countPs++;
    });

    if(countPc > Math.max(countNintendo, countXbox, countPs))
      return this.stereotype.PC;
    
    if(countPs > Math.max(countNintendo, countXbox, countPc))
      return this.stereotype.PS;
    
    if(countXbox > Math.max(countNintendo, countPs, countPc))
      return this.stereotype.XB;

    if(countNintendo > Math.max(countXbox, countPs, countPc))
      return this.stereotype.NS;

    
  }
}
