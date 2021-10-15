import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';

const routes: Routes = [
  { 
    path: 'heroes', 
    loadChildren: () => import('./heroes/heroes.module').then( m => m.HeroesModule)
  },
  { 
    path: 'login', 
    loadChildren: () => import('./auth/auth.module').then( m => m.AuthModule)
  },
  { 
    path: '**', 
    redirectTo: 'heroes'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
