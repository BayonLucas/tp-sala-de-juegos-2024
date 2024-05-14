import { Routes } from '@angular/router';
import { ErrorFoundComponent } from './components/error-found/error-found.component';
import { LoginComponent } from './components/login/login.component';
import { SingupComponent } from './components/singup/singup.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { HomeComponent } from './components/home/home.component';
import { QuienSoyComponent } from './components/quien-soy/quien-soy.component';

// export const routes: Routes = [
//     { path: '', redirectTo: '/home', pathMatch: 'full' },
//     { path: 'home', component: HomeComponent },
//     { path: 'login', component: LoginComponent },
//     { path: 'singup', component: SingupComponent },
//     { path: 'quien-soy', component: QuienSoyComponent },
//     { path: 'reset-password', component: ResetPasswordComponent },
//     { path: '**', component: ErrorFoundComponent },
// ];

export const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'home', loadComponent: () => import('./components/home/home.component').then(mod => mod.HomeComponent)}, 
    { path: 'login', loadComponent: () => import('./components/login/login.component').then(mod => mod.LoginComponent)},
    { path: 'singup', loadComponent: () => import('./components/singup/singup.component').then(mod => mod.SingupComponent)},
    { path: 'quien-soy', loadComponent: () => import('./components/quien-soy/quien-soy.component').then(mod => mod.QuienSoyComponent)},
    { path: 'reset-password', loadComponent: () => import('./components/reset-password/reset-password.component').then(mod => mod.ResetPasswordComponent)},
    { path: 'ahorcado', loadComponent: () => import('./components/games/el-ahorcado/el-ahorcado.component').then(mod => mod.ElhorcadoComponent)},
    { path: 'mayor-o-menor', loadComponent: () => import('./components/games/mayor-o-menor/mayor-o-menor.component').then(mod => mod.MayorOMenorComponent)},
    { path: 'preguntados', loadComponent: () => import('./components/games/preguntados/preguntados.component').then(mod => mod.PreguntadosComponent)},
    { path: 'secuencia', loadComponent: () => import('./components/games/transiciones/transiciones.component').then(mod => mod.TransicionesComponent)},
    { path: '**', loadComponent: () => import('./components/error-found/error-found.component').then(mod => mod.ErrorFoundComponent)},
];
