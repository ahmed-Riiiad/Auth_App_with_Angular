import { Routes } from '@angular/router';
import { authGuard } from './core/auth/gaurdds/auth-guard';
import { geustGuard } from './core/auth/gaurdds/geust-guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./features/login/login.component')
        .then(m => m.LoginComponent) ,
        title : 'Login_Form' ,
        canActivate : [geustGuard]

  },
  {
    path: 'register',
    loadComponent: () =>
      import('./features/register/register.component')
        .then(m => m.RegisterComponent) ,
        title : 'Register_Form' ,
        canActivate : [geustGuard]

  },
  {
    path: 'forgetPassword',
    loadComponent: () =>
      import('./features/forgetPassword/forgetpassword.component')
        .then(m => m.ForgetpasswordComponent),
        title : 'Forget_Password' ,
        canActivate : [geustGuard]

  },
  {
    path: 'home',
    loadComponent: () =>
      import('./features/home/home.component')
        .then(m => m.HomeComponent),
        title : 'Home_page' ,
        canActivate : [authGuard]

  },
  {
    path: '**',
    loadComponent: () =>
      import('./features/notFound/notfound.component')
        .then(m => m.NotfoundComponent)
  }
];