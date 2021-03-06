import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { OrderModule } from 'ngx-order-pipe';
import { ListUserComponent } from './list/list.component';
import { UserEditComponent } from './user-edit/user-edit.component';
import { GoldBookComponent } from './goldbook/goldbook.component';
import { LoginComponent } from './login/login.component';
import { LoaderComponent } from './loader/loader.component';
import { AppRoutingModule } from "./app.module-routing";
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AuthGuard } from './services/auth.guard';
import { LoadingScreenInterceptor } from './interceptors/loading.interceptor';
import { ProgressBarModule } from 'primeng/progressbar';
import {AutoCompleteModule} from 'primeng/autocomplete';
import { ButtonModule } from 'primeng/button';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { SliderModule } from 'primeng/slider';
import { CheckboxModule } from 'primeng/checkbox';
import { TooltipModule } from 'primeng/tooltip';
import { GoogleChartsModule } from 'angular-google-charts';
import { PasswordModule } from 'primeng/password';
import { CardModule } from 'primeng/card';
import { CompareComponent } from './compare/compare.component';
import { CookieService } from 'ngx-cookie-service';
import { DialogModule } from 'primeng/dialog';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { RatingModule } from 'primeng/rating';
import {LocationStrategy, HashLocationStrategy} from '@angular/common';
import { MovieEditComponent } from './movies-edit/movie-edit.component';
import { MovieListComponent } from './movies-list/movie-list.component';
import { SeriesListComponent } from './series-list/series-list.component';
import { SeriesEditComponent } from './series-edit/series-edit.component';
import { GameDetailComponent } from './game-detail/game-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    ListUserComponent,
    UserEditComponent,
    LoginComponent,
    LoaderComponent,
    CompareComponent,
    GoldBookComponent,
    MovieEditComponent,
    MovieListComponent,
    SeriesListComponent,
    SeriesEditComponent,
    GameDetailComponent
  ],
  imports: [
    BrowserModule, 
    OrderModule, 
    AppRoutingModule, 
    HttpClientModule, 
    FormsModule, 
    ProgressBarModule,
    ButtonModule,
    FontAwesomeModule,
    InputTextModule,
    DropdownModule,
    BrowserAnimationsModule,
    NoopAnimationsModule,
    SliderModule,
    CheckboxModule,
    TooltipModule,
    GoogleChartsModule,
    PasswordModule,
    DialogModule,
    InputTextareaModule,
    RatingModule,
    CardModule,
    AutoCompleteModule
  ],
  providers: [AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoadingScreenInterceptor,
      multi: true
    },
    {
      provide: LocationStrategy, 
      useClass: HashLocationStrategy
    },
    CookieService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
