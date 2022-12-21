import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/PAGE-LOGIN/login/login.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';

const routes: Routes = [
  {
    path: '',
    component: LoginPageComponent,
    children: [
      {
        path: 'login',
        component: LoginComponent,
      },
      // {
      //   path: 'remind-password',
      //   component: RemindPasswordComponent,
      // },
      // {
      //   path: 'register',
      //   component: RegisterComponent,
      // },
    ]},
    { path: 'home', loadChildren: () => import('./pages/home-page/home-page.module').then(m => m.HomePageModule),
    // canLoad: [CheckLoginGuard],
    // canActivate: [CheckLoginGuard],
    // canActivateChild: [CheckLoginGuard],
    // data: {
    //   onlyAdmin: false,
    // }
  },
  { path: '**',   redirectTo: '/login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
