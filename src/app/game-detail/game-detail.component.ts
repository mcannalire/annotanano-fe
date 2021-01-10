import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { flatMap } from 'rxjs/operators';
import { GamesService } from '../services/games.service';

@Component({
  selector: 'annotanano-detail',
  templateUrl: './game-detail.component.html',
  styleUrls: ['./game-detail.component.css']
})
export class GameDetailComponent {
  gameDetail:any = {};
  idGame;
  listPerson = [];
  isClip;
  trustedUrl;
  mediaAnnotanano;
  totalHours;
  gameName;
  similarGames;
  constructor(private gamesService: GamesService, private route: ActivatedRoute, private sanitizer: DomSanitizer, private router: Router){
    this.mediaAnnotanano = 0;
    this.totalHours = 0;
    this.route.queryParams.pipe(
      flatMap((params) =>{
        this.idGame = params['idGame'];
        this.gameName = params['name'];
        return this.gamesService.getSimilarResult(this.idGame);
      }),
      flatMap((data) => {
        if(data && data['results'] && data['results'].length > 0){
          this.similarGames = data['results'];
        }
        return this.gamesService.getResults(this.gameName);
      }),
      flatMap((data) => {
        if(data && data['results'] && data['results'].length > 0){
          const results = data['results'];
          results.forEach((game) => {
            if(game.id == this.idGame){
              this.gameDetail = game;
            }
          })
        }
        return this.gamesService.getAll();
      })
    ).subscribe((p:any) => {
      if(p){
        p.forEach(person => {
          if(person.gamesThisYear){
            person.gamesThisYear.forEach(element => {
              if(element.idGame == this.idGame){
                this.listPerson.push(person);
                this.mediaAnnotanano += element.rating;
                this.totalHours += element.hours;
              }
            });
          }
        });

        if(this.listPerson && this.listPerson.length > 0){
          this.mediaAnnotanano = this.mediaAnnotanano / this.listPerson.length;
          this.mediaAnnotanano = Math.round(this.mediaAnnotanano * 10) / 10
        }
       
      }
      this.isClip = this.gameDetail.clip ? this.gameDetail.clip.clip : null;
      
    })
  }

  getTrustedUrl(){
    this.trustedUrl = this.sanitizer.bypassSecurityTrustUrl(this.gameDetail.clip.clip);
  }

  toGameDetail(game){
    //this.router.navigate(['/game-detail'], {queryParams: {idGame: game.id, name: game.name}});
    this.listPerson = [];
    this.mediaAnnotanano = 0;
    this.totalHours = 0;
    this.isClip = null;
    this.refresh(game.id, game.name);
  }

  refresh(id, name){
    of({}).pipe(
      flatMap((params) =>{
        return this.gamesService.getSimilarResult(id);
      }),
      flatMap((data) => {
        if(data && data['results'] && data['results'].length > 0){
          this.similarGames = data['results'];
        }
        return this.gamesService.getResults(name);
      }),
      flatMap((data) => {
        if(data && data['results'] && data['results'].length > 0){
          const results = data['results'];
          results.forEach((game) => {
            if(game.id == id){
              this.gameDetail = game;
            }
          })
        }
        return this.gamesService.getAll();
      })
    ).subscribe((p:any) => {
      if(p){
        p.forEach(person => {
          if(person.gamesThisYear){
            person.gamesThisYear.forEach(element => {
              if(element.idGame == id){
                this.listPerson.push(person);
                this.mediaAnnotanano += element.rating;
                this.totalHours += element.hours;
              }
            });
          }
        });

        if(this.listPerson && this.listPerson.length > 0){
          this.mediaAnnotanano = this.mediaAnnotanano / this.listPerson.length;
          this.mediaAnnotanano = Math.round(this.mediaAnnotanano * 10) / 10
        }
       
      }
      this.isClip = this.gameDetail.clip ? this.gameDetail.clip.clip : null;
      
    })
  }
  
}