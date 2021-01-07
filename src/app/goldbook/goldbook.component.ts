import { Component } from '@angular/core';
import { GamesService } from '../services/games.service';

@Component({
  selector: 'annotanano-goldbook',
  templateUrl: './goldbook.component.html',
  styleUrls: ['./goldbook.component.css']
})
export class GoldBookComponent {
  ordering = '';
  createModal: boolean = false;
  modalGame: any = {};
  modalDisplay: boolean = false;
  modalIndex: number;
  goty: boolean = false;

  fonts = {
    PC: 'windows',
    NS: 'nintendo',
    PS: 'playstation',
    XB: 'xbox',
    P5: 'playstation',
    XX: 'xbox',
    ST: 'windows'
  }

  badgeMessage = {
    PC: 'PC Master Race',
    NS: 'Nintendaro',
    PS: 'Sonaro',
    XB: 'Microsoft fag'
  }

  stereotype = {
    PC: { img:'assets/img/mouse.png', value: 'PC Master Race'},
    NS: { img:'assets/img/switch.png', value: 'Nintendaro'},
    PS: { img: 'assets/img/pslogo.png', value: 'Sonaro'},
    XB: { img: 'assets/img/xbox.webp', value: 'Microsoft fag'},
    ST: { img: 'assets/img/streaming.png', value: 'Seriously??'}
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

  listPerson = [];
  listYear = [];
  scoreDatas = [];
  yearSelected = {code: '2020_list', desc: '2020'};

  constructor(private gamesService: GamesService){
    this.calculateYears();
    this.gamesService.gameGoldbookList().subscribe((data : any) => {
        this.listPerson = data;
        let maxScore = 0;
        if(this.listPerson){
        
        this.listPerson.forEach((person: any) => {
          if(person.userGoldbook[this.yearSelected.code]){
            person.badge = this.getBadge(person);
            if(person.name){
              //this.columns.push(person.name);
              let score = 0;
              person.giochiCompletati = 0; 
              person.giochiGiocati = 0;
              person.hours = 0;
              person.yearSelected = this.yearSelected.code;
              person.userGoldbook[this.yearSelected.code].forEach((game: any) => {
                score += game.percentComp === 100 ? 750 : game.percentComp;
                if(game.percentComp === 100){
                  person.giochiCompletati++;
                }
                score += game.hours ? game.hours : 0;
                person.hours += game.hours ? game.hours : 0;
              })

              person.giochiGiocati = person.userGoldbook[this.yearSelected.code] ? person.userGoldbook[this.yearSelected.code].length : 0;
              
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
    });
  }

  onYearSelected(event){
    this.listPerson.forEach((person: any) => {
      if(person.userGoldbook[this.yearSelected.code]){
        person.yearSelected = event.value.code;
      }
    });
  }

  customComparator(person1, person2) {
    if(person1.userGoldbook[person1.yearSelected] && !person2.userGoldbook[person2.yearSelected])
      return -1;
    
    if(!person1.userGoldbook[person1.yearSelected] && person2.userGoldbook[person2.yearSelected])
      return 1;

    if(person1.userGoldbook[person1.yearSelected].length !== 0 && person2.userGoldbook[person2.yearSelected].length === 0)
      return -1;

    if(person1.userGoldbook[person1.yearSelected].length === 0 && person2.userGoldbook[person2.yearSelected].length !== 0)
      return 1;
    
    if(person1.userGoldbook[person1.yearSelected].length !== 0 && person2.userGoldbook[person2.yearSelected].length !== 0){
      let p1Count = 0;
      let p2Count = 0;
      if(person1.userGoldbook[person1.yearSelected].length > person2.userGoldbook[person2.yearSelected].length){
        
        person1.userGoldbook[person1.yearSelected].forEach(element => {
          if(element.percentComp === 100)
            p1Count++
        });

        person2.userGoldbook[person2.yearSelected].forEach(element => {
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
    } else if(person1.userGoldbook[person1.yearSelected].length < person2.userGoldbook[person2.yearSelected].length){
        person1.userGoldbook[person1.yearSelected].forEach(element => {
          if(element.percentComp === 100)
            p1Count++
        });

        person2.userGoldbook[person2.yearSelected].forEach(element => {
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
      person1.userGoldbook[person1.yearSelected].forEach(element => {
        if(element.percentComp === 100)
          p1Count++
      });

      person2.userGoldbook[person2.yearSelected].forEach(element => {
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

    
  }}

  customGameComparator(game1, game2) {
    if(game1 && !game2){
      return 1;
    }
  
    if(!game1 && game2){
      return -1;
    }
  
    if(!game1 && !game2){
      return 0;
    }
  
    if(game1 && game2){
      if(game1.percentComp > game2.percentComp){
        return 1;
      }
  
      if(game1.percentComp < game2.percentComp){
        return -1;
      }
  
      if(game1.percentComp === game2.percentComp){
        if(game1.hours && !game2.hours){
          return 1;
        }
  
        if(!game1.hours && game2.hours){
          return -1;
        }
  
        if(game1.hours && game2.hours){
          if(game1.hours > game2.hours){
            return 1;
          }
  
          if(game1.hours < game2.hours){
            return -1;
          }
  
          if(game1.hours === game2.hours){
            return 0;
          }
        }
  
        if(!game1.hours && !game2.hours){
          return 0;
        }
      }
    }
  }

  private calculateYears(){
    const beginning = new Date('2020-01-01');
    const today = new Date();
    const yearsBetween = today.getFullYear() - beginning.getFullYear();
    if(yearsBetween > 0){
      let i = 1;
      while(i <= yearsBetween){
        this.listYear.push({code: (today.getFullYear() - i) + '_list', desc: today.getFullYear() - i});
        i++;
      }
      this.yearSelected = this.listYear[0];
    }
    
  }

  private getBadge(person):any{
    const games = person.userGoldbook[this.yearSelected.code];
    let countNintendo = 0;
    let countXbox = 0;
    let countPc = 0;
    let countPs = 0;
    let countStreaming = 0;
    games.forEach(element => {
      if(element.platform === 'PC')
        countPc++;
      if(element.platform === 'NS')
        countNintendo++;
      if(element.platform === 'XB')
        countXbox++;
      if(element.platform === 'XX')
        countXbox++;
      if(element.platform === 'PS')
        countPs++;
      if(element.platform === 'P5')
        countPs++;
      if(element.platform === 'ST')
        countStreaming++;
    });

    if(countPc > Math.max(countNintendo, countXbox, countPs, countStreaming))
      return this.stereotype.PC;
    
    if(countPs > Math.max(countNintendo, countXbox, countPc, countStreaming))
      return this.stereotype.PS;
    
    if(countXbox > Math.max(countNintendo, countPs, countPc, countStreaming))
      return this.stereotype.XB;

    if(countNintendo > Math.max(countXbox, countPs, countPc, countStreaming))
      return this.stereotype.NS;

    if(countStreaming > Math.max(countXbox, countPs, countPc, countNintendo))
      return this.stereotype.ST;
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

  showCommentDialog(gameName, index){
    this.modalIndex = index;
    this.modalGame = gameName;
    this.createModal = true;
    setTimeout(() => this.modalDisplay = true, 760);
  }

  digestClose(){
    this.modalDisplay = false;
    setTimeout(() => this.createModal = false, 760);
  }
    
}