import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListeUserComponent } from './user/liste-user.component';
import { DetailUserComponent } from './user/detail-user.component';
import { AddUserComponent } from './add-user/add-user.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { LoginComponent } from './auth/auth.component';

import { AuthGuard } from './auth/auth-guard.service';

const routes: Routes = [
  {
    path: 'user',
    canActivate: [AuthGuard],
    children: [
      { path : "add", component : AddUserComponent }, 
      { path : "edit/:id", component : EditUserComponent }, 
      { path : ":id", component : DetailUserComponent }
    ]
  },
  { path: 'login', component: LoginComponent },
  { path : "users", component : ListeUserComponent }, 
  { path : '**', redirectTo : 'users' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule{ 

}
