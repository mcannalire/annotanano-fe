import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { OrderModule } from 'ngx-order-pipe';
import { ListUserComponent } from './list/list.component';
import { UserEditComponent } from './user-edit/user-edit.component';
import { LoginComponent } from './login/login.component';
import { AppRoutingModule } from "./app.module-routing";
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AuthGuard } from './services/auth.guard';


@NgModule({
  declarations: [
    AppComponent,
    ListUserComponent,
    UserEditComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule, OrderModule, AppRoutingModule, HttpClientModule, FormsModule
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
