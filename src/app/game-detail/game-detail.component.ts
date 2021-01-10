import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
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
  constructor(private gamesService: GamesService, private route: ActivatedRoute, private sanitizer: DomSanitizer){
    this.mediaAnnotanano = 0;
    this.route.queryParams.pipe(
      flatMap((params) => {
        this.idGame = params['idGame'];
        const gameName = params['name'];
        return this.gamesService.getResults(gameName);
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

  
}