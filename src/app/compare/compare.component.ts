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
    noGames;
    youScore = null;
    opponentScore = null;
    
    constructor(private gamesService: GamesService) {
        this.gamesService.getAllByUserId().subscribe((data) => {
            const userId = sessionStorage.getItem('userId');
            if(data && data.length > 0){
                this.listPerson = data.filter((element) => {
                    if(element.userId === userId){
                        this.you = element;
                        if(!this.you.gamesThisYear || this.you.gamesThisYear.length === 0){
                            this.noGames = true;
                        }
                        return false;
                    }
                    return true;
                })
            }
            
        });
    }

    confronta(){
        this.youScore = null;
        this.opponentScore = null;
        this.youBlood = false;
        this.opponentBlood = false;
        this.personaSelezionata = true;
        this.selectedPerson = this.selectedItem;
        this.stats();
        let result = this.compare();

        of(event).pipe(
            delay(2000)
        ).subscribe(() => {
            this.showBlood(result.rate);
            this.playAudio(result.rate);
            this.youScore = result.youScore;
            this.opponentScore = result.opponentScore;
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

    compare() : any{
        this.youScore = 0;
        this.opponentScore = 0;

        let winFieldsYou = 0;
        let winFieldsOpponent = 0;

        if(this.you.stats.completedRatio > this.selectedPerson.stats.completedRatio) //3
            winFieldsYou = winFieldsYou + 3;

        if(this.you.stats.completedRatio < this.selectedPerson.stats.completedRatio)
            winFieldsOpponent = winFieldsOpponent + 3;

        if(this.you.stats.completedGames > this.selectedPerson.stats.completedGames) //8
            winFieldsYou = winFieldsYou + 5;

        if(this.you.stats.completedGames < this.selectedPerson.stats.completedGames)
            winFieldsOpponent = winFieldsOpponent + 5;
        
        if(this.you.stats.numGames > this.selectedPerson.stats.numGames) //9
            winFieldsYou++;

        if(this.you.stats.numGames < this.selectedPerson.stats.numGames)
            winFieldsOpponent++;

        if(this.you.stats.notFinished > this.selectedPerson.stats.notFinished) //campo contrario
            winFieldsOpponent++;

        if(this.you.stats.notFinished < this.selectedPerson.stats.notFinished) //campo contrario 10
            winFieldsYou++;

        if(this.you.stats.totalHours > this.selectedPerson.stats.totalHours) //12
            winFieldsYou = winFieldsYou + 2;

        if(this.you.stats.totalHours < this.selectedPerson.stats.totalHours)
            winFieldsOpponent = winFieldsOpponent + 2;

        if((winFieldsYou - winFieldsOpponent) > 6)
            return {rate: 'excellent', youScore: winFieldsYou, opponentScore: winFieldsOpponent};

        if((winFieldsOpponent - winFieldsYou) > 6)
            return {rate: 'humilation', youScore: winFieldsYou, opponentScore: winFieldsOpponent};

        return {rate: 'normal', youScore: winFieldsYou, opponentScore: winFieldsOpponent};;
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
            this.you.stats.totalHours = 0;
            this.you.gamesThisYear.forEach(element => {
                this.you.stats.totalHours += element.hours;
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
            this.selectedPerson.stats.totalHours = 0;
            this.selectedPerson.gamesThisYear.forEach(element => {
                this.selectedPerson.stats.totalHours += element.hours;
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
            notFinished: 0,
            totalHours: 0
        }

        return stat;
    }
    
}
