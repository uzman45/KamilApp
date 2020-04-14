import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { KamilorderComponent } from './components/kamilorder/kamilorder.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './services/auth-guard.service';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'kamiller',
    component: KamilorderComponent,
    canActivate:[AuthGuard]
  },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
