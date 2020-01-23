import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service'
import { GamesService } from '../services/games.service';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Component({
  selector: 'annotanano-compare',
  templateUrl: './compare.component.html',
  styleUrls: ['./compare.component.css']
})
export class CompareComponent {

    listPerson = [];
    you: any;
    personaSelezionata=false;
    selectedPerson;
    selectedItem;
    youBlood;
    opponentBlood;
    
    constructor(private gamesService: GamesService) {
        this.gamesService.getAllByUserId().subscribe((data) => {
            const userId = sessionStorage.getItem('userId');
            if(data && data.length > 0){
                this.listPerson = data.filter((element) => {
                    if(element.userId === userId){
                        this.you = element;
                        return false;
                    }
                    return true;
                })
            }
            
        });
    }

    confronta(){
        this.youBlood = false;
        this.opponentBlood = false;
        this.personaSelezionata = true;
        this.selectedPerson = this.selectedItem;
        this.stats();
        let result = this.compare();

        of(event).pipe(
            delay(2000)
        ).subscribe(() => {
            this.showBlood(result);
            this.playAudio(result);
        })
    }

    playAudio(result){
        let audio = new Audio();
        audio.src = '/assets/audio/' + result + '.mp3';
        audio.load();
        audio.play();
    }

    showBlood(result){
        if(result === 'humilation')
            this.youBlood = true;
        if(result === 'excellent')
            this.opponentBlood = true;
    }

    compare() : string{
        let winFieldsYou = 0;
        let winFieldsOpponent = 0;

        if(this.you.stats.completedRatio > this.selectedPerson.stats.completedRatio)
            winFieldsYou = winFieldsYou + 3;

        if(this.you.stats.completedRatio < this.selectedPerson.stats.completedRatio)
            winFieldsOpponent = winFieldsOpponent + 3;

        if(this.you.stats.completedGames > this.selectedPerson.stats.completedGames)
            winFieldsYou = winFieldsYou + 5;

        if(this.you.stats.completedGames < this.selectedPerson.stats.completedGames)
            winFieldsOpponent = winFieldsOpponent + 5;
        
        if(this.you.stats.numGames > this.selectedPerson.stats.numGames)
            winFieldsYou++;

        if(this.you.stats.numGames < this.selectedPerson.stats.numGames)
            winFieldsOpponent++;

        if(this.you.stats.notFinished > this.selectedPerson.stats.notFinished) //campo contrario
            winFieldsOpponent++;

        if(this.you.stats.notFinished < this.selectedPerson.stats.notFinished) //campo contrario
            winFieldsYou++;


        if((winFieldsYou - winFieldsOpponent) > 5)
            return 'excellent';

        if((winFieldsOpponent - winFieldsYou) > 5)
            return 'humilation';

        return 'normal';
    }

    statsColor(personStatA, personStatB, reverse){
        if(personStatA > personStatB){
            return !reverse ? 'green' : 'red';
        }

        if(personStatA < personStatB){
            return !reverse ? 'red' : 'green';
        }
        return 'black';
    }

    stats(){
        this.you.stats = {};
        if(this.you.gamesThisYear && this.you.gamesThisYear.length !== 0){
            this.you.stats.numGames = this.you.gamesThisYear.length;
            this.you.stats.completedGames = 0;
            this.you.stats.notFinished = 0;
            this.you.gamesThisYear.forEach(element => {
                if(element.percentComp === 100){
                    this.you.stats.completedGames++;
                } else {
                    this.you.stats.notFinished++;
                }
            });
            this.you.stats.completedRatio = Math.round((this.you.stats.completedGames/this.you.stats.numGames) * 100) / 100
        } else {
            this.you.stats = this.defaultStats();
        }

        this.selectedPerson.stats = {};
        if(this.selectedPerson.gamesThisYear && this.selectedPerson.gamesThisYear.length !== 0){
            this.selectedPerson.stats.numGames = this.selectedPerson.gamesThisYear.length;
            this.selectedPerson.stats.completedGames = 0;
            this.selectedPerson.stats.notFinished = 0;
            this.selectedPerson.gamesThisYear.forEach(element => {
                if(element.percentComp === 100){
                    this.selectedPerson.stats.completedGames++;
                } else {
                    this.selectedPerson.stats.notFinished++;
                }
            });
            this.selectedPerson.stats.completedRatio = Math.round((this.selectedPerson.stats.completedGames/this.selectedPerson.stats.numGames) * 100) / 100
        } else {
            this.selectedPerson.stats = this.defaultStats();
        }


        
    }

    defaultStats(){
        const stat = {
            completedRatio: 0,
            completedGames: 0,
            numGames: 0,
            notFinished: 0
        }

        return stat;
    }
    
}
