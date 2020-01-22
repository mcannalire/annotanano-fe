import { Component, ElementRef, ViewChild } from '@angular/core';
import { GamesService } from '../services/games.service';
import { element } from 'protractor';

@Component({
  selector: 'annotanano-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListUserComponent{
  ordering = '';

  @ViewChild("googleChartId", {})
  container : ElementRef;

  title = 'Annotanano 2020';

  giochiCompleti = false;
  reverse = false;
  mostraGrafico = false;

  fonts = {
    PC: 'windows',
    NS: 'nintendo',
    PS: 'playstation',
    XB: 'xbox'
  }

  stereotype = {
    PC: 'assets/img/mouse.png',
    NS: 'assets/img/switch.png',
    PS: 'assets/img/pslogo.jpg',
    XB: 'assets/img/xbox.webp'
  }

  logos = { 
    NS: 'assets/img/ns.jpg',
    PC: 'assets/img/pc.jpg',
    XB: 'assets/img/xb.gif',
    PS: 'assets/img/ps.jpg'
  }
  listPerson = [];
  columns = ['Nome', 'Punteggio', { role: 'style' }];
  scoreDatas = [];

  options = {
    title: 'Punteggio',
    chartArea: {width: '50%'},
    annotations: {
    },
    legend: {position: 'none'},
    hAxis: {
      title: '',
      minValue: 0,
    },
    vAxis: {
      title: ''
    },
    width: 600,
    height: 500
  };

  constructor(private gamesService: GamesService){
    this.gamesService.getAll().subscribe((data : any) => {
      this.listPerson = data;

      let maxScore = 0;
      if(this.listPerson){
        
        this.listPerson.forEach((person: any) => {
          if(person.gamesThisYear){
            person.badge = this.getBadge(person);
            if(person.name){
              //this.columns.push(person.name);
              let score = 0;
              person.gamesThisYear.forEach((game: any) => {
                score += game.percentComp === 100 ? 750 : game.percentComp;
              })
              
              this.scoreDatas.push([person.name, score]);
              if(score > maxScore){
                maxScore = score;
              }
            }
          }
          
        })
      }

      if(this.scoreDatas && this.scoreDatas.length !== 0){
        this.scoreDatas.sort(this.customComparatorScore);
        this.scoreDatas.reverse();
        this.scoreDatas.forEach(element => {
          if(element[1] === maxScore){
            element[2] = '#FFD700'; //gold
          } else {
            element[2] = '#ADD8E6';
          }
        });
      }

      
      
    })
  }

  getContainerWidth(){
    if(this.container)
      this.options.width = this.container.nativeElement.offsetWidth;
  }

  customComparatorScore(element1, element2){
    if(element1[1] && !element2[1])
      return 1;

    if(!element1[1] && element2[1])
      return -1;

    if(element1[1] > element2[1])
      return 1;
    
    if(element1[1] < element2[1])
      return -1

    return 0;
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
