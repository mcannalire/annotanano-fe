import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';
import { ListUserComponent } from './list/list.component';
import { UserEditComponent } from './user-edit/user-edit.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './services/auth.guard';
import { CompareComponent } from './compare/compare.component';
import { GoldBookComponent } from './goldbook/goldbook.component';
import { MovieEditComponent } from './movies-edit/movie-edit.component';
import { MovieListComponent } from './movies-list/movie-list.component';
import { SeriesListComponent } from './series-list/series-list.component';
import { SeriesEditComponent } from './series-edit/series-edit.component';

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
  },
  {
    path: 'goldbook',
    component: GoldBookComponent,
    data: { title: 'Annotanano Albo d\'oro' }
  },
  { 
    path: 'movie-edit',
    component: MovieEditComponent,
    canActivate: [AuthGuard],
    data: { title: 'Annotanano Modifica Lista Film' }
  },
  { 
    path: 'movie-list',
    component: MovieListComponent,
    canActivate: [AuthGuard],
    data: { title: 'Annotanano Mostra Lista Film' }
  },
  { 
    path: 'series-list',
    component: SeriesListComponent,
    canActivate: [AuthGuard],
    data: { title: 'Annotanano Mostra Lista Serie TV' }
  },
  { 
    path: 'series-edit',
    component: SeriesEditComponent,
    canActivate: [AuthGuard],
    data: { title: 'Annotanano Modifica Lista Serie TV' }
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
