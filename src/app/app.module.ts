import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { OrderModule } from 'ngx-order-pipe';
import { ListUserComponent } from './list/list.component';
import { UserEditComponent } from './user-edit/user-edit.component';
import { LoginComponent } from './login/login.component';
import { LoaderComponent } from './loader/loader.component';
import { AppRoutingModule } from "./app.module-routing";
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AuthGuard } from './services/auth.guard';
import { LoadingScreenInterceptor } from './interceptors/loading.interceptor';
import { ProgressBarModule } from 'primeng/progressbar';
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

@NgModule({
  declarations: [
    AppComponent,
    ListUserComponent,
    UserEditComponent,
    LoginComponent,
    LoaderComponent
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
    PasswordModule
  ],
  providers: [AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoadingScreenInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
