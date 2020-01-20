import { Component, OnDestroy, AfterViewInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { LoadingScreenService } from '../services/loading.service';


@Component({
  selector: 'annotanano-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css']
})
export class LoaderComponent implements AfterViewInit, OnDestroy{
    loadingSubscription: Subscription;
    loading: boolean = false;

    constructor(private loadingScreenService: LoadingScreenService) {
    }
  
    ngAfterViewInit() {
      this.loadingSubscription = this.loadingScreenService.loadingStatus.subscribe((value: any) => {
        this.loading = value;
      });
    }
  
    ngOnDestroy() {
      this.loadingSubscription.unsubscribe();
    }
    
   
}
