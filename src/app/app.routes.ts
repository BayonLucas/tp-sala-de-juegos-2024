import { Routes } from '@angular/router';
import { ErrorFoundComponent } from './components/error-found/error-found.component';
import { LoginComponent } from './components/login/login.component';
import { SingupComponent } from './components/singup/singup.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { HomeComponent } from './components/home/home.component';

export const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'login', component: LoginComponent },
    { path: 'singup', component: SingupComponent },
    { path: 'reset-password', component: ResetPasswordComponent },
    { path: '**', component: ErrorFoundComponent },
];
