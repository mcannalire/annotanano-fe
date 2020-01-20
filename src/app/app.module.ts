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


@NgModule({
  declarations: [
    AppComponent,
    ListUserComponent,
    UserEditComponent,
    LoginComponent,
    LoaderComponent
  ],
  imports: [
    BrowserModule, OrderModule, AppRoutingModule, HttpClientModule, FormsModule
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
