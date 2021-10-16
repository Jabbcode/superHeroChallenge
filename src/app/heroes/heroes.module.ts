import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HeroesRoutingModule } from './heroes-routing.module';
import { EquipoComponent } from './components/equipo/equipo.component';
import { BuscadorComponent } from './components/buscador/buscador.component';
import { DetalleComponent } from './components/detalle/detalle.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    EquipoComponent,
    BuscadorComponent,
    DetalleComponent
  ],
  imports: [
    CommonModule,
    HeroesRoutingModule,
    ReactiveFormsModule
  ]
})
export class HeroesModule { }
