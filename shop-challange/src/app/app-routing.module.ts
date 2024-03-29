import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from './shared/service/auth-gaurd.service';
import { LoginGuardService } from './shared/service/login-gaurd.service';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  {
    path: 'home',
    loadChildren: () =>
      import('./feature/home/home.module').then((m) => m.HomeModule),
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
  {
    path: 'category',
    loadChildren: () =>
      import('./feature/category/category.module').then(
        (m) => m.CategoryModule
      ),
    canActivate: [AuthGuardService],
  },
  { path: '**', redirectTo: 'login', pathMatch: 'full' },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
