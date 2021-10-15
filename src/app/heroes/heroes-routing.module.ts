import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EquipoComponent } from './components/equipo/equipo.component';
import { BuscadorComponent } from './components/buscador/buscador.component';
import { DetalleComponent } from './components/detalle/detalle.component';

const routes: Routes = [
  {
    path: '', 
    children: [
      { path: 'equipo', component: EquipoComponent},
      { path: 'buscador', component: BuscadorComponent},
      { path: ':id', component: DetalleComponent},
      { path: '**', redirectTo: 'equipo'},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HeroesRoutingModule { }
