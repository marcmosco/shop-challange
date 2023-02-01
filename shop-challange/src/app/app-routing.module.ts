import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AuthGuardService} from "./shared/service/auth-gaurd.service";
import {LoginGuardService} from "./shared/service/login-gaurd.service";

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  {
    path: 'home',
    loadChildren: () =>
      import('./feature/home/home.module').then((m) => m.HomeModule),
    canActivate: [AuthGuardService],
  },  {
    path: 'ricerca',
    loadChildren: () =>
      import('./feature/ricerca/ricerca.module').then((m) => m.RicercaModule),
    canActivate: [AuthGuardService],
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./feature/login-form/login-form.module').then(
        (m) => m.LoginFormModule
      ),
    canActivate: [LoginGuardService],
  },
  { path: '**', redirectTo: 'login', pathMatch: 'full' },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
