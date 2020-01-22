import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';
import { ListUserComponent } from './list/list.component';
import { UserEditComponent } from './user-edit/user-edit.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './services/auth.guard';
import { CompareComponent } from './compare/compare.component';

const appRoutes: Routes = [
  {
    path: 'list',
    component: ListUserComponent,
    canActivate: [AuthGuard],
    data: { title: 'Annotanano Lista Utenti' }
  },
  {
    path: 'edit',
    component: UserEditComponent,
    canActivate: [AuthGuard],
    data: { title: 'Annotanano Modifica Utente' }
  },
  {
    path: 'login',
    component: LoginComponent,
    data: { title: 'Annotanano Login Utente' }
  },
  {
    path: 'compare',
    component: CompareComponent,
    data: { title: 'Annotanano Compare Utente' }
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    )
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
