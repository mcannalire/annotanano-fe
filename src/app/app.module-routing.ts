import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';
import { ListUserComponent } from './list/list.component';
import { UserEditComponent } from './user-edit/user-edit.component';

const appRoutes: Routes = [
  {
    path: 'list',
    component: ListUserComponent,
    data: { title: 'Annotanano Lista Utenti' }
  }
  {
    path: 'edit',
    component: UserEditComponent,
    data: { title: 'Annotanano Modifica Utente' }
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
